import { Modal } from './../constants/actions';

let initialState = {
    typeId:-1
};

export default function sideBar(state = initialState, action) {
    switch(action.type){
        case Modal.HIDE:
            if(action.typeId === state.typeId) {
                state = Object.assign({},state,{
                    typeId: -1
                });
            }
            break;
        case Modal.SHOW:
            if(action.typeId === state.typeId) {
                state = Object.assign({},state,{
                    typeId: -1
                });
            } else {
                state = Object.assign({},state,{
                    typeId: action.typeId
                });
            }
            break;
        default:
            return state;
    }
    return state;
};