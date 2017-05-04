import {AxelType} from './../constants';
import moment from 'moment';

const SCROLL_BAR_BACKGROUND_COLOR = "#f5f8f9";
const SCROLL_BAR_SELECTED_BACKGROUND_COLOR = "#f6f6f7";
const SCROLL_BAR_GRAPH_LINE_COLOR = "#fb9582";
const SCROLL_BAR_SELECTED_GRAPH_LINE_COLOR = "#fb9582";
const GOOD_CONDITION_COLOR = "#0fd1ce";
const WARNING_CONDITION_COLOR = "#ffb870";
const BAD_CONDITION_COLOR = "#fb9582";
const defaultGraph = {
    "id": "g1",
    "fillAlphas": 0,
    "labelText": "[[value]]",
    "lineAlpha": 1,
    "title": null,
    "type": "line",
    "valueField": "yValue",
    "balloonFunction": function (info) {
            return '';
        }
};

const defaultScrollBar = {
    "graph": "g1",
    "oppositeAxis":false,
    "offset":30,
    "scrollbarHeight": 60,
    "backgroundColor": SCROLL_BAR_BACKGROUND_COLOR,
    "selectedBackgroundColor": SCROLL_BAR_SELECTED_BACKGROUND_COLOR,
    "graphLineColor": SCROLL_BAR_GRAPH_LINE_COLOR,
    "selectedGraphLineColor": SCROLL_BAR_SELECTED_GRAPH_LINE_COLOR,
    "autoGridCount":true,
    "graphType": "line",
    "graphFillAlpha": 0,
    "selectedBackgroundAlpha": 1,
    "selectedGraphLineAlpha": 1,
    "selectedGraphFillAlpha": 0,
    "graphLineAlpha": 1,
    "color": "#000"
};


class ChartHelper
{
    static generateConfig(customProps = {}){
        return Object.assign({},{
            "type": "serial",
            "path": "amcharts3/amcharts",
            "pathToImages": "assets/img/",
            "theme": "light",
            "dataDateFormat": "MMM DD",
            "backgroundAlpha": 0,
            "fontFamily": "Proxima Nova",
            "mouseWheelZoomEnabled": true,
            "startDuration": 0,
            "showBalloon": function () {
                return false;
            },
            "colors": [
                GOOD_CONDITION_COLOR, WARNING_CONDITION_COLOR, BAD_CONDITION_COLOR
            ],
            "categoryField": "xValue"
        },customProps);
    }

    static generateGraph(customProps){
        return Object.assign({}, defaultGraph, customProps);
    }

    static generateGraphs(graphsArr){
        return graphsArr.map((grahpObj) => this.generateGraph(grahpObj));
    }

    static generateScrollBar(customProps){
        return customProps? Object.assign({}, defaultScrollBar, customProps) : defaultScrollBar;
    }

    static getViewIndexes(chart, date){
        let diff = 0;
        if (date &&  date.value) {
            date = date.value;
            if (!date.endDate && date.startDate){
                let a = moment();
                let b = moment(date.startDate);
                diff = a.diff(b, 'days') + 1; // 1
                return {
                    startIndex: chart.dataProvider.length - diff,
                    endIndex: chart.dataProvider.length - 1
                };  
            } else if (date.endDate && date.startDate){
                let a = moment(date.endDate);
                let b = moment(date.startDate);
                let offset = moment().diff(a, 'days') + 1;
                diff = a.diff(b, 'days') + offset; // 1
                return {
                    startIndex: chart.dataProvider.length - offset,
                    endIndex: chart.dataProvider.length - diff
                };  
            }
        }

        return {
            startIndex: chart.dataProvider.length - 7,
            endIndex: chart.dataProvider.length - 1
        };
    }
    
    static getParseDates(dataProvider){
        if (dataProvider && dataProvider.length > 0){
            return dataProvider[0].xValue instanceof Date;
        } else {
            return false;
        }
    }

