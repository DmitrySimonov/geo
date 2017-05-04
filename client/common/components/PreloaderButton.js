import React from 'react';
import { statusType } from './../constants';
import Button from './Button';

class PreloaderButton extends React.Component {
    _getStatus() {
        switch(this.props.status){
            case statusType.STATUS_TYPE_NORMAL:
                return this.props.children ? this.props.children : null;
            case statusType.STATUS_TYPE_LOADING:
                return 'Loading...';
            case statusType.STATUS_TYPE_SUCCESS:
                return 'SUCCESS';
            case statusType.STATUS_TYPE_FAILED:
                return 'FAILED';
            default:
                return this.props.children ? this.props.children : null;
        }
    }

    render() {
        return (
            <Button className="btn-1" {...this.props}>
                {this._getStatus()}
            </Button>
        );
    }
};
export default PreloaderButton;