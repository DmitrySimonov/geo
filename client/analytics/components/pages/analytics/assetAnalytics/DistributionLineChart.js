import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import React from 'react';
import { chart } from './../../../../actions/';
import Title from 'konux/common/components/Title';
import Label from 'konux/common/components/Label';
import FormWrap from 'konux/common/components/FormWrap';
import Chart from './../../../../components/partials/Chart';

import ChartHelper from './../../../../utils/ChartHelper';
import EnvironmentHelper from 'konux/common/utils/EnvironmentHelper/EnvironmentHelper';
import { AxelType } from './../../../../constants';
import { translate } from 'react-i18next';

class DistributionChart extends React.Component{
    componentWillUnmount(){
        this.props.clearAxels();
    }
    render(){
        let {selectedXAxel, selectedYAxel, measurments, t} = this.props;
        var config = ChartHelper.generateConfig({
            "dataProvider": ChartHelper.getChartData(selectedXAxel, selectedYAxel, measurments),
            "valueScrollbar": {
                "oppositeAxis": false,
                "offset": 50,
                "scrollbarHeight": 10
            },
            "valueAxes": [
                {
                    "axisAlpha": 0,
                    "position": "left"
                }
            ],
            "graphs": [ChartHelper.generateGraph({                
                "bullet": "none",
                "type": "smoothedLine",
                "lineThickness": 3,
                "lineColor": "#ff8689",
            })],
            "categoryAxis": {
                "parseDates": ChartHelper.getParseDates(ChartHelper.getChartData(this.props.selectedXAxel, AxelType.AXIS_WSH, this.props.measurments))
            },
            "chartScrollbar": ChartHelper.generateScrollBar()
        });
        return(
            <FormWrap className="full-width chart-wrap">
                <Title>
                    <Label className="lbl-4">{t('normal distribution chart')}</Label>
                </Title>
                <FormWrap className="full-width chart-inner-wrapp">
                    <Chart config={config}/>
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

const ConnectedDistributionChart = connect(stateMap, mapDispatchToProps)(DistributionChart);

export default translate(['common'])(ConnectedDistributionChart);