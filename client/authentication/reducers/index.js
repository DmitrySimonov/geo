import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authApp from './app';
import notification from 'konux/common/reducers/notification';

const combinedReducers = combineReducers({
    authApp,
    notification,
    routing: routerReducer
});

export default combinedReducers;