import React from 'react';
import { Grid, Loader, Header, Container } from 'semantic-ui-react';
import { Housings, HousingsSchema } from '/imports/api/housing/housing';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import '/imports/ui/pages/HousingPages/listhousingpage.css';

/** Renders the Page for editing a single document. */
class EditHousing extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { streetaddress, unitnumber, city, state, image, zipcode, propertytype, rentprice, beds, baths, squarefeet, description, _id } = data;
    Housings.update(_id, {
      $set: {
        streetaddress,
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
        description
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
          <Grid.Column width={6}>
            <Container className="pageContainer">
              <Header as="h2" textAlign="center">Edit Housing</Header>
              <AutoForm ref={(ref) => {
                this.formRef = ref;
              }} schema={HousingsSchema} onSubmit={this.submit} model={this.props.doc}>
                <Grid centered>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <TextField name='streetaddress'/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <TextField name='unitnumber'/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <TextField name='city'/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <TextField name='state'/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <NumField name='zipcode' decimal={false}/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={5}>
                      <SelectField name='propertytype'/>
                    </Grid.Column>
                    <Grid.Column width={9}>
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
                    <Grid.Column width={14}>
                      <TextField name='description'/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6} className="button-spacing-2">
                      <SubmitField value='Submit'/>
                    </Grid.Column>
                  </Grid.Row>
                  <ErrorsField/>
                  <HiddenField name='owner' value='fakeyser@foo.com'/>
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
