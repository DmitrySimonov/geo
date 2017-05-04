import React from 'react';

import StatusItemContainer from './StatusItemContainer';

class StatusList extends React.Component {
    render() {
        return (
            <div className="status-list">
                {
                    Object.keys(this.props.data).map((key, i) => (
                        <StatusItemContainer
                            key={i}
                            index={i}
                            healthStatus={this.props.data[key]['healthStatus']}
                            timestamp={this.props.data[key]['timestamp']}
                            healthStatuses={this.props.healthStatuses}/>
                        )
                    )
                }
            </div>
        );
    }
}

export default StatusList;