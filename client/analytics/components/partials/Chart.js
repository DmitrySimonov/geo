import React from 'react';
import LazyLoad from 'react-lazyload';
import ChartPreloaded from './ChartPreloaded';

class Chart extends React.Component {
    render() {
        return (
            <div className={this.props.className? "chart " + this.props.className : "chart "}>
                <LazyLoad height="auto">
                    <ChartPreloaded  {...this.props.config}/>
                </LazyLoad>
            </div>
        );
    }
}

export default Chart;