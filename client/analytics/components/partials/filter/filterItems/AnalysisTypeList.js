import React from 'react';
import { bindActionCreators } from 'redux';
import {ListGroupItem} from 'react-bootstrap';
import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';
import * as MenuType from './../../../../constants/popupType';
import { ChartType } from './../../../../constants';
import { sideBar } from './../../../../actions';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

class AnalysisTypeList extends React.Component {
    render() {
        let {t} = this.props;
        return <ListGroupItem key="AnalysisTypeList" onClick={() => {this.props.showDropdownMenu(MenuType.TYPE_LIST);}}>
                    <FormWrap>
                        <Label className="lbl-6">{t('analysis type')}</Label>
                        <Label className="lbl-18">{this.props.selectedTypeName}</Label>
                    </FormWrap>
                </ListGroupItem>; 
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selectedTypeName: state.selected.chart.type &&  state.selected.chart.type.name? state.selected.chart.type.name : ChartType.SHOW_ASSET_PREDICTION_CHART,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        showDropdownMenu:bindActionCreators(sideBar.showDropdownMenu, dispatch),
    };
};

const ConnectedAnalysisTypeList = connect(stateMap, mapDispatchToProps)(AnalysisTypeList);

export default translate(['common'])(ConnectedAnalysisTypeList);