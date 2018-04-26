import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Table } from 'semantic-ui-react';
import { Groups } from '/imports/api/group/group';
import Group from '/imports/ui/components/messages/Group';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListMessages extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Groups</Header>
          <Table celled>
            <Table.Body>
              {this.props.groups.map((group, index) => <Group key ={index} group={group}/>)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListMessages.propTypes = {
  groups: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Groups');
  return {
    groups: Groups.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListMessages);
