import React, { Component } from "react";
import { modal  } from './../../../../common/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router';
import * as ModalType from './../../../constants/modalType';
import Scrollbars from 'konux/common/components/Scrollbars';
import Table from './../../partials/tables/Table';
import AnalyticsSubBar from './../../partials/subBar/AnalyticsSubBar';
import FormWrap from 'konux/common/components/FormWrap';
import SubBar from './../../partials/SubBar';
import Image from 'konux/common/components/Image';
import Pager from 'konux/common/components/Pager';
import _ from 'lodash';
import { translate } from 'react-i18next';

let alerts =[
    {
        'name': '1',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '2',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '3',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '4',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '5',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '6',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '7',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '8',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '9',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '10',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '11',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '12',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '13',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '14',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '15',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '16',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '17',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '18',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '9',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '10',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '11',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '12',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '13',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '14',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '15',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '16',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '17',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    },
    {
        'name': '18',
        'date':'8 Sep 15:35',
        'type':'Threshold exceeded',
        'event':'WHS R',
        'coordinates':'11.43.43.54 - 44.54.23.44'
    }
];
class Alers extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortedArr : alerts,
            sortType: null,
            sortName: null
        };
    }
    componentWillMount(){
        this.setState({sortedArr : this.props.alerts});
    }
    onSort(value){
            this.setState({sortName: value});
            if(this.state.sortType !== 'asc'){
                this.setState({sortType: 'asc'});
                this.setState({sortedArr: _.sortBy(this.props.alerts, [value])});
            }else{
                this.setState({sortType: 'desc'});
                this.setState({sortedArr: _.sortBy(this.props.alerts, [value]).reverse()});
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
                        title={t('group alerts')}
                        export={true}
                        additionButton={<Link to="/alerts-setting"><Image src="assets/img/gear.svg" /></Link>}
                        lastUpdated="Fri Apr23, 2017 to  Tue Apr29"
                    />
                    <div className="list-table">
                    <Scrollbars
                        renderTrackHorizontal="track-horizontal"
                        renderTrackVertical="track-vertical"
                        renderView="table-view">
                        <div className="inner-wrap-table">
                            <Pager dataProvider={alerts} pageSize={5} >
                                <Table
                                    onClick={this.onSort}
                                    sortClassName={this.state.sortType}
                                    headers={[
                                        t('alert name'),
                                        t('date'),
                                        t('type'),
                                        t('event'),
                                        t('coordinates')
                                    ]}
                                    >
                                </Table>
                            </Pager>
                        </div>
                    </Scrollbars> 
                    </div>
            </FormWrap>
        );
    }
}


const stateMap = (state, props, ownProps) => {
    let selectedSwitch = null;
    let switches = [];
    let alerts = [];
    return {
        alerts: alerts ? alerts : null,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        show: bindActionCreators(modal.show, dispatch)
    };
};

const ConnectedAlers = connect(stateMap, mapDispatchToProps)(Alers);

export default translate(['common'])(ConnectedAlers);