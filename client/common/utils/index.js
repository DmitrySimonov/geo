import { AxelType } from './../../analytics/constants/axelType';
import moment from 'moment';
import _ from 'lodash';

export function validateEmail(value){
    let emailReg  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = emailReg.test(value);
    if (result) {
        return true;
    }else{
        return false;
    }
    
};
export function validateName(value) {
    return lengthValidator(value, 4);
};
export function validateRegion(value) {
    return lengthValidator(value, 4);
};
export function validateTitle(value) {
    return lengthValidator(value, 4);
};
export function validatePassword(value) {
    return lengthValidator(value, 7);
};

function lengthValidator(value, length) {
    return value !== null && value.length > length;
}

export function checkValid(state){
    for (let prop in state) {
        if (!state[prop]) {
            return false;
        }
    }
    return true;
}

export function getChartData(selectedXAxel, selectedYAxel, switches){
        let result = [];
        let xArr = [];
        let yArr = [];
        let measurments = [];
        if (switches) {
            switches.forEach(function(swtch){
                if (swtch.measurments) {
                    measurments = measurments.concat(swtch.measurments);
                }
            });
        }
        switch (selectedYAxel){
            case AxelType.RMS_AXEL:
                yArr = [];
                for (let i=0; i<measurments.length; i++){
                    yArr.push({
                        yValue: measurments[i].rms
                    });
                }
                break;
            case AxelType.SPEED_AXEL:
                yArr = [];
                for (let i=0; i<measurments.length; i++){
                    yArr.push({
                        yValue: measurments[i].gescht
                    });
                }
                break;
            case AxelType.WSH_AXEL:
                yArr = [];
                for (let i=0; i<measurments.length; i++){
                    yArr.push({
                        yValue: measurments[i].whslAvg
                    });
                }
                break;
            case AxelType.LOAD_AXEL:
                yArr = [];
                for (let i=0; i<measurments.length; i++){
                    yArr.push({
                        yValue: measurments[i].load
                    });
                }
                break;
            case AxelType.TILT_AXEL:
                yArr = [];
                for (let i=0; i<measurments.length; i++){
                    yArr.push({
                        yValue: i
                    });
                }
                break;
            case AxelType.AXELS_AXEL:
                yArr = [];
                for (let i=0; i<measurments.length; i++){
                    yArr.push({
                        yValue: i
                    });
                }
                break;
        }
        switch (selectedXAxel){
            case AxelType.LOAD_AXEL:
                xArr = [];
                for (let i=0; i<measurments.length; i++){
                    xArr.push({
                        xValue: measurments[i].load,
                        aditionalInfo: new Date(measurments[i].zeit)
                    });
                }
                xArr = _.sortBy(xArr, ["xValue"]);
                break;
            case AxelType.WSH_AXEL:
                xArr = [];
                for (let i=0; i<measurments.length; i++){
                    xArr.push({
                        xValue: measurments[i].whslAvg,
                        aditionalInfo: new Date(measurments[i].zeit)
                    });
                }
                xArr = _.sortBy(xArr, ["xValue"]);
                break;
            case AxelType.TEMPERATURE_AXEL:
                xArr = [];
                for (let i=0; i<measurments.length; i++){
                    xArr.push({
                        xValue: measurments[i].temperature
                    });
                }
                break;
            case AxelType.DATE_AXEL:
                xArr = [];
                for (let i=0; i<measurments.length; i++){
                    xArr.push({
                        xValue: new Date(measurments[i].zeit)
                    });
                }
                break;
            case AxelType.SWITCH_ID_AXEL:
                xArr = [];
                for (let i=0; i<measurments.length; i++){
                    xArr.push({
                        xValue: i
                    });
                }
                break;
            case AxelType.TRAIN_ID_AXEL:
                xArr = [];
                for (let i=0; i<measurments.length; i++){
                    xArr.push({
                        xValue: i
                    });
                }
                break;
        }
        for (let i=0; i<measurments.length; i++){
            result.push(Object.assign({},xArr[i],yArr[i]));
        }
        return result;
    }

