import React from 'react';

import {connect} from 'react-redux';
import SetThresholdsModal from './modals/SetThresholdsModal';

import * as ModalType from '../../constants/modalType';

class ModalWrapper extends React.Component {
    getModal(typeId){
        switch(typeId){
            case ModalType.SET_THRESHOLDS_MODAL:
                return <SetThresholdsModal />;
        }
        return null;
    }
    render(){
        return(this.getModal(this.props.typeId));
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        typeId: state.componentSettings.modal.typeId
    };
};

export default connect(stateMap, null)(ModalWrapper);