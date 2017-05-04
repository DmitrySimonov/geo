import React from 'react';
import {connect} from 'react-redux';

import LineChart from './LineChart';

class LineChartContainer extends React.Component {
    render(){
        return(
            <LineChart
                title={this.props.title}
                data={this.props.data}
            />
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        title: props.title ? props.title : '',
        data: props.data ? props.data : []
    };
};

export default connect(stateMap, null)(LineChartContainer);