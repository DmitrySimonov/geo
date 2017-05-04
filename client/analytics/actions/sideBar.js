import * as ActionType from './../constants/actions';

export function show() {
    return {
        type: ActionType.SideBar.SIDEBAR_SHOW
    };
}

export function showDropdownMenu(popupType) {
    return {
        type: ActionType.SideBar.SIDEBAR_CHANGE_LAYER,
        popupType: popupType
    };
}

export function hide() {
    clearInterval(intervalId);
    intervalId = -1;
    return {
        type: ActionType.SideBar.SIDEBAR_HIDE
    };
}