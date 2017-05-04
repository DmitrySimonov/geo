import React, { Component } from "react";

import Label from 'konux/common/components/Label';
import Title from 'konux/common/components/Title';

class MapToolTip extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="tooltip-innerwrap">
                <Title>
                    <Label className="lbl-18">{this.props.data? this.props.data.name : null}</Label>
                </Title>
                <Label className="lbl-6">{this.props.data.coordinates ? this.props.data.coordinates[0].lat : null}</Label>
                <Label className="lbl-6">{this.props.data.coordinates ? this.props.data.coordinates[0].lng : null}</Label>
            </div>
        );
    }
}

export default MapToolTip;