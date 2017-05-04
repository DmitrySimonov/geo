export const HEALTH_STATUS_GOOD     = 'GOOD';
export const HEALTH_STATUS_WARNING  = 'WARNING';
export const HEALTH_STATUS_ERROR    = 'ERROR';
export const HEALTH_STATUS_INACTIVE = 'INACTIVE';

class HealthStatusHelper {
    static getHealthStatus(healthStatus, healthStatusRanges) {
        let response = HEALTH_STATUS_INACTIVE;
        if (Object.keys(healthStatusRanges).length !== 0 && typeof healthStatus !== 'undefined') {
            Object.keys(healthStatusRanges).map((key, i) => {
                if (healthStatusRanges[key]['min'] >= healthStatus >= healthStatusRanges[key]['min']) {
                    response = healthStatusRanges[key]['name'];
                }
            });
        }

        return response.toUpperCase();
    }
}

export default HealthStatusHelper;