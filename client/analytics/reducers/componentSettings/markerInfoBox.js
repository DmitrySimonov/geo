import * as actionTypes from './../../constants/actions';

const initialState = {
    asset: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.Map.ASSET_HOVERED:
            state = Object.assign({}, state, {asset: action.hovered ? action.asset : null});
            break;
    }
    return state;
};