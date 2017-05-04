import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {common} from './../../../../actions';

import moment from 'moment';
import {ButtonItem} from 'konux/common/components/ButtonList';
import ButtonList from 'konux/common/components/ButtonList';
import Button from 'konux/common/components/Button';
import TimeFrameList from '../../TimeFrameList';

class DateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleCalendar: false
        };
    }
    componentWillUnmount(){
        this.setState({toggleCalendar: false});
    }
    toggleCalendar(){
        this.props.onDatepickerToggle();
    }
    render() {
        return (
            <div>
                <TimeFrameList list={this.props.list} onApply={this.props.onApply}>
                        <Button className="btn-7" onClick={this.toggleCalendar.bind(this)}>Custom range</Button>
                </TimeFrameList>
            </div>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        list: state.componentSettings.dateList.list,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setTimeFrame: bindActionCreators(common.datelist.setTimeFrame, dispatch)
    };
};

export default connect(stateMap, mapDispatchToProps)(DateList);