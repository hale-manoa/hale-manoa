import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Modal, Button, Icon, Dropdown, Grid } from 'semantic-ui-react';
import { Housings } from '/imports/api/housing/housing';
import HousingItem from '/imports/ui/components/HousingItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import '/imports/ui/pages/HousingPages/listhousingpage.css';

const property_type = [
  { key: 'Condos', text: 'Condos', value: 'CONDO' },
  { key: 'Houses', text: 'Houses', value: 'HOUSE' },
  { key: 'Townhouses', text: 'Townhouses', value: 'TOWNHOUSE' },
];

const list_city = [
  { key: 'Honolulu', text: 'Honolulu', value: 'Honolulu' },
  { key: 'Waipahu', text: 'Waipahu', value: 'Waipahu' },
];

const num_bed = [
  { key: '1', text: '1', value: '1' },
  { key: '2', text: '2', value: '2' },
];

const num_bath = [
  { key: '1', text: '1', value: '1' },
];

const sq_ft = [
  { key: '300', text: '300', value: '300' },
  { key: '500', text: '500', value: '500' },
];

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListHousing extends React.Component {
  constructor() {
    super();
    this.handleTypeSubmit = this.handleTypeSubmit.bind(this);
    this.handleCitySubmit = this.handleCitySubmit.bind(this);
    this.handleBedSubmit = this.handleBedSubmit.bind(this);
    this.handleBathSubmit = this.handleBathSubmit.bind(this);
    this.handleAreaSubmit = this.handleAreaSubmit.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.updateModalStateOpen = this.updateModalStateOpen.bind(this);
    this.updateModalStateClose = this.updateModalStateClose.bind(this);
    this.state = {
      tentativeType: [],
      tentativeCity: [],
      tentativeBed: [],
      tentativeBath: [],
      tentativeArea: [],
      selectedType: [],
      selectedCity: [],
      selectedBed: [],
      selectedBath: [],
      selectedArea: [],
      modalOpen: false,
    };
  }
  handleTypeSubmit(event, data) {
    event.preventDefault();
    this.setState({ tentativeType: data.value });
  }

  handleCitySubmit(event, data) {
    event.preventDefault();
    this.setState({ tentativeCity: data.value });
  }

  handleBedSubmit(event, data) {
    event.preventDefault();
    this.setState({ tentativeBed: data.value });
  }

  handleBathSubmit(event, data) {
    event.preventDefault();
    this.setState({ tentativeBath: data.value });
  }

  handleAreaSubmit(event, data) {
    event.preventDefault();
    this.setState({ tentativeArea: data.value });
  }

  handleApply(event) {
    event.preventDefault();
    this.setState({ selectedType: this.state.tentativeType });
    this.setState({ selectedCity: this.state.tentativeCity });
    this.setState({ selectedBed: this.state.tentativeBed });
    this.setState({ selectedBath: this.state.tentativeBath });
    this.setState({ selectedArea: this.state.tentativeArea });
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
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  filterListingsbyType() {
    const type = this.state.selectedType;
    const city = this.state.selectedCity;
    const bed = this.state.selectedBed;
    const bath = this.state.selectedBath;
    const area = this.state.selectedArea;
    return this.props.housings.filter(m => type.length === 0 || (type.indexOf(m.propertytype) !== -1))
        .filter(m => city.length === 0 || (city.indexOf(m.city) !== -1))
        .filter(m => bed.length === 0 || (bed.indexOf(m.beds.toString()) !== -1))
        .filter(m => bath.length === 0 || (bath.indexOf(m.baths.toString()) !== -1))
        .filter(m => area.length === 0 || (area.indexOf(m.squarefeet.toString()) !== -1));
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container className='pageContainer'>
          <Header as="h2" textAlign="center">Housing</Header>
          <Button className='pageInterfaceButton' as={NavLink} exact to="/add">Got a Listing to Add?</Button>
          <Modal size='large' open={ this.state.modalOpen } onClose={this.updateModalStateClose}
                 trigger={<Button onClick={this.updateModalStateOpen}>Filter Listings By</Button>
                 } closeIcon>
            <Header icon='filter' content='Filters' />
            <Modal.Content>
              <Grid columns={5}>
                <Grid.Column>
                  <p>
                    Property Type
                    <Dropdown
                        multiple selection
                        button
                        options={property_type}
                        placeholder='Select Property Type'
                        value={this.state.tentativeType}
                        onChange={this.handleTypeSubmit}
                    />
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <p>
                    City
                    <Dropdown
                        multiple selection
                        button
                        options={list_city}
                        placeholder='Select City'
                        value={this.state.tentativeCity}
                        onChange={this.handleCitySubmit}
                    />
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <p>
                    Bedrooms
                    <Dropdown
                        multiple selection
                        button
                        options={num_bed}
                        placeholder='Number of Bedrooms'
                        value={this.state.tentativeBed}
                        onChange={this.handleBedSubmit}
                    />
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <p>
                    Bathrooms
                    <Dropdown
                        multiple selection
                        button
                        options={num_bath}
                        placeholder='Number of Bathrooms'
                        value={this.state.tentativeBath}
                        onChange={this.handleBathSubmit}
                    />
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <p>
                    Area
                    <Dropdown
                        multiple selection
                        button
                        options={sq_ft}
                        placeholder='Area (sq. ft.)'
                        value={this.state.tentativeArea}
                        onChange={this.handleAreaSubmit}
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
          <Card.Group centered>
            {this.filterListingsbyType().map((house, index) => <HousingItem key ={index} house={house}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListHousing.propTypes = {
  housings: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Housing');
  return {
    housings: Housings.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListHousing);
