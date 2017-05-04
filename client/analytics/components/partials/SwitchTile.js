import React from 'react';
import ReactTooltip from 'react-tooltip';

import Label from 'konux/common/components/Label';
import Title from 'konux/common/components/Title';
import FormWrap from 'konux/common/components/FormWrap';

class SwitchTile extends React.Component {
    _getClassName() {
        return "switch-tile " + 
            (this.props.className ? this.props.className : "") +
            (this.props.status? this.props.status : "") +
            (this.props.selected ? ' selected' : "");
    }

    onClick(event) {
        this.props.assetClick({lat: this.props.asset.latitude, lng: this.props.asset.longitude}, this.props.asset.id, !this.props.selected);
    }

    render() {
        return (
                <span ref={'tip_'+this.props.asset.name}>
                    <FormWrap
                        className={this._getClassName()}
                        onClick={(event) => {this.onClick(event)}}>
                        <Title>
                            <Label className="lbl-15">Name: {this.props.asset.name}</Label>
                        </Title>
                        <Label className="lbl-14">{this.props.assetStats['currentWsh'].toFixed(3) + "mm"}</Label>
                        <Label className="lbl-6">{this.props.asset.latitude}</Label>
                        <Label className="lbl-6">{this.props.asset.longitude}</Label>
                        <Label className="lbl-18">{this.props.dateDifference}</Label>
                    </FormWrap>
                </span>
        );
    }
}

export default SwitchTile;