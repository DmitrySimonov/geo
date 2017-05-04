import ZoomHelper, { ELEMENT_TYPE_REGION, ELEMENT_TYPE_ASSET } from './../../utils/map/ZoomHelper';
import MapHelper from './../../utils/map/MapHelper';

import { ActionType } from './../../constants';

const initialState = {
    center: {
        lat: 50.9262607,
        lng: 5.8162531
    },
    zoom: 6,
    smallIcon: true,
    regions: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ActionType.Map.ASSET_CHANGE_ICON:
            state = Object.assign({}, state, {smallIcon: action.smallIcon});
        break;
        case ActionType.AssetSelector.ASSET_SELECTION:
        case ActionType.Map.ASSET_SELECTION:
            state = Object.assign({}, state, {
                center: action.center,
                zoom: ZoomHelper.getZoom(ELEMENT_TYPE_ASSET, action.selected),
                smallIcon: !action.selected
            });
        break;
        case ActionType.Filter.ASSET_SELECTION:
            state = Object.assign({}, state, {
                center: action.center,
                zoom: ZoomHelper.getZoom(ELEMENT_TYPE_ASSET, action.selected),
                smallIcon: !action.selected
            });
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

            //-- check if we have multiple regions selected
            const multiRegion = regions.length > 1;

            let tmpState = {
                zoom: ZoomHelper.getZoom(ELEMENT_TYPE_REGION, action.selected, regions.length > 1),
                smallIcon: !action.selected,
                regions
            };

            if (!multiRegion) {
                tmpState['center'] = (action.center && action.center.lat && action.center.lng) ? action.center : state.center;
            }

            state = Object.assign({}, state, tmpState);
        break;
        case ActionType.AssetSelector.ASSET_CLICKED:
            state = Object.assign({}, state, {
                center: action.center,
                zoom: ZoomHelper.getZoom(ELEMENT_TYPE_ASSET, true),
                smallIcon: false
            });
        break;
    }
    return state;
};