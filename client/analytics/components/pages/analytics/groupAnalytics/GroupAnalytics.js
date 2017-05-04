import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {analytics} from './../../../../actions';
import Scrollbars from 'konux/common/components/Scrollbars';
import AnalyticsSubBar from './../../../partials/subBar/AnalyticsSubBar';
import { ChartType } from './../../../../constants';
import FormWrap from 'konux/common/components/FormWrap';
import SubBar from './../../../partials/SubBar';
import GroupPredictionChart from './GroupPredictionChart';
import DataDistributionChart from './DataDistributionChart';
import { translate } from 'react-i18next';

class GroupReportAnalytics extends React.Component{
    componentWillMount(){
        if (this.props.switches && this.props.switches.length > 1){
            this.props.loadMeasurmentData(this.props.switches);
        }
    }
    getChart(selectedType){
        switch(selectedType){
            case ChartType.SHOW_GROUP_CORRELATION_CHART:
                return <GroupPredictionChart />;
            case ChartType.SHOW_GROUP_DISTRIBUTION_CANDLE_CHART:
                return <DataDistributionChart />;
            default: 
                return <DataDistributionChart />;
           }
    }
    render(){
        let {t} = this.props;
        return(
            <FormWrap className="page-wrap full-width">
                <AnalyticsSubBar
                    title={t('group analytics')}
                    export={true}
                    lastUpdated="Fri Apr23, 2017 to  Tue Apr29"
                />
                <div className="page-inner-wrap">
                        <Scrollbars 
                            renderTrackHorizontal="track-horizontal"
                            renderTrackVertical="track-vertical"
                            renderView="group-analytics-view" >
                            <FormWrap className="asset-analytics-wrapper">
                                {this.getChart(this.props.selectedType)}
                            </FormWrap>
                        </Scrollbars>
                    </div>
            </FormWrap>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        // switches: switches,
        selectedType: state.selected.chart.type ? state.selected.chart.type.name : ChartType.SHOW_GROUP_DISTRIBUTION_CANDLE_CHART,
        // selectedXAxel: state.chart.selectedXAxel,
        // selectedYAxel: state.chart.selectedYAxel
        switches: null,
        selectedXAxel: null,
        selectedYAxel: null
    };
};

function mapDispatchToProps(dispatch) {
    return {
        // loadMeasurmentData:bindActionCreators(analytics.loadMeasurmentData, dispatch),
        // clearChartSettings:bindActionCreators(chart.clearChartSettings, dispatch),
        // clearAxels: bindActionCreators(chart.clearAxels, dispatch)
    };
};

const ConnectedGroupReportAnalytics = connect(stateMap, mapDispatchToProps)(GroupReportAnalytics);

export default translate(['common'])(ConnectedGroupReportAnalytics);