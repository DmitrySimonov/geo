import React from 'react';
import {connect} from 'react-redux';

import AssetList from './AssetList';

class AssetListContainer extends React.Component {
    render() {
        return (
            <AssetList
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
        assets: props.assets,
        selectedAssetId: props.selectedAssetId,
        healthStatusSearch: props.healthStatusSearch,
        assetStats: props.assetStats
    };
};

export default connect(stateMap, null)(AssetListContainer);