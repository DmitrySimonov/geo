import { ActionType } from './../constants';

const initialState = {
    chart: {
        type:{id: 1},
        selectedXAxel: null,
        selectedYAxel: null
    },
    date: null,
    regions: [],
    routes: [],
    assets: []
};

export default function selected(state = initialState, action) {
    let { chart } = state;
    switch(action.type){
        case ActionType.Map.ASSET_SELECTION:
            state = Object.assign({}, state, {assets: (action.selected ? [action.assetId] : []), regions: []});
        break;
        case ActionType.Filter.ASSET_SELECTION:
            let assets = state.assets.slice(0);

            if (action.selected) {
                assets.push(action.assetId);
            } else {
                //-- check if we have the id in the array
                if (assets.indexOf(action.assetId) !== -1) {
                    assets.splice(assets.indexOf(action.assetId), 1);
                }
            }
            state = Object.assign({}, state, {assets: assets});
        break;
        case ActionType.Filter.REGION_SELECTION:
        case ActionType.Map.REGION_SELECTION:
            let regions = state.regions.slice(0);

            if (action.selected) {
                regions.push(action.regionId);
            } else {
                //-- check if we have the id in the array
                if (regions.indexOf(action.regionId) !== -1) {
                    regions.splice(regions.indexOf(action.regionId), 1);
                }
            }

            state = Object.assign({}, state, {regions: regions});
        break;
        case ActionType.Filter.ROUTE_SELECTION:
            let routes = state.routes.slice(0);
            if (action.selected) {
                routes.push(action.routeId);
            } else {
                //-- check if we have the id in the array
                if (routes.indexOf(action.routeId) !== -1) {
                    routes.splice(routes.indexOf(action.routeId), 1);
                }
            }

            state = Object.assign({}, state, {routes: routes});
        break;
        case ActionType.Filter.UPDATE_ASSET_OPTIONS:
            state = Object.assign({}, state, {assets: []});
        break;
        case ActionType.Filter.UPDATE_ROUTE_OPTIONS:
            state = Object.assign({}, state, {assets: [], routes: []});
        break;
        case ActionType.DateList.SET_TIME_FRAME:
            if(action.date) {
                return Object.assign({}, state, {date: action.date});
            }
        break;
        case ActionType.Analytics.TYPE_LIST_CLICKED:
            chart = Object.assign({},chart, { type: action.selectedType });
            state = Object.assign({}, state, {
                    chart:chart
                });
        break;
        case ActionType.Analytics.X_AXEL_LIST_CLICKED:
            chart = Object.assign({},chart, { selectedXAxel: action.selectedXAxel });
            state = Object.assign({}, state, {
                    chart:chart
                });
        break;
        case ActionType.Analytics.Y_AXEL_LIST_CLICKED:
            chart = Object.assign({},chart, { selectedYAxel: action.selectedYAxel });
            state = Object.assign({}, state, {
                    chart:chart
                });
        break;
        case ActionType.Filter.RESET_FILTER:
            state = Object.assign({},state,{assets:[], regions:[], routes:[]});
        break;
        case ActionType.AssetSelector.ASSET_CLICKED:
            state = Object.assign({}, state, {assets:[action.assetId]});
        break;
        case ActionType.Analytics.CLEAR_AXELS:
            chart = Object.assign({},chart, { selectedXAxel: null, selectedYAxel: null });
            state = Object.assign({}, state, {
                    chart:chart
                });
        break;
    }
    return state;
};
