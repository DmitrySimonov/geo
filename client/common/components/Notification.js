import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification } from './../actions';

class Notification extends React.Component {
  _getClassName(){
      return "notification-container " +
        (this.props.enabled ? "show" : "hide");
  }
  render() {
    return (
      <div className={this._getClassName()}>
         {this.props.enabled ? this.props.children : null}
      </div>
    );
  }
};

const stateMap = (state, props, ownProps) => {
    return {
        enabled: state.notification.enabled,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(notification, dispatch);
}

export default connect(stateMap, mapDispatchToProps)(Notification);