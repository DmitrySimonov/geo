import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const configureAnalyticsStore = (url, query, body) => {
/*    "componentSettings",
    "filterOptions",
    "data",
    "selected",
    "routing"
*/
    function componentSettings() {
        return {
            appBar: {},
            popup: {},
            modal: {},
            dateList: {},
            filter: {},
            singleMarkerInfo: {},
            markerInfoBox: {},
            map: {
                center: {
                    lat: 50.9262607,
                    lng: 5.8162531
                }
            }
        };
    };

    function data() {
        return {
            assets: {
                response: {}
            },
            regions: {
                response: {}
            },
            routes: {
                response: {}
            },
            asset_stats_search: {
                response: {}
            },
            asset_kpi_stats: {
                response: {}
            },
            triggered_alerts_count: {
                response: 0
            },
            health_status_search: {
                response: {}
            },
            asset_stats_aggregate: {
                response: {}
            },
            asset_kpi_report: {
                response: []
            },
            health_status_report: {
                response: []
            },
            assets_count: {
                response: 0
            },
            region_options: {
                response: {}
            },
            route_options: {
                response: {}
            }
        };
    };

    function filterOptions() {
        return {
            assets: {}, 
            regions: {}, 
            routes: {}
        };
    };

    function selected() {
        return {
            chart: {
                type:null,
                selectedXAxel: null,
                selectedYAxel: null
            },
            date: null,
            regions: [],
            routes: [],
            assets: []
        };
    };

    const combinedReducers = combineReducers({componentSettings, data, filterOptions, selected});

    return createStore(combinedReducers, applyMiddleware(thunk));
};

export default configureAnalyticsStore;