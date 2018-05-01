import React from 'react';
import { Messages, MessageSchema } from '/imports/api/message/message';
import { Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';
import { Users } from '/imports/api/user/user';


/** Renders the Page for adding a document. */
class AddMessage extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.render = this.render.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (!error) {
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { message, groupId, createdAt, username, image } = data;
    const members = this.props.members;
    Messages.insert({ username, image, message, members, groupId, createdAt }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {

    const name = Users.findOne({ owner: Meteor.user().username}).firstName + ' ' + Users.findOne({ owner: Meteor.user().username}).lastName;
    const image = Users.findOne({ owner: Meteor.user().username}).image;

    return (
        <AutoForm label="" ref={(ref) => { this.formRef = ref; }} schema={MessageSchema} onSubmit={this.submit}>
          <Segment>
            <TextField name='message'/>
            <SubmitField value='Send'/>
            <ErrorsField/>
            <HiddenField name='groupId' value={this.props.groupId}/>
            <HiddenField name='members' value=''/>
            <HiddenField name='createdAt' value={new Date()}/>
            <HiddenField name='username' value={name}/>
            <HiddenField name='image' value={image}/>
          </Segment>
        </AutoForm>
    );
  }
}

AddMessage.propTypes = {
  groupId: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
};

export default AddMessage;
