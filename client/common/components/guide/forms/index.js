import React from 'react';
import FormWrap from './../../FormWrap';
import Label from './../../Label';
import FormGroup from './../../FormGroup';
import ValidatorTextField from './../../ValidatorTextField';

const FormSection = () => (
        <FormWrap>
            <FormGroup>
                <Label className="lbl-1">
                    Form styles
                </Label>
            </FormGroup>
            <FormWrap className="frm-1">
                <FormGroup>
                    <Label className="lbl-6">
                        Form_1 component
                    </Label>
                </FormGroup>
                <FormGroup>
                    <ValidatorTextField placeholder="ex. Sam Johanson" errorText="You have entered an invalid email address!"/>
                </FormGroup>
                <FormGroup>
                    <ValidatorTextField placeholder="****" errorText="Password has to be over 7 characters"/>
                </FormGroup>
            </FormWrap>
        </FormWrap>
);

export default FormSection;