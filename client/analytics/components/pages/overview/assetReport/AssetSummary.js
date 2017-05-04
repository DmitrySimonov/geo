import React from 'react';
import {connect} from 'react-redux';


import FormWrap from 'konux/common/components/FormWrap';
import Block from './../../../partials/Block';
import SingleInfoIndicatorContainer from './../../../partials/indicators/SingleInfoIndicatorContainer';
import { translate } from 'react-i18next';

class AssetSummary extends React.Component {
    render() {
        let {t} = this.props;
        return(
            <Block>
                <FormWrap className="summary-wrapper">
                    <SingleInfoIndicatorContainer title={t('speed')} value={this.props.speed.toFixed(2)} unitOfMeasure="KM/H"/>
                    <SingleInfoIndicatorContainer title={t('load')} value={this.props.load.toFixed(2)} unitOfMeasure="kTons"/>
                    <SingleInfoIndicatorContainer title={t('amount')} value={parseInt(this.props.amount)} unitOfMeasure={t('trains')}/>
                </FormWrap>
            </Block>
        );
    }
}


const stateMap = (state, props, ownProps) => {
    return {
        load: props.assetKpiStats && props.assetKpiStats.load ? props.assetKpiStats.load : 0,
        speed: props.assetKpiStats && props.assetKpiStats.speed ? props.assetKpiStats.speed : 0,
        amount: props.assetKpiStats && props.assetKpiStats.amount ? props.assetKpiStats.amount : 0
    };
};

const ConnectedAssetSummary = connect(stateMap, null)(AssetSummary);

export default translate(['common'])(ConnectedAssetSummary);