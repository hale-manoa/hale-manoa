import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class HousingItem extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Card.Header>
              {this.props.house.propertyaddress}
            </Card.Header>
            <Card.Meta>
              {this.props.house.propertytype}
            </Card.Meta>
            <Card.Description>
              {this.props.house.description}
            </Card.Description>
            <Card.Content>
              <a>
                ${this.props.house.rentprice}
                Beds: {this.props.house.beds}
                Baths: {this.props.house.baths}
              </a>
            </Card.Content>
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
