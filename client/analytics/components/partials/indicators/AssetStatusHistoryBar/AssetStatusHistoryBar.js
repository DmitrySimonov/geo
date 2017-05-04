import React from 'react';

import Label from 'konux/common/components/Label';
import FormWrap from 'konux/common/components/FormWrap';
import Title from 'konux/common/components/Title';
import StatusListContainer from './StatusListContainer';
import { translate } from 'react-i18next';

class AssetStatusHistoryBar extends React.Component {
    render() {
        let {t} = this.props;
        return (
            <FormWrap className="full-width">
                <FormWrap className="full-width status-history">
                    <Title>
                        <Label className="lbl-4">{t('status history')}</Label>
                    </Title>
                </FormWrap>
                <StatusListContainer
                    data={this.props.data}
                    healthStatuses={this.props.healthStatuses}
                />
            </FormWrap>
        );
    }
}

export default translate(['common'])(AssetStatusHistoryBar);