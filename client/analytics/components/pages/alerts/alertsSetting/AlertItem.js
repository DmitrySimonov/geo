import React from 'react';

class AlertItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={this.props.selectTresholdStateID === this.props.selectTresholdID ? "alert-item active" : "alert-item"}>
                <p onClick={() => {this.props.getSelectTreshold(this.props.alertItems[this.props.id],this.props.id);}}>{this.props.name}</p>
            </div>
        );
    }
}

export default AlertItem;