import { actionType } from './../constants';

let initialState = {
    message: null,
    duration: -1,
    status: null,
    enabled:false
};

export default function notification(state = initialState, action) {
    switch(action.type){
        case actionType.Notification.NOTIFICATION_SHOW:
            return  Object.assign({}, state, {status: action.status, duration: action.duration, message: action.message, enabled: true});
        case actionType.Notification.NOTIFICATION_HIDE:
            return  Object.assign({}, state, {status: null, duration: -1, message: null, enabled: false});
        default:
            return state;
    }
};