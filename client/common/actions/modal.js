import * as ActionType from './../constants/actions';

export function show(typeId) {
    return {
        type: ActionType.Modal.SHOW,
        typeId: typeId
    };
}

export function hide(typeId) {
    return {
        type: ActionType.Modal.HIDE,
        typeId: typeId
    };
}