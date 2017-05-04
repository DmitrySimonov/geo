import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ListGroupItem } from 'react-bootstrap';

import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';
import { sideBar } from './../../../../actions';
import { PopupTypes } from './../../../../constants';
import { translate } from 'react-i18next';

class AssetList extends React.Component {
    getName() {
        if (this.props.assets.length === 0) return 'No assets found';

        if (this.props.selected.length === 1) {
            return this.props.assets[this.props.selected[0]]['name'];
        } else if(this.props.selected.length > 1){
            return this.props.selected.length + ' from ' + Object.keys(this.props.assets).length + ' assets';
        }

        return  this.props.t('all assets');
    }

    render() {
        let {t} = this.props;
        return (
            <ListGroupItem key="SwitchList" onClick={() => {this.props.showDropdownMenu(PopupTypes.ASSET_LIST);}}>
                <FormWrap>
                    <Label className="lbl-6">{t('asset range')}</Label>
                    <Label className="lbl-18">{this.getName()}</Label>
                </FormWrap>
            </ListGroupItem>
        );
    }
}


const stateMap = (state, props, ownProps) => {
    return {
        selected : state.selected.assets,
        assets: state.filterOptions.assets
    };
};

function mapDispatchToProps(dispatch) {
    return {
        showDropdownMenu: bindActionCreators(sideBar.showDropdownMenu, dispatch),
    };
}

const ConnectedAssetList = connect(stateMap, mapDispatchToProps)(AssetList);

export default translate(['common'])(ConnectedAssetList);