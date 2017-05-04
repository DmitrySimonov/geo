import React from 'react';

import {Link} from 'react-router';

import { ListGroup, ListGroupItem } from 'react-bootstrap';

import Label from 'konux/common/components/Label';
import Button from 'konux/common/components/Button';
import AmPieChart from './../charts/AmPieChart';

class GroupMarkerInfo extends React.Component{
    render(){
        return(
            <ListGroup>
                <ListGroupItem className="list-title">
                    <Label pullLeft className="lbl-17">Status</Label>
                    <Button pullRight className="btn-4"><Link to="group-report">Analyze</Link></Button>
                </ListGroupItem>
                <ListGroupItem>
                    <Label pullLeft className="lbl-13">Health</Label>
                    <Label pullRight className={'ERROR' === this.props.healthStatus ? 'lbl-2' : 'lbl-4' }>{this.props.healthStatus}</Label>
                </ListGroupItem>
                <ListGroupItem>
                    <Label pullLeft className="lbl-13">Total Alerts</Label>
                    <Label pullRight className="lbl-8">{this.props.triggeredAlertCount}</Label>
                </ListGroupItem>
                <ListGroupItem>
                    <Label pullLeft className="lbl-13">Connected devices</Label>
                    <Label pullRight className="lbl-8">{this.props.connectedDevices}</Label>
                </ListGroupItem>
                <ListGroupItem>
                    <Label pullLeft className="lbl-13">Received Data</Label>
                    <Label pullRight className="lbl-8">{this.props.receivedData} Gb</Label>
                </ListGroupItem>
                <ListGroupItem className="chart-group">
                    <AmPieChart dataProvider={this.props.chartData} />
                </ListGroupItem>
            </ListGroup>
        );
    }
}

export default GroupMarkerInfo;