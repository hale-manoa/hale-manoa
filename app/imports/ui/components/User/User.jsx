import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

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
              {this.props.user.address}
            </Card.Meta>
            <Card.Description>
              {this.props.user.description}
            </Card.Description>
          </Card.Content>
          <Button>Read More</Button>
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
