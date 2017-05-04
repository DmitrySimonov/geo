import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {analytics} from './../../../../actions';
import ToggleButtonList from 'konux/common/components/ToggleButtonList';
import { ChartType, AxelType } from './../../../../constants';

class YAxelList extends React.Component {
    getYAxelList(){
        switch(this.props.selectedType){
            case ChartType.SHOW_ASSET_DISTRIBUTION_CANDLE_CHART:
            case ChartType.SHOW_GROUP_DISTRIBUTION_CANDLE_CHART:
                return [
                    {
                        name: AxelType.AXIS_WSH,
                        id: 1
                    },
                    {
                        name: AxelType.AXIS_VIBRATION,
                        id: 2
                    }
                ];
            case ChartType.SHOW_ASSET_CORRELATION_CHART:
                 return [
                    {
                        name: AxelType.AXIS_VIBRATION,
                        id: 1
                    },
                    {
                        name: AxelType.AXIS_SPEED,
                        id: 2
                    }
                ];
            case ChartType.SHOW_ASSET_DISTRIBUTION_LINE_CHART:
                 return [
                    {
                        name: AxelType.AXIS_WSH,
                        id: 1
                    },
                    {
                        name: AxelType.AXIS_TILT,
                        id: 2
                    },
                    {
                        name: AxelType.AXIS_VIBRATION,
                        id: 3
                    },
                    {
                        name: AxelType.AXIS_SPEED,
                        id: 4
                    },
                    {
                        name: AxelType.AXIS_LOAD,
                        id: 5
                    }                  
            ];
            case ChartType.SHOW_GROUP_CORRELATION_CHART:
                return [
                    {
                        name: AxelType.AXIS_VIBRATION,
                        id: 1
                    },
                    {
                        name: AxelType.AXIS_SPEED,
                        id: 2
                    }
                ];
            case ChartType.SHOW_ASSET_PREDICTION_CHART:
            default:
                return null;
        }
    }
    render(){
        return <ToggleButtonList selectedList={[this.props.selectedYAxel]} list={this.getYAxelList()} onApply={this.props.yAxelListClick}/>;
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selectedType: state.selected.chart.type? state.selected.chart.type.name : null,
        selectedYAxel: state.selected.chart.selectedYAxel? state.selected.chart.selectedYAxel.id : 1,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        yAxelListClick: bindActionCreators(analytics.chart.yAxelListClick, dispatch)
    };
};

export default connect(stateMap, mapDispatchToProps)(YAxelList);