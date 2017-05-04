import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

function notification() {
    return {message: null, duration: -1, status: null, enabled: false};
}

const configureAuthStore = (url, query, body) => {

    function authApp() {
        return {
            data: {
                email: query
                    ? query.email
                    : null
            },
            login: null,
            error: null,
            status: null,
            email: query
                ? query.email
                : null
        };
    };

    const combinedReducers = combineReducers({authApp, notification});

    return createStore(combinedReducers, applyMiddleware(thunk));
};

export default configureAuthStore;