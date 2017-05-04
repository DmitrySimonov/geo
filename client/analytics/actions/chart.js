import { ActionType, AxelType } from './../constants';

export function showAnalysisType(analysis_type) {
    return {
        type: ActionType.Analytics.SHOW_ANALYSIS_TYPE,
        analysis_type: analysis_type
    };
}
export function typeListClick(selectedType) {
    return {
        type: ActionType.Analytics.TYPE_LIST_CLICKED,
        selectedType:selectedType
    };
}

export function xAxelListClick(selectedXAxel) {
    return {
        type: ActionType.Analytics.X_AXEL_LIST_CLICKED,
        selectedXAxel: selectedXAxel
    };
}

export function yAxelListClick(selectedYAxel) {
    return {
        type: ActionType.Analytics.Y_AXEL_LIST_CLICKED,
        selectedYAxel: selectedYAxel
    };
}

export function predictionChartMouseMove(date){
    return {
        type: ActionType.Analytics.PREDICTION_CHART_MOUSE_MOVE,
        date: date
    };
}

export function clearAxels(date){
    return {
        type: ActionType.Analytics.CLEAR_AXELS
    };
}
export function getChartInfo(ChartType,AxelX,AxelY){
    return {
        type: ActionType.Analytics.GET_CHART_INFO,
        ChartType: ChartType,
        AxelX: AxelX,
        AxelY: AxelY
    };
}

export function clearChartSettings(){
    return {
        type: ActionType.Analytics.CLEAR_CHART_SETTINGS
    };
}
