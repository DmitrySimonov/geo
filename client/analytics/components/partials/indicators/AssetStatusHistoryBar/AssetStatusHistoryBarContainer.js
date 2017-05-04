import React from 'react';
import {connect} from 'react-redux';


import AssetStatusHistoryBar from './AssetStatusHistoryBar';

class AssetStatusHistoryBarContainer extends React.Component {
    render() {
        return (
            <AssetStatusHistoryBar
                data={this.props.assetKpiStats}
                healthStatuses={this.props.healthStatuses}/>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        healthStatuses: state.data.health_status_search.response ? state.data.health_status_search.response : [],
    };
};

export default connect(stateMap, null)(AssetStatusHistoryBarContainer);