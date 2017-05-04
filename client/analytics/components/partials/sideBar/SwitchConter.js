import React from 'react';
import { connect } from 'react-redux';
import Label from 'konux/common/components/Label';
import BlockWrapper from 'konux/common/components/BlockWrapper';
import _ from 'lodash';

class SwitchConter extends React.Component {
    getSwitchCount(){
        return Object.keys(this.props.assets).length;
    }
    render(){
        return (
            <BlockWrapper>
                <Label className="lbl-3">{this.props.selected.length || 0}</Label>,
                <Label className="lbl-7">/ {this.getSwitchCount()}</Label>
            </BlockWrapper>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selected: state.selected.assets,
        assets: state.data.assets.response
    };
};


export default connect(stateMap, null)(SwitchConter);