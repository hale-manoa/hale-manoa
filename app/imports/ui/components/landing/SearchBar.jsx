import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Housings } from '/imports/api/housing/housing';
import { Users } from '/imports/api/user/user';

class SearchBar extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => this.setState({ value: result.propertytype });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');

      const isMatchfirstName = result => re.test(result.firstName);
      const isMatchpropertytype = result => re.test(result.propertytype);
      const isMatchcity = result => re.test(result.city);
      const isMatchlastName = result => re.test(result.lastName);


      this.setState({
        isLoading: false,
        results: _.union(
            _.filter(this.props.users, isMatchlastName),
            _.filter(this.props.users, isMatchfirstName),
            _.filter(this.props.housings, isMatchpropertytype),
            _.filter(this.props.housings, isMatchcity),

            ),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
        <Grid>
          <Grid.Column width={8}>
            <Search
                placeholder="Search..."
                size="huge"
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                {...this.props}
            >

            </Search>
          </Grid.Column>
        </Grid>
    )
  }
}

SearchBar.propTypes = {
  housings: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Housing');
  const subscription1 = Meteor.subscribe('Users');
  return {
    housings: Housings.find({}).fetch(),
    users: Users.find({}).fetch(),
    ready: subscription.ready(),
    ready: subscription1.ready(),
  };
})(SearchBar);