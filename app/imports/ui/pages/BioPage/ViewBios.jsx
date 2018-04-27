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

const user_age = [
  { key: '20', text: '20', value: '20' },
  { key: '29', text: '29', value: '29' },
];

const user_area = [
  { key: 'Manoa', text: 'Manoa', value: 'Manoa' },
  { key: 'Kaimuki', text: 'Kaimuki', value: 'Kaimuki' },
];

const user_pref = [
  { key: 'No smoking', text: 'No smoking', value: 'No smoking' },
  { key: 'No drinking', text: 'No drinking', value: 'No drinking' },
  { key: 'Parties allowed', text: 'Parties allowed', value: 'Parties allowed on the weekends' },
  { key: 'Lights out at 10pm', text: 'Lights out at 10pm', value: 'Sleep at 10pm' },
];


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewBios extends React.Component {
  constructor() {
    super();
    this.handleTypeSubmit = this.handleTypeSubmit.bind(this);
    this.handleAgeSubmit = this.handleAgeSubmit.bind(this);
    this.handleAreaSubmit = this.handleAreaSubmit.bind(this);
    this.handlePrefSubmit = this.handlePrefSubmit.bind(this);
    this.iteratePref = this.iteratePref.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.updateModalStateOpen = this.updateModalStateOpen.bind(this);
    this.updateModalStateClose = this.updateModalStateClose.bind(this);
    this.state = {
      loading: '',
      tentativeType: [],
      tentativeAge: [],
      tentativeArea: [],
      tentativePref: [],
      selectedType: [],
      selectedAge: [],
      selectedArea: [],
      selectedPref: [],
      modalOpen: false,
    };
  }
  handleTypeSubmit(event, data) {
    event.preventDefault();
    this.setState({ tentativeType: data.value });
  }

  handleAgeSubmit(event, data) {
    event.preventDefault();
    this.setState({ tentativeAge: data.value });
  }

  handleAreaSubmit(event, data) {
    event.preventDefault();
    this.setState({ tentativeArea: data.value });
  }

  handlePrefSubmit(event, data) {
    event.preventDefault();
    this.setState({ tentativePref: data.value });
  }

  handleApply(event) {
    event.preventDefault();
    this.setState({ loading: 'selected' });
    this.setState({ selectedType: this.state.tentativeType });
    this.setState({ selectedAge: this.state.tentativeAge });
    this.setState({ selectedArea: this.state.tentativeArea });
    this.setState({ selectedPref: this.state.tentativePref });
    this.setState({ modalOpen: false });
  }

  updateModalStateOpen(event) {
    event.preventDefault();
    this.setState({ modalOpen: true });
  }

  updateModalStateClose(event) {
    event.preventDefault();
    this.setState({ modalOpen: false });
  }

  iteratePref() {
    const preferences = this.state.selectedPref;
    let filtered = this.props.users;
    const arr = [];
    for (let i = 0; i < preferences.length; i++) {
      if (i === 0) {
        filtered = this.props.users.filter(m => preferences.length === 0 ||
            m.preferences.indexOf(preferences[i]) !== -1);
        arr.push(filtered);
      } else {
        filtered = arr[arr.length - 1].filter(m => preferences.length === 0 ||
            m.preferences.indexOf(preferences[i]) !== -1);
        arr.push(filtered);
      }
    }

    if (arr.length > 0) {
      filtered = arr[arr.length - 1];
      console.log(arr[arr.length - 1]);
    } else {
      filtered = this.props.users;
    }
    return filtered;
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (
        this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  filterUsersbyType() {
    const type = this.state.selectedType;
    const age = this.state.selectedAge;
    const area = this.state.selectedArea;
    /** console.log(preferences);
    console.log(this.props.users.preferences);
    console.log(preferences.indexOf(this.props.users.preferences));
    console.log(this.props.users[0].preferences);
    console.log(this.props.users[0].preferences.includes(preferences[0])); */
    /** this.iteratePref(); */
    return this.iteratePref();
    /** return this.props.users.filter(m => type.length === 0 || (type.indexOf(m.type) !== -1))
        .filter(m => age.length === 0 || (age.indexOf(m.age) !== -1))
        .filter(m => area.length === 0 || (area.indexOf(m.area) !== -1)); */
        /** .filter(m => preferences.length === 0 || m.preferences.indexOf(preferences[0]) !== -1); */
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center"> Find Your Home Away From Home</Header>
          <Modal open={ this.state.modalOpen } onClose={this.updateModalStateClose}
            trigger={<Button onClick={this.updateModalStateOpen}>Filter Users By</Button>
          } closeIcon>
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
                        value={this.state.tentativeType}
                        onChange={this.handleTypeSubmit}
                    />
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <p>
                    Age
                    <Dropdown
                        multiple selection
                        button
                        options={user_age}
                        placeholder='Select Age'
                        value={this.state.tentativeAge}
                        onChange={this.handleAgeSubmit}
                    />
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <p>
                    Area
                    <Dropdown
                        multiple selection
                        button
                        options={user_area}
                        placeholder='Select Area'
                        value={this.state.tentativeArea}
                        onChange={this.handleAreaSubmit}
                    />
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <p>
                    Preferences
                    <Dropdown
                        multiple selection
                        button
                        options={user_pref}
                        placeholder='Select Preferences'
                        value={this.state.tentativePref}
                        onChange={this.handlePrefSubmit}
                    />
                  </p>
                </Grid.Column>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={this.handleApply}>
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
