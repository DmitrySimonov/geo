import React from 'react';

import Chart from './../../../../components/partials/Chart';
import ChartHelper from './../../../../utils/ChartHelper';

class MeasuredDataLineChart extends React.Component{
    render(){
        var config = ChartHelper.generateConfig({

        });
        return <Chart config={config} />;
    }
}

export default MeasuredDataLineChart;