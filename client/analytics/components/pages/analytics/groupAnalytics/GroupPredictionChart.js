import React from 'react';
import AmCharts from 'amcharts3-react';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { chart } from './../../../../actions/';

import {ListGroup, ListGroupItem} from 'react-bootstrap';
import Title from 'konux/common/components/Title';
import Label from 'konux/common/components/Label';
import FormWrap from 'konux/common/components/FormWrap';
import ScatterPlotChart from './../charts/ScatterPlotChart';
import EnvironmentHelper from 'konux/common/utils/EnvironmentHelper/EnvironmentHelper';
import ChartHelper from './../../../../utils/ChartHelper';
import { AxelType } from './../../../../constants';
import { translate } from 'react-i18next';

class GroupPredictionChart extends React.Component{
    componentWillUnmount(){
        this.props.clearAxels();
    }
    render(){
        const {selectedXAxel, selectedYAxel, measurments, t} = this.props;
        return(
            <FormWrap className="full-width chart-wrap">
                <Title>
                    <Label className="lbl-4">{t('prediction chart')}</Label>
                </Title>
                <ScatterPlotChart dataProvider={ChartHelper.getGroupCorrelationData(selectedXAxel, selectedYAxel, measurments)}/>
            </FormWrap>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    if (EnvironmentHelper.getEnvironment() === 'development'){
        return {
            measurments: state.data.assets_measurments,
            selectedXAxel: state.selected.chart.selectedXAxel? state.selected.chart.selectedXAxel.name : AxelType.AXIS_WSH,
            selectedYAxel: state.selected.chart.selectedYAxel? state.selected.chart.selectedYAxel.name : AxelType.AXIS_VIBRATION,
        };
    }
    return {};
};

function mapDispatchToProps(dispatch) {
    return {
        clearAxels: bindActionCreators(chart.clearAxels, dispatch)
    };
};

const ConnectedGroupPredictionChart = connect(stateMap, mapDispatchToProps)(GroupPredictionChart);

export default translate(['common'])(ConnectedGroupPredictionChart);