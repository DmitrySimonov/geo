import React from 'react';
import AppBarNavMenuItem from './AppBarNavMenuItem';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

class AppBarNavMenu extends React.Component {
    _getClassName(){
        return (this.props.className ? this.props.className : "");
    }
    render(){
        return(
            <Nav className={this._getClassName()}>
                {this.props.children}
            </Nav>
        );
    }
}



export default AppBarNavMenu;