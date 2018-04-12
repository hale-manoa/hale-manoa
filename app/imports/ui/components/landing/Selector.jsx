import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class Selector extends React.Component {
  render() {

    return (
        <Button.Group color='blue'>
          <Button size='massive' onClick={()=>this.props.onClickFunction("Buy a Home")}>Buy</Button>
          <Button size='massive' onClick={()=>this.props.onClickFunction("Sell a Home")}>Sell</Button>
          <Button size='massive' onClick={()=>this.props.onClickFunction("Find a Roommate")}>Find</Button>
        </Button.Group>
    );
  }
}


export default Selector;
