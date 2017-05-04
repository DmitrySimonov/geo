import * as ActionType from './../constants/actions';

/**
 * This is used when a asset is clicked in the filter
 * Component: Filter
 *
 * @param assetId
 * @param selected
 * @returns {{type, assetId: *, selected: *}}
 */
export function assetClick(assetId, center) {
    return {
        type: ActionType.AssetSelector.ASSET_SELECTION,
        assetId,
        center
    };
}