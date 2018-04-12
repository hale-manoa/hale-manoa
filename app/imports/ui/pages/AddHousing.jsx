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
    Housings.insert({ streetaddress, unitnumber, city, state, image, zipcode, propertytype, rentprice, beds, baths, squarefeet, description }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Housing</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={HousingsSchema} onSubmit={this.submit}>
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
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddHousing;
