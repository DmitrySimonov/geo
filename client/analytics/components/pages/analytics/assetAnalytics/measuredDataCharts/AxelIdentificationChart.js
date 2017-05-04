import React from 'react';

import {ListGroup, ListGroupItem} from 'react-bootstrap';
import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';
import Title from 'konux/common/components/Title';

class AxelIdentificationChart extends React.Component{
    render(){
        return (
            <FormWrap className="full-width">
                <FormWrap className="measured-info">
                    <Label className="lbl-16">56</Label>
                    <Label className="lbl-15" uppercase>AXELS</Label>
                    <Label className="lbl-16">243 km/h</Label>
                    <Label className="lbl-15" uppercase>SPEED</Label>
                    <Label className="lbl-16">841 t</Label>
                    <Label className="lbl-15" uppercase>WEIHGT</Label>
                    <Label className="lbl-16">56</Label>
                    <Label className="lbl-15" uppercase>DYN HEIGHT</Label>
                </FormWrap>
                <FormWrap className="full-width chart-wrap">
                    <Title>
                        <Label className="lbl-4">AXLE IDENTIFICATION</Label>
                    </Title>
                    <FormWrap className="full-width chart-inner-wrapp">
                        <MeasuredDataLineChart/>
                    </FormWrap>
                </FormWrap>
            </FormWrap>
        );
    }
};

export default AxelIdentificationChart;