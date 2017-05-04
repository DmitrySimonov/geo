import React from 'react';
import _ from 'lodash';

class ApplicationWrapper extends React.Component {
    render() {
        return (<div className={"wrapper-main" + (_.isNil(this.props.className) ? '' : (' ' + this.props.className))}>{this.props.children}</div>);
    };
}

export default ApplicationWrapper;

