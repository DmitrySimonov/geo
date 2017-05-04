import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { analytics } from './../../../../actions';
import ToggleButton from 'konux/common/components/ToggleButton';
import Title from 'konux/common/components/Title';
import Button from 'konux/common/components/Button';
import FormWrap from 'konux/common/components/FormWrap';
import Scrollbars from 'konux/common/components/Scrollbars';
import * as ModalType from './../../../../constants/modalType';

import AlertItem from './AlertItem';
import ConditionItems from './ConditionItems';
import TresholdItem from './TresholdItem';
import DropDownList from './DropDownList';
var thresholds = [
        {
            name: '2.Speed overdue',
            checked: false,
            conditions:[
                [
                    {
                        thresholdName: 0,
                        thresholСompare: 2,
                        thresholdValue: 132
                    },
                ],
            ]   
        }
    ];

class AlertsSetting extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checked: this.state ? this.state.selectedTreshold : thresholds[0].checked ? thresholds[0].checked : null,
            alertItems: thresholds,
            selectedTreshold: thresholds[0],
            selectTresholdID: 0,
            rename: false,
            value: 0,
            alertName: this.state ? this.state.selectedTreshold.name : thresholds[0].name,
            itemsNames:['Displacement','Sweed','Temperature','Gescht','Temperature','Gescht'],
            itemsComparison: ["= ", "> ","<"]
        };
        this.getSelectTreshold      = this.getSelectTreshold.bind(this);
        this.addDropDownList        = this.addDropDownList.bind(this);
        this.addTresholdItem        = this.addTresholdItem.bind(this);
        this.deleteDropDownItem     = this.deleteDropDownItem.bind(this);
        this.deleteTresholdItem     = this.deleteTresholdItem.bind(this);
        this.deleteAlert            = this.deleteAlert.bind(this);
        this.handleSelect           = this.handleSelect.bind(this);
        this.deleteDropDownList     = this.deleteDropDownList.bind(this);
        this.onInit                 = this.onInit.bind(this);
        this.onKeyUp                = this.onKeyUp.bind(this);
        this.getAlertValue          = this.getAlertValue.bind(this);
    }
    addTreshold(){
        let empty = {
            name: 'Untitled',
            checked: false,
            conditions:[
                [
                    {
                        thresholdName: 0,
                        thresholdCompare: 0,
                        thresholdValue: 0
                    }
                ]
            ]
        };
        let arr = this.state.alertItems;
        arr.push(empty);
        this.setState({alertItems: arr});
    }
    addDropDownList(selectAlertID, selectTresholdID){
        let empty = {
                    thresholdName: 0,
                    thresholdCompare: 0,
                    thresholdValue: 0
        };
        let item = this.state.alertItems;

        if(item){
            item[selectAlertID].conditions[selectTresholdID].push(empty);
            this.setState({alertItems: item});
        }
    }
    deleteDropDownList(selectAlertID, selectTresholdID){
        let item = this.state.alertItems;
        if(item){
           item[selectAlertID].conditions = _.remove(item[selectAlertID].conditions, function(n,i) {
                return i !== selectTresholdID;
            });
            this.setState({alertItems: item});
        }
    }
    deleteDropDownItem(selectAlertID, selectTresholdID,id){
        let item = this.state.alertItems;
        if(item){
            item[selectTresholdID].conditions[selectAlertID] = _.remove(item[selectTresholdID].conditions[selectAlertID], function(n,i) {
                return i !== id;
            });
            this.setState({alertItems: item});
        }
    }
    deleteTresholdItem(selectAlertID, selectTresholdID){
    }
    deleteAlert(selectTresholdID){
        let item = this.state.alertItems;
        let selectedID = selectTresholdID -1;
        if(item){
            item = _.remove(item, function(n,i) {
                return i !== selectTresholdID;
            });
            if(selectTresholdID > 0){
                this.setState({selectTresholdID: selectedID});
                this.getSelectTreshold(item[selectedID], selectedID);
                
            }else{
                this.setState({selectedTreshold: null});
            }
            this.setState({alertItems: item});
        }
        this.getSelectedValue(this.state.selectedTreshold);
    }
    getSelectTreshold(selectedTreshold,selectTresholdID){
        if(selectedTreshold){
            this.setState({selectedTreshold: selectedTreshold});
            this.setState({selectTresholdID: selectTresholdID});
            this.setState({alertName: selectedTreshold.name});
        }
    }
    handleSelect(selectTresholdID,selectAlertID,rowId, id, index) {
        let item = this.state.alertItems;
        let alertID = item[selectTresholdID].conditions[selectAlertID];
        let rowID = alertID[rowId];
        if(item){
            if(id === 0){
                rowID.thresholdName = index;
            }
            if(id === 1){
                rowID.thresholdCompare = index;
            }
            this.setState({selectTresholdID: selectTresholdID});
            this.getSelectedValue(this.state.selectedTreshold);
        }
    }
    onKeyUp(e,selectTresholdID,selectAlertID,id){
        let item = this.state.alertItems;
        let alertID = item[selectTresholdID].conditions[selectAlertID];
        let rowID = alertID[id];
        if(e.target.value){
            rowID.thresholdValue = parseInt(e.target.value);
            this.setState({selectTresholdID: selectTresholdID});
            this.getSelectedValue(this.state.selectedTreshold);
        }
    }
    addTresholdItem(selectTresholdID){
        let empty = [
            {
                thresholdName: 0,
                thresholdCompare: 0,
                thresholdValue: 0
            }
        ];
        let item = this.state.alertItems;
        if(item){
            item[selectTresholdID].conditions.push(empty);
            this.setState({alertItems: item});
        }
    }
    reset(selectTresholdID){
        let empty = [
            [
                {
                    thresholdName: 0,
                    thresholdCompare: 0,
                    thresholdValue: 0
                }
            ]
        ];
        let arr = this.state.alertItems;
        arr[selectTresholdID].conditions = empty;
        this.setState({alertItems: arr});
    }
    renameAlert(stateRename){
        this.setState({rename: !stateRename});
    }
    saveAlert(stateRename,selectTresholdID,e){
        let item = this.state.alertItems;
        let selectAlertID = item[selectTresholdID];
        selectAlertID.name = this.state.alertName;
        this.setState({rename: !stateRename});
        
    }
    getAlertValue(e){
        this.setState({alertName: e.target.value});
    }
    getName(){
        if(this.state.rename){
            return <input className={this.state.rename ? "active sub-modal-name" : "sub-modal-name"}  onChange={(e) => this.getAlertValue(e)} value={this.state.alertName}/>;
        }{
            return <p className="sub-modal-name" > {this.state.selectedTreshold.name}</p>;
        }
    }
    getChecked(checked){
        let el = this.state.selectedTreshold;
        el.checked = !checked;
        this.setState({selectedTreshold: el});
    }
    onInit(){
        this.getSelectedValue(this.state.selectedTreshold);
    }
    getSelectedValue(selectedTreshold){
        let result = '';
        if(selectedTreshold && selectedTreshold.conditions && selectedTreshold.conditions.length > 0){
          for(let i = 0; i < selectedTreshold.conditions.length; i++){
              let condition = selectedTreshold.conditions[i];
              if(condition && condition.length > 0  ){
                for(let j = 0; j < condition.length; j++){
                    if(condition[j]){
                        result += this.state.itemsNames[condition[j].thresholdName] + ' ' + this.state.itemsComparison[condition[j].thresholdCompare] + ' ' + condition[j].thresholdValue;
                        result += j ===  condition.length - 1 ? ' ' : ' OR ';
                    }
                }
              }
              if(i !== selectedTreshold.conditions.length - 1){
                  result += ' AND ';
              }

          }
        }
        return result;
    }
    render(){
        return(
            <FormWrap className="alerts-modal">
                <header className="header-name">
                    {this.props.selectedSwitch && this.props.selectedSwitch.name ? this.props.selectedSwitch.name : this.props.switches.length > 0 && this.props.switches[0].name ? 'From ' + this.props.switches[0].name + ' to ' + this.props.switches[this.props.switches.length - 1].name : null}
                </header>
                <div className="wrapper">
                    <div className="left-side">
                        <Scrollbars
                            renderTrackHorizontal="track-horizontal"
                            renderTrackVertical="track-vertical"
                            renderView="table-view" >
                                
                                {
                                    this.state.alertItems ? this.state.alertItems.map(function(item,i){
                                        return <AlertItem
                                                        {...item}
                                                        getSelectTreshold={this.getSelectTreshold}
                                                        selectTresholdStateID={this.state.selectTresholdID}
                                                        selectTresholdID={i}
                                                        alertItems={this.state.alertItems}
                                                        key={"alert-item=" + i}
                                                        id={i}
                                                />;
                                    }.bind(this)) : null
                                }
                                <Button className="btn-9" onClick={() => this.addTreshold()}> + ADD ALERT </Button>
                            </Scrollbars>
                    </div>
                    <div className="right-side">
                        <Scrollbars
                            autoHeight
                            autoHeightMin={0}
                            universal
                            renderTrackHorizontal="track-horizontal"
                            renderTrackVertical="track-vertical"
                            renderView="table-view" >
                                {
                                    this.state.selectedTreshold ?
                                        <div>
                                            <div className="sub-modal">
                                                {this.getName()}  
                                                {
                                                    this.state.rename ?
                                                        <span className="name-rename" onClick={(e) => this.saveAlert(this.state.rename,this.state.selectTresholdID,e)}> 
                                                            (click to save)
                                                        </span>  
                                                    :
                                                        <span className="name-rename" onClick={() => this.renameAlert(this.state.rename)}> 
                                                            (click to rename)
                                                        </span> 
                                                }
                                                
                                                <ToggleButton id="test"  className="threshold-toggle" 
                                                checked={this.state.selectedTreshold ? this.state.selectedTreshold.checked : false} 
                                                onClick={() => this.getChecked(this.state.selectedTreshold.checked)} />
                                            </div>
                                            <div className="wrapper-line">
                                                <p className="info-line">{this.getSelectedValue(this.state.selectedTreshold)}</p>
                                            </div>
                                        </div>
                                    : null
                                }
                                {
                                    this.state.selectedTreshold ?
                                        <ConditionItems handleSelect={this.handleSelect}
                                                        itemsNames={this.state.itemsNames}
                                                        itemsComparison={this.state.itemsComparison}
                                                        onInit={this.onInit}
                                                        value={this.state.value}
                                                        selectedTreshold={this.state.selectedTreshold}
                                                        deleteDropDownItem={this.deleteDropDownItem}
                                                        deleteDropDownList={this.deleteDropDownList}
                                                        addTresholdItem={this.addTresholdItem}
                                                        addDropDownList={this.addDropDownList}
                                                        selectTresholdID={this.state.selectTresholdID}
                                                        onKeyUp={this.onKeyUp}
                                                        />
                                    : null
                                }
                            </Scrollbars>
                        {
                            this.state.selectedTreshold ?
                                <div className="buttons">
                                    <Button className="btn-14" onClick={() => this.deleteAlert(this.state.selectTresholdID)}>DELETE ALERT</Button>
                                    <div className="fl-r">
                                        <Button className="btn-13" onClick={() => this.reset(this.state.selectTresholdID)}>Reset</Button>
                                        <Button className="btn-12" >SAVE</Button>
                                    </div>
                                </div>
                            : null
                        }
                    </div>
                </div>
            </FormWrap>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    let switches = Object.values(state.data.assets.response);
    return {
        selectedSwitch:         switches[0],
        switches:               switches,
    };
};

export default connect(stateMap, null)(AlertsSetting);
