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
    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      userType: '',
      email: '',
      password: '',
      error: '',
      redirectToReferer: false
    };
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
        Users.insert({
          firstName,
          lastName,
          userType,
          image: '/images/default-profile.png',
          age: 21,
          area: "Manoa",
          preferences: ["Update Preferences"],
          description: "Update Description",
          owner
        }, this.insertCallback);
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
        <Grid centered>
          <Grid.Column width={6}>
            <Container className="editprofile-container">
              <Header as="h1" textAlign="center" style={headerStyle}>
                Welcome to Hale Manoa
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Header as="h2" textAlign="center">
                  Register your account
                </Header>
                <Grid centered>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <Form.Input
                          label="First Name"
                          name="firstName"
                          type="firstName"
                          placeholder="First name"
                          onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <Form.Input
                          label="Last Name"
                          name="lastName"
                          type="lastName"
                          placeholder="Last name"
                          onChange={this.handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}>
                      <Form.Input
                          label="Email"
                          icon="user"
                          iconPosition="left"
                          name="email"
                          type="email"
                          placeholder="E-mail address"
                          onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <Form.Input
                          label="Password"
                          icon="lock"
                          iconPosition="left"
                          name="password"
                          placeholder="Password"
                          type="password"
                          onChange={this.handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Form.Select
                          fluid
                          label='Gender'
                          options={GenderOptions}
                          placeholder='Gender'
                          onChange={this.handleChange}
                      />
                    </Grid.Column>
                    <Grid.Column width={4} className="signin-spacing">
                      <Form.Select
                          fluid
                          label='User Type'
                          options={TypeOptions}
                          placeholder='Type'
                          onChange={this.handleChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6} className="button-spacing-2">
                      <Form.Button content="Submit"/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={14}>
                      <Message>
                        Already have an account? Login <Link to="/signin">here</Link>
                      </Message>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Container>
          </Grid.Column>
        </Grid>
    );
  }
}
