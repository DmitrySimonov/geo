import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {filter} from './../../../actions';

import SearchResult from 'konux/common/components/SearchResult';

class SearchField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            className: '',
            value: this.props.value
        };
    }

    onKeyUp(e) {
        this.setState({className: (e.target.value) ? 'focus' : ''});
        this.props.searchFilter(e.target.value);
    }

    render() {
        return (
            <form onSubmit={(e) => {e.preventDefault()}}>
                <input
                    type="text"
                    placeholder="Text filter"
                    className={this.state.className + ' form-control' }
                    onChange={(e) => this.onKeyUp(e)}
                    value={this.state.value}
                />
                {
                    this.props.list && this.props.list.length > 0 ?
                        <SearchResult
                            list={this.props.list}
                            switchClick={this.props.switchClick}
                            routeClick={this.props.routeClick}
                            regionClick={this.props.regionClick}
                            hideSearch={this.props.hideSearch}
                            onClear={this.onClear}
                            cancelToken={this.cancelToken} /> : null
                }
            </form>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        switchClick: state.selected.regions,
        routeClick: state.filterOptions.regions,
        regionClick: state.data.route_options.response,
    };
};

function mapDispatchToProps (dispatch) {
    return {
        searchFilter: bindActionCreators(filter.searchFilter, dispatch)
    };
}

export default connect(stateMap, mapDispatchToProps)(SearchField);