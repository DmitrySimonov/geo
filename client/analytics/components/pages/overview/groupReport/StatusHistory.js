import React from 'react';
import {connect} from 'react-redux';


import Chart from './../../../../components/partials/Chart';
import ChartHelper from './../../../../utils/ChartHelper';

class StatusHistory extends React.Component{
    getCustomLegend(event){
        //-- chart initialized let's build a custom legend
        let chart = event.chart;
        //-- get legend object
        let legend = document.querySelector(".info-wrap");
        //-- remove legend
        while (legend.firstChild) {
            legend.removeChild(legend.firstChild);
        }
        //-- get total count switches
        let switchCount = 0;
        for (let i = 0; i < chart.dataProvider.length - 1; i++){
            switchCount += chart.dataProvider[i].value;
        }

        //-- create legend title
        let legendTitle = document.createElement("div");
        legendTitle.className = "legend-title";
        legendTitle.innerHTML = switchCount + ' switch' + ((switchCount > 1) ? 'es' : '') + ':';
        legend.appendChild(legendTitle);

        //-- cycle through the data
        for (let i = 0; i < chart.dataProvider.length - 1; i++) {
            //-- data point
            let dp = chart.dataProvider[i];
            //-- create a legend ite m holder
            let item = document.createElement("div");
            //-- create marker
            let marker = document.createElement("div");
            marker.className = "marker";
            marker.style.backgroundColor = chart.colors[i];
            item.appendChild(marker);
            //-- create title
            let title = document.createElement("div");
            title.className = "info-title";
            title.innerHTML = dp.status;
            item.appendChild(title);
            //-- create absolute value
            let value = document.createElement("div");
            value.className = "value";
            value.innerHTML = '(' + dp.value + ')';
            item.appendChild(value);
            legend.appendChild(item);
        }
    }
    render(){
        let config = ChartHelper.generateConfig(
            {
                "type": "pie",
                "dataProvider": this.props.dataProvider,
                "startAngle": 0,
                "labelRadius": -35,
                "labelFunction": (slice) => ((slice.percents *2).toFixed(2) + '%'),
                "marginLeft": 100,
                "graph": {},
                "radius": "95%",
                "innerRadius": "55%",
                "pullOutRadius": 0,
                "pieY": "100%",
                "listeners": [
                    {
                        "event": "rendered",
                        "method": this.getCustomLegend.bind(this)
                    }
                ],
                "valueField": this.props.valueField
            }
        );
        return(
            <div className="semi-pie-chart">
                <div className="info-wrap"></div>
                <Chart config={config}/>
            </div>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        dataProvider: props.data
    };
};

export default connect(stateMap, null)(StatusHistory);