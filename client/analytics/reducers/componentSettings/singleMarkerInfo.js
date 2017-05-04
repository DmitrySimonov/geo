
import * as actionTypes from './../../constants/actions';

const initialState = {
    loading: true
};

export default (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.Analytics.SINGLE_MARKER_INFO_RECEIVED:
            state = Object.assign({}, state, {loading: false});
            break;
    }
    return state;
};