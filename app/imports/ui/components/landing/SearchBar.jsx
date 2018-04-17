import _ from 'lodash'
import faker from 'faker'
import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Housings } from '/imports/api/housing/housing';

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
      const isMatch = result => re.test(result.propertytype);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.housings, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
        <Grid>
          <Grid.Column width={8}>
            <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                results={results}
                value={value}
                {...this.props}
            />
          </Grid.Column>
        </Grid>
    )
  }
}

SearchBar.propTypes = {
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
})(SearchBar);