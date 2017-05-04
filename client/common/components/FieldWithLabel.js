import React from 'react';

import {FormControl, FormGroup, HelpBlock} from 'react-bootstrap';
import Label from 'konux/common/components/Label';

class FieldWithLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status:null,
            value:this.props.value,
            errorText: '',
        };
    }

    getStatus(){
        if (this.props.isValid !== null) {
            return this.props.isValid ? 'success' : 'error';
        }
    }

    render() {
        return (
            <FormGroup
                // onBlur={this.onBlur.bind(this)}
                validationState={this.getStatus()}>
                <Label uppercase className="lbl-6">{this.props.label}</Label>
                <FormControl
                    type={this.props.type ? this.props.type : 'text'}
                    defaultValue={this.state.value}
                    placeholder={this.props.placeholder}
                    onChange={(e) => this.props.onChange(e)}
                    disabled={this.props.disabled}
                    onBlur={this.props.onBlur}
                />
                <FormControl.Feedback />
                {!this.props.isValid? <HelpBlock>{this.props.errorText}</HelpBlock> : null}
            </FormGroup>
        );
    }
}

export default FieldWithLabel;