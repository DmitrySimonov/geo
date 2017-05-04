import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import axios from 'axios';

import { analytics } from './../../../actions';

import GroupMarkerInfo from './GroupMarkerInfo';
import Loading from './../loading/Loading';

import HealthStatusHelper from './../../../utils/HealthStatusHelper';

class GroupMarkerInfoContainer extends React.Component {
    componentWillMount() {
        this.cancelToken = axios.CancelToken.source();
        this.props.getAssetGroupInfo(this.props.assetIds);
    }

    componentWillUnmount() {
        this.props.cancelPendingRequests(this.cancelToken);
    }

    getChartData(data) {
        let chartData = [];

        for (let i = 0; i < Object.keys(data).length; i++) {
            chartData.push({
                value: data[Object.keys(data)[i]],
                status: Object.keys(data)[i]
            });
        }

        return chartData;
    }

    render() {
        return (
            <Loading loading={this.props.loading}>
                <GroupMarkerInfo
                    triggeredAlertCount={this.props.triggeredAlertCount}
                    chartData={this.getChartData(this.props.assetStatsAggregate.condition)}
                    receivedData={this.props.assetStatsAggregate.receivedData}
                    connectedDevices={this.props.assetStatsAggregate.connectedDevices}
                    healthStatus={HealthStatusHelper.getHealthStatus(this.props.assetStatsAggregate.healthStatus, this.props.healthStatuses)}
                />
            </Loading>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    const loading = (
        typeof state.data.asset_stats_aggregate.response === 'undefined' ||
        typeof state.data.triggered_alerts_count.response === 'undefined' ||
        typeof state.data.health_status_search.response === 'undefined'
    );

    return {
        loading: loading,
        assetStatsAggregate: state.data.asset_stats_aggregate.response,
        triggeredAlertCount: state.data.triggered_alerts_count.response,
        healthStatuses: state.data.health_status_search.response
    };
};

function mapDispatchToProps(dispatch) {
    return  {
        getAssetGroupInfo: bindActionCreators(analytics.getAssetGroupInfo, dispatch),
        cancelPendingRequests: bindActionCreators(analytics.cancelPendingRequests, dispatch)
    };
}

export default connect(stateMap, mapDispatchToProps)(GroupMarkerInfoContainer);