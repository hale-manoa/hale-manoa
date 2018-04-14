import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class User extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image floated='right' size='mini' src={this.props.user.image} />
            <Card.Header>
              {this.props.user.firstName} {this.props.user.lastName}
            </Card.Header>
            <Card.Meta>
              {this.props.user.type}
            </Card.Meta>
            <Card.Description>
              <p><b>Age:</b> {this.props.user.age}</p>
              <p><b>Area:</b> {this.props.user.area}</p>
              <p><b>Preferences:</b> {this.props.user.preferences.join(', ')}</p>
            </Card.Description>
          </Card.Content>
          <Link to={`/profile/${this.props.user._id}`}>
            <Button fluid centered>See full profile</Button>
          </Link>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
User.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(User);
