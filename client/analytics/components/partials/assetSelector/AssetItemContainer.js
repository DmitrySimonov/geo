import React from 'react';
import AssetItem from './AssetItem';

class AssetItemContainer extends React.Component {
    render() {
        return (
            <AssetItem 
                asset={this.props.asset}
                id={this.props.id}
                healthStatus={this.props.getHealthStatus}
                selected={this.props.selected}
                assetClick={this.props.assetClick}
                />
        );
    }
}

export default AssetItemContainer;