    static getChartData(selectedXAxel, selectedYAxel, measurments){
        let result = [];
        let xArr = [];
        let yArr = [];
        if (measurments && measurments.length>0){
            switch (selectedYAxel){
                case AxelType.AXIS_RMS:
                    yArr = [];
                    for (let i=0; i<measurments.length; i++){
                        yArr.push({
                            yValue: measurments[i].rms
                        });
                    }
                    break;
                case AxelType.AXIS_SPEED:
                    yArr = [];
                    for (let i=0; i<measurments.length; i++){
                        yArr.push({
                            yValue: measurments[i].gescht
                        });
                    }
                    break;
                case AxelType.AXIS_WSH:
                    yArr = [];
                    for (let i=0; i<measurments.length; i++){
                        yArr.push({
                            yValue: measurments[i].wsh
                        });
                    }
                    break;
                case AxelType.AXIS_LOAD:
                    yArr = [];
                    for (let i=0; i<measurments.length; i++){
                        yArr.push({
                            yValue: measurments[i].load
                        });
                    }
                    break;
                case AxelType.AXIS_TILT:
                    yArr = [];
                    for (let i=0; i<measurments.length; i++){
                        yArr.push({
                            yValue: i
                        });
                    }
                    break;
                case AxelType.AXIS_AXELS:
                    yArr = [];
                    for (let i=0; i<measurments.length; i++){
                        yArr.push({
                            yValue: i
                        });
                    }
                    break;            
            }
            switch (selectedXAxel){
                case AxelType.AXIS_LOAD:
                    xArr = [];
                    for (let i=0; i<measurments.length; i++){
                        xArr.push({
                            xValue: measurments[i].load,
                            aditionalInfo: measurments[i].zeit
                        });
                    }
                    xArr = _.sortBy(xArr, ["xValue"]);
                    break;
                case AxelType.AXIS_WSH:
                    xArr = [];
                    for (let i=0; i<measurments.length; i++){ 
                        xArr.push({
                            xValue: measurments[i].wsh,
                            aditionalInfo: measurments[i].zeit
                        });
                    }
                    xArr = _.sortBy(xArr, ["xValue"]);
                    break;
                case AxelType.AXIS_TEMPERATURE:
                    xArr = [];
                    for (let i=0; i<measurments.length; i++){
                        xArr.push({
                            xValue: measurments[i].temperature
                        });
                    }
                    break;
                case AxelType.AXIS_DATE:
                    xArr = [];
                    for (let i=0; i<measurments.length; i++){
                        xArr.push({
                            xValue: measurments[i].zeit
                        });
                    }
                    break;
                case AxelType.AXIS_SWITCH_ID:
                    xArr = [];
                    for (let i=0; i<measurments.length; i++){
                        xArr.push({
                            xValue: i
                        });
                    }
                    break;
                case AxelType.AXIS_TRAIN_ID:
                    xArr = [];
                    for (let i=0; i<measurments.length; i++){
                        xArr.push({
                            xValue: i
                        });
                    }
                    break;
            }
        }
        for (let i=0; i<measurments.length; i++){
            result.push(Object.assign({},xArr[i],yArr[i]));
        }
        return result;
    }

