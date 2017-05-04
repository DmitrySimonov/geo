import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import * as appBar from './../../../actions/appBar';

class AppBar extends React.Component {
    getClassName(){
        return (this.props.className ? this.props.className : "");
    }
    render() {
        return (
            <Navbar className={this.getClassName()} fluid>
                {this.props.children}
            </Navbar>
        );
    }
}

export default AppBar;
