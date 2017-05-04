import {ActionType} from "./../constants";
import moment from "moment";
import loadedSwitchesStatus from "../../../public/assets/map/switchesStatus.json";
import ApiClient from "konux/common/utils/ApiClient/ApiClient.js";
import * as ApiClientActions from "./../../common/utils/ApiClient/constants/actions";
import axios from 'axios';
import * as chart from './chart';
import ApiDispatcher from "./../../common/utils/ApiClient/ApiDispatcher.js";

export { chart };

/**
 *
 * ALL THE NEW INTEGRATIONS ON THE NEW STATE STRUCTURE WILL BEGIN HERE
 *
 */

export function loadInitalData() {
    const request = [
        {
            action: ApiClientActions.ACTION_SENSORS_SEARCH,
            type: ActionType.Analytics.DATA_RECEIVED_ASSETS
        },
        {
            action: ApiClientActions.ACTION_REGIONS_OPTIONS_SEARCH,
            type: ActionType.Analytics.DATA_RECEIVED_REGIONS_OPTIONS
        },
        {
            action: ApiClientActions.ACTION_ROUTES_OPTIONS_SEARCH,
            type: ActionType.Analytics.DATA_RECEIVED_ROUTES_OPTIONS
        },
        {
            action: ApiClientActions.ACTION_HEALTH_STATUS_SEARCH,
            type: ActionType.Analytics.DATA_RECEIVED_HEALTH_STATUSES_SEARCH
        },
    ];

    return (dispatch, getState) => {
        return ApiDispatcher.call(request, dispatch, getState);
    };
}


/**
 * This method is called when the user enters the Overview Map page
 * Component: Overview
 *
 * @param search
 * @param cancelToken
 * @returns {function(*)}
 */
export function loadOverviewMapData(search, cancelToken) {
    const request = [
        {
            action: ApiClientActions.ACTION_SENSOR_STATS_SEARCH,
            data: {search: search},
            type: ActionType.Analytics.DATA_RECEIVED_ASSET_STATS_SEARCH
        },
        {
            action: ApiClientActions.ACTION_REGIONS_SEARCH,
            type: ActionType.Analytics.DATA_RECEIVED_REGIONS
        },
        {
            action: ApiClientActions.ACTION_ROUTES_SEARCH,
            type: ActionType.Analytics.DATA_RECEIVED_ROUTES
        },
    ];

    return (dispatch, getState) => {
        return ApiDispatcher.call(request, dispatch, getState, cancelToken);
    };
}

/**
 * This method is called in order to get the asset information
 * Component: SingleMarkerInfoContainer
 *
 * @param asset
 * @param cancelToken
 * @returns {function(*)}
 */
export function getAssetInfo(asset, cancelToken) {
    const assetId = asset.id;

    const request = [
        {
            action: ApiClientActions.ACTION_SENSOR_KPI_STATS,
            data: {search: {sensors: [assetId]}},
            type: ActionType.Analytics.DATA_RECEIVED_ASSET_KPI_STATS
        },
        {
            action: ApiClientActions.ACTION_TRIGGERED_ALERTS_COUNT,
            data: {sensors: [assetId]},
            type: ActionType.Analytics.DATA_RECEIVED_TRIGGERED_ALERTS_COUNT
        },
        {
            action: ApiClientActions.ACTION_SENSOR_STATS_AGGREGATE,
            data: {sensors: [assetId]},
            type: ActionType.Analytics.DATA_RECEIVED_ASSET_STATS_AGGREGATE
        }
    ];

    return (dispatch, getState) => {
        return ApiDispatcher.call(request, dispatch, getState, cancelToken);
    };
}

/**
 * This is used to load the data on the overview page
 *
 * Component: Tile view
 *
 * @param search
 * @param cancelToken
 * @returns {{type, assetId: *, selected: *}}
 */
export function loadOverviewTileData(search, cancelToken) {
    //-- loop over the assets received and extract their IDs
    let assetIds = [];
    Object.keys(search).map((key, i) => {assetIds.push(key)});

    const request = [
        {
            action: ApiClientActions.ACTION_SENSOR_KPI_STATS,
            data: {search: {sensors: assetIds}},
            type: ActionType.Analytics.DATA_RECEIVED_ASSET_KPI_STATS
        },
        {
            action: ApiClientActions.ACTION_SENSOR_STATS_SEARCH,
            data: {search: {sensors: assetIds}},
            type: ActionType.Analytics.DATA_RECEIVED_ASSET_STATS_SEARCH
        }
    ];

    return (dispatch, getState) => {
        return ApiDispatcher.call(request, dispatch, getState, cancelToken);
    };
}

