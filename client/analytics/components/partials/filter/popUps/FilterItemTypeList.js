import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {analytics} from './../../../../actions';

import { ChartType } from './../../../../constants';
import ToggleButtonList from 'konux/common/components/ToggleButtonList';

class TypeList extends React.Component {
    getTypeList(location){
        var loc = _.startsWith(location, '/') ? location : '/' + location;
        switch (loc){
            case "/asset-analytics":
                return [  
                    {
                        name: ChartType.SHOW_ASSET_PREDICTION_CHART,
                        id: 1
                    },   
                    {
                        name: ChartType.SHOW_ASSET_DISTRIBUTION_LINE_CHART,
                        id: 2
                    }, 
                    {
                        name: ChartType.SHOW_ASSET_DISTRIBUTION_CANDLE_CHART,
                        id: 3
                    },
                    {
                        name: ChartType.SHOW_ASSET_CORRELATION_CHART,
                        id: 4
                    }
                ];
            case "/group-analytics":
                return [  
                    {
                        name: ChartType.SHOW_GROUP_DISTRIBUTION_CANDLE_CHART,
                        id: 1
                    },
                    {
                        name: ChartType.SHOW_GROUP_CORRELATION_CHART,
                        id: 2
                    }
                ];
        }
    }
    getSelectedTypeList(){
        if(this.props.selectedType){
            return [this.props.selectedType];
        } else {
            return null;
        }
    }
    render(){
        return <ToggleButtonList selectedList={this.getSelectedTypeList()} list={this.getTypeList(this.context.location.pathname)} onApply={this.props.typeListClick}/>;
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selectedType: state.selected.chart.type? state.selected.chart.type.id : 1,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        typeListClick:bindActionCreators(analytics.chart.typeListClick, dispatch)
    };
};

TypeList.contextTypes = {
    location: React.PropTypes.object
};

export default connect(stateMap, mapDispatchToProps)(TypeList);