import React from 'react';
import {connect} from 'react-redux';

import moment from 'moment';

import FormWrap from 'konux/common/components/FormWrap';
import StatusHistoryContainer from './StatusHistoryContainer';
import HealthStatusChart from './HealthStatusChart';
import GroupReportSummary from './GroupReportSummary';
import {Row, Col} from 'react-bootstrap';
import { translate } from 'react-i18next';

class GroupReportDetails extends React.Component {
    getHealthStatusData(healthStatusReportData) {
        let result = [];

        if (healthStatusReportData && Array.isArray(healthStatusReportData)) {
            healthStatusReportData.map((entry) => {
                result.push({
                    xValue: new Date(moment.unix(entry.timestamp)),
                    good: parseInt(entry.healthStatus.good),
                    warning: parseInt(entry.healthStatus.warning),
                    error: parseInt(entry.healthStatus.error)
                });
            });
        }

        return result;
    }

    getStatusHistoryData(assetStatsAggregated) {
        let result = [];
        let totalNumber = 0;

        if (assetStatsAggregated && Object.keys(assetStatsAggregated).length !== 0) {
            Object.keys(assetStatsAggregated.condition).map((key) => {
                result.push({
                    status: key,
                    value: assetStatsAggregated.condition[key]
                });
                totalNumber += parseInt(assetStatsAggregated.condition[key]);
            });
            result.push({
                "status": "total",
                "value": totalNumber,
                "alpha": 0
            });
        }
        return result;
    }

    render() {
        let {t} = this.props;
        return(
            <FormWrap className="group-report-wrapper">
                <FormWrap className="full-width">
                    <Row>
                        <Col md={6}>
                            <StatusHistoryContainer
                                data={this.getStatusHistoryData(this.props.assetStatsAggregate)}
                                valueField={'value'}
                                title={t('status history')}
                                description={t('Switches condition')}
                            />
                        </Col>
                        <Col md={6}>
                            <GroupReportSummary
                                assetStatsAggregate={this.props.assetStatsAggregate}
                                triggeredAlertsCount={this.props.triggeredAlertsCount}
                                assetsCount={this.props.assetsCount}
                            />
                        </Col>
                    </Row>
                    <HealthStatusChart data={this.getHealthStatusData(this.props.healthStatusReport)}/>
                </FormWrap>
            </FormWrap>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        assetStatsAggregate: state.data.asset_stats_aggregate.response,
        healthStatusReport: state.data.health_status_report.response,
        triggeredAlertsCount: state.data.triggered_alerts_count.response,
        assetsCount: state.data.assets_count.response,
    };
};

const ConnectedGroupReportDetails = connect(stateMap, null)(GroupReportDetails);

export default translate(['common'])(ConnectedGroupReportDetails);