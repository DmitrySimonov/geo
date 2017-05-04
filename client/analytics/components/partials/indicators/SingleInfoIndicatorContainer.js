import React from 'react';
import {connect} from 'react-redux';

import SingleInfoIndicator from './SingleInfoIndicator';


class SingleInfoIndicatorContainer extends React.Component {
    render() {
        return (
            <SingleInfoIndicator
                title={this.props.title}
                value={this.props.value}
                unitOfMeasure={this.props.unitOfMeasure}
                outOf={this.props.outOf}
            />
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        title: props.title ? props.title : '',
        value: props.value ? props.value : 0,
        unitOfMeasure: props.unitOfMeasure ? props.unitOfMeasure : '',
        outOf: props.outOf
    };
};

export default connect(stateMap, null)(SingleInfoIndicatorContainer);