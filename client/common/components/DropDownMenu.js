import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
class DropDownMenu extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            index: this.props.index
        };
        this._onSelect = this._onSelect.bind(this);
    }
    _onMouseOut(){
        if (this.props.onMouseOut) {
            this.props.onMouseOut();
        }
    }
    _onItemOver(index){
        if (this.props.onItemOver) {
            this.props.onItemOver(index);
        }
    }
    _onSelect(index){
        this.setState({
            index:index
        });
        if(this.props.inviteChange){
            this.props.inviteChange(index,this.props.nameField,this.props.idRow);
        }
        if (this.props.onChange) {
            this.props.onChange(this.props.selectTresholdID, this.props.selectAlertID,this.props.rowId, this.props.id,index);
        }
        if(this.props.handleSelect){
            this.props.handleSelect(index);
        }
    }
    getTitle(){
        return this.state.index > -1 ? this.props.items[this.state.index] : this.props.title;
    }
    render(){
        return(
            <DropdownButton onBlur={this._onMouseOut.bind(this)}
                            onSelect={this._onSelect.bind(this)}
                            role="menuitem"
                            title={this.getTitle()}
                            className={this.props.className}
                            id="select"
                            block>
                {this.props.items ? this.props.items.map((item, i) => {
                    return <MenuItem active={this.state.index === i ? true : false}
                                     bsClass="dropdown"
                                     onMouseOver={() => { this._onItemOver(i);}}
                                     key={i}
                                     eventKey={i}>
                                     {item.title ? item.title : item}
                    </MenuItem>;
                }) : null}
            </DropdownButton>
        );
    }
};

export default DropDownMenu;