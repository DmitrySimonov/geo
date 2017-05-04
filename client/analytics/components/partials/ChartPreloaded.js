import React, { Component } from 'react';
import AmCharts from 'amcharts3-react';

class ChartLoaded extends Component {
    render() {
        return (
            <AmCharts.React {...this.props} />
        );
    }
}

export default ChartLoaded;