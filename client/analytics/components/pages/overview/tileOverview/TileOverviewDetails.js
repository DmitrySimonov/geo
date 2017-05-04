import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';
import 'moment-duration-format';

import { Col } from 'react-bootstrap';

import { map } from './../../../../actions';

import SwitchTile from '../../../partials/SwitchTile';
import HealthStatusHelper from './../../../../utils/HealthStatusHelper';

class TileOverviewDetails extends React.Component {
    getDateDifference(timestamp) {
        return moment.duration(moment().diff(moment(timestamp))).format('d[d]h[h]mm[m]')
    }

    render() {
        return (
            <div>
                {Object.keys(this.props.assets).map((id, i) => {
                    console.log(this.props.assets[id]);
                    if (this.props.assets[id] && this.props.assetsStatsSearch && this.props.assetsStatsSearch[this.props.assets[id]['name']]) {
                        return (
                            <Col md={3} xs={6} key={i}>
                                <SwitchTile
                                    asset={this.props.assets[id]}
                                    assetStats={(this.props.assetsStatsSearch[this.props.assets[id]['name']]) ? this.props.assetsStatsSearch[this.props.assets[id]['name']] : null}
                                    selected={this.props.selected.indexOf(this.props.assets[id]['id']) !== -1}
                                    status={HealthStatusHelper.getHealthStatus(this.props.assetsStatsSearch[this.props.assets[id]['name']]['healthStatus'], this.props.healthStatuses).toLowerCase()}
                                    assetClick={this.props.assetClick}
                                    dateDifference={this.getDateDifference(this.props.assetsStatsSearch[this.props.assets[id]['name']]['lastTrainAt'])}
                                    cancelToken={this.cancelToken}/>
                            </Col>
                        );
                    }
                    })}
            </div>
        );
    }
}


const stateMap = (state, props, ownProps) => {
    return {
        selected: state.selected.assets,
        assets: state.data.assets.response,
        assetsStatsSearch: state.data.asset_stats_search.response,
        healthStatuses: state.data.health_status_search.response
    };
};

function mapDispatchToProps (dispatch) {
    return {
        assetClick: bindActionCreators(map.assetClick, dispatch),
    };
}

export default connect(stateMap, mapDispatchToProps)(TileOverviewDetails);