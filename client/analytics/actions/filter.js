import {ActionType} from "./../constants";
import ApiClient from './../../common/utils/ApiClient/ApiClient';
import * as ApiClientActions from './../../common/utils/ApiClient/constants/actions';

/**
 * This is used when a asset is clicked in the filter
 * Component: Filter
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
 * This is used when a router is clicked in the filter
 * Component: Filter
 *
 * @param routeId
 * @param selected
 * @returns {{type, routeId: *, selected: *}}
 */
export function routeClick(routeId, coordinates, selected) {
    return {
        type: ActionType.Filter.ROUTE_SELECTION,
        routeId,
        coordinates,
        selected
    };
}

/**
 * This is used when a region is clicked in the filter
 * Component: Filter
 *
 * @param regionId
 * @param coordinates
 * @param assets
 * @param selected
 * @param multiple
 * @returns {{type, regionId: *, coordinates: *, assets: *, selected: *, multiple: boolean}}
 */
export function regionClick(regionId, coordinates, assets, selected, multiple = false) {
    return {
        type: ActionType.Filter.REGION_SELECTION,
        regionId,
        center: coordinates,
        assets,
        selected,
        multiple
    };
}

/**
 * This is used when reset button clicked in the filter
* Component: Filter
 *
 * @returns {{type}}
 */
export function resetFilter() {
    return {
        type: ActionType.Filter.RESET_FILTER,
    };
}

/**
 * This is used when search field submitted in the filter
* Component: Filter
 *
 * @param searchString
 * @returns {{type, searchString: String}}
 */
export function searchFilter(searchString) {
    return {
        type: ActionType.Filter.SEARCH_FILTER,
        searchString: searchString
    };
}

/**
 * This is used when search result should in the filter
 * Component: Filter
 *
 * @returns {{type}}
 */
export function hideSearch() {
    return {
        type: ActionType.Filter.HIDE_SEARCH,
    };
}

/**
 * This function is used when the user clicks on the route in the filter
 * If we have no selected routes in the filter then we have the defaults that are passed on
 *
 * Component: FilterItemRoute
 *
 * @param selectedRoutes
 * @param assets
 *
 * @returns {function(*)}
 */
export function routeFilterClicked(selectedRoutes, assets) {
    if (selectedRoutes.length === 0) {
        return (dispatch) => {
            dispatch({type: ActionType.Filter.UPDATE_ASSET_OPTIONS, assets: assets});
        };
    } else {
        return (dispatch) => {
            return ApiClient.doApiCall(ApiClientActions.ACTION_ROUTE_LOCATION_SEARCH, {ids: selectedRoutes})
                .then((response) => {
                    dispatch({type: ActionType.Filter.UPDATE_ASSET_OPTIONS, assets: response.response.assets});
                });
        };
    }
}

/**
 * This function is used when the user clicks on the region in the filter
 * If we have no selected regions in the filter then we have the defaults that are passed on
 *
 * Component: FilterItemRegion
 *
 * @param regionId
 * @param selected
 * @param params
 *
 * @returns {function(*)}
 */
export function regionFilterClicked(regionId, selected, params) {
    let _stateSelected = params.selected.slice(0);

    //-- check if the region is selected
    if (selected) {
        //-- push it in the selected array
        _stateSelected.push(parseInt(regionId));
    } else {
        //-- remove it from the selected array
        _stateSelected.splice(_stateSelected.indexOf(parseInt(regionId)), 1);
    }
    return (dispatch) => {
        //-- dispatch a click action
        dispatch({type: ActionType.Filter.REGION_SELECTION, regionId, selected});

        //-- check if we have anything selected in order to see if we do an API call or pass the defaults
        if (_stateSelected.length === 0) {
            dispatch({type: ActionType.Filter.UPDATE_ASSET_OPTIONS, assets: params.defaults.assets});
            dispatch({type: ActionType.Filter.UPDATE_ROUTE_OPTIONS, routes: params.defaults.routes});
        } else {
            return ApiClient.doApiCall(ApiClientActions.ACTION_REGION_LOCATION_SEARCH, {ids: _stateSelected})
                .then((response) => {
                    dispatch({type: ActionType.Filter.UPDATE_ASSET_OPTIONS, assets: response.response.assets});
                    dispatch({type: ActionType.Filter.UPDATE_ROUTE_OPTIONS, routes: response.response.routes});

                });
        }
    };
}