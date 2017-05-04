import React from 'react';
import { bindActionCreators } from 'redux';
import {ListGroupItem} from 'react-bootstrap';
import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';
import * as MenuType from './../../../../constants/popupType';
import { sideBar } from './../../../../actions';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

class AxelX extends React.Component {
    render(){
        let {t} = this.props;
        return <ListGroupItem key="AxelX" onClick={() => {this.props.showDropdownMenu(MenuType.X_AXEL_LIST);}}>
                    <FormWrap>
                        <Label className="lbl-6">{t('axis x')}</Label>
                        <Label className="lbl-18">{this.props.selectedXAxel}</Label>
                    </FormWrap>
                </ListGroupItem>;
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selectedXAxel: state.selected.chart.selectedXAxel ? state.selected.chart.selectedXAxel.name : null
    };
};

function mapDispatchToProps(dispatch) {
    return {
        showDropdownMenu: bindActionCreators(sideBar.showDropdownMenu, dispatch),
    };
};

const ConnectedAxelX = connect(stateMap, mapDispatchToProps)(AxelX);

export default translate(['common'])(ConnectedAxelX);