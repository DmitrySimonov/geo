import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {filter} from './../../../../actions';
import ToggleButtonList from 'konux/common/components/ToggleButtonList';

class RouteList extends React.Component {
    onClick(route) {
        const isRouteSelected = this.props.selected.indexOf(route.id) !== -1;

        this.props.routeClick(route.id, this.props.routes.placemarks, !isRouteSelected);

        const _stateSelected = this.props.selected.slice(0);

        //-- check if we have the route selected or not
        if (!isRouteSelected) {
            _stateSelected.push(parseInt(route.id));
        } else {
            _stateSelected.splice(_stateSelected.indexOf(parseInt(route.id)), 1);
        }

        this.props.routeFilterClicked([...new Set(_stateSelected)], this.props.assets);
    }

    render() {
        return (
            <ToggleButtonList
                list={Object.values(this.props.routes)}
                selectedList={this.props.selected}
                onApply={this.onClick.bind(this)} />
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selected: state.selected.routes,
        routes: state.filterOptions.routes,
        assets: state.data.assets.response
    };
};

function mapDispatchToProps(dispatch) {
    return {
        routeClick: bindActionCreators(filter.routeClick, dispatch),
        routeFilterClicked: bindActionCreators(filter.routeFilterClicked, dispatch)
    };
}

export default connect(stateMap, mapDispatchToProps)(RouteList);