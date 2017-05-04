import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { modal } from './../../../../common/actions/';
import _ from 'lodash';

import {ListGroup, ListGroupItem} from 'react-bootstrap';
import ToggleButton from 'konux/common/components/ToggleButton';
import Title from 'konux/common/components/Title';
import ValidatorTextField from 'konux/common/components/ValidatorTextField';
import Button from 'konux/common/components/Button';
import Label from 'konux/common/components/Label';
import FormWrap from 'konux/common/components/FormWrap';
import Image from 'konux/common/components/Image';
import * as ModalType from './../../../constants/modalType';
import { Scrollbars } from 'react-custom-scrollbars';
import { translate } from 'react-i18next';

class SetThresholdsModal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            // thresholds : this.props.switch.thresholds
            thresholds: []
        };
    }
    addThreshold(){
        let result = this.state.thresholds;
        result.push({});
        this.setState({thresholds: result});
    }
    setThresholdValue(index, value){
        let result = this.state.thresholds;
        result[index] = {maxValue: parseInt(value)};
        this.setState({thresholds: result});
    }
    removeThreshold(index){
        let result = this.state.thresholds;
        if(result){
            result.splice(index, 1);
            this.setState({thresholds: result});
        }
    }
    getChecked(index){
        let result = this.state.thresholds;
        if (result[index].checked){
            result[index].checked = !result[index].checked;
        } else {
            result[index].checked = true;
        }
        this.setState({thresholds: result});
    }
    render(){
        let {t} = this.props;
        return(
            <div className="modal-layer">
                <FormWrap className="set-thresholds-modal">
                    <Title>
                        <Label className="lbl-16" uppercase>{t('set tresholds')}</Label>
                    </Title>
                    <FormWrap className="thresholds-modal-inner-wrap">
                        <Scrollbars
                                autoHeight
                                autoHeightMin={0}
                                universal
                                renderTrackHorizontal={props => <div {...props} className="track-horizontal"/>}
                                renderTrackVertical={props => <div {...props} className="track-vertical"/>}
                                renderView={props => <div {...props} className="thresholds-modal-scroll-wrap"/>}>
                            <FormWrap>
                                <ListGroup>
                                {
                                    this.state.thresholds? this.state.thresholds.map((threshold, i) => {
                                        return(
                                            <ListGroupItem key={i}>
                                                <Label className="lbl-6" uppercase>TRESHOLD {i+1}</Label>
                                                <ValidatorTextField
                                                    value={threshold.maxValue? threshold.maxValue : null}
                                                    onChange={(e, value) => {this.setThresholdValue(i, value);}}/>
                                                <ToggleButton
                                                    id="threshold-toggle"
                                                    className="threshold-toggle"
                                                    checked={threshold.checked? threshold.checked : false}
                                                    onClick={() => this.getChecked(i)}/>
                                                <Button className="delete-button" onClick={() => this.removeThreshold(i)}>
                                                    <Image src="assets/img/close-icon.svg" alt="close-icon"/>
                                                </Button>
                                            </ListGroupItem>
                                        );
                                    }) : null
                                }
                                </ListGroup>
                                <Button className="add-threshold-button" onClick={() => this.addThreshold()}>+ ADD TRESHOLD</Button>
                                <p className="description">{t('treshold modal descrition')}</p>
                                <Button className="cancel-button" onClick={() => this.props.hideModal(ModalType.SET_THRESHOLDS_MODAL)}>CANCEL</Button>
                                <Button className="save-button btn-4" onClick={
                                    () => this.props.saveAddedThresholds(this.state.thresholds),
                                    () => this.props.hideModal(ModalType.SET_THRESHOLDS_MODAL)}>SAVE</Button>
                            </FormWrap>
                        </Scrollbars>
                    </FormWrap>
                </FormWrap>
            </div>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        switch: null,
        thresholds: null
    };
};

function mapDispatchToProps(dispatch) {
    return {
        hideModal: bindActionCreators(modal.hide, dispatch),
        //saveAddedThresholds: bindActionCreators(analytics.saveAddedThresholds, dispatch)
    };
};

const ConnectedSetThresholdsModal = connect(stateMap, mapDispatchToProps)(SetThresholdsModal);

export default translate(['common'])(ConnectedSetThresholdsModal);
