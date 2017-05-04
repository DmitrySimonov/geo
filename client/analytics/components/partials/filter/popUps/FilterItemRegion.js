import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ToggleButtonList from 'konux/common/components/ToggleButtonList';
import {filter} from './../../../../actions';

class FilterItemRegion extends React.Component {
    onClick(region) {
        const isRegionSelected = this.props.selected.indexOf(region.id) !== -1;

        //-- filter the region ids in order to keep only the unique ones and trigger the action
        this.props.regionFilterClicked(region.id, !isRegionSelected, {
            selected: this.props.selected,
            defaults: {
                routes: this.props.routes,
                assets: this.props.assets
            }
        });
    }

    render() {
        return (
            <ToggleButtonList
                list={Object.values(this.props.regions)}
                selectedList={this.props.selected}
                onApply={this.onClick.bind(this)} />
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selected: state.selected.regions,
        regions: state.filterOptions.regions,
        routes: state.data.routes.response,
        assets: state.data.assets.response,
        regionDetails: state.data.regions.response
    };
};

function mapDispatchToProps(dispatch) {
    return {
        regionClick: bindActionCreators(filter.regionClick, dispatch),
        regionFilterClicked: bindActionCreators(filter.regionFilterClicked, dispatch),
    };
}

export default connect(stateMap, mapDispatchToProps)(FilterItemRegion);