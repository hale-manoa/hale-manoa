import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Image, Grid, Loader } from 'semantic-ui-react';
import { Housings } from '/imports/api/housing/housing';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleMap from '/imports/ui/components/SimpleMap';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewHousing extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (
        this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">
           {this.props.housings.streetaddress} &nbsp;{this.props.housings.unitnumber}
          </Header>
          <Grid columns={2}>
            <Grid.Column>
              <Image rounded size="medium" src={this.props.housings.image} />
            </Grid.Column>
            <Grid.Column>
              <p><b><u>Rent</u></b><br/> ${this.props.housings.rentprice} </p>
              <p><b><u>Area</u></b><br/> {this.props.housings.city}, &nbsp;
                 {this.props.housings.state}, &nbsp;
                 {this.props.housings.zipcode}
              </p>
              <p><b><u>Details</u></b><br/>
                Beds:&nbsp; {this.props.housings.beds},<br/>
                Baths:&nbsp; {this.props.housings.baths},<br/>
                Squarefeet:&nbsp; {this.props.housings.squarefeet}<br/>
                Longitude:&nbsp; {this.props.housings.longitude}<br/>
                Latitude:&nbsp; {this.props.housings.latitude}<br/>
              </p>
            </Grid.Column>
          </Grid>
          <Header as="h2" textAlign="left">
            Description
          </Header>
          <p> {this.props.housings.description} </p>
          <Header as="h2" textAlign="left">
            Contact me
          </Header>
          <p> {this.props.housings.owner} </p>

          <SimpleMap longitude={this.props.housings.longitude} latitude={this.props.housings.latitude}/>

        </Container>
    );
  }
}

/** Require an array of Housing documents in the props. */
ViewHousing.propTypes = {
  housings: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const HousingsID = match.params._id;
  const subscription = Meteor.subscribe('Housing');
  return {
    housings: Housings.findOne(HousingsID),
    ready: subscription.ready(),
  };
})(ViewHousing);
