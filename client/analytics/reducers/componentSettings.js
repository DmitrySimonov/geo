import { combineReducers } from 'redux';

import modal from 'konux/common/reducers/modal';
import popup from './popup';
import appBar from './componentSettings/appBar';
import filter from './componentSettings/filter';
import map from './componentSettings/map';
import singleMarkerInfo from './componentSettings/singleMarkerInfo';
import dateList from './componentSettings/dateList';
import markerInfoBox from './componentSettings/markerInfoBox';
import loading from './componentSettings/loading';

const combinedReducers = combineReducers({
    appBar: appBar,
    popup:  popup,
    modal:  modal,
    dateList,
    filter,
    singleMarkerInfo,
    markerInfoBox,
    loading,
    map
});

export default combinedReducers;