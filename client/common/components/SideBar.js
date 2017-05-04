import React from 'react';

class SideBar extends React.Component {
    getClassName(){
        return "sidebar-wrapper " + 
        (this.props.className ? this.props.className : "") + 
        (this.props.hasOwnProperty('pullRight') ? "pull-right " : "") +
        (this.props.hasOwnProperty('pullLeft') ? "pull-left " : "");
    }
    render() {
        return (
            <div className={this.getClassName()}>
                {this.props.children}
            </div>
        );
    }
}

export default SideBar;
