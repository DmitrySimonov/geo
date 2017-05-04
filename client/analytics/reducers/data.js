import { ActionType } from '././../constants';
import moment from 'moment';

// temporary method for charts
const TEMP_MEASURMENTS_LENGTH = 10;
let measurments = [];
// expected measurments structure
for (let i=0; i<TEMP_MEASURMENTS_LENGTH; i++){
    measurments.push({
        zeit: moment().add(i, 'day').format('MMM Do YYYY'),
        rms:(Math.random() * (2 - 0) + 1).toFixed(2) * 1,
        wsh: (Math.random() * (2 - 0) + 1).toFixed(2) * 1,
        gescht: (Math.random() * (4 - 0)).toFixed(0) * 1,
        aschen: (Math.random() * (3 - 0)).toFixed(0) * 1,
        load: (Math.random() * (3 - 0)).toFixed(0) * 1,
        healthStatus: Math.random(),
        temperature: (Math.random() * (1 - 0)).toFixed(1) * 1,
        switchId: i.toString(),
        // data for candlestick chart
        wshStart: (Math.random() * (2 - 0) + 1).toFixed(2) * 1,
        wshAvg: (Math.random() * (2 - 0) + 1).toFixed(2) * 1,
        wshStd: (Math.random() * (2 - 0) + 1).toFixed(2) * 1 ,
        wshMax: (Math.random() * (1 - 0)).toFixed(2) * 1,
        wshEnd: (Math.random() * (2 - 0) + 1).toFixed(2) * 1,
        wshMin: (Math.random() * (2 - 0) + 1).toFixed(2) * 1,
        rmsStart: (Math.random() * (2 - 0) + 1).toFixed(2) * 1,
        rmsAvg: (Math.random() * (2 - 0) + 1).toFixed(2) * 1,
        rmsStd: (Math.random() * (2 - 0) + 1).toFixed(2) * 1 ,
        rmsMax: (Math.random() * (1 - 0)).toFixed(2) * 1,
        rmsEnd: (Math.random() * (2 - 0) + 1).toFixed(2) * 1,
        rmsMin: (Math.random() * (2 - 0) + 1).toFixed(2) * 1,
        yMidSecond: (Math.random() * (2 - 0) + 1).toFixed(2) * 1,
        yMidFirst: (Math.random() * (2 - 0) + 1).toFixed(2) * 1
    });
}

let initialState = {
    assets: {response:{}},
    regions: {response:{}},
    routes: {response:{}},
    asset_stats_search: {response:{}},
    asset_kpi_stats: {response:{}},
    triggered_alerts_count: {response: 0},
    health_status_search: {response:{}},
    asset_stats_aggregate: {response:{}},
    asset_kpi_report: {response:[]},
    health_status_report: {response:[]},
    assets_count: {response:0},
    region_options: {response:{}},
    route_options: {response:{}},
    assets_measurments: measurments // temporary method for charts
};


export default function overview(state = initialState, action) {
    let _actionData = Object.assign({}, action);
    delete _actionData.type;

    switch(action.type) {
        case ActionType.Analytics.DATA_RECEIVED_REGIONS:
        case ActionType.Analytics.DATA_RECEIVED_ROUTES:
        case ActionType.Analytics.DATA_RECEIVED_ASSETS:
        case ActionType.Analytics.DATA_RECEIVED_ASSET_STATS_SEARCH:
        case ActionType.Analytics.DATA_RECEIVED_ASSET_KPI_STATS:
        case ActionType.Analytics.DATA_RECEIVED_TRIGGERED_ALERTS_COUNT:
        case ActionType.Analytics.DATA_RECEIVED_HEALTH_STATUSES_SEARCH:
        case ActionType.Analytics.DATA_RECEIVED_ASSET_STATS_AGGREGATE:
        case ActionType.Analytics.DATA_RECEIVED_HEALTH_STATUS_REPORT:
        case ActionType.Analytics.DATA_RECEIVED_ASSET_KPI_REPORT:
        case ActionType.Analytics.DATA_RECEIVED_ASSETS_COUNT:
        case ActionType.Analytics.DATA_RECEIVED_ROUTES_OPTIONS:
        case ActionType.Analytics.DATA_RECEIVED_REGIONS_OPTIONS:
            state = Object.assign({}, state, _actionData);
        break;
    }

    return state;
};