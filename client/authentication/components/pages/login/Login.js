import React from 'react';
import { connect } from 'react-redux';
import PreloaderButton from 'konux/common/components/PreloaderButton';
import FormWrap from 'konux/common/components/FormWrap';
import { StatusType } from './../../../constants';
import { bindActionCreators } from 'redux';
import { auth } from './../../../actions';
import * as Validators from './../../../utils/validators';
import FieldWithLabel from 'konux/common/components/FieldWithLabel';
import PageWrapper from '../../templates/PageWrapper';
import CheckboxWithLabel from '../../partials/CheckboxWithLabel';
import * as pageTypes from './../../../constants/pageTypes';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: props.login ? props.login.email : null,
            password: false,
            isEmailValid: true,
            isPasswordValid: true
        };
        this.tryAuthenticate = this.tryAuthenticate.bind(this);
        this.emailValidate = this.emailValidate.bind(this);
        this.passwordValidate = this.passwordValidate.bind(this);
        this.props.checkAuthorization();
    }

    _onChangePassword(e){
        this.props.saveFieldValue('password', e.target.value);
        this.setState({'password':e.target.value});
    }

    _onChangeEmail(e){
        this.props.saveFieldValue('email', e.target.value);
        this.setState({'email': e.target.value});
    }

    tryAuthenticate(){
        this.emailValidate().then((isValid)=> {
            this.setState({isEmailValid: isValid});
            return this.passwordValidate();
        }).then((isValid) => {
            this.setState({isPasswordValid: isValid});
            if (isValid) {
                this.props.authenticate(this.props.login);
            }
        });
    }
    emailValidate(e){
        return new Promise((resolve, reject) => {
            let validatorFunction = Validators.Common.EmailValidator.validate;
            let isValid = validatorFunction(this.state.email);
            resolve(isValid);
        });
    }
    passwordValidate(e){
        return new Promise((resolve, reject) => {
            let validatorFunction = Validators.Common.PasswordValidator.validate;
            let isValid = validatorFunction(this.state.password);
            resolve(isValid);
        });
    }
    render() {
        return (
            <PageWrapper
                title="Login to Andromeda platform"
                pageName={pageTypes.PAGE_LOGIN}>

                <FormWrap className="frm-1">
                    <FieldWithLabel
                        type="text"
                        label="Email"
                        placeholder="ex. sam.johanson@konux.de"
                        errorText="Invalid email"
                        validate={this.emailValidate}
                        value={this.state.email}
                        onChange={this._onChangeEmail.bind(this)} 
                        isValid={this.state.isEmailValid}/>

                    <FieldWithLabel
                        type="password"
                        label="Password"
                        placeholder="****"
                        errorText="Password has to be over 7 characters"
                        validate={Validators.Common.PasswordValidator.validate}
                        value={this.state.email}
                        onChange={this._onChangePassword.bind(this)}
                        isValid={this.state.isPasswordValid}/>

                    <CheckboxWithLabel label="Keep me logged in for two weeks"/>

                    <PreloaderButton
                        onClick={this.tryAuthenticate}
                        status={this.props.status ? this.props.status : StatusType.STATUS_TYPE_NORMAL}>Log In
                    </PreloaderButton>
                </FormWrap>
            </PageWrapper>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        login: state.authApp.data,
        status: state.authApp.status
    };
};

function mapDispatchToProps(dispatch) {
    return  bindActionCreators(auth, dispatch);    
}

export default connect(stateMap,mapDispatchToProps)(Login);
