import React from 'react';
import {connect} from 'react-redux';

import Scrollbars from 'konux/common/components/Scrollbars';
import Datepicker from 'konux/common/components/Datepicker';

import FilterItemDateList from './FilterItemDateList';
import FilterItemAssetList from './FilterItemAssetList';
import FilterItemRegion from './FilterItemRegion';
import FilterItemRoute from './FilterItemRoute';
import FilterItemTypeList from './FilterItemTypeList';
import FilterItemXAxelList from './FilterItemXAxelList';
import FilterItemYAxelList from './FilterItemYAxelList';

import {common} from './../../../../actions';
import {bindActionCreators} from 'redux';

import * as MenuType from '../../../../constants/popupType';

class FilterPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleCalendar: false
        };
    }

    onDatePickerToggle() {
        this.setState({toggleCalendar: !this.state.toggleCalendar});
    }

    getPopupElement(popupType) {
        switch(popupType){
            case MenuType.DATE_LIST:
                return <FilterItemDateList onDatepickerToggle={this.onDatePickerToggle.bind(this)} />;
            case MenuType.REGION_LIST:
                return <FilterItemRegion />;
            case MenuType.TYPE_LIST:
                return <FilterItemTypeList />;
            case MenuType.ROUTES_LIST:
                return <FilterItemRoute />;
            case MenuType.X_AXEL_LIST:
                return <FilterItemXAxelList />;
            case MenuType.Y_AXEL_LIST:
                return <FilterItemYAxelList />;
            case MenuType.ASSET_LIST:
                return <FilterItemAssetList />;
        }
        return null;
    }

    render() {
        return(
            (!this.props.popupType || this.props.popupType !== -1) ? 
                <div className="filter-list-scroller-wrapper">
                    <Scrollbars 
                        renderTrackHorizontal="track-horizontal"
                        renderTrackVertical="track-vertical"
                        renderView="filter-list-scroller">
                        <div className="filter-list">
                                {this.getPopupElement(this.props.popupType)}
                        </div>
                    </Scrollbars>
                    {
                        this.state.toggleCalendar ? <Datepicker hideCalendar={this.onDatepickerToggle.bind(this)} onApply={this.props.setTimeFrame}/> : null
                    }
                </div> : null 
            );  
    }
}

const stateMap = (state) => {
    return {
        popupType: state.componentSettings.popup.type
    };
};

function mapDispatchToProps(dispatch) {
    return {
        setTimeFrame: bindActionCreators(common.datelist.setTimeFrame, dispatch)
    };
}

export default connect(stateMap, mapDispatchToProps)(FilterPopup);