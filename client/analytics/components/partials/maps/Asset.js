import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Label from './../../../../common/components/Label';
import Title from './../../../../common/components/Title';
import { Marker, InfoWindow } from 'react-google-maps';
import { map } from './../../../actions';
import MapHelper from './../../../utils/map/MapHelper';

import _ from 'lodash';

const HEALTH_STATUS_NORMAL = 'normal';
const HEALTH_STATUS_WARNING = 'warning';
const HEALTH_STATUS_ERROR = 'error';

const COLOR_MAP = _.fromPairs([
    [HEALTH_STATUS_NORMAL,  '#19BBB2'],
    [HEALTH_STATUS_WARNING, '#FFAD85'],
    [HEALTH_STATUS_ERROR, '#FFAD85']
]);

class Asset extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hovered: false
        };

        this.config = {
            fillOpacity: .5,
            strokeWeight: 0
        };
    }

    getIcon(selected, hovered) {
        let {smallIcon} = this.props;

        if (COLOR_MAP[this.props.healthStatus]){
            return MapHelper.getIconWithColor(smallIcon, hovered, selected, COLOR_MAP[this.props.healthStatus]);
        }

        return MapHelper.getIconWithColor(smallIcon, hovered, selected, '#B9B9B9');
    }

    onClick(event) {
        this.props.assetClick({lat: event.latLng.lat(), lng: event.latLng.lng()}, this.props.asset.id, !this.props.selected);
    }
    onMouseover(event){
        this.setState({
            hovered: true
        });
        this.props.assetHover(this.props.asset, true);
    }
    onMouseout(event){
        this.setState({
            hovered: false
        });
        this.props.assetHover(this.props.asset, false);
    }
    render() {
        return (
            <Marker
                mapHolderRef={this.props.mapHolderRef}
                position={{lat: this.props.asset.latitude, lng: this.props.asset.longitude}}
                key={this.props.asset.id}
                icon={this.getIcon(this.props.selected, this.state.hovered)}
                onClick={(event) => this.onClick(event)}
                onMouseover={this.onMouseover.bind(this)}
                onMouseout={this.onMouseout.bind(this)}>
            </Marker>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    const loading = (typeof state.data.asset_kpi_stats.response[props.asset.name] === 'undefined') ||
        (typeof state.data.asset_stats_search.response[props.asset.name] === 'undefined') ||
        (typeof state.data.asset_stats_aggregate.response === 'undefined');
    return {
        smallIcon: state.componentSettings.map.smallIcon,
        selected:  (state.selected.assets.indexOf(props.asset.id) !== -1),
        healthStatus: !loading ? state.data.asset_stats_search.response[props.asset.name]['healthStatus'] : HEALTH_STATUS_NORMAL,
    };
};

function mapDispatchToProps (dispatch) {
    return {
        assetClick:     bindActionCreators(map.assetClick, dispatch),
        assetHover:     bindActionCreators(map.assetHover, dispatch)
    };
}

export default connect(stateMap, mapDispatchToProps)(Asset);
