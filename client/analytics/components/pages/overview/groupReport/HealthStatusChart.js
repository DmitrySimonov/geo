import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {analytics} from './../../../../actions';

import {Row, Col} from 'react-bootstrap';
import FormWrap from 'konux/common/components/FormWrap';
import Title from 'konux/common/components/Title';
import Label from 'konux/common/components/Label';
import Chart from './../../../../components/partials/Chart';
import ChartHelper from './../../../../utils/ChartHelper';
import moment from 'moment';
import EnvironmentHelper from 'konux/common/utils/EnvironmentHelper/EnvironmentHelper';
import { translate } from 'react-i18next';

class HealthStatusChart extends React.Component{
    constructor(props) {
        super(props);
    }
    getDataProvider(sensorStats, selectedSwitches){
        // if (data && data.length > 0)
        // {
        //     for (let i = 0; i < data.length; i++) {
        //         result.push({
        //             xValue: moment.unix(data[i]['timestamp']).format(),
        //             good: data[i]['healthStatus']['good'],
        //             warning: data[i]['healthStatus']['warning'],
        //             error: data[i]['healthStatus']['error'],
        //         });
        //     }
        // }
        let result = this.props.dataProvider;
        return result;
    }
    defaultZoom(event){
        var chart = event.chart;
        if(chart.dataProvider){
            var indexes = ChartHelper.getViewIndexes(chart, this.props.date);
            chart.zoomToIndexes(indexes.startIndex, indexes.endIndex);
        }
    }
    render(){
        let {t} = this.props;
        var config = ChartHelper.generateConfig(
                            {
                                "type": "serial",
                                "dataProvider": this.getDataProvider(this.props.sensorStats, this.props.selectedSwitches),
                                "graphs": ChartHelper.generateGraphs([
                                    {title:"good", type:"column", valueField:"good", fillAlphas: 1},
                                    {id:"g2", title:"warning", type:"column", valueField:"warning", fillAlphas: 1},
                                    {id:"g3", title:"error", type:"column", valueField:"error", fillAlphas: 1}
                                ]),
                                "chartScrollbar": ChartHelper.generateScrollBar(),
                                "valueAxes": [{
                                    "stackType": "regular"
                                }],
                                "listeners": [
                                    {
                                        "event": "rendered",
                                        "method": this.defaultZoom.bind(this)
                                    }
                                ],
                                "categoryAxis": {
                                    "parseDates": true
                                }
                            }
                    );
        return (
            <div className="chart health-status-chart">
                <Title>
                    <Label className="lbl-4">{t('health status chart')}</Label>
                </Title>
                <FormWrap className="full-width">
                    <Chart config={config}/>
                </FormWrap>
            </div>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    let tempDataProvider = [
        {
            xValue: new Date(moment().add(1, "day")),
            good: 7,
            warning: 5,
            error: 3
        },
        {
            xValue: new Date(moment().add(2, "day")),
            good: 5,
            warning: 7,
            error: 3
        },
        {
            xValue: new Date(moment().add(3, "day")),
            good: 3,
            warning: 5,
            error: 7
        },
        {
            xValue: new Date(moment().add(4, "day")),
            good: 4,
            warning: 6,
            error: 5
        },
        {
            xValue: new Date(moment().add(5, "day")),
            good: 2,
            warning: 8,
            error: 5
        },
        {
            xValue: new Date(moment().add(6, "day")),
            good: 1,
            warning: 6,
            error: 8
        },
        {
            xValue: new Date(moment().add(7, "day")),
            good: 4,
            warning: 4,
            error: 7
        }
    ];
    if (EnvironmentHelper.getEnvironment() === 'local'){
        return {
            dataProvider: tempDataProvider
        };
    }
    return {
        date: null,
        data: null
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(analytics, dispatch);
};

const ConnectedHealthStatusChart = connect(stateMap, null)(HealthStatusChart);

export default translate(['common'])(ConnectedHealthStatusChart);