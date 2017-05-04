import React from 'react';

class SideBarHeader extends React.Component{
    render(){
        return(
            <div className="filter-header">
                {this.props.children}
            </div>
        );
    }
}

export default SideBarHeader;