/**
 * This is used when a asset is clicked in the filter
 *
 * Component: Asset Report
 *
 * @param assetId
 * @param selected
 * @returns {{type, assetId: *, selected: *}}
 */
export function assetClick(assetId, center, selected) {
    return {
        type: ActionType.Filter.ASSET_SELECTION,
        assetId,
        center,
        selected
    };
}

/**
 * This is used when a asset is clicked in Asset Page
 *
 * Component: Asset Report
 *
 * @param assetId
 * @param center
 * @returns {{type, assetId: *, selected: *}}
 */
export function assetPageClick(assetId, center) {
    return (dispatch) => {
        dispatch ({
            type: ActionType.AssetSelector.ASSET_CLICKED,
            assetId,
            center
        });
    };
}

/**
 * Used in action loadAssetReportData
 *
 * @param assetId
 * @param cancelToken
 * @returns {*}
 */
function loadAssetData(assetId, cancelToken) {
    const request = [
        {
            action: ApiClientActions.ACTION_SENSOR_KPI_REPORT,
            data: {search: {sensors: [assetId]}},
            type: ActionType.Analytics.DATA_RECEIVED_ASSET_KPI_REPORT
        },
        {
            action: ApiClientActions.ACTION_SENSOR_KPI_STATS,
            data: {search: {sensors: [assetId]}},
            type: ActionType.Analytics.DATA_RECEIVED_ASSET_KPI_STATS
        },
        {
            action: ApiClientActions.ACTION_SENSOR_STATS_SEARCH,
            type: ActionType.Analytics.DATA_RECEIVED_ASSET_STATS_SEARCH
        }
    ];

    return (dispatch, getState) => {
        ApiDispatcher.call(request, dispatch, getState, cancelToken);
    };
}

export function getAssetGroupInfo(assetIds, cancelToken) {
    const request = [
        {
            action: ApiClientActions.ACTION_TRIGGERED_ALERTS_COUNT,
            data: {sensors: assetIds},
            type: ActionType.Analytics.DATA_RECEIVED_TRIGGERED_ALERTS_COUNT
        },
        {
            action: ApiClientActions.ACTION_SENSOR_STATS_AGGREGATE,
            data: {sensors: assetIds},
            type: ActionType.Analytics.DATA_RECEIVED_ASSET_STATS_AGGREGATE
        },
    ];

    return (dispatch, getState) => {
        ApiDispatcher.call(request, dispatch, getState, cancelToken);
    };
}

/**
 * This is used when entering the Asset Report page
 * Component: Asset Report
 *
 * @param cancelToken
 * @param selectedAssets
 * @param allAssets
 * @returns {*}
 */
export function loadAssetReportData(cancelToken, selectedAssets = [], allAssets = []) {

    if (Object.keys(allAssets).length) {
        let assetId = null;
        //-- check if we have any selected assets to display
        if (selectedAssets.length > 0) {
            assetId = selectedAssets[selectedAssets.length - 1];
        } else {
            assetId = allAssets[Object.keys(allAssets)[Object.keys(allAssets).length - 1]]['id'];
        }

        return loadAssetData(assetId, cancelToken);
    }

    return {
        type: 'dummy return',
        value: true
    };
}

/**
 * This is used on the group report page in order to load data for the entire page
 * Component: Group Report
 *
 * @param assets
 * @param cancelToken
 * @returns {*}
 */
export function loadGroupReportData(assets, cancelToken) {
    const assetIds = Object.keys(assets);

    const request = [
        {
            action: ApiClientActions.ACTION_SENSOR_STATS_AGGREGATE,
            data: {sensors: assetIds},
            type: ActionType.Analytics.DATA_RECEIVED_ASSET_STATS_AGGREGATE
        },
        {
            action: ApiClientActions.ACTION_HEALTH_STATUS_REPORT,
            data: {search: {sensors: assetIds}},
            type: ActionType.Analytics.DATA_RECEIVED_HEALTH_STATUS_REPORT
        },
        {
            action: ApiClientActions.ACTION_TRIGGERED_ALERTS_COUNT,
            data: {sensors: assetIds},
            type: ActionType.Analytics.DATA_RECEIVED_TRIGGERED_ALERTS_COUNT
        },
        {
            action: ApiClientActions.ACTION_SENSORS_COUNT,
            data: {sensors: assetIds},
            type: ActionType.Analytics.DATA_RECEIVED_ASSETS_COUNT
        }
    ];

    return (dispatch, getState) => {
        ApiDispatcher.call(request, dispatch, getState, cancelToken);
    };
}

