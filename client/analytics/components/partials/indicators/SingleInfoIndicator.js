import React from 'react';

import Label from 'konux/common/components/Label';
import FormWrap from 'konux/common/components/FormWrap';
import Title from 'konux/common/components/Title';


class SingleInfoIndicator extends React.Component {
    render(){
        return(
            <FormWrap>
                <Title>
                    <Label className="lbl-4 uppercase">{this.props.title.toUpperCase()}:</Label>
                </Title>
                <Label className="lbl-23">{this.props.value}</Label>
                {(typeof this.props.outOf !== 'undefined') ? <Label className="lbl-14">/{this.props.outOf}</Label> : null}
                <Label className="lbl-3">{this.props.unitOfMeasure}</Label>
            </FormWrap>
        );
    }
}

export default SingleInfoIndicator;