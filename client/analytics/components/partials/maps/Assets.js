import React from 'react';
import { connect } from 'react-redux';

import Asset from './Asset';

class Assets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            smallAssetIcon: true,
        };
    }

    render() {
        return (
            <div>
                {Object.keys(this.props.assets).map((key, i) => (
                    <Asset
                        mapHolderRef={this.props.mapHolderRef}
                        key={i}
                        asset={this.props.assets[key]}
                        healthStatus={(this.props.assets_stats_search[this.props.assets[key].id] ? this.props.stats[this.props.assets_stats_search[key].id].healthStatus : null)}
                        smallIcon={this.state.smallAssetIcon}
                    />
                ))}
            </div>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        assets: state.data.assets.response,
        assets_stats_search: state.data.asset_stats_search.response,
    };
};

export default connect(stateMap, null)(Assets);
