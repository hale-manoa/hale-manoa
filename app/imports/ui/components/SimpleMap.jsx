import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ image }) => <div>
  <Icon name='home' color='green' size='big'/>
</div>;

/**
 * Basic Structure copied from https://www.npmjs.com/package/google-map-react
 * */
class SimpleMap extends React.Component {
  render() {
    return (
        <div style={{ height: '50vh', width: '100%' }}>
          <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyBxxQ6xRUt4VMU4EC5fVxJE5ah5aLa0D7k' }}
              defaultCenter = {{ lat: this.props.latitude, lng: this.props.longitude }}
              defaultZoom = {11}
          >
            <AnyReactComponent
                lat={this.props.latitude}
                lng={this.props.longitude}
                image= "/images/halemanoa-icon-transparent.png"
            />
          </GoogleMapReact>
        </div>
    );
  }
}

SimpleMap.propTypes = {
  longitude: PropTypes.number,
  latitude: PropTypes.number,
};

export default withRouter(SimpleMap);
