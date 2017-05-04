import React from 'react';
import { connect } from 'react-redux';

import SingleMarkerInfoContainer from './switсhInfo/SingleMarkerInfoContainer';
import GroupMarkerInfoContainer from './switсhInfo/GroupMarkerInfoContainer';

class SideBarInfoList extends React.Component {
    render() {
        if (this.props.selected.length !== 0){
            if (this.props.selected && this.props.selected.length === 1) {
                return (
                    <SingleMarkerInfoContainer
                        asset={this.props.assets[this.props.selected[0]]} />
                );
            } else {
                return (
                    <GroupMarkerInfoContainer
                        assetIds={this.props.selected} />
                );
            }
        }
        return null;
    };
}

const stateMap = (state, props, ownProps) => {
    return {
        selected:      state.selected.assets,
        assets:        state.data.assets.response,
    };
};

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(stateMap, mapDispatchToProps)(SideBarInfoList);
