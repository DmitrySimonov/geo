import React from 'react';

import SearchList from './SearchList';

import Scrollbars from 'konux/common/components/Scrollbars';
class SearchResult extends React.Component {
    _getClassName(){
        return "search-result " + 
        (this.props.className ? this.props.className : "");
    }
    render() {
        return (
            <div className={this._getClassName()}>
                <Scrollbars 
                    renderTrackHorizontal="track-horizontal"
                    renderTrackVertical="track-vertical"
                    renderView="" >
                        <ul>
                            <SearchList list={this.props.list} switchClick={this.props.switchClick}
                                                         routeClick={this.props.routeClick}
                                                         regionClick={this.props.regionClick}
                                                         onClear={this.props.onClear}
                                                         hideSearch={this.props.hideSearch}/>

                        </ul>
                    </Scrollbars> 
            </div>
        );
    }
}

export default SearchResult;
