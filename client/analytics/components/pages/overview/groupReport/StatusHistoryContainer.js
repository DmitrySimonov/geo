import React from 'react';

import FormWrap from 'konux/common/components/FormWrap';
import Title from 'konux/common/components/Title';
import Label from 'konux/common/components/Label';

import StatusHistory from './StatusHistory';

class StatusHistoryContainer extends React.Component {
    render() {
        return (
            <FormWrap className="status-history">
                <Title>
                    <Label className="lbl-4">{(this.props.title) ? (this.props.title + ':').toUpperCase() : ''}</Label>
                </Title>
                <StatusHistory
                    valueField={'value'}
                    data={this.props.data}
                />
                <Label uppercase className="lbl-3">{this.props.description.toUpperCase()}</Label>
            </FormWrap>
        );
    }
}

export default StatusHistoryContainer;