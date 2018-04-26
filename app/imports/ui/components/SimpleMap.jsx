import React from 'react';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ image }) => <div>
  <Icon name='home' color='green' size='big'/>
</div>;

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SimpleMap extends React.Component {
  render() {
    return (
        <div style={{ height: '50vh', width: '100%' }}>
          <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg' }}
              defaultCenter = {{ lat: this.props.longitude, lng: this.props.latitude }}
              defaultZoom = {11}
          >
            <AnyReactComponent
                lat={this.props.longitude}
                lng={this.props.latitude}
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
