import React, { Component } from "react";
import { analytics } from './../../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Scrollbars from 'konux/common/components/Scrollbars';
import Table from './../../partials/tables/Table';

import AnalyticsSubBar from './../../partials/subBar/AnalyticsSubBar';
import FormWrap from 'konux/common/components/FormWrap';
import SubBar from './../../partials/SubBar';
import _ from 'lodash';
import { translate } from 'react-i18next';

let sensor = [
    {
        'axles':48,
        'batteryLevel':null,
        'healthStatus':0.78610354724638,
        'load':26.835846176444,
        'noTrains':0,
        'rms':1.0786103547246,
        'speed':187.46,
        'temperature':null,
        'timestamp':1486529202000,
        'wshMax':0.78610354724638,
        'wshMin':0,
        'wshStd':0,
    },
    {
        'axles':48,
        'batteryLevel':null,
        'healthStatus':0.78610354724638,
        'load':26.835846176444,
        'noTrains':0,
        'rms':1.0786103547246,
        'speed':187.46,
        'temperature':null,
        'timestamp':1486529202000,
        'wshMax':0.78610354724638,
        'wshMin':0,
        'wshStd':0,
    },
    {
        'axles':48,
        'batteryLevel':null,
        'healthStatus':0.78610354724638,
        'load':26.835846176444,
        'noTrains':0,
        'rms':1.0786103547246,
        'speed':187.46,
        'temperature':null,
        'timestamp':1486529202000,
        'wshMax':0.78610354724638,
        'wshMin':0,
        'wshStd':0,
    }
];
class SensorLog extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortedArr : this.props.sensor,
            sortType: null,
            sortName: null
        };
    }
    componentWillMount(){
        // this.props.loadSensorLog(this.props.switches);
    }
    onSort(value){
            this.setState({sortName: value});
            if(this.state.sortType !== 'asc'){
                this.setState({sortType: 'asc'});
                this.setState({sortedArr: _.sortBy(this.props.sensor, [value])});
            }else{
                this.setState({sortType: 'desc'});
                this.setState({sortedArr: _.sortBy(this.props.sensor, [value]).reverse()});
            }
            this.getClassName(value);
    }
    getClassName(value){
        if(this.state.sortName === value && this.state.sortType === 'asc'){            
            this.setState({sortType: 'desc'}); 
        }else if(this.state.sortName === value && this.state.sortType === 'desc'){
            this.setState({sortType: 'asc'}); 
        }else{
            return '';
        }
    }
    render() {
        let {t} = this.props;
        return (
            <FormWrap className="list-height">
                    <AnalyticsSubBar
                        title={t('sensor log')}
                        export={true}
                        lastUpdated="Fri Apr23, 2017 to  Tue Apr29"
                    />
                <div className="list-table">
                <Scrollbars
                    renderTrackHorizontal="track-horizontal" 
                    renderTrackVertical="track-vertical" 
                    renderView="table-view" >
                    <div className="inner-wrap-table">
                        <Table
                            onClick={this.onSort}
                            sortClassName={this.state.sortType}
                            headers={[
                                t('sensor name'),
                                t('time'),
                                t('battery level'),
                                t('wake up source'),
                                t('measurement'),
                                t('connection'),
                                t('signal level'),
                                t('last update')
                            ]}
                            rows={this.state.sortedArr}>
                        </Table>
                    </div>
                    </Scrollbars> 
                </div>
            </FormWrap>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        sensor: sensor ? sensor : null,
    };
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(analytics, dispatch);
};
const ConnectedSensorLog = connect(stateMap, null)(SensorLog);

export default translate(['common'])(ConnectedSensorLog);