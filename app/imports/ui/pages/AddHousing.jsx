import React from 'react';
import { Housings, HousingsSchema } from '/imports/api/housing/housing';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';


/** Renders the Page for adding a document. */
class AddHousing extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { streetaddress, unitnumber, city, state, image, zipcode, propertytype, rentprice, beds, baths, squarefeet, description } = data;
    const owner = Meteor.user().username;
    Housings.insert({ unitnumber, city, state, image, zipcode, propertytype, rentprice, beds, baths, squarefeet, description, owner, streetaddress, longitude, latitude }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Housing</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={HousingsSchema} onSubmit={this.submit}>
              <Segment>
                <p style={{
                  display: 'block',
                  margin: '0em 0em 0.28571429rem 0em',
                  color: 'rgba(0, 0, 0, 0.87)',
                  fontSize: '0.92857143em',
                  fontWeight: 'bold',
                  textTransform: 'none',
                }} >StreetAddress</p>
                <SearchBox />
                <TextField name='unitnumber'/>
                <TextField name='city'/>
                <TextField name='state'/>
                <TextField name='image'/>
                <NumField name='zipcode' decimal={false}/>
                <SelectField name='propertytype'/>
                <NumField name='rentprice' decimal={false}/>
                <NumField name='beds' decimal={false}/>
                <NumField name='baths' decimal={false}/>
                <NumField name='squarefeet' decimal={false}/>
                <TextField name='description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value ='fakeyser@foo.com'/>
                <HiddenField name='streetaddress'/>
                <HiddenField name='longitude'/>
                <HiddenField name='latitude'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

const SearchBox = compose(
    withProps({
      googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places',
      loadingElement: <div style={{ height: '100%' }} />,
      containerElement: <div style={{ height: '400px' }} />,
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
              {formatted_address}
              {' at '}
              ({location.lat()}, {location.lng()})
            </ol>)}
      </ol>
    </div>);

export default AddHousing;