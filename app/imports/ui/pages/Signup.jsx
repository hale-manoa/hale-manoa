import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Users, UserSchema } from '/imports/api/user/user';


/**
 * Signup component is similar to signin component, but we attempt to create a new user instead.
 */
export default class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', gender: '', userType: '', email: '', password: '', error: '', redirectToReferer: false };
    // Ensure that 'this' is bound to this component in these two functions.
    // https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission using Meteor's account mechanism. */
  handleSubmit() {
    const { firstName, lastName, gender, userType, email, password } = this.state;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        // browserHistory.push('/login');
        const owner = Meteor.user().username;
        Users.insert({  firstName, lastName, userType, image: '/images/default-profile.png', age: 21, area: "Manoa", preferences: ["Update Preferences"], description:"Update Description", owner }, this.insertCallback);
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. */
  render() {
    if (this.state.redirectToReferer) {
      return <Redirect to={"/"}/>;
    }
    const GenderOptions = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
    ];
    const TypeOptions = [
      { key: 'm', text: 'Lister', value: 'lister' },
      { key: 'f', text: 'Seeker', value: 'seeker' },
    ];

    const headerStyle = { marginTop: '20px' };

    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h1" textAlign="center" style={headerStyle}>
                Welcome to Hale Manoa
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Header as="h2" textAlign="center">
                    Register your account
                  </Header>
                  <Form.Group>
                    <Form.Input
                        label="First Name"
                        name="firstName"
                        type="firstName"
                        placeholder="First name"
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        label="Last Name"
                        name="lastName"
                        type="lastName"
                        placeholder="Last name"
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Select
                        fluid
                        label='Gender'
                        options={GenderOptions}
                        placeholder='Gender'
                        onChange={this.handleChange}
                    />
                    <Form.Select
                        fluid
                        label='User Type'
                        options={TypeOptions}
                        placeholder='Type'
                        onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Input
                      label="Email"
                      icon="user"
                      iconPosition="left"
                      name="email"
                      type="email"
                      placeholder="E-mail address"
                      onChange={this.handleChange}
                  />
                  <Form.Input
                      label="Password"
                      icon="lock"
                      iconPosition="left"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.handleChange}
                  />
                  <Form.Button content="Submit"/>
                </Segment>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}
