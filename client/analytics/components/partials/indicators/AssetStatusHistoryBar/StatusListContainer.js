import React from 'react';
import {connect} from 'react-redux';

import StatusList from './StatusList';

class StatusListContainer extends React.Component {
    render() {
        return (
            <StatusList
                data={this.props.data}
                healthStatuses={this.props.healthStatuses}/>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        data: props.data,
        healthStatuses: props.healthStatuses
    };
};

export default connect(stateMap, null)(StatusListContainer);