import React from 'react';
import Label from './Label';

class Checkbox extends React.Component {
    _getClassName(){
        return "checkbox " +
            (this.props.className ? this.props.className : "");
    }
    _getIdName(){
        return this.props.id ? this.props.id : "";
    }
    render(){
        return (
            <div className={this._getClassName()}>
                <input type="checkbox" id={this._getIdName()}/>
                <Label htmlFor={this._getIdName()}>{this.props.children}</Label>
            </div>
        );
    }
};
export default Checkbox;