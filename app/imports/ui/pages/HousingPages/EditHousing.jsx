import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
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

/** Renders the Page for editing a single document. */
class EditHousing extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { streetaddress, unitnumber, city, state, image, zipcode, propertytype, rentprice, beds, baths, squarefeet, description, _id } = data;
    Housings.update(_id, { $set: { streetaddress, unitnumber, city, state, image, zipcode, propertytype, rentprice, beds, baths, squarefeet, description } }, (error) => (error ?
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
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Housing</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={HousingsSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <TextField name='streetaddress'/>
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
              </Segment>
            </AutoForm>
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
