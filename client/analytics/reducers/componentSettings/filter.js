import {OVERVIEW, GROUP_REPORT, ASSET_REPORT, TILE_OVERVIEW, ASSET_ANALYTICS, GROUP_ANALYTICS, SENSOR_LOG, EVENT_LOG,ALERTS} from './../../constants/routes';
import {RegionListId, ChartConfigutratorId, RoutesListId, TimeFrameId, WSHLFrameId, SwitchListId, AnalysisTypeId, AxelXId, AxelYId, AddNewFilterId} from './../../constants/filterItemId';

const initialState = {
    items: null
};


export default (state = initialState, action) => {
   // console.log('action', action);
    switch(action.type) {
        case "/":
        case OVERVIEW:
            state = Object.assign({}, state, {items: RegionListId | RoutesListId | SwitchListId | WSHLFrameId});
        case TILE_OVERVIEW:
            state = Object.assign({}, state, {items: RegionListId | RoutesListId | SwitchListId | WSHLFrameId});
        case GROUP_REPORT:
            state = Object.assign({}, state, {items: RegionListId | RoutesListId | TimeFrameId | WSHLFrameId});
        case ASSET_REPORT:
            state = Object.assign({}, state, {items: RegionListId | RoutesListId | TimeFrameId | WSHLFrameId});
        case ASSET_ANALYTICS:
            state = Object.assign({}, state, {items: RegionListId | RoutesListId | TimeFrameId | WSHLFrameId | SwitchListId | AnalysisTypeId | ChartConfigutratorId});
        case GROUP_ANALYTICS:
            state = Object.assign({}, state, {items: RegionListId | RoutesListId | TimeFrameId | WSHLFrameId | SwitchListId | AnalysisTypeId | ChartConfigutratorId});
        case SENSOR_LOG:
            state = Object.assign({}, state, {items: RegionListId | RoutesListId | SwitchListId | WSHLFrameId});
        case EVENT_LOG:
            state = Object.assign({}, state, {items: RegionListId | RoutesListId | SwitchListId | WSHLFrameId});
        case ALERTS:
            state = Object.assign({}, state, {items: RegionListId | RoutesListId | SwitchListId | WSHLFrameId});
    }
    return state;
};