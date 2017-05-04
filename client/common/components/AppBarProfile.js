import React from 'react';
import { Link } from 'react-router';

import {Nav} from 'react-bootstrap';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Image from './Image';
import Badge from './Badge';
import Button from './Button';
import FormWrap from './FormWrap';

class AppBarProfile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            modal: false
        };
    }
    showMenu(modal){
        this.setState({modal: !modal});
    }
    render(){
        return(
            <Nav pullRight>
                <FormWrap onClick={() => this.showMenu(this.state.modal)}>
                    <Image src="assets/img/user.png" alt="user-avatar" className="user-avatar"/>
                    <Button></Button>
                </FormWrap>
                {
                    this.state.modal ?
                    <FormWrap className="profile-menu">
                        <ul>
                            <li><Link to="profile" onClick={() => this.showMenu(this.state.modal)} >profile</Link></li>
                            <li><Link to="invite-members" onClick={() => this.showMenu(this.state.modal)} >invite members</Link></li>
                        </ul>
                    </FormWrap>
                    : null
                }
            </Nav>
        );
    }
}

export default AppBarProfile;