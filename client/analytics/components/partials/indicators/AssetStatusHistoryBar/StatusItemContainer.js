import React from 'react';
import {connect} from 'react-redux';

import StatusItem from './StatusItem';

class StatusItemContainer extends React.Component {
    render() {
        return (
            <StatusItem
                key={this.props.index}
                index={this.props.index}
                healthStatuses={this.props.healthStatuses}
                healthStatus={this.props.healthStatus}
                timestamp={this.props.timestamp}
            />
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        index: props.index,
        healthStatus: props.healthStatus ? props.healthStatus : '',
        timestamp: props.timestamp ? props.timestamp : 0,
        healthStatuses: props.healthStatuses
    };
};

export default connect(stateMap, null)(StatusItemContainer);