import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class DirectMessage extends React.Component {
  render() {
    const feedstyle = { margin: '20px'}
    return (
        <Feed.Event style={feedstyle}>
          <Feed.Content>
            <Feed.Date content={this.props.message.createdAt.toLocaleDateString('en-US')} />
            <Feed.Summary>
              {this.props.message.message}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

/** Require a document to be passed to this component. */
DirectMessage.propTypes = {
  message: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(DirectMessage);
