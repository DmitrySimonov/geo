import React from 'react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { sideBar } from './../../../../actions';
import {ListGroupItem} from 'react-bootstrap';
import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';
import * as MenuType from './../../../../constants/popupType';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

class TimeFrame extends React.Component {
    render(){
        let {t} = this.props;
        var startDate, endDate = null;
        var { date } = this.props;
        if (date && date.value)
        {
            date = date.value;
            startDate = date.startDate ? moment(date.startDate).format('DD.MM.YYYY') : null;
            endDate = date.endDate ? moment(date.endDate).format('DD.MM.YYYY') : null;
        }
        return <ListGroupItem key="TimeFrame" 
                    onClick={() => {this.props.showDropdownMenu(MenuType.DATE_LIST);}}>
                    <FormWrap>
                        <Label className="lbl-6">{t("time frame")}</Label>
                        <Label className="lbl-18" >
                            {startDate ? startDate : 'Current Condition'} 
                            {endDate ? ' - ' + endDate : null}
                        </Label>
                    </FormWrap>
                </ListGroupItem>;
    }
}
const stateMap = (state, props, ownProps) => {
    return {
        date: state.selected.date ? state.selected.date[0] : null
    };
};

function mapDispatchToProps(dispatch) {
    return {
        showDropdownMenu: bindActionCreators(sideBar.showDropdownMenu, dispatch)
    };
};

const ConnectedTimeFrame = connect(stateMap, mapDispatchToProps)(TimeFrame);

export default translate(['common'])(ConnectedTimeFrame);