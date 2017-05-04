import { ActionType } from './../constants';

let initialState = {
    assets: {},
    regions: {},
    routes: {}
};

export default function filterOptions(state = initialState, action) {
    
    let _actionData = {};

    switch(action.type) {
        case ActionType.Analytics.DATA_RECEIVED_ASSETS:
            _actionData[Object.keys(action)[1]] = action[Object.keys(action)[1]]['response'];
            state = Object.assign({}, state, _actionData);
        break;
        case ActionType.Analytics.DATA_RECEIVED_ROUTES_OPTIONS:
            _actionData[Object.keys(action)[1]] = action[Object.keys(action)[1]]['response'];
            state = Object.assign({}, state, {routes:_actionData.route_options});
        break;
        case ActionType.Analytics.DATA_RECEIVED_REGIONS_OPTIONS:
            _actionData[Object.keys(action)[1]] = action[Object.keys(action)[1]]['response'];
            state = Object.assign({}, state, {regions:_actionData.region_options});
        break;
        case ActionType.Filter.UPDATE_ASSET_OPTIONS:
            const assets = [];

            for (let i = 0; i < action.assets.length; i++) {
                if (action.assets[action.assets[i]]) {
                    assets[action.assets[i]] = action.assets[action.assets[i]];
                }
            }

            state = Object.assign({}, state, {assets: assets});
        break;
        case ActionType.Filter.UPDATE_ROUTE_OPTIONS:
            const routes = [];

            for (let i = 0; i < action.routes.length; i++) {
                if (action.routes[action.routes[i]]) {
                    routes[action.routes[i]] = action.routes[action.routes[i]];
                }
            }

            state = Object.assign({}, state, {route: routes});
        break;
    }
    return state;
};
