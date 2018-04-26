import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Image, Grid, Loader, Feed, Button } from 'semantic-ui-react';
import { Users } from '/imports/api/user/user';
import AddFeedback from '/imports/ui/components/User/AddFeedback';
import Feedback from '/imports/ui/components/User/Feedback';
import { Feedbacks } from '/imports/api/feedback/feedback';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Groups } from '/imports/api/group/group';
import { Bert } from 'meteor/themeteorchef:bert';



/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewProfile extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  constructor(){
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
    const member_1 =  Users.findOne({ owner: Meteor.user().username}).firstName;
    const member_2 =  Users.findOne({ owner: user}).firstName;
    const members = [user, Meteor.user().username];
    const name = member_1 + ", "+ member_2;
    Groups.insert({ name, members }, this.insertCallback);
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">
            {this.props.users.firstName} {this.props.users.lastName}
          </Header>
          <Grid columns={2}>
            <Grid.Column>
              <Grid.Row>
              <Image rounded size="medium" src={this.props.users.image} />
              </Grid.Row>
              <Grid.Row>
                <Button
                    positive
                    onClick={() => { this.connectOnClick(this.props.users.owner) }}
                >
                  Connect
                </Button>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column>
              <p><b><u>Age</u></b><br/> {this.props.users.age}</p>
              <p><b><u>Area</u></b><br/> {this.props.users.area}</p>
              <p><b><u>Preferences</u></b><br/>
                {this.props.users.preferences.map(item => <span key={item}>{item}<br/></span>)}
              </p>
            </Grid.Column>
          </Grid>
          <Header as="h2" textAlign="left">
              About Me
          </Header>
          <p> {this.props.users.description} </p>
          <Header as="h2" textAlign="left">
            Listings
          </Header>
          <p> Listing Placeholder </p>
          <Header as="h2" textAlign="left">
            Ratings and Reviews
          </Header>
          <Feed>
            {this.props.feedbacks.map((feedback, index) => <Feedback key={index} feedback={feedback}/>)}
          </Feed>
          <AddFeedback owner={this.props.users.owner} userId={this.props.users._id}/>
        </Container>
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
