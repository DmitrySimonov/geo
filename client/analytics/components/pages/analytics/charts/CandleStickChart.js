import React from 'react';

import Chart from './../../../../components/partials/Chart';
import ChartHelper from './../../../../utils/ChartHelper';

class CandleStickChart extends React.Component {   
    getParseDates(){
        if (this.props.dataProvider && this.props.dataProvider.length > 0){
            return this.props.dataProvider[0].xValue instanceof Date;
        } else {
            return false;
        }
    }
    render(){
        var config = ChartHelper.generateConfig({
            "valueAxes": [
                {
                    "position": "left",
                    "autoGridCount": true
                }
            ],
            "graphs": ChartHelper.generateGraphs([
                {
                    "proCandlesticks": true,
                    "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
                    "openField": "yStartValue", 
                    "closeField": "yEndValue",
                    "lowField": "yMinValue",
                    "highField": "yMaxValue",                    
                    "fillColors": "#8fe9e3",                                       
                    "lineColor": "#c6cdd8",
                    "negativeFillColors": "#ffbec7",
                    "negativeLineColor": "#ffbec7", 
                    "type": "candlestick",
                    "valueField": "yEndValue"
                },{
                    "type": "column",
                    "valueField": "yMidFirst",
                    "openField": "yMidFirst",
                    "lineColor": "#e62e00",
                    "lineThickness": 3,
                    "showBalloon": false,
                    "clustered": false,
                    "id": "g2"
                },
                {
                    "type": "column",
                    "valueField": "yMidSecond",
                    "openField": "yMidSecond",
                    "lineColor": "#29a3a3",
                    "lineThickness": 4,
                    "showBalloon": false,
                    "clustered": false,
                    "id": "g3"
                }
            ]),
            "chartScrollbar": ChartHelper.generateScrollBar(),
            "valueScrollbar": {
                "oppositeAxis": false,
                "offset": 50,
                "scrollbarHeight": 10
            },
            "categoryAxis": {
                "parseDates": false,
                "autoGridCount": true
            },
            "dataProvider": this.props.dataProvider
        });
        return <Chart config={config}/>;
    }
}

export default CandleStickChart;