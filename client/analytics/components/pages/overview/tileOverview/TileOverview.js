import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row } from 'react-bootstrap';

import { analytics } from './../../../../actions';

import RightSideBar from 'konux/analytics/components/partials/RightSideBar';
import FormWrap from 'konux/common/components/FormWrap';
import Scrollbars from 'konux/common/components/Scrollbars';
import AnalyticsSubBar from './../../../partials/subBar/AnalyticsSubBar';
import Loading from './../../../partials/loading/Loading';
import TileOverviewDetails from './TileOverviewDetails';
import { translate } from 'react-i18next';

class TileOverview extends React.Component {
    componentWillMount() {
            this.cancelToken = axios.CancelToken.source();
            this.props.loadOverviewTileData(this.props.assets, this.cancelToken.token);
    }

    componentWillUnmount() {
        this.props.cancelPendingRequests(this.cancelToken);
    }

    componentWillReceiveProps(nextProps) {
            this.cancelToken = axios.CancelToken.source();
            this.props.loadOverviewTileData(nextProps.assets, this.cancelToken.token);
    }

    render() {
        let {t} = this.props;
        return (
            <FormWrap className="full-width">
                <AnalyticsSubBar
                    title={t('tile overview')}
                    lastUpdated="Fri Apr23, 2017 to  Tue Apr29"/>
                    <FormWrap className="tiles-wrapper">
                        <Scrollbars
                            autoHeightMax={'82vh'}
                            renderTrackHorizontal="track-horizontal"
                            renderTrackVertical="track-vertical"
                            renderView={props => <div {...props} />}>
                            <Row>
                                <div className="inner-tiles-wrapper">
                                    <Loading loading={!this.props.assets}>
                                        <TileOverviewDetails />
                                    </Loading>
                                </div>
                            </Row>
                        </Scrollbars>
                    </FormWrap>
                <RightSideBar/>
            </FormWrap>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {assets: state.filterOptions.assets};
};

function mapDispatchToProps (dispatch) {
    return {
        loadOverviewTileData: bindActionCreators(analytics.loadOverviewTileData, dispatch),
        cancelPendingRequests: bindActionCreators(analytics.cancelPendingRequests, dispatch)
    };
}

const ConnectedTileOverview = connect(stateMap, mapDispatchToProps)(TileOverview);

export default translate(['common'])(ConnectedTileOverview);