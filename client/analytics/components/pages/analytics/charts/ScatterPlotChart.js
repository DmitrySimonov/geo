import React from 'react';

import Chart from './../../../../components/partials/Chart';
import ChartHelper from './../../../../utils/ChartHelper';

function getRandomColor(){
    return `rgb(${(Math.random() * (255 - 0)).toFixed(0)},${(Math.random() * (255 - 0)).toFixed(0)},${(Math.random() * (255 - 0)).toFixed(0)})`;
}

class ScatterPlotChart extends React.Component {    
    getDataWithColors(){
        let result = this.props.dataProvider;
        if (result){
            for (let i=0; i<result.length; i++){
                result[i].color = getRandomColor();
            };
        }
        return result;
    }
    render() {
        var config = ChartHelper.generateConfig({
            "valueAxes": [{
                "position": "left"
            }],
            "graphs": [ChartHelper.generateGraph({
                "bullet": "round",
                "colorField":"color",
                "lineColor": "transparent",
                "balloonText": "[[aditionalInfo]]<br>Y:[[yValue]]"
            })],
            "chartScrollbar": ChartHelper.generateScrollBar(),
            "valueScrollbar":{
                "oppositeAxis":false,
                "offset": 50,
                "scrollbarHeight":10
            },
            "dataProvider": this.getDataWithColors(),
            "categoryAxis": {
                "parseDates": false
            }
        });
        return <Chart config={config}/>;
    }
}

export default ScatterPlotChart;