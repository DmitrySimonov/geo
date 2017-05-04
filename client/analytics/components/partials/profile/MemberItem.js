import React, { Component } from "react";

import DropDownMenu from 'konux/common/components/DropDownMenu';
import Image from 'konux/common/components/Image';

class MemberItem extends Component {
    constructor(props){
        super(props);
        this.getStatusEl = this.getStatusEl.bind(this);
    }
    getStatusEl(status){
        switch(status){
            case 0: 
                return <span className="status">Active</span>;
            case 1:
                return <span className="status red">Pending request</span>;
            default:
                return <span className="status"></span>;
        }
    }
    render(){
        return(
            <div className="member-item">
                <DropDownMenu items={['Ost','Südost','West','Mitte','Südwest','Süd','Nord']}  index={this.props.region ? this.props.region : 0} title="region" />
                <DropDownMenu items={['Admin','Maintenance manager','Engineer']}  index={this.props.role ? this.props.role : 0} title="role" />
                <div className="member-el">
                    <div className="avatar">
                        <img src={this.props.avatar_url} alt={this.props.name}/>
                        <div className="wrap">
                            <span className="name" title={this.props.name}>{this.props.name}</span>
                            <span className="positon">{this.props.positon}</span>
                        </div>
                    </div>
                    <div className="member-info">
                        <span className="email" title={this.props.email}>{this.props.email}</span>
                        {this.getStatusEl(this.props.status)}
                    </div>
                </div>
                <div className="control-item">
                    <span className="cross" onClick={() => this.props.deleteMemberItem(this.props.id)}><Image src="assets/img/cross.svg" /></span>
                    {this.props.status === 0 ? null : <span className="resent"> <Image src="assets/img/resent.svg" /></span> }
                </div>
            </div>
        );
    }
};


export default MemberItem;