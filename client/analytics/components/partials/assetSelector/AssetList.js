import React from 'react';
import { connect } from 'react-redux';

import AssetItemContainer from './AssetItemContainer';
import HealthStatusHelper from './../../../utils/HealthStatusHelper';

class AssetList extends React.Component {
    getHealthStatus(assetName) {
        //-- check if we have a health status for the current asset
        const healthStatus = (this.props.assetStats && Object.keys(this.props.assetStats).indexOf(assetName) !== -1) ? this.props.assetStats[assetName]['healthStatus'] : null;

        //-- return the health status
        return HealthStatusHelper.getHealthStatus(healthStatus, this.props.healthStatusSearch).toLowerCase();
    }

    render() {
        return (
            <div className="switch-list">
                {
                    this.props.assets ? Object.values(this.props.assets).map((item, i) => (
                        <AssetItemContainer
                            asset={item}
                            key={i}
                            id={i}
                            healthStatus={this.getHealthStatus(item.name)}
                            selected={parseInt(this.props.selectedAssetId) === parseInt(item.id)}
                            assetClick={this.props.assetClick}
                        />
                    )) : null
                }
            </div>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    console.log(state);
    return {
        // assets: state.data.assets.response,
    };
};

export default connect(stateMap, null)(AssetList);