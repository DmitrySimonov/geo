import React from 'react';
import Button from './../../../../../common/components/Button';
import Image from './../../../../../common/components/Image';
import DropDownList from './DropDownList';

class TresholdItem extends React.Component{
    render(){
        return(
        <div className="wrapper-line clearfix">
            <Button className="btn-11" onClick={() => this.props.addTresholdItem(this.props.selectTresholdID)}>+OR</Button>
                <div className="wrapper-alert-creat">
                    {
                        this.props.item.length > 0 ? this.props.item.map((item,i) => {
                            return <DropDownList
                                        {...item}
                                        onInit={this.props.onInit}
                                        itemsNames={this.props.itemsNames}
                                        itemsComparison={this.props.itemsComparison}
                                        key={'drop-list=' + i}
                                        id={i}
                                        handleSelect={this.props.handleSelect}
                                        deleteDropDownItem={this.props.deleteDropDownItem}
                                        selectTresholdID={this.props.selectTresholdID}
                                        selectAlertID={this.props.selectAlertID}
                                        value={this.props.value}
                                        onKeyUp={this.props.onKeyUp}
                                    />;
                        })
                        : null
                    }
                    <Button className="btn-10" onClick={() => this.props.addDropDownList(this.props.selectTresholdID,this.props.selectAlertID)}> + AND </Button>
                    {this.props.id > 0 ? <Button className="btn-15 delete-treshold-item" onClick={() => this.props.deleteDropDownList(this.props.selectTresholdID,this.props.selectAlertID)}> <Image src="assets/img/baket.svg" /></Button> : null}
                </div>

        </div>
        );
    }
}


export default TresholdItem;