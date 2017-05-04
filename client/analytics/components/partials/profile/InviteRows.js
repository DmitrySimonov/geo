import React, { Component } from "react";
import InviteRow from './InviteRow.js';
import { translate } from 'react-i18next';

class InviteRows extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    getInviteList(inviteList){
        let result = [];
        if(inviteList){
            console.log('inviteList',inviteList)
            inviteList.forEach((el,i) => {
                result.push(<InviteRow row={el} key={i} i={i} selectInviteRow={this.props.selectInviteRow} onRowChangeEmail={this.props.onRowChangeEmail} />);
            });
        }
        return result;
    }
    render() {
        return(
            <div>
                {this.getInviteList(this.props.inviteList)}
            </div> 
        );
    }
}

export default translate(['common'])(InviteRows);