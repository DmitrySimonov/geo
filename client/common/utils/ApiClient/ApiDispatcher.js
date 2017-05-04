import ApiClient from './ApiClient';
import _ from 'lodash';

class ApiDispatcher {
    static call(requestObject, dispatch, getState, cancelToken = null) {
        const state = getState();

        ApiClient.doConcurrentApiCalls(requestObject, cancelToken, state)
            .then((response) => {
                if (!_.isNil(response)) {
                    response.map((responseEntry) => dispatch(responseEntry));
                } else {
                    return Promise.reject();
                }
            })
            .catch((exception) => console.log(exception));
    }
}

export default ApiDispatcher;