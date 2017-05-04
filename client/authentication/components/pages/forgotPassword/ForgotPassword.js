import React from 'react';
import { connect } from 'react-redux';
import { checkValid } from 'konux/common/utils';
import PreloaderButton from 'konux/common/components/PreloaderButton';
import { StatusType } from './../../../constants';
import { bindActionCreators } from 'redux';
import { auth } from './../../../actions';
import FormWrap from 'konux/common/components/FormWrap';
import PageWrapper from '../../templates/PageWrapper';
import * as pageTypes from './../../../constants/pageTypes';
import FieldWithLabel from 'konux/common/components/FieldWithLabel';
import * as Validators from './../../../utils/validators';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:false,
            isEmailValid: true
        };
    }
    emailValidate(e){
        return new Promise((resolve, reject) => {
            let validatorFunction = Validators.Common.EmailValidator.validate;
            let isValid = validatorFunction(this.state.email);
            resolve(isValid);
        });
    }
    _onChangeEmail(e){
        this.props.saveFieldValue('email', e.target.value);
        this.setState({'email': e.target.value});
    }
    tryAuthenticate()
    {
        this.emailValidate().then((isValid)=> {
            this.setState({isEmailValid: isValid});
            if (checkValid(this.state) && isValid){
                this.props.restorePassword(this.props.data);
            }
        });
    }
    onSubmit(e){
        e.preventDefault();
    }
    render() {
        return (
            <PageWrapper
                title="Forgot password?"
                pageName={pageTypes.PAGE_FORGOT_PASSWORD}
                description="Please enter the email address you use to log in and we'll send you a reminder.">
                <FormWrap className="frm-1">
                    <FieldWithLabel
                        type="text"
                        label="Email"
                        placeholder="ex. sam.johanson@konux.de"
                        validate={Validators.Common.EmailValidator.validate}
                        errorText="You have entered an invalid email address!"
                        onChange={this._onChangeEmail.bind(this)}
                        isValid={this.state.isEmailValid}/>

                    <PreloaderButton className="btn-1"
                         onClick={this.tryAuthenticate.bind(this)}
                         status={this.props.status ? this.props.status : StatusType.STATUS_TYPE_NORMAL}>SEND LOG IN LINK
                    </PreloaderButton>
                </FormWrap>
            </PageWrapper>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        data: state.authApp.data,
    };
};

function mapDispatchToProps(dispatch) {
    return  bindActionCreators(auth, dispatch); 
    
};

export default connect(stateMap,mapDispatchToProps)(ForgotPassword);
