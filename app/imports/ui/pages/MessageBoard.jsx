import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Grid, Segment, Table, Comment } from 'semantic-ui-react';
import { Groups } from '/imports/api/group/group';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Group from '/imports/ui/components/messages/Group';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class MessageBoard extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">MessageBoard</Header>
          <Grid columns='equal'>
            <Grid.Row stretched>
              <Grid.Column>
                <Table celled>
                  <Table.Body>
                    {this.props.groups.map((group, index) => <Group key ={index} group={group}/>)}
                  </Table.Body>
                </Table>
              </Grid.Column>
              <Grid.Column width={6}>
                <Segment>
                <Comment.Group size='small'>
                  <Header as='h3' dividing>Messages</Header>

                  <Comment>
                    <Comment.Avatar as='a' src='/assets/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                      <Comment.Author as='a'>Matt</Comment.Author>
                      <Comment.Metadata>
                        <span>Today at 5:42PM</span>
                      </Comment.Metadata>
                      <Comment.Text>How artistic!</Comment.Text>
                      <Comment.Actions>
                        <a>Reply</a>
                      </Comment.Actions>
                    </Comment.Content>
                  </Comment>
                </Comment.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>Pinned Housings</Segment>
                <Segment>2</Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
MessageBoard.propTypes = {
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
})(MessageBoard);
