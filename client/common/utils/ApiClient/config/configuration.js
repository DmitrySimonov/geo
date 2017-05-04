import * as actionConstants from '../constants/actions';
import * as endpointConstants from './endpoints';

export const METHOD_NAME_GET    = 'get';
export const METHOD_NAME_POST   = 'post';
export const METHOD_NAME_PUT    = 'put';
export const METHOD_NAME_DELETE = 'delete';

export let apiConfig = {};

/*********************************
 *
 * User management API actions
 *
 **********************************/
apiConfig[actionConstants.ACTION_USERS_LOGIN] = {
    method         : METHOD_NAME_POST,
    url            : '/users/logins',
    request_key    : 'login',
    api_name       : endpointConstants.API_ENDPOINT_USER_MANAGEMENT,
    token_required : false,
};

apiConfig[actionConstants.ACTION_USERS_RESET_PASSWORD] = {
    method         : METHOD_NAME_POST,
    url            : '/users/resets/passwords',
    request_key    : 'user',
    api_name       : endpointConstants.API_ENDPOINT_USER_MANAGEMENT,
    token_required : false
};

apiConfig[actionConstants.ACTION_USERS_VERIFY_TOKEN] = {
    method         : METHOD_NAME_GET,
    url            : '/verify/token',
    api_name       : endpointConstants.API_ENDPOINT_USER_MANAGEMENT,
};

/*********************************
 *
 * Sensor management API actions
 *
 **********************************/
apiConfig[actionConstants.ACTION_REGIONS_SEARCH] = {
    method         : METHOD_NAME_GET,
    url            : '/regions/search',
    api_name       : endpointConstants.API_ENDPOINT_SENSOR_MANAGEMENT,
    request_key    : 'region',
    response_key   : 'regions',
    cache_lifetime : 60, //-- minutes
    state_key      : 'regions'
};

apiConfig[actionConstants.ACTION_REGIONS_OPTIONS_SEARCH] = {
    method         : METHOD_NAME_GET,
    url            : '/regions/options/search',
    api_name       : endpointConstants.API_ENDPOINT_SENSOR_MANAGEMENT,
    response_key   : 'regions',
    cache_lifetime : 60, //-- minutes
    state_key      : 'region_options'
};

apiConfig[actionConstants.ACTION_ROUTES_SEARCH] = {
    method         : METHOD_NAME_GET,
    url            : '/routes/search',
    api_name       : endpointConstants.API_ENDPOINT_SENSOR_MANAGEMENT,
    request_key    : 'route',
    response_key   : 'routes',
    cache_lifetime : 60, //-- minutes
    state_key      : 'routes'
};

apiConfig[actionConstants.ACTION_ROUTES_OPTIONS_SEARCH] = {
    method         : METHOD_NAME_GET,
    url            : '/routes/options/search',
    api_name       : endpointConstants.API_ENDPOINT_SENSOR_MANAGEMENT,
    response_key   : 'routes',
    cache_lifetime : 60, //-- minutes
    state_key      : 'route_options'
};

apiConfig[actionConstants.ACTION_HEALTH_STATUS_SEARCH] = {
    method        : METHOD_NAME_GET,
    url           : '/health-statuses/search',
    api_name      : endpointConstants.API_ENDPOINT_SENSOR_MANAGEMENT,
    response_key  : 'health_statuses',
    state_key     : 'health_status_search'
};

apiConfig[actionConstants.ACTION_SENSORS_COUNT] = {
    method        : METHOD_NAME_GET,
    url           : '/sensors/count',
    api_name      : endpointConstants.API_ENDPOINT_SENSOR_MANAGEMENT,
    request_key   : 'search',
    response_key  : 'count',
    state_key     : 'assets_count'
};

apiConfig[actionConstants.ACTION_SENSORS_SEARCH] = {
    method        : METHOD_NAME_GET,
    url           : '/sensors/search',
    api_name      : endpointConstants.API_ENDPOINT_SENSOR_MANAGEMENT,
    request_key   : 'filter',
    response_key  : 'sensors',
    state_key     : 'assets'
};

apiConfig[actionConstants.ACTION_TRIGGERED_ALERTS_COUNT] = {
    method        : METHOD_NAME_GET,
    url           : '/triggered-alerts/count',
    api_name      : endpointConstants.API_ENDPOINT_SENSOR_MANAGEMENT,
    request_key   : 'search',
    response_key  : 'count',
    state_key     : 'triggered_alerts_count'
};

apiConfig[actionConstants.ACTION_TRIGGERED_ALERTS_SEARCH] = {
    method        : METHOD_NAME_GET,
    url           : '/triggered-alerts/search',
    api_name      : endpointConstants.API_ENDPOINT_SENSOR_MANAGEMENT,
    request_key   : 'filter',
    response_key  : 'alerts',
    state_key     : 'triggered_alerts_search'
};

apiConfig[actionConstants.ACTION_REGION_LOCATION_SEARCH] = {
    method        : METHOD_NAME_GET,
    url           : '/region-locations/search',
    api_name      : endpointConstants.API_ENDPOINT_SENSOR_MANAGEMENT,
    response_key  : 'response',
    request_key   : 'region',
};

apiConfig[actionConstants.ACTION_ROUTE_LOCATION_SEARCH] = {
    method        : METHOD_NAME_GET,
    url           : '/route-locations/search',
    api_name      : endpointConstants.API_ENDPOINT_SENSOR_MANAGEMENT,
    response_key  : 'response',
    request_key   : 'route',
};

/*********************************
 *
 * Data output API actions
 *
 **********************************/
apiConfig[actionConstants.ACTION_SENSOR_STATS_AGGREGATE] = {
    method        : METHOD_NAME_GET,
    url           : '/sensor-stats/aggregate',
    api_name      : endpointConstants.API_ENDPOINT_DATA_OUTPUT,
    request_key   : 'search',
    response_key  : 'stats',
    state_key     : 'asset_stats_aggregate'
};
apiConfig[actionConstants.ACTION_SENSOR_STATS_SEARCH] = {
    method        : METHOD_NAME_GET,
    url           : '/sensor-stats/search',
    api_name      : endpointConstants.API_ENDPOINT_DATA_OUTPUT,
    request_key   : 'filter',
    response_key  : 'stats',
    state_key     : 'asset_stats_search'
};
apiConfig[actionConstants.ACTION_SENSOR_KPI_STATS] = {
    method        : METHOD_NAME_GET,
    url           : '/sensor-kpis/stats',
    api_name      : endpointConstants.API_ENDPOINT_DATA_OUTPUT,
    request_key   : 'filter',
    response_key  : 'kpi',
    state_key     : 'asset_kpi_stats'
};
apiConfig[actionConstants.ACTION_SENSOR_KPI_REPORT] = {
    method        : METHOD_NAME_GET,
    url           : '/sensor-kpis/report',
    api_name      : endpointConstants.API_ENDPOINT_DATA_OUTPUT,
    request_key   : 'filter',
    response_key  : 'report',
    state_key     : 'asset_kpi_report'
};
apiConfig[actionConstants.ACTION_HEALTH_STATUS_REPORT] = {
    method        : METHOD_NAME_GET,
    url           : '/sensor-healths/report',
    api_name      : endpointConstants.API_ENDPOINT_DATA_OUTPUT,
    request_key   : 'filter',
    response_key  : 'report',
    state_key     : 'health_status_report'
};