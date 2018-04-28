import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Icon, Button, Loader } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Users, UserSchema } from '/imports/api/user/user';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
const alertStyle = { marginBottom: '12px', marginTop: '0px' };

class NavBar extends React.Component {
  render() {
    return (
        this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  renderPage() {
    const menuStyle = { marginBottom: '0px', color: '#00A7E1' };
    const menuItemColor = { color: '#000' };
    return (
        <div>
        <Menu style={menuStyle} attached="top">
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Image src='/images/halemanoa.png' size='small'/>
          </Menu.Item>
          {this.props.currentUser ? (
              [<Menu.Item style={menuItemColor} as={NavLink} activeClassName="active" exact to="/list"
                          key='housing' className="large-text">Housing</Menu.Item>,
              <Menu.Item style={menuItemColor} as={NavLink} activeClassName="active" exact to="/connect"
                         key='connect' className="large-text">Connect</Menu.Item>,
              <Menu.Item style={menuItemColor} as={NavLink} activeClassName="" exact to="/messages"
                         className="large-text">Message</Menu.Item>]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
          ) : ''}
          <Menu.Item position="right" className="large-text">
            {this.props.currentUser === '' ? (
                <Dropdown style={menuItemColor} text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                    <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon="arrow circle outline right" text="Sign Out" as={NavLink} exact to="/signout"/>
                    <Dropdown.Item icon="user plus" text="Edit Profile" as={NavLink} exact to="/editprofile"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu>
          {this.props.users.filter(m =>
              (m.description === "Update Description") &&
              (m.owner === this.props.currentUser)
          ).length !== 0
          &&
          [<Button
              key="2"
              style={alertStyle}
              color="red"
              fluid
              as={NavLink} exact to="/editprofile"
          >
            Your Profile Needs to be Updated: Click here to Edit Profile
          </Button>]

          }

        </div>
    );
  }
}


/** Require an array of Stuff documents in the props. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Users');
  return {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    users: Users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(NavBar);