/**
 * This is used on every page that does ajax calls in order to cancel them if we move from one page to the other
 * Component: Group Report
 *
 * @param cancelToken
 * @returns {*}
 */
export function cancelPendingRequests(cancelToken) {
    return function(dispatch) {
        cancelToken.cancel('Cancelled pending requests.');
    };
}

/**
 *
 * ALL THE NEW INTEGRATIONS ON THE NEW STATE STRUCTURE WILL END HERE
 *
 */


export function switchClick(switches, cancelToken) {
    return null;

    return function (dispatch) {
        let search = _buildSearchFilter(switches);

        const request = [
            {
                action: ApiClientActions.ACTION_SENSOR_STATS_AGGREGATE,
                data: search
            },
            {
                action: ApiClientActions.ACTION_TRIGGERED_ALERTS_COUNT,
                data: search
            }
        ];

        ApiClient.doConcurrentApiCalls(request, cancelToken)
            .then((response) => {
                if (response) {
                    response[0].alertCount = response[1];
                    dispatch({
                        type: ActionType.Analytics.SWITCH_CLICKED,
                        aggregatedStats: response[0],
                        selectedSwitches: switches
                    });
                }
            });
    };
}

export function loadSensorLog(switches){
    return null;

    return function (dispatch) {
        let switchesWithLog = addSensorLog(switches);
        return dispatch({
            type: ActionType.Analytics.LOAD_SENSOR_LOG,
            switches:switchesWithLog
        });
    };
}

function addSensorLog(switches){
    if (switches && switches.length > 0) {
        return switches.map((swtch,i) => {
            return Object.assign({},swtch, addSensorWithLog());
        });
    }

    return null;
}
function addSensorWithLog(){
    return{
        sensors:[
            _generateSensor()
        ]
    };
}

function _generateSensor(){
    return {
            logs:_generateSensorLogs()
    };
}

function _generateSensorLogs() {
    var result = [];
    for(var i = 0; i < 5; i++){
        result[i] = _generateSensorLog(i);
    }
    return result;
}
function _generateSensorLog(i){
    const koef = Math.random() * 100;
    return{
      time: moment().add(i,'day').unix() * 1000,
      batteryLevel: (Math.random() * (2 - 0) * koef + 1).toFixed(2) * 1,
      temperature: (Math.random() * (2 - 0) * koef + 1).toFixed(2) * 1,
      wakeUpSource: 'Train is approaching ',
      maxAcc: (Math.random() * (2 - 0) * koef + 1).toFixed(2) * 1,
      rmsAcc: (Math.random() * (2 - 0) * koef + 1).toFixed(2) * 1,
      comment: '',
      configurationId: (Math.random() * (2 - 0) * koef + 1).toFixed(0) * 1,
      configurationDate: moment().add(i,'day').unix() * 1000,
      measurement: (Math.random() * (2 - 0) * koef + 1).toFixed(1)* 1,
      connection: 'Success',
      signalLevel:(Math.random() * (200 - 0) * koef + 1).toFixed(0)* 1,
      lastUpdate: moment().add(i,'day').unix() * 1000
    };
}

export function loadAlerts(switches) {
    return function (dispatch) {
        let switchesWithAlerts = addAlerts(switches);
        return dispatch({
            type: ActionType.Analytics.LOAD_ALERTS,
            switches: switchesWithAlerts
        });
    };
}

function addAlerts(switches){
    return switches.map((swtch,i) => {
        return Object.assign({},swtch, addAlers());
    });
}

function addAlers(){
    return{
        alerts:_generateAlerts()
    };
}

function _generateAlerts() {
    var result = [];
    for(var i = 0; i < 5; i++){
        result[i] = _generateAlert(i);
    }
    return result;
}
function _generateAlert(i){
    const koef = Math.random() * 100;
    return{
      date: moment().add(i,'day').unix() * 1000,
      type: 'Threshold exceeded',
      event: 'Switch has reported a critical frog fault',
      wakeUpSource: 'Train is approaching ',
    };
}

function _buildSearchFilter(switches){
    let switchIds = [];

    if (switches) {
        let switchKeys = Object.keys(switches);
        switchKeys.forEach((currentSwitch) => {
            switchIds.push(switches[currentSwitch]['id']);
        });
    }

    return {sensors: switchIds};
}

function _getSwitchStatus(oSwitch){
    let status = 'inactive';

    if (oSwitch.healthStatus) {
        oSwitch.thresholds.forEach(threshold => {
            if (oSwitch.healthStatus >= threshold.minValue
                && oSwitch.healthStatus <= threshold.maxValue) {
                return status = threshold.severity;
            }
        });
    }
    return status;
}