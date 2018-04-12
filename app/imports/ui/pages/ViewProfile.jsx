import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Image, Grid, Loader } from 'semantic-ui-react';
import { Users } from '/imports/api/user/user';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewProfile extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (
        this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
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
              <Image rounded size="medium" src={this.props.users.image} />
            </Grid.Column>
            <Grid.Column>
              <p><b>Age:</b> {this.props.users.age}</p>
              <p><b>Area:</b> {this.props.users.area}</p>
              <p><b>Preferences:</b> {this.props.users.preferences}</p>
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
          <p> Feedback Placeholder </p>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ViewProfile.propTypes = {
  users: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const userId = match.params._id;
  const subscription = Meteor.subscribe('Users');
  return {
    users: Users.findOne(userId),
    ready: subscription.ready(),
  };
})(ViewProfile);