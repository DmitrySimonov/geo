import * as ActionType from './../../analytics/constants/actions';

export function setTimeFrame(date) {
    return {
        type: ActionType.DateList.SET_TIME_FRAME,
        date: date
    };
}