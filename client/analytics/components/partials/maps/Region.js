import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Polygon } from 'react-google-maps';
import {map, filter} from './../../../actions';

class Region extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hovered: false,
            selected: false
        };

        this.config = {
            strokeColor: '#babfc7',
            fillColor: '#7d899e',
            strokeOpacity: 0.28,
            strokeWeight: 1,
            fillOpacity: 0.1
        };
    }

    getRegionStyle() {
        let style = this.config;
        if (this.props.selected || this.state.hovered) {
            style = Object.assign({}, style, {fillColor: '#000'});
        }
        return style;
    }

    onClick(event) {
        this.props.regionFilterClicked(this.props.region.id, !this.props.selected, {
            selected: this.props.selectedRegions,
            defaults: {
                routes: this.props.routes,
                assets: this.props.assets
            }
        });
    }

    render() {
        return (
            <Polygon
                mapHolderRef={this.props.mapHolderRef}
                paths={this.props.region.coordinates}
                options={this.getRegionStyle()}
                onClick={(event) => this.onClick(event)}
                onMouseover={(event) => {this.setState({hovered: true})}}
                onMouseout={(event) => {this.setState({hovered: false})}}
            />
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selected : (state.selected.regions.indexOf(props.region.id) !== -1),

        selectedRegions: state.selected.regions,
        routes: state.data.route_options.response,
        assets: state.data.assets.response,
    };
};

function mapDispatchToProps (dispatch) {
    return {
        regionFilterClicked: bindActionCreators(filter.regionFilterClicked, dispatch),
        regionClick : bindActionCreators(map.regionClick, dispatch)
    };
}

export default connect(stateMap, mapDispatchToProps)(Region);
