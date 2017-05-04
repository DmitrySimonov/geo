
import React, { Component } from "react";
// import { user } from './../../../actions';
// import { analytics } from './../../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Scrollbars from 'konux/common/components/Scrollbars';
import AnalyticsSubBar from './../../partials/subBar/AnalyticsSubBar';
import FormWrap from 'konux/common/components/FormWrap';
import SubBar from './../../partials/SubBar';
import SubBarHeader from './../../partials/SubBarHeader';
import LastUpdateTime from 'konux/common/components/LastUpdateTime';
import Image from 'konux/common/components/Image';
import Button from 'konux/common/components/Button';
import Table from './../../partials/tables/Table';
import Title from 'konux/common/components/Title';
import DropDownMenu from 'konux/common/components/DropDownMenu';
import InviteRow from './../../partials/profile/InviteRow';
import InviteRows from './../../partials/profile/InviteRows';
import MemberItem from './../../partials/profile/MemberItem';

import moment from 'moment';
import _ from 'lodash';
import { translate } from 'react-i18next';

let member_list = [
    {
        region: 0,
        role: 0,
        avatar_url: 'assets/img/avatar_1.png',
        name: 'Yegor Metrofanov',
        positon: 'Manager',
        email: 'yegor1234@gmail.com',
        status: 1
    },
    {
        region: 0,
        role: 0,
        avatar_url: 'assets/img/avatar_1.png',
        name: 'Simonov Dmitry',
        positon: 'Developer',
        email: 'dasdasda@gmail.com',
        status: 0
    },
    {
        region: 0,
        role: 0,
        avatar_url: 'assets/img/avatar_1.png',
        name: 'Dave Mustane',
        positon: 'Autor',
        email: 'yegor1234@gmail.com',
        status: 1
    },
    {
        region: 0,
        role: 0,
        avatar_url: 'assets/img/avatar_1.png',
        name: 'Lena Golovach',
        positon: 'Manager',
        email: 'lena@gmail.com',
        status: 1
    }
];
let inviteList = [
    {
        region: 0,
        role: 0,
        avatar_url: '',
        name: '',
        positon: '',
        email: '',
        status: 1
    }
];
class InviteMembers extends Component {
    constructor(props){
        super(props);
        this.state = {
            inviteList: inviteList,
            memberList: member_list,
            memberListFilter: member_list,
            // memberList: this.props.memberList
        };
        this.handleSelect           = this.handleSelect.bind(this);
        this.search                 = this.search.bind(this);
        this.deleteMemberItem       = this.deleteMemberItem.bind(this);
        this.getRows                = this.getRows.bind(this);
        this.selectInviteRow        = this.selectInviteRow.bind(this);
        this.onRowChangeEmail       = this.onRowChangeEmail.bind(this);
    }
    addRow(memberItems){
        let result = this.state.inviteList;
        result.push(inviteList);
        this.setState({inviteList: result});
    }
    getItem(items){
        let result = [];
        items ? items.map((item,i) =>{
            result.push(<MemberItem {...item} key={'member-item-' + i} id={i} deleteMemberItem={this.deleteMemberItem}/>);
        })
        : null;
        return result;
    }
    onRowChangeEmail(e,rowId){
        console.log('E',e.target.value);
        let result = this.state.inviteList;
        result[rowId].email = e.target.value;
        console.log('onrowcasdasd',result);
        this.setState({inviteList: result});
    }
    selectInviteRow(index,nameField,rowId){
        let result = this.state.inviteList;
        result[rowId][nameField] = index;
        // this.setState({inviteList: result});
    }
    sendInvite(){
        let emptyRow = [
            {
                region: 0,
                role: 0,
                avatar_url: '',
                name: '',
                positon: '',
                email: '',
                status: 1
            }
        ];
        let result = this.state.memberList;
        result = result.concat(this.state.inviteList);
        this.setState({memberList: result});
        this.setState({memberListFilter: _.sortBy(result, ['region'])});
        this.setState({inviteList: emptyRow});
    }
    getRows(rows){
        this.setState({'inviteRow': rows});
    }
    handleSelect(index){
        switch(index){
            case 0:
                if(this.state && this.state.memberListFilter){
                    this.setState({memberListFilter: _.sortBy(this.state.memberList, ['region'])});
                }
            break;
            case 1:
                if(this.state && this.state.memberList){
                    this.setState({memberListFilter: _.sortBy(this.state.memberList, ['role'])});
                }
            break;
            case 2:
                if(this.state && this.state.memberList){
                    this.setState({memberListFilter: _.sortBy(this.state.memberList, ['name'])});
                }
            break;
            case 3:
                if(this.state && this.state.memberList){
                    this.setState({memberListFilter: _.sortBy(this.state.memberList, ['email'])});
                }
            break;
        }
    }
    deleteMemberItem(deleteElId){
        let result = this.state.memberListFilter;
        if(result){
           result = _.remove(result, function(n,i) {
                return i !== deleteElId;
            });
            this.setState({memberList: result});
            this.setState({memberListFilter: result});
        }
    }
    search(e,item){
        let searchString = e.target.value.trim().toLowerCase();
        let arr = this.state.memberList;
        if(searchString.length > 0){
            arr = arr.filter(function(el){
                return el.name.toLowerCase().match( searchString );
            });
        }
        this.setState({memberListFilter: arr});
    }
    render() {
        let {t} = this.props;
        console.log('inviteList', this.state.inviteList);
        return (
            <FormWrap className="list-height">
                <FormWrap className="invite-members">
                    <Scrollbars
                    autoHeight
                    autoHeightMin={0}
                    universal
                    renderTrackHorizontal="track-horizontal"
                    renderTrackVertical="track-vertical"
                    renderView="view" >
                        <Title>{t('invite members')}</Title>
                        <InviteRows inviteList={this.state.inviteList} selectInviteRow={this.selectInviteRow}  onRowChangeEmail={this.onRowChangeEmail} />
                        <Button className="btn-10" onClick={() => this.addRow(this.state.inviteList)} >+ Add row </Button>
                        <Button className="btn-12" onClick={() => this.sendInvite()}>SEND INVITE</Button>
                        <div className="manage-team">
                            <Title>{t('manage team')}</Title> 
                            <div className="inner-wrap">
                                <div className="item sort-button">
                                    <DropDownMenu items={['Sort by region', 'Sort by role', 'Sort by username','Sort by email',]} index={0} handleSelect={this.handleSelect}/>
                                </div>
                                <div className="search-block">
                                    <Button className="btn-13 loop" onClick={(e) => this.search(e)}>
                                        <Image src="assets/img/loop.svg" />
                                    </Button>
                                    <input type="text" placeholder="search" className="search" onKeyUp={(e) => this.search(e)} />
                                </div>
                            </div>
                            <div className="wrap-table">
                                {this.getItem(this.state.memberListFilter)}
                            </div>
                        </div>
                        </Scrollbars>
                    </FormWrap>
            </FormWrap>
        );
    }
}




const stateMap = (state, props, ownProps) => {
    // console.log(state);
    return {
        // memberList: state.user.memberList
    };
};

function mapDispatchToProps(dispatch) {
    return {
        // getMembersList: bindActionCreators(user.getMembersList, dispatch),
    };
};

const ConnectedInviteMembers = connect(stateMap, mapDispatchToProps)(InviteMembers);

export default translate(['common'])(ConnectedInviteMembers);