import React from 'react';
import DropDownMenu from './../../../../../common/components/DropDownMenu';

class DropDownList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: this.props.thresholdValue ? this.props.thresholdValue : 0,
        };
    }

    render(){
        return(
            <div className="drop-down-list">
                <DropDownMenu
                    selectAlertID={this.props.selectAlertID}
                    selectTresholdID={this.props.selectTresholdID}
                    rowId={this.props.id}
                    items={this.props.itemsNames}
                    onInit={this.props.onInit}
                    onChange={this.props.handleSelect}
                    index={[this.props.thresholdName ? this.props.thresholdName : 0 ]}
                    title="item"
                    id={0}
                />
                <DropDownMenu
                    selectAlertID={this.props.selectAlertID}
                    selectTresholdID={this.props.selectTresholdID}
                    rowId={this.props.id}
                    items={this.props.itemsComparison}
                    onInit={this.props.getSelectValue}
                    onChange={this.props.handleSelect}
                    index={[this.props.thresholdCompare ? this.props.thresholdCompare : 0]}
                    title="compare"
                    id={1}
                />
                <input type="text" onChange={(e) => this.props.onKeyUp(e,this.props.selectTresholdID,this.props.selectAlertID,this.props.id)} value={this.props.thresholdValue ? this.props.thresholdValue : this.props.value} />
                {this.props.id > 0 ? <span className="delete-treshold" onClick={()=> this.props.deleteDropDownItem(this.props.selectAlertID,this.props.selectTresholdID,this.props.id)}>×</span> : null}
            </div>
        );
    }
}

export default DropDownList;