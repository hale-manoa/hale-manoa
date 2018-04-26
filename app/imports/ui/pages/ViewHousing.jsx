import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Image, Grid, Loader, Icon } from 'semantic-ui-react';
import { Housings } from '/imports/api/housing/housing';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

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

const AnyReactComponent = ({ image }) => <div>
  <Icon name='home'/>
  <img src={image} align="center" style={{width:'25px', height:'25px', align:'center'}}/>
  {console.log(image)}
</div>;

class SimpleMap extends React.Component {
  render() {
    return (
        <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg' }}
            defaultCenter = {{lat: this.props.longitude, lng: this.props.latitude}}
            defaultZoom = {11}
        >
          <AnyReactComponent
              lat={this.props.longitude}
              lng={this.props.latitude}
              image= "/images/halemanoa-icon-transparent.png"
          />
        </GoogleMapReact>
        </div>
    );
  }
}

SimpleMap.propTypes = {
  longitude: PropTypes.number,
  latitude: PropTypes.number,
};

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
