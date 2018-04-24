import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Grid, Dropdown } from 'semantic-ui-react';
import { Users } from '/imports/api/user/user';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import User from '/imports/ui/components/User/User';


const user_type = [
  { text: 'Select User Type' },
  { key: 'Renters', text: 'Renters', value: 'Renter' },
  { key: 'Tenants', text: 'Tenants', value: 'Tenant' },
];

const pref = [
  { text: 'Select Preferences' },
  { key: 'No smoking', text: 'No smoking', value: 'No smoking' },
  { key: 'Parties allowed', text: 'Parties allowed', value: 'Parties allowed' },
];


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewBios extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loading: '',
      selectedType: '',
    };
  }
  handleSubmit(event, data) {
    event.preventDefault();
    this.setState({ loading: 'selected' });
    this.setState({ selectedType: data.value });
    console.log(this.state.selectedType);
  }
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (
        this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          {(this.state.loading === 'selected') ? <Header>{this.state.selectedType}</Header> : null}
          <Header as="h2" textAlign="center"> Find Your Home Away From Home</Header>
          <Grid columns={2}>
            <Grid.Column>
              <Header as="h2">
                Search for:
                <Dropdown
                    multiple selection
                    button
                    options={user_type}
                    placeholder='Select User Type'
                    value={this.state.selectedType}
                    onChange={this.handleSubmit}
                />
              </Header>
            </Grid.Column>
            <Grid.Column>
              <Header as="h2">
                Your Preferences:
                <Dropdown
                    multiple selection
                    button
                    options={pref}
                    placeholder='Select Preferences'
                />
              </Header>
            </Grid.Column>
          </Grid>
          <Card.Group>
            {this.props.users.map((user, index) => <User key ={index}
              user={user}/>)}
          </Card.Group>
        </Container>
    );
  }
}


/** Require an array of Stuff documents in the props. */
ViewBios.propTypes = {
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Users');
  return {
    users: Users.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ViewBios);
