import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Notification from 'konux/common/components/Notification';
import Image from 'konux/common/components/Image';
import Timer from '../../../analytics/components/partials/Timer';

import * as common from 'konux/common/actions';

class AuthNotification extends React.Component {
    render() {
        return(
            <Notification enabled={this.props.enabled} >
                <Image src="./assets/img/i.png" />
                <p>{this.props.message}</p>
                <Timer>{this.props.duration}</Timer>
            </Notification>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        message: state.notification.message,
        duration: state.notification.duration,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(common.notification, dispatch);
};

export default connect(stateMap, mapDispatchToProps)(AuthNotification);