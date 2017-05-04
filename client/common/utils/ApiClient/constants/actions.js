/*********************************
 *
 * User management API actions
 *
 **********************************/
//-- users
export const ACTION_USERS_LOGIN                  = 'login';
export const ACTION_USERS_RESET_PASSWORD         = 'reset_password';
export const ACTION_USERS_VERIFY_TOKEN           = 'verify_token';

/*********************************
 * 
 * Redirect actions
 * 
 *********************************/
export const ACTION_REDIRECT    = 'redirect';


/*********************************
 *
 * Data output API actions
 *
 **********************************/
//-- sensor stats
export const ACTION_SENSOR_STATS_SEARCH         = 'sensor_stats_search';
export const ACTION_SENSOR_STATS_AGGREGATE      = 'sensor_stats_aggregate';

//-- kpi stats / report
export const ACTION_SENSOR_KPI_STATS            = 'sensor_kpi_stats';
export const ACTION_SENSOR_KPI_REPORT           = 'sensor_kpi_report';
export const ACTION_HEALTH_STATUS_REPORT        = 'sensor_health_status_report';

/*********************************
 *
 * Sensor management API actions
 *
 **********************************/
//-- sensors
export const ACTION_SENSORS_SEARCH              = 'sensors_search';
export const ACTION_SENSORS_COUNT               = 'sensors_count';
//-- triggered alerts
export const ACTION_TRIGGERED_ALERTS_SEARCH     = 'triggered_alerts_search';
export const ACTION_TRIGGERED_ALERTS_COUNT      = 'triggered_alerts_count';

export const ACTION_REGIONS_OPTIONS_SEARCH      = 'regions_options_search';
export const ACTION_ROUTES_OPTIONS_SEARCH       = 'routes_options_search';
export const ACTION_ROUTES_SEARCH               = 'routes_search';
export const ACTION_REGIONS_SEARCH              = 'regions_search';
export const ACTION_HEALTH_STATUS_SEARCH        = 'health_status_search';
export const ACTION_REGION_LOCATION_SEARCH      = 'region_location_search';
export const ACTION_ROUTE_LOCATION_SEARCH       = 'route_location_search';