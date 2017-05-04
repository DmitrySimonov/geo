import * as environmentConstants from '../../EnvironmentHelper/constants/environments';

export const API_ENDPOINT_USER_MANAGEMENT   = 'user_management';
export const API_ENDPOINT_SENSOR_MANAGEMENT = 'sensor_management';
export const API_ENDPOINT_DATA_OUTPUT       = 'data_output';

export let endpoints = {};

endpoints[environmentConstants.ENVIRONMENT_LOCAL]         = {};
endpoints[environmentConstants.ENVIRONMENT_DEVELOP]      = {};
endpoints[environmentConstants.ENVIRONMENT_PRODUCTION]   = {};

// endpoints[environmentConstants.ENVIRONMENT_LOCAL][API_ENDPOINT_USER_MANAGEMENT]          = 'http://user-management.dev';
// endpoints[environmentConstants.ENVIRONMENT_LOCAL][API_ENDPOINT_SENSOR_MANAGEMENT]        = 'http://sensor-management.dev';
// endpoints[environmentConstants.ENVIRONMENT_LOCAL][API_ENDPOINT_DATA_OUTPUT]              = 'http://data-output.dev';

endpoints[environmentConstants.ENVIRONMENT_LOCAL][API_ENDPOINT_USER_MANAGEMENT]          = 'http://user-management.konux-dev.de';
endpoints[environmentConstants.ENVIRONMENT_LOCAL][API_ENDPOINT_SENSOR_MANAGEMENT]        = 'http://sensor-management.konux-dev.de';
endpoints[environmentConstants.ENVIRONMENT_LOCAL][API_ENDPOINT_DATA_OUTPUT]              = 'http://data-output.konux-dev.de';

endpoints[environmentConstants.ENVIRONMENT_DEVELOP][API_ENDPOINT_USER_MANAGEMENT]       = 'http://user-management.konux-dev.de';
endpoints[environmentConstants.ENVIRONMENT_DEVELOP][API_ENDPOINT_SENSOR_MANAGEMENT]     = 'http://sensor-management.konux-dev.de';
endpoints[environmentConstants.ENVIRONMENT_DEVELOP][API_ENDPOINT_DATA_OUTPUT]           = 'http://data-output.konux-dev.de';

endpoints[environmentConstants.ENVIRONMENT_PRODUCTION][API_ENDPOINT_USER_MANAGEMENT]    = 'http://user-management.konux-cloud.com';
endpoints[environmentConstants.ENVIRONMENT_PRODUCTION][API_ENDPOINT_SENSOR_MANAGEMENT]  = 'http://sensor-management.konux-cloud.com';
endpoints[environmentConstants.ENVIRONMENT_PRODUCTION][API_ENDPOINT_DATA_OUTPUT]        = 'http://data-output.konux-cloud.com';