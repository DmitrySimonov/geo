import React from 'react';

import { connect } from 'react-redux';
import { AxelType, ChartType } from './../../../../constants';
import { analytics } from './../../../../actions';
import { bindActionCreators } from 'redux';

import Scrollbars from 'konux/common/components/Scrollbars';
import FormWrap from 'konux/common/components/FormWrap';
import BlockWrapper from 'konux/common/components/BlockWrapper';
import SubBar from './../../../partials/SubBar';
import AssetSelectorContainer from './../../../partials/assetSelector';
import AssetsContentWrapper from './../../../partials/AssetsContentWrapper';
import AnalyticsSubBar from './../../../partials/subBar/AnalyticsSubBar';

import PredictionChart from './PredictionChart';
import DistributionCandleChart from './DistributionCandleChart';
import DistributionLineChart from './DistributionLineChart';
import MeasuredData from './MeasuredData';
import CorrelationChart from './CorrelationChart';
import { translate } from 'react-i18next';

class AssetAnalytics extends React.Component{
    componentWillReceiveProps(nextProps){
        if (nextProps.selectedSwitch) {
            this.props.loadMeasurmentData([nextProps.selectedSwitch]);
        }
        else if (this.props.switches && this.props.switches.length > 1){
            this.props.loadMeasurmentData(this.props.switches);
        }
    }
    getChart(selectedType){
        switch(selectedType){
            case ChartType.SHOW_ASSET_PREDICTION_CHART:
                return <PredictionChart />;
            case ChartType.SHOW_ASSET_DISTRIBUTION_LINE_CHART:
                return <DistributionLineChart />;
            case ChartType.SHOW_ASSET_DISTRIBUTION_CANDLE_CHART:
                return <DistributionCandleChart/>;
            case ChartType.SHOW_ASSET_CORRELATION_CHART:
                return <CorrelationChart />;
            case ChartType.SHOW_ASSET_MEASURED_CHART:
                return <MeasuredData />;
            default:
                return <PredictionChart />;
        }
    }
    render(){
        let {t} = this.props;
        return(
            <AssetsContentWrapper>
                <AssetSelectorContainer
                    selectedId={this.props.selectedId} 
                    switches={this.props.switches} 
                    switchClick={this.props.switchClick} 
                    loadMeasurmentData={this.props.loadMeasurmentData}
                    loadMeasurmentMap={this.props.loadMeasurmentMap}/>
                <FormWrap className="page-wrap full-width asset-analytics">
                    <AnalyticsSubBar
                        title={t('asset analytics')}
                        export={true}
                        lastUpdated="Fri Apr23, 2017 to  Tue Apr29"
                    />
                    <BlockWrapper className="page-inner-wrap">
                        <Scrollbars
                            renderTrackHorizontal="track-horizontal"
                            renderTrackVertical="track-vertical"
                            renderView="asset-analytics-view group-analytics-view" >
                            <FormWrap className="asset-analytics-wrapper group-analytics-wrapper">
                                {this.getChart(this.props.selectedType)}
                            </FormWrap>
                        </Scrollbars>
                    </BlockWrapper>
                </FormWrap>
            </AssetsContentWrapper>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        // switches: switches,
        // selectedSwitch: selectedSwitch,
        // measurments: selectedSwitch ? selectedSwitch.measurments : null,
        selectedType: state.selected.chart.type && state.selected.chart.type.name ? state.selected.chart.type.name : ChartType.SHOW_ASSET_PREDICTION_CHART,
        // selectedXAxel: state.chart.selectedXAxel? state.chart.selectedXAxel[0].name : AxelType.SPEED_AXEL,
        // selectedYAxel: state.chart.selectedYAxel? state.chart.selectedYAxel[0].name : AxelType.WSH_AXEL
        switches: null,
        selectedSwitch: Object.values(state.data.assets.response)[0],
        measurments: null,
        selectedXAxel: null,
        selectedYAxel: null
    };
};

function mapDispatchToProps(dispatch) {
    return {
        loadMeasurmentData: () => null,
        // loadMeasurmentData:bindActionCreators(analytics.loadMeasurmentData, dispatch),
        // switchClick:bindActionCreators(analytics.switchClick, dispatch)
    };
};

const ConnectedAssetAnalytics = connect(stateMap, mapDispatchToProps)(AssetAnalytics);

export default translate(['common'])(ConnectedAssetAnalytics);