import React from 'react';
import {ListGroupItem} from 'react-bootstrap';
import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';

class AddNewFilter extends React.Component{
    render(){
        return <ListGroupItem key="AddNewFilter">
                    <Label className="lbl-18">+ Add New Filter</Label>
                </ListGroupItem>;
    }
}

export default AddNewFilter;