export function getCandleChartData(selectedXAxel, selectedYAxel, switches){
    let result = [];
    let tempData = [];
    let xArr = [];
    let yArr = [];
    let objectInTempArray;
    if(switches){
        switch (selectedXAxel){
            case AxelType.DATE_AXEL:
                for (let i=0; i< switches.length; i++){
                    if(switches[i].measurments){
                        let measurments = switches[i].measurments;
                        for (let j=0; j < measurments.length; j++){
                            if( !_.some(tempData, ["zeit", measurments[j].zeit]) ){
                                tempData.push({
                                    zeit: measurments[j].zeit,
                                    rmsStart: switches[0].measurments[j].rmsStart,
                                    rmsEnd: switches[switches.length - 1].measurments[j].rmsEnd,
                                    rmsMax: measurments[j].rmsMax,
                                    rmsMin: measurments[j].rmsMin,
                                    wshStart: switches[0].measurments[j].wshStart,
                                    wshEnd: switches[switches.length - 1].measurments[j].wshEnd,
                                    wshMax: measurments[j].wshMax,
                                    wshMin: measurments[j].wshMin,
                                });
                            } else {
                                objectInTempArray = tempData[_.findIndex(tempData, ["zeit", measurments[j].zeit])];
                                if ( objectInTempArray.rmsMax < measurments[j].rmsMax ){
                                    tempData[_.findIndex(tempData, ["zeit", measurments[j].zeit])].rmsMax = measurments[j].rmsMax;
                                }
                                if ( objectInTempArray.rmsMin > measurments[j].rmsMin){
                                    tempData[_.findIndex(tempData, ["zeit", measurments[j].zeit])].rmsMin = measurments[j].rmsMin;
                                }
                                if ( objectInTempArray.wshMax > measurments[j].wshMax){
                                    tempData[_.findIndex(tempData, ["zeit", measurments[j].zeit])].wshMax = measurments[j].wshMax;
                                }
                                if ( objectInTempArray.wshMin < measurments[j].wshMin){
                                    tempData[_.findIndex(tempData, ["zeit", measurments[j].zeit])].wshMin = measurments[j].wshMin;
                                }
                            }
                        }
                    }
                }
                switch (selectedYAxel){
                    case AxelType.RMS_AXEL:
                        result = [];
                        for (let k=0; k < tempData.length; k++){
                            result.push({
                                xValue: new Date(tempData[k].zeit),
                                yMaxValue: tempData[k].rmsMax,
                                yMinValue: tempData[k].rmsMin,
                                yStartValue: tempData[k].rmsStart,
                                yEndValue: tempData[k].rmsEnd
                            });
                        }
                        break;
                    case AxelType.WSH_AXEL:
                        result = [];
                        for (let k=0; k < tempData.length; k++){
                            result.push({
                                xValue: new Date(tempData[k].zeit),
                                yMaxValue: tempData[k].wshMax,
                                yMinValue: tempData[k].wshMin,
                                yStartValue: tempData[k].wshStart,
                                yEndValue: tempData[k].wshEnd
                            });
                        }
                        break;
                }
                break;
            case AxelType.SWITCH_ID_AXEL:
                result = [];
                let wshMax;
                let wshMin;
                let rmsMax;
                let rmsMin;
                let measurments;
                tempData = [];
                for (let i=0; i < switches.length; i++){
                    if(switches[i].measurments){
                        measurments = switches[i].measurments;
                        measurments.reduce(function(prev, current) {
                            if (prev){
                                wshMax = prev.wshMax > current.wshMax ? prev.wshMax : current.wshMax;
                                wshMin = prev.wshMin < current.wshMin ? prev.wshMin : current.wshMin;
                                rmsMax = prev.rmsMax > current.rmsMax ? prev.rmsMax : current.rmsMax;
                                rmsMin = prev.rmsMin < current.rmsMin ? prev.rmsMin : current.rmsMin;
                            }
                        });
                        tempData.push({
                            switchId: switches[i].name,
                            wshMax: wshMax,
                            wshMin: wshMin,
                            wshStart: measurments[0].wshStart,
                            wshEnd: measurments[measurments.length - 1].wshEnd,
                            rmsMax: rmsMax,
                            rmsMin: rmsMin,
                            rmsStart: measurments[0].rmsStart,
                            rmsEnd: measurments[measurments.length - 1].rmsEnd
                        });
                    }
                }
                switch (selectedYAxel){
                    case AxelType.RMS_AXEL:
                        result = [];
                        for (let k=0; k < tempData.length; k++){
                            result.push({
                                xValue: tempData[k].switchId,
                                yMaxValue: tempData[k].rmsMax,
                                yMinValue: tempData[k].rmsMin,
                                yStartValue: tempData[k].rmsStart,
                                yEndValue: tempData[k].rmsEnd
                            });
                        }
                        break;
                    case AxelType.WSH_AXEL:
                        result = [];
                        for (let k=0; k < tempData.length; k++){
                            result.push({
                                xValue: tempData[k].switchId,
                                yMaxValue: tempData[k].wshMax,
                                yMinValue: tempData[k].wshMin,
                                yStartValue: tempData[k].wshStart,
                                yEndValue: tempData[k].wshEnd
                            });
                        }
                        break;
                }
                break;
            }
    }
    return result;
}

export function getGroupCorrelationData(selectedXAxel, selectedYAxel, switches){
    let result = [];
    let xArr = [];
    let yArr = [];
    let tempArr = [];
    switch (selectedXAxel){
        case AxelType.LOAD_AXEL:
            xArr = [];
            switches.forEach(function(swtch){
                if (swtch.measurments){
                    xArr.push({
                        xValue: swtch.measurments[0].load,
                        aditionalInfo: swtch.name
                    });
                }
            });
            break;
        case AxelType.WSH_AXEL:
            xArr = [];
            switches.forEach(function(swtch){
                if (swtch.measurments){
                    xArr.push({
                        xValue: swtch.measurments[0].whslAvg,
                        aditionalInfo: swtch.name
                    });
                }
            });
            break;
    }
    switch (selectedYAxel){
        case AxelType.RMS_AXEL:
            yArr = [];
            switches.forEach(function(swtch){
                if (swtch.measurments){
                    yArr.push({
                        yValue: swtch.measurments[0].rms
                    });
                }
            });
            break;
        case AxelType.SPEED_AXEL:
            yArr = [];
            switches.forEach(function(swtch){
                if (swtch.measurments){
                    yArr.push({
                        yValue: swtch.measurments[0].gescht
                    });
                }
            });
            break;
    }
    for (let i=0; i < switches.length; i++){
        result.push(Object.assign({}, yArr[i], xArr[i]));
    }
    result = _.sortBy(result, ["xValue"]);
    return result;
}