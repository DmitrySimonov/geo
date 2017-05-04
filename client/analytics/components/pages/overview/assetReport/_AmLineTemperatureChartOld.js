import React from 'react';
import moment from 'moment';
import AmCharts from 'amcharts3-react';

import Label from 'konux/common/components/Label';
import Title from 'konux/common/components/Title';
import Chart from './../../../../components/partials/Chart';
import ChartHelper from './../../../../utils/ChartHelper';

class AmLineTemperatureChart extends React.Component{
    constructor(props) {
        super(props);
    }
    getDataProvider(data){
        var result = [];
        var tmp = {};
        // data ? data.forEach((data,i) =>{
        //     tmp = {
        //         "date": moment(data.date).format('MMM DD'),
        //         "value": data.value
        //         // "date": moment(data.zeit).format('MMM DD'),
        //         // "value": data.temperature
        //     };
        //     result.push(tmp);
        // }) : null;
        return data;
    }
    render(){
        var config = ChartHelper.generateConfig({
                "marginRight": 40,
                "marginLeft": 40,
                "autoMarginOffset": 20,
                "graphs": [ChartHelper.generateGraph({title:"red line"})],
                "dataProvider": this.getDataProvider(this.props.data),
                "categoryAxis": {
                    "parseDates": true,
                }
            }
        );
        return(
            <div className="half">
                <Title>
                    <Label className="lbl-4 uppercase">
                        Temperature CHART:
                    </Label>
                </Title>
                <Chart config={config}/>
            </div>
        );
    }
}

export default AmLineTemperatureChart;