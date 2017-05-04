import React from 'react';
import { connect } from 'react-redux';

import { Polyline } from 'react-google-maps';
import { map } from './../../../actions';

const initialConfig = {
    strokeColor: '#00ccbe',
    strokeOpacity: 1.0,
    strokeWeight: 1
};

class Route extends React.Component {
    constructor (props) {
        super(props);

        this.state = {hovered: false};
    }

    getStyle () {
        let style = initialConfig;
        if (this.props.selected) {
            style = Object.assign({}, style, {strokeColor: '#000'});
        }

        return style;
    }

    render () {
        return (
            <Polyline
                mapHolderRef={this.props.mapHolderRef}
                path={this.props.routeSegment}
                geodesic={true}
                key={this.props.key}
                options={this.getStyle()} />
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selected : (state.selected.routes.indexOf(props.route.id) !== -1),
    };
};

export default connect(stateMap)(Route);
