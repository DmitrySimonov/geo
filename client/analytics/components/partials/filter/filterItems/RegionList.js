import React from 'react';
import { connect } from 'react-redux';

import { sideBar } from './../../../../actions';
import { bindActionCreators } from 'redux';
import * as MenuType from './../../../../constants/popupType';

import { ListGroupItem } from 'react-bootstrap';

import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';
import { translate } from 'react-i18next';

import _ from 'lodash';

class RegionList extends React.Component {
    getName() {
        if (this.props.regions.length === 0) return 'No regions found';

        if (this.props.selected.length === 1) {
            return this.props.regions[this.props.selected[0]]['name'];
        } else if(this.props.selected.length > 1) {
            return this.props.selected.length + ' from ' + Object.keys(this.props.regions).length + ' regions';
        }
        
        return this.props.t('all regions');
    }

    render() {
        let {t} = this.props;
        return (
            <ListGroupItem
                key="ListGroupItem"
                onClick={() => {this.props.showDropdownMenu(MenuType.REGION_LIST);}}>
                <FormWrap>
                    <Label className="lbl-6">{t('region')}</Label>
                    <Label className="lbl-18">{this.getName()}</Label>
                </FormWrap>
            </ListGroupItem>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selected: state.selected.regions,
        regions: state.filterOptions.regions,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        showDropdownMenu:bindActionCreators(sideBar.showDropdownMenu, dispatch)
    };
}

const ConnectedRegionList = connect(stateMap, mapDispatchToProps)(RegionList);

export default translate(['common'])(ConnectedRegionList);
