import React from 'react';
import { chart } from './../../../../actions/';

import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';
import Title from 'konux/common/components/Title';
import ScatterPlotChart from './../charts/ScatterPlotChart';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EnvironmentHelper from 'konux/common/utils/EnvironmentHelper/EnvironmentHelper';
import ChartHelper from './../../../../utils/ChartHelper';
import { AxelType } from './../../../../constants';
import { translate } from 'react-i18next';

class CorrelationChart extends React.Component{
    componentWillUnmount(){
        this.props.clearAxels();
    }
    render(){
        const {selectedXAxel, selectedYAxel, measurments, t} = this.props;
        return(
            <FormWrap className="full-width chart-wrap">
                <Title>
                    <Label className="lbl-4">{t('corellation chart')}</Label>
                </Title>
                <FormWrap className="full-width chart-inner-wrapp">
                    <ScatterPlotChart dataProvider={ChartHelper.getChartData(selectedXAxel, selectedYAxel, measurments)}/>
                </FormWrap>
            </FormWrap>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    if (EnvironmentHelper.getEnvironment() === 'development'){
        return {
            measurments: state.data.assets_measurments,
            selectedXAxel: state.selected.chart.selectedXAxel? state.selected.chart.selectedXAxel.name : AxelType.AXIS_WSH,
            selectedYAxel: state.selected.chart.selectedYAxel? state.selected.chart.selectedYAxel.name : AxelType.AXIS_SPEED,
        };
    }
    return {};
};

function mapDispatchToProps(dispatch) {
    return {
        clearAxels: bindActionCreators(chart.clearAxels, dispatch)
    };
};

const ConnectedCorrelationChart = connect(stateMap, mapDispatchToProps)(CorrelationChart);

export default translate(['common'])(ConnectedCorrelationChart);