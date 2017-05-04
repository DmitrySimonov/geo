import React from 'react';
import { connect } from 'react-redux';

import Route from './Route';

class Routes extends React.Component {
    render() {
        return (
            <div>
                {Object.keys(this.props.routes).map((key, i) => {
                    let route = this.props.routes[key];
                    return route.placemarks.map((routeSegment, j) => (
                        <Route
                            route={route}
                            mapHolderRef={this.props.mapHolderRef}
                            key={j}
                            routeSegment={routeSegment}/>
                    ));
                })}
            </div>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {routes: state.data.routes.response};
};

export default connect(stateMap, null)(Routes);
