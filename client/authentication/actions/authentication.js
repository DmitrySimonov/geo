import { ActionType, StatusType, NotificationType } from './../constants';
import { browserHistory } from 'react-router';
import * as notification from 'konux/common/actions/notification';

import ApiClient from 'konux/common/utils/ApiClient/ApiClient.js';
import * as ApiClientActions from 'konux/common/utils/ApiClient/constants/actions';
import Logger from 'konux/common/utils/Logger/Logger';
import { CookieHelper, COOKIE_NAME_TOKEN } from 'konux/common/utils/CookieHelper/CookieHelper';

//-- Checks if the user is logged in
export function checkAuthorization() {
    if (CookieHelper.getToken() && CookieHelper.getToken().length > 0) {
        // location = 'overview';
    }
    return (dispatch) => {
        dispatch({
            type: ApiClientActions.ACTION_REDIRECT
        });
    };
    //-- TODO: this will have to happen on the API side and we have to rethink this
    // return () => {
    //     ApiClient.doApiCall(ApiClientActions.ACTION_USERS_VERIFY_TOKEN)
    //         .then((response) => {
    //             location = 'overview';
    //         })
    //         .catch((error) => {});
    // };
}

/**
 * This method is used when the user clicks on the login button
 * Component: Login
 *
 * @param request
 * @returns {function(*)}
 */
export function authenticate(request) {
    Logger.log('Data from client', request);
    return (dispatch) => {
        // dispatch(changeStatus(StatusType.STATUS_TYPE_LOADING));

        ApiClient.doApiCall(ApiClientActions.ACTION_USERS_LOGIN, request)
            .then((response) => {

                // -- set the token
                CookieHelper.setCookie(COOKIE_NAME_TOKEN, response.response.token);

                // -- dispatch the success
                dispatch({
                    type: ActionType.LOGIN_SUCCESS,
                    // data: response.response.data,
                    // status: StatusType.STATUS_TYPE_SUCCESS
                });

                // location = "overview";
            })
            .catch((error) => {
                //-- dispatch the error
                dispatch({
                    type: ActionType.LOGIN_FAILED,
                    data: error.error,
                    // status: StatusType.STATUS_TYPE_FAILED
                });
            });
    };
}

//API User Management profile send-invite

// req {
//     email: data.email,
//     roleId: data.title,
//     regionId: data.region
// }

// resp data {
//     "success": "Boolean",
//     "errors": "String[] (success == false)"
//     }

export function sendInvite(data) {
    let req = {
        email: data.email,
        roleId: data.title,
        regionId: data.region
    };
    return function (dispatch) {
        dispatch(changeStatus(StatusType.LOADING));
        return setTimeout(() => {
             let resp = {
                data:{
                    success: true,
                    errors: false
                }
            };
            if (resp.data.success) {
                location = "authApp url";
                dispatch(requestInvite( resp.data, StatusType.NORMAL));
            } else {
                dispatch(requestInvite( resp.data, StatusType.FAILED));
            }
        }, 2000);
    };
}

export function requestInvite(data,status) {
    return {
        type: ActionType.REQUEST_INVITE,
        data: data,
        status:status
    };
}

//API User Management set-password

// req {
        // "passwordResetToken": "String",
        // "password": "String"
// }
// resp {
    // "success": "Boolean",
    // "errors": "String[] (success == false)",
    // "authToken": "String (success == true)"
// }

export function setPassword(data, email) {
    let req = {
            passwordResetToken: email,
            password: data.password
        };
    return function (dispatch) {
        dispatch(changeStatus(StatusType.LOADING));
        return setTimeout(() => {

            let resp = {
                data:{
                    success:true,
                    authToken: "gf4jxaefg4lkkjhkgy"
                }
            };

            if (resp.data.success) {
                // location = "Map overview url";
                browserHistory.push("/login?email=" + email);
                dispatch(notification.show(NotificationType.SUCCESS, "You have successfully registered", 5));
                dispatch(completeRegistration( resp.data, StatusType.NORMAL));
            } else {
                dispatch(completeRegistration( resp.data, StatusType.FAILED));
            }
        },1500);
    };
}

export function completeRegistration(data,status) {
    return {
        type: ActionType.COMPLETE_REGISTRATION,
        data: data,
        status: status
    };
}

//API User Management set-password

// req {
        // "passwordResetToken": "String",
// }
// resp {
    // "success": "Boolean",
    // "errors": "String[] (success == false)",
    // "authToken": "String (success == true)"
// }


export function restorePassword(data) {
    let req = {
            passwordResetToken: data.email
        };
    return function (dispatch) {
        // dispatch(changeStatus(StatusType.LOADING));
        return setTimeout(() => {
            let resp = {
                data:{
                    success: false,
                    authToken: "gf4jxaefg4lkkjhkgy",
                },
                error:{
                    message:"No matches found"
                }
            };
            if (resp.data.success) {
                // location = "authApp url";
                browserHistory.push("/login?email=" + data.email);
                dispatch(notification.show(NotificationType.SUCCESS, "Your password has been sent to your email", 5));
            } else {
                browserHistory.push("/login?email=" + data.email);
                dispatch(notification.show(NotificationType.SUCCESS, resp.error.message, 5));
            }
        },1500);
    };
}

//API User Management set-password

// req {
        // "passwordResetToken": "String",
        // "password": "String"
        // }
// resp {
    // "success": "Boolean",
    // "errors": "String[] (success == false)",
    // "authToken": "String (success == true)"
    // }

export function changePassword(data) {
    let req = {
            passwordResetToken: data.email,
            password: data.password
        };
    return function (dispatch) {
        dispatch(changeStatus(StatusType.LOADING));
        return setTimeout(() => {

            let resp = {
                data:{
                    success:true,
                    authToken: "gf4jxaefg4lkkjhkgy"
                }
            };
            if (resp.data.success) {
                location = "authApp url";
                dispatch(forgotPasswordAction( resp.data, StatusType.SUCCESS));
            } else {
                dispatch(forgotPasswordAction( resp.data, StatusType.FAILED));
            }
        },150);
    };
}

export function forgotPasswordAction(data) {
    return {
        type: ActionType.FORGOT_PASSWORD,
        data: data
    };
}



export function changeStatus(status) {
    return {
        type: ActionType.STATUS_CHANGE,
        status: status
    };
}

export function successMessage() {
    return {
        type: ActionType.SUCCESS_MESSAGE,
        dialog: authApp.SUCCESS
    };
}

export function saveFieldValue(fieldName, text) {
    return {
        type: ActionType.FIELD_VALUE_CHANGE,
        name: fieldName,
        text: text
    };
}
