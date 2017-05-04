import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ToggleButtonList from 'konux/common/components/ToggleButtonList';
import {analytics} from './../../../../actions';
import { ChartType, AxelType } from './../../../../constants';

class XAxelList extends React.Component {
    getXAxelList(){
        switch(this.props.selectedType){
            case ChartType.SHOW_ASSET_DISTRIBUTION_CANDLE_CHART:
            case ChartType.SHOW_GROUP_DISTRIBUTION_CANDLE_CHART:
                return [
                    {
                        name: AxelType.AXIS_DATE,
                        id: 1
                    },
                    {
                        name: AxelType.AXIS_SWITCH_ID,
                        id: 2
                    }
            ];
            case ChartType.SHOW_ASSET_CORRELATION_CHART:
            case ChartType.SHOW_GROUP_CORRELATION_CHART:
                 return [
                    {
                        name: AxelType.AXIS_LOAD,
                        id: 1
                    },
                    {
                        name: AxelType.AXIS_WSH,
                        id: 2
                    }                  
            ];
            case ChartType.SHOW_ASSET_DISTRIBUTION_LINE_CHART:
                 return [
                    {
                        name: AxelType.AXIS_DATE,
                        id: 1
                    },
                    {
                        name: AxelType.AXIS_SWITCH_ID,
                        id: 2
                    }
            ];  
            case ChartType.SHOW_ASSET_PREDICTION_CHART:
            default:
                return null;
        }
    }
    render(){
        return <ToggleButtonList selectedList={[this.props.selectedXAxel]} list={this.getXAxelList()} onApply={this.props.xAxelListClick}/>;
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selectedType: state.selected.chart.type? state.selected.chart.type.name : null,
        selectedXAxel: state.selected.chart.selectedXAxel ? state.selected.chart.selectedXAxel.id : 1
    };
};

function mapDispatchToProps(dispatch) {
    return {
        xAxelListClick: bindActionCreators(analytics.chart.xAxelListClick, dispatch)
    };
};

export default connect(stateMap, mapDispatchToProps)(XAxelList);