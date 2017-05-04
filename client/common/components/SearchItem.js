import React from 'react';

class SearchItem extends React.Component {
    onClick(){
        if(this.props.item.title === 'Switches'){
            this.props.switchClick([this.props.item]);
        }
        if(this.props.item.title === 'Routes'){
            this.props.routeClick([this.props.item]);
        }
        if(this.props.item.title === 'Regions'){
            this.props.regionClick([this.props.item]);
        }
        this.props.onClear();
        this.props.hideSearch();
    }
    render(){
        return(
            <li onClick={() => {this.onClick()}}>
                <p className="search-title">{this.props.item.title}</p>
                <p className="search-name">{this.props.item.name}</p>
            </li>
        );
    }
}

export default SearchItem;