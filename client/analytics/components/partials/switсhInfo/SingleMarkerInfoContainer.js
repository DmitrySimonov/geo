import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { analytics } from './../../../actions';
import Loading from './../loading/Loading';
import _ from 'lodash';
import SingleMarkerInfo from './SingleMarkerInfo';
import HealthStatusHelper, { HEALTH_STATUS_ERROR } from './../../../utils/HealthStatusHelper';

class SingleMarkerInfoContainer extends React.Component {
    componentWillMount() {
        this.cancelToken = axios.CancelToken.source();
        this.props.getAssetInfo(this.props.asset, this.cancelToken.token);
    }

    componentWillUnmount() {
        this.props.cancelPendingRequests(this.cancelToken);
    }

    render() {
        return (
            <SingleMarkerInfo
                measuredTrains={this.props.measuredTrains}
                receivedData={this.props.receivedData}
                overallLoad={this.props.overallLoad}
                healthStatus={HealthStatusHelper.getHealthStatus(this.props.healthStatus, this.props.healthStatuses)}
                connectedDevices={this.props.connectedDevices}
                triggeredAlertCount={this.props.triggeredAlertCount}
                healthStatusError={HEALTH_STATUS_ERROR} />
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        measuredTrains: _.get(state, ['state','data','asset_kpi_stats','response', props.asset.name, 'noTrains'], 0),
        receivedData: _.get(state, ['state','data','asset_kpi_stats','response', props.asset.name, 'receivedData'], 0),
        overallLoad: _.get(state, ['state','data','asset_kpi_stats','response', props.asset.name, 'load'], 0),
        healthStatus: _.get(state, ['state','data','asset_kpi_stats','response', props.asset.name, 'healthStatus'], 0),
        connectedDevices: _.get(state, ['state','data','asset_stats_aggregate','response', props.asset.name, 'connectedDevices'], 0),
        triggeredAlertCount: state.data.triggered_alerts_count.response,
        healthStatuses: state.data.health_status_search.response
    };
};

function mapDispatchToProps(dispatch) {
    return  {
        getAssetInfo: bindActionCreators(analytics.getAssetInfo, dispatch),
        cancelPendingRequests: bindActionCreators(analytics.cancelPendingRequests, dispatch)
    };
}
export default connect(stateMap, mapDispatchToProps)(SingleMarkerInfoContainer);