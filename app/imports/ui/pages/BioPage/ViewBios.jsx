import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Grid, Dropdown, Modal, Icon, Button } from 'semantic-ui-react';
import { Users } from '/imports/api/user/user';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import User from '/imports/ui/components/User/User';
import '/imports/ui/pages/BioPage/biopage.css';

const user_type = [
  { key: 'Listers', text: 'Listers', value: 'Lister' },
  { key: 'Seekers', text: 'Seekers', value: 'Seeker' },
];

const age = [
  { key: '20', text: '20', value: '20' },
  { key: '29', text: '29', value: '29' },
];

const area = [
  { key: 'Manoa', text: 'Manoa', value: 'Manoa' },
  { key: 'Kaimuki', text: 'Kaimuki', value: 'Kaimuki' },
];

const pref = [
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
      selectedType: [],
    };
  }
  handleSubmit(event, data) {
    event.preventDefault();
    this.setState({ loading: 'selected' });
    this.setState({ selectedType: data.value });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (
        this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  filterUsersbyType() {
    const type = this.state.selectedType;
    return this.props.users.filter(m => type.length === 0 || (type.indexOf(m.type) !== -1));
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center"> Find Your Home Away From Home</Header>
          <Modal trigger={<Button>Filter Users By</Button>} closeIcon>
            <Header icon='filter' content='Filters' />
            <Modal.Content>
              <Grid columns={4}>
                <Grid.Column>
                  <p>
                    User Type
                    <Dropdown
                        multiple selection
                        button
                        options={user_type}
                        placeholder='Select User Type'
                        value={this.state.selectedType}
                        onChange={this.handleSubmit}
                    />
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <p>
                    Age
                    <Dropdown
                        multiple selection
                        button
                        options={age}
                        placeholder='Select Age'
                    />
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <p>
                    Area
                    <Dropdown
                        multiple selection
                        button
                        options={area}
                        placeholder='Select Area'
                    />
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <p>
                    Preferences
                    <Dropdown
                        multiple selection
                        button
                        options={pref}
                        placeholder='Select Preferences'
                    />
                  </p>
                </Grid.Column>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green'>
                <Icon name='checkmark' /> Apply
              </Button>
            </Modal.Actions>
          </Modal>
          <Card.Group>
            { /** {(this.state.loading === 'selected') ? <Header>{this.state.selectedType}</Header> : null} */ }
            {this.filterUsersbyType().map((user, index) => <User key ={index} user={user}/>)}
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
