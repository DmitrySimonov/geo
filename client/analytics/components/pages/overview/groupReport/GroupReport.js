import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import axios from 'axios';

import {analytics} from './../../../../actions';

import GroupReportDetails from './GroupReportDetails';
import Scrollbars from 'konux/common/components/Scrollbars';
import AnalyticsSubBar from './../../../partials/subBar/AnalyticsSubBar';
import FormWrap from 'konux/common/components/FormWrap';
import { translate } from 'react-i18next';

class GroupReport extends React.Component {
    componentWillMount() {
        this.cancelToken = axios.CancelToken.source();
        this.props.loadGroupReportData(this.props.assets, this.cancelToken.token);
    }

    componentWillReceiveProps(nextProps) {
        this.cancelToken = axios.CancelToken.source();
        this.props.loadGroupReportData(nextProps.assets, this.cancelToken.token);
    }

    componentWillUnmount() {
        this.props.cancelPendingRequests(this.cancelToken);
    }

    render() {
        let {t} = this.props;
        return (
            <FormWrap className="full-width group-report">
                <AnalyticsSubBar
                    title={t('group report')}
                    export={true}
                    lastUpdated="Fri Apr23, 2017 to  Tue Apr29"
                />
                <Scrollbars
                    renderTrackHorizontal="track-horizontal"
                    renderTrackVertical="track-vertical"
                    renderView="group-report-view">
                    <GroupReportDetails />
                </Scrollbars>
            </FormWrap>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {assets: state.filterOptions.assets};
};

function mapDispatchToProps(dispatch) {
    return {
        loadGroupReportData : bindActionCreators(analytics.loadGroupReportData, dispatch),
        cancelPendingRequests : bindActionCreators(analytics.cancelPendingRequests, dispatch)
    };
}

const ConnectedGroupReport = connect(stateMap, mapDispatchToProps)(GroupReport);

export default translate(['common'])(ConnectedGroupReport);