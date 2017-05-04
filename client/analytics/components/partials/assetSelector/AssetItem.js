import React from 'react';

import Button from 'konux/common/components/Button';
import Label from 'konux/common/components/Label';

class AssetItem extends React.Component {
    onClick() {
        this.props.assetClick(this.props.asset.id, {lat: this.props.asset.latitude, lng: this.props.asset.longitude}, true);
    }

    render() {
        console.log(this.props.asset)
        return (
            <Button onClick={this.onClick.bind(this)}>
                <div
                    className={'health-status' + (this.props.selected ? ' active ' :  ' ') + this.props.healthStatus}></div>
                <Label className="lbl-18"> {this.props.asset.name} </Label>
            </Button>
        );
    }
}

export default AssetItem;