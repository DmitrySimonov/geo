import React from 'react';

import { chart } from './../../../../actions/';
import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';
import Title from 'konux/common/components/Title';
import CandleStickChart from './../charts/CandleStickChart';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EnvironmentHelper from 'konux/common/utils/EnvironmentHelper/EnvironmentHelper';
import { AxelType } from './../../../../constants';
import ChartHelper from './../../../../utils/ChartHelper';
import { translate } from 'react-i18next';

class DataDistributionChart extends React.Component{
    componentWillUnmount(){
        this.props.clearAxels();
    }
    render(){
        let {selectedXAxel, selectedYAxel, measurments, t} = this.props;
        return(
            <FormWrap className="full-width chart-wrap">
                <Title>
                    <Label className="lbl-4">{t('distribution chart')}</Label>
                </Title>
                <FormWrap className="full-width chart-inner-wrapp">
                    <CandleStickChart dataProvider={ChartHelper.getCandleChartData(selectedXAxel, selectedYAxel, measurments)}/>
                </FormWrap>
            </FormWrap>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    if (EnvironmentHelper.getEnvironment() === 'development'){
        return {
            measurments: state.data.assets_measurments,
            selectedXAxel: state.selected.chart.selectedXAxel? state.selected.chart.selectedXAxel.name : AxelType.AXIS_DATE,
            selectedYAxel: state.selected.chart.selectedYAxel? state.selected.chart.selectedYAxel.name : AxelType.AXIS_WSH
        };
    }
    return {};
};

function mapDispatchToProps(dispatch) {
    return {
        clearAxels: bindActionCreators(chart.clearAxels, dispatch)
    };
};

const ConnectedDataDistributionChart = connect(stateMap, mapDispatchToProps)(DataDistributionChart);

export default translate(['common'])(ConnectedDataDistributionChart);