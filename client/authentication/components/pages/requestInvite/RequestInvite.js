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

class RequestInvite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:false,
            title:false,
            region:false,
            name:false
        };
    }
    _tryAuthenticate()
    {
        let validated = checkValid(this.state);
        if (validated) {
            this.props.sendInvite(this.props.data);
            this.props.successMessage();
        }
    }
    _onChangeEmail(valid,value){
        this.props.saveFieldValue('email', value);
        this.setState({'email':valid});
    }
    _onChangeName(valid, value) {
        this.props.saveFieldValue('name', value);
        this.setState({'name':valid});
    }
    _onChangeRegion(valid, value) {
        this.props.saveFieldValue('region', value);
        this.setState({'region':valid});
    }
    _onChangeTitle(valid,value){
        this.props.saveFieldValue('title', value);
        this.setState({'title':valid});
    }
    render() {
        return (
            <PageWrapper
                title="Request an invite to Andromeda"
                pageName={pageTypes.PAGE_REQUEST_INVITE}>

                <FormWrap className="frm-1">
                    <FieldWithLabel
                        label="Region"
                        placeholder="ex. Ost"
                        validate={Validators.Common.PasswordValidator.validate}
                        errorText="Region name has to be over 7 characters"
                        onChange={this._onChangeRegion.bind(this)}/>

                    <FieldWithLabel
                        label="Job title"
                        placeholder="ex. Maintenance"
                        validate={Validators.Common.PasswordValidator.validate}
                        errorText="Title name has to be over 7 characters"
                        onChange={this._onChangeTitle.bind(this)}/>

                    <FieldWithLabel
                        label="Full Name"
                        placeholder="ex. Sam Johanson"
                        validate={Validators.Common.PasswordValidator.validate}
                        errorText="Name has to be over 7 characters"
                        onChange={this._onChangeName.bind(this)}/>

                    <FieldWithLabel
                        label="Full Name"
                        placeholder="ex. sam.johanson@konux.de"
                        validate={Validators.Common.EmailValidator.validate}
                        errorText="You have entered an invalid email address!"
                        onChange={this._onChangeEmail.bind(this)}/>

                    <PreloaderButton
                        onClick={this._tryAuthenticate.bind(this)}
                        status={this.props.status ? this.props.status : StatusType.STATUS_TYPE_NORMAL}>REQUEST AN INVITE
                    </PreloaderButton>
                </FormWrap>

            </PageWrapper>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        data: state.authApp.data,
        status: state.authApp.status
    };
};

function mapDispatchToProps(dispatch) {
    return  bindActionCreators(auth, dispatch); 
    
};

export default connect(stateMap,mapDispatchToProps)(RequestInvite);
