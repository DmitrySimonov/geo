import React from 'react';
import {ListGroupItem} from 'react-bootstrap';
import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';
import * as MenuType from './../../../../constants/popupType';
import { connect } from 'react-redux';
import { sideBar } from './../../../../actions';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';

class AxelY extends React.Component {
    render(){
        let {t} = this.props;
        return <ListGroupItem key="AxelY" onClick={() => {this.props.showDropdownMenu(MenuType.Y_AXEL_LIST);}}>
                    <FormWrap>
                        <Label className="lbl-6">{t('axis y')}</Label>
                        <Label className="lbl-18">{this.props.selectedYAxel}</Label>
                    </FormWrap>
                </ListGroupItem>;
    }
} 

const stateMap = (state, props, ownProps) => {
    return {
        selectedYAxel: state.selected.chart.selectedYAxel ? state.selected.chart.selectedYAxel.name : null
    };
};

function mapDispatchToProps(dispatch) {
    return {
        showDropdownMenu: bindActionCreators(sideBar.showDropdownMenu, dispatch),
    };
};

const ConnectedAxelY = connect(stateMap, mapDispatchToProps)(AxelY);

export default translate(['common'])(ConnectedAxelY);