import React from 'react';
import { connect } from 'react-redux';
import PreloaderButton from 'konux/common/components/PreloaderButton';
import FormWrap from 'konux/common/components/FormWrap';
import {FormGroup} from 'react-bootstrap';
import { checkValid } from 'konux/common/utils';
import { StatusType } from './../../../constants';
import { bindActionCreators } from 'redux';
import { auth } from './../../../actions';

import PageWrapper from '../../templates/PageWrapper';
import FieldWithLabel from 'konux/common/components/FieldWithLabel';
import * as Validators from './../../../utils/validators';
import * as pageTypes from './../../../constants/pageTypes';

class CompleteRegistration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password:null,
            repeatPassword:null,
            isPasswordValid: true,
            isRepeatPasswordValid: true,
            passwordsMatch: true
        };
    }
    tryAuthenticate(){
        this.passwordValidate().then((isValid)=> {
            this.setState({isPasswordValid: isValid});
            return this.passwordRepeatValidate();
        }).then((isValid) => {
            this.setState({isRepeatPasswordValid: isValid});
            return this.passwordCompare();
        }).then((passwordsMatch) => {
            this.setState({passwordsMatch: passwordsMatch});
            if (checkValid(this.state) && passwordsMatch){
                this.props.setPassword(this.props.data, this.props.email);
            }
        });
    }
    onChangePassword(e){
        this.props.saveFieldValue('password', e.target.value);
        this.setState({'password':e.target.value});
    }
    onChangeRepeatPassword(e){
        this.props.saveFieldValue('repeatPassword', e.target.value);
        this.setState({'repeatPassword':e.target.value});
    }
    passwordValidate(e){
        return new Promise((resolve, reject) => {
            let validatorFunction = Validators.Common.PasswordValidator.validate;
            let isValid = validatorFunction(this.state.password);
            resolve(isValid);
        });
    }
    passwordRepeatValidate(e){
        return new Promise((resolve, reject) => {
            let validatorFunction = Validators.Common.PasswordValidator.validate;
            let isValid = validatorFunction(this.state.repeatPassword);
            resolve(isValid);
        });
    }
    passwordCompare(e){
        return new Promise((resolve, reject) => {
            resolve(this.props.data.password === this.props.data.repeatPassword);
        });
    }
    render() {
        return (
            <PageWrapper
                title="Complete Registration"
                pageName={pageTypes.PAGE_COMPLETE_REGISTRATION}>

                <FormWrap className="frm-1">
                    <FieldWithLabel
                        type="text"
                        label="Email"
                        disabled
                        placeholder="ex. sam.johanson@konux.de"
                        errorText="You have entered an invalid email address!"
                        isValid={true}/>

                    <FieldWithLabel
                        type="password"
                        label="Password"
                        placeholder="****"
                        validate={Validators.Common.PasswordValidator.validate}
                        errorText="Password has to be over 7 characters"
                        onChange={this.onChangePassword.bind(this)}
                        isValid={this.state.isPasswordValid}/>

                    <FieldWithLabel
                        type="password"
                        label="Password"
                        placeholder="****"
                        validate={Validators.Common.PasswordValidator.validate}
                        errorText="Password has to be over 7 characters"
                        onChange={this.onChangeRepeatPassword.bind(this)}
                        isValid={this.state.isRepeatPasswordValid}/>
                    {!this.state.passwordsMatch? 
                        <FormGroup className="has-error">
                            <span className="help-block">Different passwords</span>
                        </FormGroup> : null}
                    <PreloaderButton
                        className="btn-1"
                        onClick={this.tryAuthenticate.bind(this)}
                        status={this.props.status ? this.props.status : StatusType.STATUS_TYPE_NORMAL}>Sign Up
                    </PreloaderButton>
               </FormWrap>
            </PageWrapper>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        data: state.authApp.data,
        status: state.authApp.status,
        email: state.authApp.email
    };
};

function mapDispatchToProps(dispatch) {
    return  bindActionCreators(auth, dispatch); 
    
}

export default connect(stateMap,mapDispatchToProps)(CompleteRegistration);
