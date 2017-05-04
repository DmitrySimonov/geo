import React from 'react';

class AssetsContentWrapper extends React.Component {
    constructor(props){
        super(props);
    }
    _getClassName(){
        return "page-content-wrapper " +
            (this.props.className ? this.props.className : "");
    }
    render(){
        return(
            <div className={this._getClassName()}>
                {this.props.children}
            </div>
        );
    }
};

export default AssetsContentWrapper;
