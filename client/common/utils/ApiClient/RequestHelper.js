import {apiConfig, METHOD_NAME_GET} from './config/configuration';
import * as endpointConstants from './config/endpoints';
import EnvironmentHelper from '../EnvironmentHelper/EnvironmentHelper';
import { CookieHelper } from '../CookieHelper/CookieHelper';
import QueryStringBuilder from 'qs';
import moment from 'moment';

class RequestHelper {
    static _getEndPoint(apiName) {
        return endpointConstants.endpoints[EnvironmentHelper.getEnvironment()][apiName];
    }

    static _getApiConfig() {
        return apiConfig;
    }

    static _buildQueryData(requestObject, actionConfiguration, data) {
        //-- initialize the request data object
        let requestData = {};

        //-- if we have a request key set then all information will go on that key
        //-- else we'll send the data as is
        if (actionConfiguration.hasOwnProperty('request_key')) {
            requestData[actionConfiguration['request_key']] = data;
        } else {
            requestData = data;
        }

        //-- check if we have a GET request from the configuration
        if (METHOD_NAME_GET === actionConfiguration['method']) {
            requestObject['url'] = requestObject['url'] + '?' + QueryStringBuilder.stringify(requestData, {encode: false});
        } else {
            requestObject['data'] = requestData;
        }

        return requestObject;
    }

    /**
     * Checks if we have cached response for a request and the cache is still valid
     *
     * @param action
     * @param state
     * @returns {boolean}
     */
    static isActionCacheValid(action, state) {
        const apiConfiguration = this._getApiConfig();
        //-- check if the cache lifetime key is missing
        if (!apiConfiguration[action]['cache_lifetime']) {
            return false;
        }

        let state_response_object = {};

        //-- check if there is a state key
        if (apiConfiguration[action]['state_key']) {
            //-- check if a we have the information in the state on the state key
            if (state['data'][apiConfiguration[action]['state_key']]) {
                state_response_object = state['data'][apiConfiguration[action]['state_key']];
            } else {
                //-- since we don't have the info in the state on the state key we return false
                return false;
            }
        } else {
            state_response_object = state['data'];
        }

        //-- make sure that we already have a response time stamp. If we don't have it then we don't have a cache response
        if (!state_response_object['response_timestamp']) {
            return false;
        }

        //-- add the number of minutes defined in the cache timelife to the
        return (moment.unix(state_response_object['response_timestamp']).add(apiConfiguration[action]['cache_lifetime'], 'minutes').unix() > moment().unix());
    }

    /**
     * Builds a request object
     * @param action
     * @param data
     * @param cancelToken
     * @param state
     * @returns {*}
     */
    static buildRequestObject(action, data={}, cancelToken = null, state) {
        let request_headers = {};

        let apiConfiguration = this._getApiConfig();

        //-- check if we have any have the action configured in the apiConfiguration array
        if (!apiConfiguration.hasOwnProperty(action) ||
            !apiConfiguration[action].hasOwnProperty('method') ||
            !apiConfiguration[action].hasOwnProperty('url'))
        {
            throw new Error('Action is not implemented. Action name: ' + action);
        }

        //-- check if the cache for the request is still valid
        if (RequestHelper.isActionCacheValid(action, state)) {
            return null;
        }

        //-- assign the action configuration to a constant
        const actionConfiguration = apiConfiguration[action];

        //-- build the actual request object
        let requestObject = {
            method : actionConfiguration['method'],
            url : this._getEndPoint(actionConfiguration['api_name']) + actionConfiguration['url'],
        };

        //-- check if we have any data to transmit
        if (0 !== Object.keys(data).length) {
            //-- build the query data depending on the HTTP method type
            requestObject = this._buildQueryData(requestObject, actionConfiguration, data);
        }

        if (null !== CookieHelper.getToken() && actionConfiguration['token_required'] !== false) {
            request_headers['Authorization'] = 'Bearer ' + CookieHelper.getToken();
        }

        //-- add the request headers
        requestObject['headers'] = request_headers;
        requestObject['cancelToken'] = cancelToken;

        return requestObject;
    }

    static getResponse(action, response) {
        let _response = {};
        let apiConfiguration = this._getApiConfig();

        _response['response'] = (!apiConfiguration[action]['response_key']) ? response['data'] : response['data'][apiConfiguration[action]['response_key']]

        //-- put a timestamp on the response in order to cache it if needed
        _response['response_timestamp'] = moment().unix();

        //-- check if we have any state key assigned to the response
        if (apiConfiguration[action]['state_key']) {
            let _tmpResponse = {};
            _tmpResponse[apiConfiguration[action]['state_key']] = _response;
            return _tmpResponse;
        } else {
            return _response;
        }
    }

    static isUnauthorized(error) {
        return (401 === error.response.status);
    }
}

export default RequestHelper;