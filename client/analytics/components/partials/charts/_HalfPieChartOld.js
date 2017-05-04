import React from 'react';
import AmCharts from 'amcharts3-react';

class HalfPieChart extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};
    }

    getDataProvider(data){
        let result = [];

        if (data && Object.keys(data).length > 0) {
            result.push({
                "status": 'good',
                "value": data.condition.good
            },{
                "status": "warning",
                "value": data.condition.warning
            },{
                "status": "error",
                "value": data.condition.error
            });

            result.push({
                "status": "Total",
                "value": data.connectedDevices,
                "alpha": 0
            });
        }

        return result;

    }
    render() {
        return (<div className="chart semi-pie-chart">
                   <Chart dataProvider={this.getDataProvider} data={this.props.data}/>
                   <div className="info-wrap"></div>
                </div>);
    }
}

class Chart extends React.Component {
    constructor(props){
        super(props);
        this.config = {
            
            "theme": "light",
            
            "labelsEnabled": true,
            
            "labelText": "[[percents]]%",
            
            "color": "#000000",
            "fontFamily": "Proxima Nova",
            "valueField": "value",
            
            "colors": [
                "#0fd1ce", "#ffb870", "#fb9582", "transparent"
            ],
            "legend": {
                "enabled": false
            },
            "graphs": [
                {
                "valueField": "value"
                }
            ],
            "dataProvider": null,
            
            "startDuration": 0,
            "showBalloon": function () {
                return false;
            }
        };
    }
    render() {
        this.config.dataProvider = this.props.dataProvider(this.props.data);
        // return this.config.dataProvider ? React.createElement(AmCharts, this.config) : null;
        return null;
    }
}

export default HalfPieChart;