import React from 'react';
import {connect} from 'react-redux';
import ToggleButtonList from 'konux/common/components/ToggleButtonList';
import {bindActionCreators} from 'redux';
import {filter} from './../../../../actions';

class AssetList extends React.Component {
    onClick(asset) {
        const isAssetSelected = this.props.selected.indexOf(asset.id) !== -1;
        this.props.assetClick(asset.id, {lat:asset.latitude, lng:asset.longitude}, !isAssetSelected);
    }
    render(){
        return <ToggleButtonList list={Object.values(this.props.assets)}
                                    selectedList={this.props.selected} 
                                    onApply={this.onClick.bind(this)}/>;
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selected: state.selected.assets,
        assets: state.filterOptions.assets
    };
};

function mapDispatchToProps(dispatch) {
    return {
        assetClick: bindActionCreators(filter.assetClick, dispatch)
    };
}


export default connect(stateMap, mapDispatchToProps)(AssetList);