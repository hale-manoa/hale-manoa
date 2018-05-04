import React from 'react';
import { Users, UserSchema } from '/imports/api/user/user';
import { Grid, Segment, Header, Image, Container } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import '/imports/ui/pages/HousingPages/listhousingpage.css';

class EditProfile extends React.Component {

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

  submit(data) {
    const idVar = this.props.users.filter(m => (m.owner === this.props.currentUser))[0]._id;
    const { firstName, lastName, type, image, age, area, preferences, description } = data;
    const owner = Meteor.user().username;
    Users.update(idVar, {
      $set: {
        firstName,
        lastName,
        type,
        image,
        age,
        area,
        preferences,
        description,
        owner
      }
    }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {

    const headerStyle = { marginTop: '40px' };
    const gridStyle = { color: '#BBDBB4' };

    return (
        <Grid centered>
            <Grid.Column width={6}>
              <Container className='editprofile-container'>
                <Header as="h2" textAlign="center" style={headerStyle}>My Profile</Header>
                <AutoForm model={this.props.users.filter(m =>
                    (m.owner === this.props.currentUser)
                )[0]} schema={UserSchema} onSubmit={this.submit}>
                  <Grid centered>
                    <Grid.Row>
                      <Grid.Column width={6}>
                        <TextField className="font-field" name='firstName' placeholder="First Name"/>
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <TextField className="font-field" name='lastName' placeholder="Last Name"/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={3}>
                        <NumField className="font-field" name='age' placeholder="Age" decimal={false}/>
                      </Grid.Column>
                      <Grid.Column width={9}>
                        <TextField className="font-field" name='image' placeholder="Image URL"/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={12}>
                        <TextField className="font-field" name='preferences' placeholder="No Smoking, Pets, Etc."/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={12}>
                        <TextField className="font-field" name='description' placeholder="Describe Yourself"/>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={3} className="grid-align-2">
                        <SelectField className="font-field" name='type'/>
                      </Grid.Column>
                      <Grid.Column width={3} className="grid-align">
                        <SelectField className="font-field" name='area'/>
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <SubmitField value='Submit'/>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <ErrorsField/>
                  <HiddenField name='owner'/>
                </AutoForm>
              </Container>
            </Grid.Column>
        </Grid>
    );
  }
}

EditProfile.propTypes = {
  currentUser: PropTypes.string,
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Users');
  return {
    currentUser: Meteor.user() ? Meteor.user().username : '',
    users: Users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(EditProfile);