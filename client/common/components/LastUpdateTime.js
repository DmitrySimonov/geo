import React from 'react';

import Label from './Label'
import { Nav } from 'react-bootstrap'

class LastUpdateTime extends React.Component{
    render(){
        return(
            (this.props.date) ?
                <Nav >
                    <Label className="lbl-3">{this.props.date}</Label>
                </Nav>
            : null
        );
    }
}

export default LastUpdateTime;