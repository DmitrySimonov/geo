import axios from 'axios';
import RequestHelper from './RequestHelper';
import Logger from '../Logger/Logger';
import { CookieHelper, COOKIE_NAME_TOKEN } from '../CookieHelper/CookieHelper';
import * as apiConstants from './constants/actions';
import _ from 'lodash';

class ApiClient {
    /**
     * This will issue multiple concurrent requests and will wait for all the response before returning anything.
     * The format of the request array will be:
     * [
     *   {
     *     "action" : "action_name_1",
     *     "data"   : {}
     *   },
     *   {
     *     "action" : "action_name_2",
     *     "data"   : {}
     *   },
     * ]
     *
     * @param requestsArray
     * @param cancelToken
     */
    static doConcurrentApiCalls(requestsArray, cancelToken, state) {
        let requests = [];
        let requestObjects = [];
        let keptRequests = [];

        for (let i = 0; i < requestsArray.length; i++) {
            let data = (requestsArray[i]['data']) ? requestsArray[i]['data'] : {};
            const requestObject = RequestHelper.buildRequestObject(requestsArray[i]['action'], data, cancelToken, state);

            //-- if the request object is null then we know that it's cached
            if (requestObject === null || !requestsArray[i]['type']) {
                continue;
            }

            requests.push(axios(requestObject));
            requestObjects.push(requestObject);

            //-- keep track of the requests that we are still issuing
            keptRequests.push(i);
        }

        return axios.all(requests)
            .then((responses) => {
                let finalResponse = [];

                if (_.isNil(responses)){
                    return Promise.reject();
                }

                responses.map((response, i) => {
                    finalResponse.push(Object.assign({type: requestsArray[keptRequests[i]]['type']}, RequestHelper.getResponse(requestsArray[keptRequests[i]]['action'], responses[i])));
                });

                //-- log the response
                Logger.logGroup('Api calls details', {request: requestObjects, response: finalResponse});

                return finalResponse;
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    Logger.log('No response', error.message);
                }
                else {
                    //-- check if the user token has expired
                    if (RequestHelper.isUnauthorized(error)) {
                        CookieHelper.deleteCookie(COOKIE_NAME_TOKEN);
                        location = 'login';
                    }
                    Logger.logGroup('Api exception', {request: requestObjects, response: error});
                }
            });
    }

    static doApiCall(action, data = {}, state) {
        const requestObject = RequestHelper.buildRequestObject(action, data, state);

        //-- if the request object is null then we know that it's cached
        if (requestObject === null) {
            return null;
        }

        return axios(requestObject)
            .then((response) => {
                //-- check if was a success
                if (response['data']['success'] === true) {
                    //-- return the response
                    let _response = RequestHelper.getResponse(action, response);

                    //-- log the response
                    Logger.logGroup('Api call details', {request: requestObject, response: _response});

                    return _response;
                } else {
                    //-- TODO: have a error mapper in place from the API response to the UI response
                    Logger.logGroup('Api call fained', {request: requestObject, response: response.data.error});
                    throw new Error(response.data.error);
                }
            })
            .catch((error) => {
                //-- check if the user token has expired and we're not on the login page
                if (RequestHelper.isUnauthorized(error) && !apiConstants.ACTION_USERS_LOGIN === action ) {
                    CookieHelper.deleteCookie(COOKIE_NAME_TOKEN);
                    location = 'login';
                }
                //-- TODO: have a error mapper in place from the API response to the UI response
                Logger.logGroup('Api exception', {request: requestObject, response: error});
                throw new Error(error);
            });
    }
}

export default ApiClient;