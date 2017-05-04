import React from 'react';
import uuid from 'uuid';

class ToggleButton extends React.Component {
    constructor(props){
        super(props);
        this.id = uuid();
    }
    _getButtonClassName(){
        return "checkbox-wrap" +
            (this.props.className ? (' ' + this.props.className) : "") +
            (this.props.disabled ? " btn-disabled" : "");
    }

    render() {
        return (
            <div className={this._getButtonClassName()}>
                <input
                    type="checkbox"
                    className="checkbox"
                    id={"checkbox" + this.id}
                    onChange={data => null}
                    checked={this.props.checked}
                    onClick={this.props.onClick} />

                <label htmlFor={"checkbox" + this.id}>{this.props.label}</label>
            </div>
        );
    }
}
export default ToggleButton;