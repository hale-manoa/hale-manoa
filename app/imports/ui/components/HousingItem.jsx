import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

/** Renders a card for the housing */
class HousingItem extends React.Component {
  render() {
    return (
        <Card>
          <Image src={ this.props.house.image } />
          <Card.Content>
            <Card.Header>
              {this.props.house.propertytype} FOR RENT
            </Card.Header>
            <Card.Meta>
              Rent: ${this.props.house.rentprice}
              &nbsp;
              &nbsp;
              Beds: {this.props.house.beds}
              &nbsp;
              &nbsp;
              Baths: {this.props.house.baths}
            </Card.Meta>
            <Card.Description>
              Description:
              <br/>
              {this.props.house.description}
              <br/>

            </Card.Description>
            <Card.Content extra>
              <br/>
              {this.props.house.streetaddress}
              &nbsp;
              {this.props.house.unitnumber}
            </Card.Content>
            &nbsp;
            <Link to={`/housing/${this.props.house._id}`}>
            <Button fluid centered>See Housing Detail</Button>
            </Link>

            &nbsp;

            {Meteor.user().username === this.props.house.owner ? (<Link to={`/edit/${this.props.house._id}`}>
              <Button fluid centered>Edit Housing Detail</Button>
            </Link>) : ''}


          </Card.Content>

        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
HousingItem.propTypes = {
  house: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(HousingItem);
