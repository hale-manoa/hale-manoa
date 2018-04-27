import React from 'react';
import { Feed, Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class DirectMessage extends React.Component {
  render() {
    const feedstyle = { margin: '20px' }
    return (
          <Comment style={feedstyle}>
            <Comment.Avatar src={this.props.message.image} />
            <Comment.Content>
              <Comment.Author>{this.props.message.username}</Comment.Author>
              <Comment.Metadata>
                <div>{this.props.message.createdAt.toLocaleDateString('en-US')}</div>
              </Comment.Metadata>
              <Comment.Text>{this.props.message.message}</Comment.Text>
            </Comment.Content>
          </Comment>
    );
  }
}

/** Require a document to be passed to this component. */
DirectMessage.propTypes = {
  message: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(DirectMessage);
