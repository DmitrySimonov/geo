import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InfoBox from './InfoBox';

import { GoogleMapLoader, GoogleMap } from 'react-google-maps';

import Assets from './Assets';
import Routes from './Routes';
import Regions from './Regions';
import * as style from './styles';
import * as map from './../../../actions/map';

//After removing google api from MapHelper
//google-map api loader should be in this class
//to prevent dependence with it for other Components
//import export default scriptLoader
//scriptLoader('https://maps.googleapis.com/maps/api/js?key=AIzaSyBnkZGjyuESiZ6_WdjRU3locmTgm5IeVDM')(connect(null, mapDispatchToProps)(Map));

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            smallAssetIcon: true,
            mapLoaded: true
        };
    }

    onZoomChanged() {
        this.props.changeIcon(7 > this._mapComponent.getZoom());
    }

    onMapLoad(map) {
        this._mapComponent = map;
    }

    render() {
        return (
            <GoogleMapLoader
                containerElement={<div style={{height: '100%'}}/>}
                googleMapElement={
                    <GoogleMap
                        ref={this.onMapLoad.bind(this)}
                        options={{
                            styles: style.map,
                            streetViewControl: false,
                            mapTypeControlOptions: {
                                mapTypeIds: 'roadmap'
                            }
                        }}
                        zoom={this.props.zoom}
                        onZoomChanged={this.onZoomChanged.bind(this)}
                        center={{
                            lat: this.props.center.lat,
                            lng: this.props.center.lng
                        }}>

                        <Regions />
                        <Routes />
                        <Assets />
                        <InfoBox />
                    </GoogleMap>
                }
            />
        );
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators(map, dispatch);
}

export default connect(null, mapDispatchToProps)(Map);
