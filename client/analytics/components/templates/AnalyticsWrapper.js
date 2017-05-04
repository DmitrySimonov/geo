import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { analytics } from './../../actions';

class AnalyticsWrapper extends React.Component {
    getChildContext() {
        return {
            location: this.props.location
        };
    }
    componentWillMount(){
        this.props.loadInitalData();
    }
    render() {
        return this.props.children;
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(analytics, dispatch);
}

AnalyticsWrapper.childContextTypes = {
    location: React.PropTypes.object
};

export default connect(null, mapDispatchToProps)(AnalyticsWrapper);
