import React from 'react';

import {ListGroup, ListGroupItem} from 'react-bootstrap';
import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';
import Title from 'konux/common/components/Title';

class AccelerationChart extends React.Component{
    getChartData(swtch){
        let result = [];
        let measurments;
        if(swtch && swtch.measurments){
            for(let i=0; i < swtch.measurments.length; i++){
                measurments = swtch.measurments[i];
                result.push({
                    xValue: new Date(measurments.zeit),
                    yValue: measurments.rms
                });
            }
        }
        return result;
    }
    render(){
        return (
            <FormWrap className="full-width">
                <FormWrap className="measured-info">
                    <Label className="lbl-23">{this.props.selectedSwitch && this.props.selectedSwitch.measurments ? this.props.selectedSwitch.measurments[this.props.selectedSwitch.measurments.length - 1].rms : null}</Label>
                    <Label className="lbl-1">g</Label>
                    <Label className="lbl-3" uppercase>RMS</Label>
                </FormWrap>
                <FormWrap className="chart-wrap">
                    <Title>
                        <Label className="lbl-4">ACCELERATION</Label>
                    </Title>
                    <FormWrap className="full-width chart-inner-wrapp">
                        <MeasuredDataLineChart dataProvider={this.getChartData(this.props.selectedSwitch)}/>
                    </FormWrap>
                </FormWrap>
            </FormWrap>
        );
    }
};

export default AccelerationChart;