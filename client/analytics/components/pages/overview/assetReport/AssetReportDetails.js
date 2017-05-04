import React from 'react';
import {connect} from 'react-redux';

import moment from 'moment';

import LineChartContainer from './../../../partials/charts/LineChartContainer';
import {Row, Col} from 'react-bootstrap';
import AssetStatusHistory from './../../../partials/indicators/AssetStatusHistoryBar';
import AssetSummary from './AssetSummary';
import Block from './../../../partials/Block';
import LastMeasurementsTable from './LastMeasurementsTable';
import { translate } from 'react-i18next';

class AssetReportDetails extends React.Component {
    getWshChartData() {
        return this.props.assetKpiReport.map((element) => (
            {
                xValue: new Date(moment(element.timestamp)),
                yValue: element.wshMax.toFixed(2)
            })
        );
    }

    getTemperatureChartData() {
        return this.props.assetKpiReport.map((element) => (
            {
                xValue: new Date(moment(element.timestamp)),
                yValue: (element.temperature) ? element.temperature.toFixed(2) : 0
            })
        );
    }

    render() {
        let {t} = this.props;
        return (
            <div>
                <Row>
                    <Col md={12}>
                        <Block className="mb-50">
                            <AssetStatusHistory assetKpiStats={this.props.assetKpiReport} />
                        </Block>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Block>
                            <LineChartContainer title={t('whsl chart')} data={this.getWshChartData()}/>
                            <LineChartContainer title={t('temperature chart')} data={this.getTemperatureChartData()} />
                        </Block>
                    </Col>
                    <Col md={6}>
                        <AssetSummary assetKpiStats={(this.props.assetKpiStats) ? this.props.assetKpiStats['A00005'] : {}}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <LastMeasurementsTable rows={this.props.assetKpiReport} />
                    </Col>
                </Row>
            </div>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        assetKpiReport: state.data.asset_kpi_report.response,
        assetKpiStats: state.data.asset_kpi_stats.response
    };
};

const ConnectedAssetReportDetails = connect(stateMap, null)(AssetReportDetails);

export default translate(['common'])(ConnectedAssetReportDetails);