    static getCandleChartData(selectedXAxel, selectedYAxel, measurmentsArr){
        let result = [];
        let tempData = [];
        let xArr = [];
        let yArr = [];
        let objectInTempArray;

        switch (selectedXAxel){
            case AxelType.AXIS_DATE:
                for (let j=0; j < measurmentsArr.length; j++){
                    if( !_.some(tempData, ["zeit", measurmentsArr[j].zeit]) ){
                        tempData.push({
                            zeit: measurmentsArr[j].zeit,
                            rmsStart: measurmentsArr[0].rmsStart,
                            rmsEnd: measurmentsArr[measurmentsArr.length - 1].rmsEnd,
                            rmsMax: measurmentsArr[j].rmsMax,
                            rmsMin: measurmentsArr[j].rmsMin,
                            wshStart: measurmentsArr[0].wshStart,
                            wshEnd: measurmentsArr[measurmentsArr.length - 1].wshEnd,
                            wshMax: measurmentsArr[j].wshMax,
                            wshMin: measurmentsArr[j].wshMin,
                            yMidFirst: measurmentsArr[j].yMidFirst,
                            yMidSecond: measurmentsArr[j].yMidSecond
                        });
                    } else {
                        objectInTempArray = tempData[_.findIndex(tempData, ["zeit", measurmentsArr[j].zeit])];
                        if ( objectInTempArray.rmsMax < measurmentsArr[j].rmsMax ){
                            tempData[_.findIndex(tempData, ["zeit", measurmentsArr[j].zeit])].rmsMax = measurmentsArr[j].rmsMax;
                        }
                        if ( objectInTempArray.rmsMin > measurmentsArr[j].rmsMin){
                            tempData[_.findIndex(tempData, ["zeit", measurmentsArr[j].zeit])].rmsMin = measurmentsArr[j].rmsMin;
                        }
                        if ( objectInTempArray.wshMax > measurmentsArr[j].wshMax){
                            tempData[_.findIndex(tempData, ["zeit", measurmentsArr[j].zeit])].wshMax = measurmentsArr[j].wshMax;
                        }
                        if ( objectInTempArray.wshMin < measurmentsArr[j].wshMin){
                            tempData[_.findIndex(tempData, ["zeit", measurmentsArr[j].zeit])].wshMin = measurmentsArr[j].wshMin;
                        }
                    }  
                } 
                switch (selectedYAxel){
                    case AxelType.AXIS_VIBRATION:
                        result = [];
                        for (let k=0; k < tempData.length; k++){
                            result.push({
                                xValue: tempData[k].zeit,
                                yMaxValue: tempData[k].rmsMax,
                                yMinValue: tempData[k].rmsMin,
                                yStartValue: tempData[k].rmsStart,
                                yEndValue: tempData[k].rmsEnd,
                                yMidFirst: tempData[k].yMidFirst,
                                yMidSecond: tempData[k].yMidSecond
                            });
                        }
                        break;
                    case AxelType.AXIS_WSH:
                        result = [];
                        for (let k=0; k < tempData.length; k++){
                            result.push({
                                xValue: tempData[k].zeit,
                                yMaxValue: tempData[k].wshMax,
                                yMinValue: tempData[k].wshMin,
                                yStartValue: tempData[k].wshStart,
                                yEndValue: tempData[k].wshEnd, 
                                yMidFirst: tempData[k].yMidFirst,
                                yMidSecond: tempData[k].yMidSecond
                            });
                        }
                        break;
                }
                break;
            case AxelType.AXIS_SWITCH_ID:
                    result = [];
                    let wshMax;
                    let wshMin;
                    let rmsMax;
                    let rmsMin;
                    tempData = [];
                    for (let i=0; i < measurmentsArr.length; i++){
                        measurmentsArr.reduce(function(prev, current) {
                            if (prev){
                                wshMax = prev.wshMax > current.wshMax ? prev.wshMax : current.wshMax;
                                wshMin = prev.wshMin < current.wshMin ? prev.wshMin : current.wshMin;
                                rmsMax = prev.rmsMax > current.rmsMax ? prev.rmsMax : current.rmsMax;
                                rmsMin = prev.rmsMin < current.rmsMin ? prev.rmsMin : current.rmsMin;
                            }
                        });
                        tempData.push({
                            switchId: measurmentsArr[i].switchId,
                            wshMax: wshMax,
                            wshMin: wshMin,
                            wshStart: measurmentsArr[0].wshStart,
                            wshEnd: measurmentsArr[measurmentsArr.length - 1].wshEnd,
                            rmsMax: rmsMax,
                            rmsMin: rmsMin,
                            rmsStart: measurmentsArr[0].rmsStart,
                            rmsEnd: measurmentsArr[measurmentsArr.length - 1].rmsEnd,
                            yMidFirst: measurmentsArr[i].yMidFirst,
                            yMidSecond: measurmentsArr[i].yMidSecond
                        });
                    }
                    switch (selectedYAxel){
                        case AxelType.AXIS_VIBRATION:
                            result = [];
                            for (let k=0; k < tempData.length; k++){
                                result.push({
                                    xValue: tempData[k].switchId,
                                    yMaxValue: tempData[k].rmsMax,
                                    yMinValue: tempData[k].rmsMin,
                                    yStartValue: tempData[k].rmsStart,
                                    yEndValue: tempData[k].rmsEnd,
                                    yMidFirst: tempData[k].yMidFirst,
                                    yMidSecond: tempData[k].yMidSecond
                                });
                            }
                            break;
                        case AxelType.AXIS_WSH:
                            result = [];
                            for (let k=0; k < tempData.length; k++){
                                result.push({
                                    xValue: tempData[k].switchId,
                                    yMaxValue: tempData[k].wshMax,
                                    yMinValue: tempData[k].wshMin,
                                    yStartValue: tempData[k].wshStart,
                                    yEndValue: tempData[k].wshEnd,
                                    yMidFirst: tempData[k].yMidFirst,
                                    yMidSecond: tempData[k].yMidSecond
                                });
                            }
                            break;
                    }
                    break;
        }
        return result;
    }   
    
    static getGroupCorrelationData(selectedXAxel, selectedYAxel, measurments){
        let result = [];
        let xArr = [];
        let yArr = [];
        let tempArr = [];
        switch (selectedXAxel){
            case AxelType.AXIS_LOAD:
                xArr = [];
                measurments.forEach(function(asset){
                    xArr.push({
                        xValue: asset.load
                    });      
                });
                break;
            case AxelType.AXIS_WSH:
                xArr = [];  
                measurments.forEach(function(asset){
                    xArr.push({
                        xValue: asset.wsh
                    });      
                });
                break;
        }
        switch (selectedYAxel){
            case AxelType.AXIS_VIBRATION:
                yArr = [];
                measurments.forEach(function(asset){
                    yArr.push({
                        yValue: asset.rms
                    });   
                });
                break;
            case AxelType.AXIS_SPEED:
                yArr = [];  
                measurments.forEach(function(asset){
                    yArr.push({
                        yValue: asset.gescht
                    });       
                });
                break;
        }
        for (let i=0; i < measurments.length; i++){
            result.push(Object.assign({}, yArr[i], xArr[i]));
        }
        result = _.sortBy(result, ["xValue"]);
        return result;
    }
}

export default ChartHelper;