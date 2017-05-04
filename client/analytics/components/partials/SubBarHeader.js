import React from 'react';

import { Navbar } from 'react-bootstrap';
import Label from 'konux/common/components/Label';

class SubBarHeader extends React.Component {
    render(){
        return(
            (this.props.pageName) ?
                <div className="sub-bar-header">
                     <Label className="lbl-16">{this.props.pageName.toUpperCase()}</Label>
                </div>
            : null
        );
    }
}

export default SubBarHeader;