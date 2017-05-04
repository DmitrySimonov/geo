import React from 'react';
import {connect} from 'react-redux';

import FormWrap from 'konux/common/components/FormWrap';
import SingleInfoIndicatorContainer from './../../../partials/indicators/SingleInfoIndicatorContainer';
import { translate } from 'react-i18next';

class GroupReportSummary extends React.Component{
    render(){
        let {t} = this.props;
        return(
            <FormWrap className="summary-wrapper">
                <SingleInfoIndicatorContainer
                    title={t('total alerts')}
                    value={this.props.totalAlerts}
                    unitOfMeasure={t('Alerts')}
                />

                <SingleInfoIndicatorContainer
                    title={t('connected devices')}
                    value={this.props.connectedDevices}
                    unitOfMeasure={t('devices')}
                    outOf={this.props.assetsCount}
                />

                <SingleInfoIndicatorContainer
                    title={t('transmitted data')}
                    value={this.props.receivedData}
                    unitOfMeasure={t('gb')}
                />
            </FormWrap>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        receivedData: (props.assetStatsAggregate.receivedData) ? props.assetStatsAggregate.receivedData : 0,
        connectedDevices: (props.assetStatsAggregate.connectedDevices) ? props.assetStatsAggregate.connectedDevices : 0,
        totalAlerts: (props.triggeredAlertsCount) ? props.triggeredAlertsCount : 0,
        assetsCount: (props.assetsCount) ? props.assetsCount : 0
    };
};

const ConnectedGroupReportSummary = connect(stateMap, null)(GroupReportSummary);

export default translate(['common'])(ConnectedGroupReportSummary);