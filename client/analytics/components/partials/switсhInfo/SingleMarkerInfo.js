import React from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import {analytics} from '../../../actions';
import Label from 'konux/common/components/Label';
import Button from 'konux/common/components/Button';

class SingleMarkerInfo extends React.Component {
    render() {
        return (
            <ListGroup>
                <ListGroupItem className="list-title">
                    <Label pullLeft className="lbl-17">Status</Label>
                    <Button pullRight className="btn-4"><Link to="asset-report">Analyze</Link></Button>
                </ListGroupItem>
                <ListGroupItem>
                    <Label pullLeft className="lbl-13">Health</Label>
                    <Label pullRight className={this.props.healthStatusError === this.props.healthStatus ? 'lbl-2' : 'lbl-4' }>{this.props.healthStatus}</Label>
                </ListGroupItem>
                <ListGroupItem>
                    <Label pullLeft className="lbl-13">Total Alerts</Label>
                    <Label pullRight className="lbl-8">{this.props.triggeredAlertCount}</Label>
                </ListGroupItem>
                {/*<ListGroupItem>
                    <Label pullLeft className="lbl-13">Connected devices</Label>
                    <div>
                        <Label pullRight className="lbl-8">{1}</Label>
                        <Label pullRight className="lbl-8">{this.props.connectedDevices}/</Label>
                    </div>
                </ListGroupItem>*/}
                <ListGroupItem>
                    <Label pullLeft className="lbl-13">Received Data</Label>
                    <Label pullRight className="lbl-8">{this.props.receivedData.toFixed(2) + ' Gb'}</Label>
                </ListGroupItem>
                <ListGroupItem className="list-title">
                    <Label pullLeft className="lbl-17">Trains</Label>
                </ListGroupItem>
                <ListGroupItem>
                    <Label pullLeft className="lbl-13">MEASURED TRAINS</Label>
                    <Label pullRight className="lbl-4">{this.props.measuredTrains}</Label>
                </ListGroupItem>
                {/*<ListGroupItem>
                    <Label pullLeft className="lbl-13">OVERALL LOAD</Label>
                    <Label pullRight className="lbl-8">{this.props.overallLoad.toFixed(2) + ' kTons'}</Label>
                </ListGroupItem>*/}
            </ListGroup>
        );
    }
}
const stateMap = (state, props, ownProps) => {
    return {
        selected:      state.selected,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(analytics, dispatch);
}

export default connect(stateMap, mapDispatchToProps)(SingleMarkerInfo);
