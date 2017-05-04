import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import data from './data';
import componentSettings from './componentSettings';
import filterOptions from './filterOptions';
import selected from './selected';

const combinedReducers = combineReducers({
    componentSettings,
    filterOptions,
    data,
    selected,
    routing: routerReducer
});

export default combinedReducers;