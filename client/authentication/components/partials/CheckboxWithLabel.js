import React from 'react';
import { FormGroup } from 'react-bootstrap';
import Checkbox from 'konux/common/components/Checkbox';

class CheckboxWithLabel extends React.Component {
    render () {
        return (
            <FormGroup>
                <Checkbox id="check1">
                    {this.props.label}
                </Checkbox>
            </FormGroup>
        );
    };
}

export default CheckboxWithLabel;