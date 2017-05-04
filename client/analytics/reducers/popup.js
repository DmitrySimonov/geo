import { combineReducers } from 'redux';

import { ActionType, StatusType } from './../constants';

let initialState = {
    type: null
};

export default function popupType(state = initialState, action) {
    switch(action.type){
        case ActionType.SideBar.SIDEBAR_CHANGE_LAYER:
            if(action.popupType === state.type) {
                state = Object.assign({},state,{
                    type: -1
                });
            } else {
                state = Object.assign({},state,{
                    type: action.popupType
                });
            }
            break;
        default:
            return state;
    }
    return state;
}