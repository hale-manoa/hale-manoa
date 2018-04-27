import React from 'react';
import { Users, UserSchema } from '/imports/api/user/user';
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
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';



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
    Users.update(idVar, {$set: {firstName, lastName, type, image, age, area, preferences, description, owner }}, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {

    const headerStyle = { marginTop: '40px'};
    const gridStyle = { color: '#BBDBB4'};

    return (
        <Grid centered className="grid-background">
          <Grid.Column>
            <Header as="h2" textAlign="center" style={headerStyle}>My Profile</Header>
            <AutoForm model={this.props.users.filter(m =>
                (m.owner === this.props.currentUser)
            )[0]} schema={UserSchema} onSubmit={this.submit}>
                <Grid centered>
                  <Grid.Row>
                    <Grid.Column width={3} >
                      <TextField className="font-field" name='firstName'/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <TextField className="font-field" name='lastName'/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={3}>
                      <TextField className="font-field" name='image'/>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <NumField className="font-field" name='age' decimal={false}/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <TextField className="font-field" name='preferences'/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <TextField className="font-field" name='description'/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={2}>
                     <SelectField className="font-field" name='type'/>
                    </Grid.Column>
                    <Grid.Column width={2}>
                     <SelectField className="font-field" name='area'/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <SubmitField value='Submit'/>
                  </Grid.Row>
                </Grid>
                  <ErrorsField/>
                  <HiddenField name='owner'/>
            </AutoForm>
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