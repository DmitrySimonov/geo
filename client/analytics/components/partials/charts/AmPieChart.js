if (process.env.BUILD_APP_TARGET === 'CLIENT') {
    require("amcharts3-export");
    require("amcharts3/amcharts/pie.js");
}
import ChartHelper from './../../../utils/ChartHelper';
import React from 'react';
import AmCharts from 'amcharts3-react';
import Chart from './../Chart';

class AmPieChart extends React.Component {
    constructor(props){
        super(props);
        this.getCustomLegend = this.getCustomLegend.bind(this);
    }
    getCustomLegend(event) {
        // Method taken from amcharts documentation
        let chart = event.chart;
        let legend = document.querySelector(".info-wrap");
        while (legend.firstChild) {
            legend.removeChild(legend.firstChild);
        }
        let legendTitle = document.createElement("div");
        legendTitle.className = "legend-title";
        if (chart.dataProvider){
            for (let i = 0; i < chart.dataProvider.length; i++) {
                let dp = chart.dataProvider[i];
                let item = document.createElement("div");
                let marker = document.createElement("div");
                marker.className = "marker";
                marker.style.backgroundColor = chart.colors[i];
                item.appendChild(marker);
                let title = document.createElement("div");
                title.className = "info-title";
                title.innerHTML = dp.status;
                item.appendChild(title);
                let value = document.createElement("div");
                value.className = "value";
                value.innerHTML = '(' + dp.value + ')';
                item.appendChild(value);
                legend.appendChild(item);
            }
        }
    }
    render() {
        let config = ChartHelper.generateConfig({
            "type": "pie",
            "categoryField": null,
            "valueField": "value",
            "marginRight": 100,
            "labelsEnabled": false,
            "graphs": [
                ChartHelper.generateGraph({
                    "type": null,
                    "balloonFunction": function (info) {
                        return '';
                    }
                })
            ],
            "dataProvider": this.props.dataProvider,
            "labelRadius": -130,
            "radius": "40%",
            "innerRadius": "80%",
            "listeners": [
                {
                    "event": "rendered",
                    "method": this.getCustomLegend
                }
            ]
        });
        return (
            <div className="chart">
                <Chart config={config}/>
                <div className="info-wrap"></div>
            </div>
        );
    }
}

export default AmPieChart;