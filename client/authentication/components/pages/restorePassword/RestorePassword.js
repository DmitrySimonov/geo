import React from 'react';
import { connect } from 'react-redux';
import PreloaderButton from 'konux/common/components/PreloaderButton';
import FormWrap from 'konux/common/components/FormWrap';
import { StatusType } from './../../../constants';
import { checkValid } from 'konux/common/utils';
import { bindActionCreators } from 'redux';
import { auth } from './../../../actions';

import PageWrapper from '../../templates/PageWrapper';
import FieldWithLabel from 'konux/common/components/FieldWithLabel';
import * as Validators from './../../../utils/validators';
import * as pageTypes from './../../../constants/pageTypes';

class RestorePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password:false,
            repeatPassword:false
        };
    }

    _onChangePassword(valid,value){
        this.props.saveFieldValue('password', value);
        this.setState({'password':valid});
    }

    _onChangeRepeatPassword(valid,value){
        this.props.saveFieldValue('repeatPassword', value);
        this.setState({'repeatPassword':valid});
    }

    _tryAuthenticate()
    {
        if (checkValid(this.state) && this.props.data && this.props.data.password === this.props.data.repeatPassword){
            this.props.changePassword(this.props.data);
        }   
    }

    render() {
        return (
            <PageWrapper
                title="Restore Password"
                pageName={pageTypes.PAGE_RESTORE_PASSWORD}>

                    <FormWrap className="frm-1">
                        <FieldWithLabel
                            label="Email"
                            disabled
                            placeholder="ex. sam.johanson@konux.de"
                            validate={Validators.Common.PasswordValidator.validate}
                            value={this.props.email}/>

                        <FieldWithLabel
                            type="password"
                            label="Password"
                            placeholder="****"
                            validate={Validators.Common.PasswordValidator.validate}
                            errorText="Password has to be over 7 characters"
                            onChange={this._onChangePassword.bind(this)}/>

                        <FieldWithLabel
                            type="password"
                            label="Password"
                            placeholder="****"
                            validate={Validators.Common.PasswordValidator.validate}
                            errorText="Password has to be over 7 characters"
                            onChange={this._onChangeRepeatPassword.bind(this)}/>

                        <PreloaderButton
                            onClick={this._tryAuthenticate.bind(this)}
                            status={this.props.status ? this.props.status : StatusType.STATUS_TYPE_NORMAL}>RESTORE PASSWORD
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

export default connect(stateMap,mapDispatchToProps)(RestorePassword);