import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LazyLoad from 'react-lazyload';
import { analytics } from './../../../../actions';
import AnalyticsSubBar from './../../../partials/subBar/AnalyticsSubBar';
import RightSideBar from '../../../partials/RightSideBar';
import axios from 'axios';
import Map from './../../../partials/maps/Map';
import { translate } from 'react-i18next';

class Overview extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.cancelToken = axios.CancelToken.source();
        this.props.loadOverviewMapData({}, this.cancelToken.token);
    }
    componentWillUnmount(){
        this.props.cancelPendingRequests(this.cancelToken);
    }
    render() {
        let {t} = this.props;
        return (
            <div>
                <AnalyticsSubBar
                    title={t('map overview')}
                    export={true}
                    lastUpdated="Fri Apr23, 2017 to  Tue Apr29"
                />
                <RightSideBar />
                <div className="map-wrapper">
                    <LazyLoad height="auto">
                        <Map center={this.props.configuration.center}
                            zoom={this.props.configuration.zoom} />
                    </LazyLoad>
                </div>
            </div>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        configuration: state.componentSettings.map
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(analytics, dispatch);
}

const ConnectedOverview = connect(stateMap, mapDispatchToProps)(Overview);

export default translate(['common'])(ConnectedOverview);