import { ActionType, StatusType } from './../constants';

let initialState = {
    data:null,
    error:null,
    status: StatusType.NORMAL,
    email:"konux@gmail.com"
};

export default function dialog(state = initialState, action) {
    switch(action.type){
        case ActionType.STATUS_CHANGE:
            return  Object.assign({}, state, {status: action.status});
        case ActionType.LOGIN_SUCCESS:
            return  Object.assign({},  state, {/*data:action.data,*/ status: action.status, error:action.error});
        case ActionType.LOGIN_FAILED:
            return  Object.assign({},  state, {error:action.data, status:action.status});
        case ActionType.REQUEST_INVITE:
            return  Object.assign({}, state, {data:action.data,status: action.status, error:action.error});
        case ActionType.COMPLETE_REGISTRATION:
            return  Object.assign({}, state, {data:action.data,status: action.status, error:action.error});
        case ActionType.FORGOT_PASSWORD:
            return  Object.assign({}, state,{data:action.data,status: action.status, error:action.error});
        case ActionType.FIELD_VALUE_CHANGE:
            let text = action.text;
            let fieldName = action.name;
            let data = state.data || {};
            data[fieldName] = text;
            return Object.assign({}, state, {data:data});
        default:
            return state;
    }
};