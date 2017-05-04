import React from 'react';
import AmCharts from 'amcharts3-react';
import moment from 'moment';

import { modal } from './../../../../../common/actions/';
import { chart } from './../../../../actions/';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as ModalType from './../../../../constants/modalType';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import Title from 'konux/common/components/Title';
import Label from 'konux/common/components/Label';
import FormWrap from 'konux/common/components/FormWrap';
import Button from 'konux/common/components/Button';
import Image from 'konux/common/components/Image';

import Chart from './../../../../components/partials/Chart';
import ChartHelper from './../../../../utils/ChartHelper';
import EnvironmentHelper from 'konux/common/utils/EnvironmentHelper/EnvironmentHelper';
import { translate } from 'react-i18next';

// temporary method
const colors = ["#ffb073", "#ff7d95"];

class PredictionChart extends React.Component{
    componentWillMount(){
        if (this.props.selectedSwitch && !this.props.selectedSwitch.measurments) {
            this.props.loadMeasurmentData([this.props.selectedSwitch]);
        }
        else if (this.props.switches && this.props.switches.length > 1){
            this.props.loadMeasurmentData(this.props.switches);
        }
    }
    componentWillUnmount(){
        this.props.clearAxels();
    }
    getGuides(thresholds){
        let guides = [];
        if (thresholds){
            for (let i=0; i < thresholds.length; i++){
                if (thresholds[i]){
                    guides.push({
                        value: thresholds[i].maxValue,
                        "lineColor": colors[i],
                        "lineAlpha": 1
                    });
                }
            }
        }
        return guides;
    }
    mouseMoveFunction(event){
        let chart = event.chart;
        let dataProvider = chart.dataProvider;
        let hoveredDate = chart.categoryAxis.coordinateToDate(event.x);
        let hoveredDateInUnixDays = (moment(hoveredDate).unix() / (60 * 60 * 24)).toFixed(0) * 1 + 1; // +1 becouse amchart not correct return hovered date.
        let whslAvg = null;
        let whslMax = null;
        let currentDataObjDateInDays;
        
        // format and show date
        let dateFormated = hoveredDate !== "Invalid Date"? hoveredDate.getDate() + "/" + (hoveredDate.getMonth() + 1) + "/" + hoveredDate.getFullYear() : "";

        // get values by hovered date
        dataProvider.forEach((dataProviderItem) => {
            currentDataObjDateInDays = (moment(dataProviderItem.xValue).unix() / (60 * 60 * 24)).toFixed(0) * 1;
            if (currentDataObjDateInDays === hoveredDateInUnixDays){
                whslAvg = dataProviderItem.whslAvg;
                whslMax = dataProviderItem.whslMax;
            }
        }); 

        // show our values in infobox
        if (dateFormated && whslAvg && whslMax){
            document.getElementById("prediction-chart-date").innerHTML = dateFormated;
            document.getElementById("prediction-chart-wshAvg").innerHTML = whslAvg;
            document.getElementById("prediction-chart-wshMax").innerHTML = whslMax;
        }
    }
    render(){
        let {t} = this.props;
        var config = ChartHelper.generateConfig({
            "valueAxes": [{
                    "id": "v1",
                    "axisAlpha": 0,
                    "position": "left"
                }],
                "legend": {
                    "useGraphSettings": true,
                    "align": "center",
                    "valueAlign": "left",
                    "valueText": "[[value]]"
                },
                "graphs": ChartHelper.generateGraphs([
                    {
                        "title": "whslAvg",
                        "valueField": "whslAvg",
                        "bullet": "round",
                        "type": "smoothedLine",
                    },
                    {
                        "id": "g2",
                        "title": "whslStd",
                        "valueField": "whslStd",
                        "bullet": "round",
                        "type": "smoothedLine",
                    },
                    {
                        "id": "g3",
                        "title": "whslMax",
                        "type": "smoothedLine",
                        "valueField": "whslMax",
                        "bullet": "round"
                    }
                ]),
                "chartScrollbar": ChartHelper.generateScrollBar(),
                "chartCursor": {
                    "cursorPosition": "mouse",
                    "listeners": [{
                        "event": "moved",
                        "method": this.mouseMoveFunction.bind(this)
                    }]
                },
                "categoryAxis": {
                    "parseDates": true
                },
                "dataProvider": this.props.dataProvider,
                "listeners": [
                                    {
                                        "event": "rendered",
                                        "method": this.mouseMoveFunction.bind(this)
                                    }
                                ]
        });
        return(
            <FormWrap className="full-width chart-wrap">
                <Title>
                    <Label className="lbl-4">{t('prediction chart')}</Label>
                </Title>
                <FormWrap>
                    <Button className="threshold-set" onClick={() => this.props.showModal(ModalType.SET_THRESHOLDS_MODAL)}>
                        <Label className="lbl-6">{t('failure treshold')}</Label>
                        <Image src="assets/img/gearwheel.png" alt="gearwheel"/>  
                    </Button>
                </FormWrap>
                <FormWrap className="full-width chart-inner-wrapp">
                    <Chart config={config}/>
                    <ListGroup id="prediction-chart-info">
                        <ListGroupItem className="clearfix">
                            <Label className="lbl-13" uppercase>DATE</Label> 
                            <Label className="pull-right lbl-8" id="prediction-chart-date"></Label>
                        </ListGroupItem>
                        <ListGroupItem className="clearfix">
                            <Label className="lbl-13" uppercase>MAX</Label>
                            <Label className="pull-right lbl-8" id="prediction-chart-wshMax"></Label>
                        </ListGroupItem>
                        <ListGroupItem className="clearfix">
                            <Label className="lbl-13" uppercase>MEAN</Label>
                            <Label className="pull-right lbl-8" id="prediction-chart-wshAvg"></Label>
                        </ListGroupItem>
                        <ListGroupItem className="clearfix">
                            <Label className="lbl-13" uppercase>STD UP</Label>
                            <Label className="pull-right lbl-8"></Label>
                        </ListGroupItem>
                        <ListGroupItem className="clearfix">
                            <Label className="lbl-13" uppercase>STD DOWN</Label>
                            <Label className="pull-right lbl-8"></Label>
                        </ListGroupItem>
                        <ListGroupItem className="clearfix">
                            <Label className="lbl-13" uppercase>MEAN FUT.</Label>
                            <Label className="pull-right lbl-8"></Label>
                        </ListGroupItem>
                    </ListGroup>
                </FormWrap>
            </FormWrap>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    let tempDataProvider = [];
    for (let i=0; i<10; i++){
        tempDataProvider.push({
            "xValue": new Date(moment().add(i,"day")),
            "whslAvg": i*i,
            "whslStd": i*i*i,
            "whslMax": i*2
        });
    }
    if (EnvironmentHelper.getEnvironment() === 'development'){
        return {
            dataProvider: tempDataProvider,
            selectedAsset: null
        };
    }
    return {
        // thresholds: selectedSwitch.thresholds? selectedSwitch.thresholds : null,
        // mouseOverDate: state.chart.mouseOverDate? state.chart.mouseOverDate : null,
        // switches: state.data.switches? state.data.switches : null,
        // selectedSwitch: selectedSwitch
        thresholds: null,
        mouseOverDate: null,
        switches: null,
        selectedSwitch: null,
        dataProvider: tempDataProvider
    };
};

function mapDispatchToProps(dispatch) {
    return {
        showModal: bindActionCreators(modal.show, dispatch),
        clearAxels: bindActionCreators(chart.clearAxels, dispatch)
        // predictionChartMouseMove: bindActionCreators(chart.predictionChartMouseMove, dispatch),
        // loadMeasurmentData: bindActionCreators(analytics.loadMeasurmentData, dispatch)
    };
};

const ConnectedPredictionChart = connect(stateMap, mapDispatchToProps)(PredictionChart);

export default translate(['common'])(ConnectedPredictionChart);