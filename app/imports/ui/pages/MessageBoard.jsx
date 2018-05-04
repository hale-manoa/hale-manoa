import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Feed, Header, Loader, Grid, Segment, Table, Comment } from 'semantic-ui-react';
import { Groups } from '/imports/api/group/group';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Group from '/imports/ui/components/messages/Group';
import { Messages } from '/imports/api/message/message';
import DirectMessage from '/imports/ui/components/messages/DirectMessage';
import AddMessage from '/imports/ui/components/messages/AddMessage';



/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class MessageBoard extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container className="msgboard-container">
          <Grid columns='equal'>
            <Grid.Row stretched>
              <Grid.Column width={4}>
                <Table celled>
                  <Table.Body>
                    {this.props.groups.map((group, index) => {
                      if(this.props.group._id === group._id) return (<Group color="blue" key={index} group={group}/>);
                      else return (<Group color="black" key={index} group={group}/>);
                        }
                    )}
                  </Table.Body>
                </Table>
              </Grid.Column>
              <Grid.Column width={10}>
                <Segment>
                <Comment.Group size='small'>
                  <Header as='h3' dividing>Messages</Header>
                  <Segment>
                  <Feed>
                    {this.props.messages.map((message, index) => <DirectMessage key={index} message={message}/>)}
                    </Feed>
                  </Segment>
                  <AddMessage members={this.props.group.members} groupId={this.props.group._id}/>
                </Comment.Group>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
MessageBoard.propTypes = {
  group: PropTypes.object,
  messages: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const groupId = match.params._id;
  const subscription = Meteor.subscribe('Groups');
  const subscription2 = Meteor.subscribe('Messages');
  return {
    group: Groups.findOne(groupId),
    messages: Messages.find({groupId: groupId}).fetch(),
    groups: Groups.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(MessageBoard);
