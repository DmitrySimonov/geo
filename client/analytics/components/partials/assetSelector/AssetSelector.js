import React from 'react';

import Label from 'konux/common/components/Label';
import FormWrap from 'konux/common/components/FormWrap';
import Title from 'konux/common/components/Title';
import Scrollbars from 'konux/common/components/Scrollbars';
import AssetList from './AssetList';
import { translate } from 'react-i18next';

class AssetSelector extends React.Component {
    render() {
        let {t} = this.props;
        return (
            <FormWrap className="switch-selector">
                <Title>
                    <Label className="lbl-18">{t('switch')}<br/>{t('selector')}</Label>
                </Title>
                <Scrollbars
                    renderTrackHorizontal="track-horizontal"
                    renderTrackVertical="track-vertical"
                    renderView="view">
                    <AssetList
                        assets={this.props.assets}
                        assetStats={this.props.assetStats}
                        selectedAssetId={this.props.selectedAssetId}
                        healthStatusSearch={this.props.healthStatusSearch}
                        assetClick={this.props.assetClick}/>
                </Scrollbars>
            </FormWrap>

        );
    }
}

export default translate(['common'])(AssetSelector);