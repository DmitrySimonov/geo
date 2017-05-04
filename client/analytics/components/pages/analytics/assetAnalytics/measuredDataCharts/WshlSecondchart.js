import React from 'react';

import {ListGroup, ListGroupItem} from 'react-bootstrap';
import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';
import Title from 'konux/common/components/Title';

class WshlSecondChart extends React.Component{
    render(){
        return (
            <FormWrap className="full-width">
                <FormWrap className="measured-info">
                    <Label className="lbl-23">2.46</Label>
                    <Label className="lbl-1">hz</Label>
                    <Label className="lbl-3">MAX F</Label>
                </FormWrap>
                <FormWrap className="full-width chart-wrap">
                    <Title>
                        <Label className="lbl-4"></Label>
                    </Title>
                    <FormWrap className="full-width chart-inner-wrapp">
                        <MeasuredDataLineChart/>
                    </FormWrap>
                </FormWrap>
            </FormWrap>
        );
    }
};

export default WhslSecondChart;