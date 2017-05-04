import React from 'react';
import { NavItem } from 'react-bootstrap';


class AppBarNavMenuItem extends React.Component {
    render(){
        return(
            <NavItem>
                {this.props.children}
            </NavItem>     
        );
    }
}

export default AppBarNavMenuItem;