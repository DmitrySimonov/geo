import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';


class Loading extends React.Component {
    render() {
        if (this.props.visible) {
            return (
                <div className="loader">
                    <div />
                </div>
            );
        } else {
            return null;
        }
    }
}

const stateMap = (state, props) => {
    return {
        visible: state.componentSettings.loading.visible
    };
};

export default connect(stateMap)(Loading);