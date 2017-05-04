import React, { Component } from "react";

import DropDownMenu from 'konux/common/components/DropDownMenu';
import InputForMember from 'konux/common/components/InputForMember';
import * as Validators from './../../../../common/utils/validators';
import { translate } from 'react-i18next';

class InviteRow extends Component {
    constructor(props){
        super(props);
        this.state = {
            row: this.props.row ? this.props.row : null,
            isEmailValid: true,
            email: null
        };
        this.emailValidate = this.emailValidate.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.handleSelect  = this.handleSelect.bind(this);
    }
    // handleSelect(index,nameField){
    //     console.log(index,nameField);
    //     let result = this.state.row;
    //     result[nameField] = index;
    //     this.setState({'row': result});
    // }
    onChangeEmail(e){
        this.props.onRowChangeEmail(e,this.props.i);
        this.setState({'email': e.target.value});
    }
    emailValidate(){
        let validatorFunction = Validators.EmailValidator.validate;
        let isValid = validatorFunction(this.state.email);
        this.setState({isEmailValid: isValid});
    }
    render() {
        console.log(this.props);
        let {t} = this.props;
        return(
            <div className="invite-row">
                <div className="item">
                    <p className="title-item">{t('Region')}</p>
                    <DropDownMenu items={['Ost','Südost','West','Mitte','Südwest','Süd','Nord']}  index={this.props.row.region || 0} title="" inviteChange={this.props.selectInviteRow} idRow={this.props.i} nameField="region" />
                </div>
                <div className="item">
                    <p className="title-item">{t('role')}</p>
                    <DropDownMenu items={['Admin','Maintenance manager','Engineer']}  index={this.props.row.role || 0} title="" inviteChange={this.props.selectInviteRow} idRow={this.props.i}  nameField="role"/>
                </div>
                <div className="item">
                    <InputForMember
                        type="email"
                        label={t('email')}
                        placeholder="Maintenance officer"
                        errorText="Invalid email"
                        value={this.props.row.email}
                        onChange={this.onChangeEmail}
                        isValid={this.state.isEmailValid}
                        onBlur={this.emailValidate}/>
                </div>
        </div>
        );
    };
};

export default translate(['common'])(InviteRow);