import React from 'react';

if (process.env.BUILD_APP_TARGET === 'CLIENT') {
    require('amcharts3-export');
    require('amcharts3/amcharts/serial.js');
}

import Label from 'konux/common/components/Label';
import Title from 'konux/common/components/Title';

import Chart from '../Chart';
import ChartHelper from '../../../utils/ChartHelper';

class LineChart extends React.Component {
    render(){
        let config = ChartHelper.generateConfig({
                'marginRight': 40,
                'marginLeft': 40,
                'autoMarginOffset': 20,
                'graphs': [ChartHelper.generateGraph({title:'red line'})],
                'dataProvider': this.props.data,
                'categoryAxis': {
                    'parseDates': true,
                }
            }
        );
        return(
            <div className="half">
                <Title>
                    <Label className="lbl-4 uppercase">{this.props.title.toUpperCase()}</Label>
                </Title>
                <Chart config={config}/>
            </div>
        );
    }
}

export default LineChart;