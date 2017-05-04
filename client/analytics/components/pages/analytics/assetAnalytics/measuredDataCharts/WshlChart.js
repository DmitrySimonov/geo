import React from 'react';

import {ListGroup, ListGroupItem} from 'react-bootstrap';
import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';
import Title from 'konux/common/components/Title';

class WhslChart extends React.Component{
    render(){
        return (
            <FormWrap className="full-width">
                <FormWrap className="measured-info">
                    <Label className="lbl-16">{this.props.selectedSwitch && this.props.selectedSwitch.measurments ? this.props.selectedSwitch.measurments[this.props.selectedSwitch.measurments.length - 1].whslMax : null}MM</Label>
                    <Label className="lbl-15" uppercase>MAX WHSL</Label>
                    <Label className="lbl-16">{this.props.selectedSwitch && this.props.selectedSwitch.measurments ? this.props.selectedSwitch.measurments[this.props.selectedSwitch.measurments.length - 1].whslStd : null}MM</Label>
                    <Label className="lbl-15" uppercase>STD.WHSL</Label>
                    <Label className="lbl-16">{this.props.selectedSwitch && this.props.selectedSwitch.measurments ? this.props.selectedSwitch.measurments[this.props.selectedSwitch.measurments.length - 1].whslAvg : null}MM</Label>
                    <Label className="lbl-15" uppercase>MEAN WHSL</Label>
                </FormWrap>
                <FormWrap className="full-width chart-wrap">
                    <Title>
                        <Label className="lbl-4">MOVEMENT/WHSL</Label>
                    </Title>
                    <FormWrap className="full-width chart-inner-wrapp">
                        <MeasuredDataLineChart/>
                    </FormWrap>
                </FormWrap>
            </FormWrap>
        );
    }
};

export default WhslChart;