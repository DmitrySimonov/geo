import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { analytics } from './../../../actions';

import FilterList from 'konux/common/components/FilterList';

class RegionSelector extends React.Component {
    constructor(map, data){
        super(map, data);
        this.onApply = this.onApply.bind(this);
    }
    onApply(value){
        this.props.onApply();
    }
    render(){
        return(
            <FilterList list={this.props.regions} onApply={this.onApply}/>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        regions: state.data.regions.response
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(analytics, dispatch);
};

export default connect(stateMap, mapDispatchToProps)(RegionSelector);