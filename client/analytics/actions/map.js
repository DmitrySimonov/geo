import * as actionType from './../constants/actions';
import MapHelper from './../utils/map/MapHelper';

/**
 * This is used when a region is clicked on the map
 * Component: Region
 *
 * @param point
 * @param regionId
 * @param selected
 * @param region
 * @param assets
 * @returns {{type, center: {lat: (*|number), lng: (*|number)}, regionId: *, selected: *}}
 */
export function regionClick(point, regionId, selected, region, assets) {
    let assetsArr = MapHelper.getAssetMatchInRegion(region,assets);
    return {
        type: actionType.Map.REGION_SELECTION,
        center: {
            lat: point.lat,
            lng: point.lng
        },
        assets: assetsArr,
        regionId,
        selected,
    };
}

/**
 * This is used when a asset is clicked on the map
 * Component: Asset | SwitchTile
 *
 * @param point
 * @param assetId
 * @param selected
 * @returns {{type, center: {lat: (*|number), lng: (*|number)}, assetId: *, selected: *}}
 */
export function assetClick(point, assetId, selected) {
    return {
        type: actionType.Map.ASSET_SELECTION,
        center: {
            lat: point.lat,
            lng: point.lng
        },
        assetId,
        selected
    };
}

/**
 * This is used when the user changes the zoom on the map
 * Component: Map
 *
 * @param smallIcon
 * @returns {{type, smallIcon: *}}
 */
export function changeIcon(smallIcon) {
    return {
        type: actionType.Map.ASSET_CHANGE_ICON,
        smallIcon,
    };
}

/**
 * This is used when the user changes the zoom on the map
 * Component: Map
 *
 * @param smallIcon
 * @returns {{type, smallIcon: *}}
 */
export function assetHover(asset, hovered) {
    return {
        type: actionType.Map.ASSET_HOVERED,
        asset,
        hovered
    };
}

