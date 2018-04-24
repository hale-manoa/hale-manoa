import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { NavLink } from 'react-router-dom';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class Selector extends React.Component {
  render() {

    return (
        <Button.Group color='blue'>
          <Button size='massive' as={NavLink} activeClassName="" exact to={`/list`}>Rent</Button>
          <Button size='massive' as={NavLink} activeClassName="" exact to={`/connect`}>Match</Button>
        </Button.Group>
    );
  }
}


export default Selector;
