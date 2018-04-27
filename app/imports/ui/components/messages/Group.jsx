import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link, NavLink } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Group extends React.Component {
  render() {
    return (
        <Table.Row color={this.props.color}>
            <Table.Cell>
              <Header
                  as={NavLink} activeClassName="" exact to={`/message/${this.props.group._id}`}
                  color={this.props.color}
              >
                {this.props.group.name}
              </Header>
            </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
Group.propTypes = {
  group: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,

};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Group);
