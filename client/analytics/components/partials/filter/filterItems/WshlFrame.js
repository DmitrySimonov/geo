import React from 'react';
import {ListGroupItem} from 'react-bootstrap';
import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';
import { connect } from 'react-redux';

import ValidatorTextField from 'konux/common/components/ValidatorTextField';
import DropDownMenu from 'konux/common/components/DropDownMenu';

class WshlFrame extends React.Component {
    render(){
        return <ListGroupItem className="dropdown-filter" key="WSHLFrame">
                    <Label className="lbl-6" disabled>WHSL</Label>
                    <DropDownMenu  items={["off", "=", "<", ">"]} index={[0]}/>
                    <ValidatorTextField disabled value="136.06mm"/>
                </ListGroupItem>;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onWSHLSampleChange: null
    };
};

export default connect(null, mapDispatchToProps)(WshlFrame);