import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import axios from 'axios';

import {analytics} from './../../../../actions';

import AssetReportDetails from './AssetReportDetails';
import AnalyticsSubBar from './../../../partials/subBar/AnalyticsSubBar';
import Scrollbars from 'konux/common/components/Scrollbars';
import FormWrap from 'konux/common/components/FormWrap';
import SubBar from './../../../partials/SubBar';
import SubBarHeader from './../../../partials/SubBarHeader';
import AssetSelectorContainer from './../../../partials/assetSelector';
import AssetsContentWrapper from './../../../partials/AssetsContentWrapper';
import BlockWrapper from 'konux/common/components/BlockWrapper';
import { translate } from 'react-i18next';


class AssetReport extends React.Component {
    componentWillMount() {
        this.cancelToken = axios.CancelToken.source();
        this.props.loadAssetReportData(this.cancelToken.token, this.props.selected.assets, this.props.assets);
    }

    componentWillReceiveProps(nextProps) {
        //-- create a cancel token to pass it to the action
        this.cancelToken = axios.CancelToken.source();
        this.props.loadAssetReportData(this.cancelToken.token, nextProps.selected.assets, nextProps.assets);
    }

    componentWillUnmount() {
        if (this.cancelToken) {
            this.props.cancelPendingRequests(this.cancelToken);
        }
    }

    render() {
        let {t} = this.props;
        return (
            (this.props.selected && this.props.assets) ?
                <AssetsContentWrapper>
                    <AssetSelectorContainer assetClick={this.props.assetClick}/>
                    <FormWrap className="asset-report">
                        <AnalyticsSubBar
                            title={t('Asset Report')}
                            export={true}
                            lastUpdated="Fri Apr23, 2017 to  Tue Apr29"
                        />
                        <BlockWrapper className="asset-inner-wrap">
                            <Scrollbars
                                renderTrackHorizontal="track-horizontal"
                                renderTrackVertical="track-vertical"
                                renderView="asset-report-view">
                                <AssetReportDetails />
                            </Scrollbars>
                        </BlockWrapper>
                    </FormWrap>
                </AssetsContentWrapper> : null
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selected: state.selected,
        assets: state.data.assets.response,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        loadAssetReportData: bindActionCreators(analytics.loadAssetReportData, dispatch),
        cancelPendingRequests: bindActionCreators(analytics.cancelPendingRequests, dispatch),
        assetClick: bindActionCreators(analytics.assetPageClick, dispatch),
    };
}

const ConnectedAssetReport = connect(stateMap, mapDispatchToProps)(AssetReport);

export default translate(['common'])(ConnectedAssetReport);