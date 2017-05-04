import React from 'react';
import {connect} from 'react-redux';

import AssetSelector from './AssetSelector';

class AssetSelectorContainer extends React.Component {
    render() {
        return (
            <AssetSelector
                assets={this.props.assets}
                assetStats={this.props.assetStats}
                selectedAssetId={this.props.selectedAssetId}
                healthStatusSearch={this.props.healthStatusSearch}
                assetClick={this.props.assetClick}
            />
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        assets: state.data.assets.response ? state.data.assets.response : [],
        assetStats: state.data.asset_stats_search.response ? state.data.asset_stats_search.response : [],
        healthStatusSearch: state.data.health_status_search.response ? state.data.health_status_search.response : [],
        selectedAssetId: state.selected.assets.length === 0 ? Object.keys(state.data.assets.response)[Object.keys(state.data.assets.response).length - 1] : state.selected.assets[0]
    };
};

export default connect(stateMap, null)(AssetSelectorContainer);