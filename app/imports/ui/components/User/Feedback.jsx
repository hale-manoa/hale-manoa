import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Feedback extends React.Component {
  render() {
    const feedstyle = { margin: '20px'}
    return (
        <Feed.Event style={feedstyle}>
          <Feed.Content>
            <Feed.Date content={this.props.feedback.createdAt.toLocaleDateString('en-US')} />
            <Feed.Summary>
              {this.props.feedback.rating}
              <br/>
              {this.props.feedback.feedback}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

/** Require a document to be passed to this component. */
Feedback.propTypes = {
  feedback: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Feedback);
