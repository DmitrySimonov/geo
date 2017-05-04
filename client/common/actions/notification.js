import * as ActionType from './../constants/actions';

let intervalId = -1;

export function show(status, message, duration = -1) {
    return function (dispatch) {
        if (duration > -1) {
            let step = duration;
            dispatch(_show(status, message, step));
            intervalId = setInterval(() => {
                if (step === 0) {
                    dispatch(hide());
                } else {
                    dispatch(_show(status, message, step));
                    step--;
                }
            }, 1000);
            
        }
        return dispatch({
            type: ActionType.Notification.NOTIFICATION_SHOW,
            status: status,
            message: message,
            duration: duration
        });
    };
}

export function hide() {
    clearInterval(intervalId);
    intervalId = -1;
    return {
        type: ActionType.Notification.NOTIFICATION_HIDE
    };
}