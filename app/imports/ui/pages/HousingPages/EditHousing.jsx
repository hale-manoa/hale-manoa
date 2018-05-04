import React from 'react';
import { Grid, Loader, Header, Segment, Container } from 'semantic-ui-react';
import { Housings, HousingsSchema } from '/imports/api/housing/housing';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import LongTextField from 'uniforms-semantic/LongTextField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import '/imports/ui/pages/HousingPages/listhousingpage.css';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';

let adrs = 'please';
const loc = { lat: 0, lng: 0 };
let parsed = [];
let zipcode = [];

const SearchBox = compose(
    withProps({
      googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBxxQ6xRUt4VMU4EC5fVxJE5ah5aLa0D7k&v=3.exp&libraries=geometry,drawing,places',
      loadingElement: <div style={{ height: '100%' }}/>,
      containerElement: <div style={{ height: '400px' }}/>,
    }),

    lifecycle({
      componentWillMount() {
        const refs = {};
        this.setState({
          places: [],
          onSearchBoxMounted: ref => {
            refs.searchBox = ref;
          },
          onPlacesChanged: () => {
            const places = refs.searchBox.getPlaces();
            this.setState({
              places,
            });
          },
        });
      },
    }),
    withScriptjs,
)(props =>
    <div data-standalone-searchbox="">
      <StandaloneSearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          onPlacesChanged={props.onPlacesChanged}
      >
        <input
            type="text"
            placeholder=" "
            style={{
              boxSizing: 'border-box',
              height: '38px',
              padding: '0 12px',
              borderRadius: '3px',
              fontSize: '14px',
              outline: 'none',
              textOverflow: 'ellipses',
            }}
        />
      </StandaloneSearchBox>
      <ol>
        {props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
            <ol key={place_id}>
              {adrs = formatted_address}
              {' at '}
              ({loc.lat = location.lat()}, {loc.lng = location.lng()})
              {props.onChange(adrs)}
            </ol>)}
      </ol>
    </div>);

/** Renders the Page for editing a single document. */
class EditHousing extends React.Component {
  constructor(props) {
    super(props);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.formRef = null;
    this.state = {
      address: 'State Test',
      lat: 0,
      lng: 0,
    };
  }

  onAddressChange(address) {
    this.setState({ address: address, lat: loc.lat, lng: loc.lng });
    console.log('Changed State');
    parsed = address.split(', ');
    zipcode = parsed[2].split(' ');
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { streetaddress, unitnumber, city, state, image, zipcode, propertytype, rentprice, beds, baths, squarefeet, description, longitude, latitude, _id } = data;
    Housings.update(_id, {
      $set: {
        unitnumber,
        city,
        state,
        image,
        zipcode,
        propertytype,
        rentprice,
        beds,
        baths,
        squarefeet,
        description,
        streetaddress,
        longitude,
        latitude,
      }
    }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid centered>
          <Grid.Column width={8}>
            <Container className="pageContainer">
              <Header as="h2" textAlign="center">Edit Listing</Header>
              <AutoForm ref={(ref) => {
                this.formRef = ref;
              }} schema={HousingsSchema} onSubmit={this.submit} model={this.props.doc}>
                <Grid centered>
                  <Grid.Row>
                    <Grid.Column width={11}>
                      <p style={{
                        display: 'block',
                        margin: '0em 0em 0.28571429rem 0em',
                        color: 'rgba(0, 0, 0, 0.87)',
                        fontSize: '0.92857143em',
                        fontWeight: 'bold',
                        textTransform: 'none',
                      }}>Address</p>
                      <SearchBox onChange={this.onAddressChange}/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <TextField name='unitnumber'/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <SelectField name='propertytype'/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <TextField name='image'/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <NumField name='rentprice' decimal={false}/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <NumField name='beds' decimal={false}/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <NumField name='baths' decimal={false}/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <NumField name='squarefeet' decimal={false}/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={14} className="desc-box-height">
                      <LongTextField name='description'/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6} className="button-spacing-2">
                      <SubmitField value='Submit'/>
                    </Grid.Column>
                  </Grid.Row>
                  <ErrorsField/>
                  <HiddenField name='owner' value='fakeyser@foo.com'/>
                  <HiddenField name='streetaddress' value={parsed[0]}/>
                  <HiddenField name='longitude' decimal={true} value={loc.lng}/>
                  <HiddenField name='latitude' decimal={true} value={loc.lat}/>
                  <HiddenField name='city' value={parsed[1]}/>
                  <HiddenField name='state' value={zipcode[0]}/>
                  <HiddenField name='zipcode' decimal={false} value={zipcode[1]}/>

                </Grid>
              </AutoForm>
            </Container>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditHousing.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Housing');
  return {
    doc: Housings.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditHousing);
