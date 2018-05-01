import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Image, Grid, Loader, Feed, Button, Segment } from 'semantic-ui-react';
import { Users } from '/imports/api/user/user';
import AddFeedback from '/imports/ui/components/User/AddFeedback';
import Feedback from '/imports/ui/components/User/Feedback';
import { Feedbacks } from '/imports/api/feedback/feedback';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Groups } from '/imports/api/group/group';
import { Bert } from 'meteor/themeteorchef:bert';
import '/imports/ui/pages/HousingPages/listhousingpage.css';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewProfile extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  constructor() {
    super();
    this.connectOnClick = this.connectOnClick.bind(this);
  }

  render() {
    return (
        this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'You have connected! Go to your messages and start a conversation' });
      this.formRef.reset();
    }
  }

  connectOnClick(user) {
    const member_1 = Users.findOne({ owner: Meteor.user().username }).firstName;
    const member_2 = Users.findOne({ owner: user }).firstName;
    const members = [user, Meteor.user().username];
    const housings = [];
    const name = member_1 + ", " + member_2;
    Groups.insert({ name, members, housings }, this.insertCallback);
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const isLister = this.props.users.type === 'Lister';
    return (
        <Grid centered>
          <Grid.Column width={14}>
            <Container className="pageContainer">
              <Grid centered>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Header as="h2" textAlign="center">
                      {this.props.users.firstName} {this.props.users.lastName}
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row className="profile-top-margin">
                  <Grid.Column width={6}>
                    <Image rounded size="medium" src={this.props.users.image}/>
                  </Grid.Column>
                  <Grid.Column width={4} className="segment-spacing">
                    <Segment>
                      <p><b><u>Age</u></b><br/> {this.props.users.age}</p>
                      <p><b><u>Area</u></b><br/> {this.props.users.area}</p>
                      <p><b><u>Preferences</u></b><br/>
                        {this.props.users.preferences.map(item => <span key={item}>{item}<br/></span>)}
                      </p>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={4} className="connect-button-spacing">
                    <Button
                        positive
                        onClick={() => {
                          this.connectOnClick(this.props.users.owner)
                        }}
                    >
                      Connect
                    </Button>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={14}>
                    <Segment>
                      <Header as="h2" textAlign="left">
                        About Me
                      </Header>
                      <p> {this.props.users.description} </p>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8} className="listing-spacing">
                    <Segment>
                      {(isLister) ? <div>
                        <Header>Listings</Header>
                        <p> Listing Placeholder </p>
                      </div> : null}
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={14}>
                    <Header as="h2" textAlign="left">
                      Ratings and Reviews
                    </Header>
                    <Feed>
                      {this.props.feedbacks.map((feedback, index) => <Feedback key={index} feedback={feedback}/>)}
                    </Feed>
                    <AddFeedback owner={this.props.users.owner} userId={this.props.users._id}/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>


            </Container>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ViewProfile.propTypes = {
  users: PropTypes.object,
  feedbacks: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const userId = match.params._id;
  const subscription = Meteor.subscribe('Users');
  const subscription2 = Meteor.subscribe('Feedbacks');
  return {
    users: Users.findOne(userId),
    feedbacks: Feedbacks.find({ userId: userId }).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ViewProfile);
