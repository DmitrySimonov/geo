import React from 'react';
import moment from 'moment';

import HealthStatusHelper from './../../../../utils/HealthStatusHelper';
import Label from './../../../../../common/components/Label';

class StatusItem extends React.Component {
    getClass() {
        return HealthStatusHelper.getHealthStatus(this.props.healthStatus, this.props.healthStatuses).toLowerCase();
    }

    getDate() {
        return moment(this.props.timestamp).format('MMM DD');
    }

    render() {
        return (
            <div className="status-item">
                <div className={this.getClass() + " status-color"}></div>
                {(this.props.index % 5 === 0) ? <Label className="lbl-24">{this.getDate()}</Label>: null}
            </div>
        );
    }
}

export default StatusItem;