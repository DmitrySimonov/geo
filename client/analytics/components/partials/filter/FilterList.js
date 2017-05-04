import React from 'react';
import { connect } from 'react-redux';
import FilterItems from './FilterItems';
import {OVERVIEW, GROUP_REPORT, ASSET_REPORT, TILE_OVERVIEW, ASSET_ANALYTICS, GROUP_ANALYTICS, SENSOR_LOG, EVENT_LOG,ALERTS} from './../../../constants/routes';
import {RegionListId, ChartConfigutratorId, RoutesListId, TimeFrameId, WSHLFrameId, SwitchListId, AnalysisTypeId, AxelXId, AxelYId, AddNewFilterId} from './../../../constants/filterItemId';
import _ from 'lodash';

class FilterList extends React.Component{
    constructor(props) {
        super(props);
    }
    getFilterRequirementIds(location){

        var loc = _.startsWith(location, '/') ? location : '/' + location;

        switch(loc){
            case "/":
            case OVERVIEW:
                return RegionListId | RoutesListId | SwitchListId | WSHLFrameId;
            case TILE_OVERVIEW:
                return RegionListId | RoutesListId | SwitchListId | WSHLFrameId;
            case GROUP_REPORT:
                return RegionListId | RoutesListId | TimeFrameId | WSHLFrameId;
            case ASSET_REPORT:
                return RegionListId | RoutesListId | TimeFrameId | WSHLFrameId;
            case ASSET_ANALYTICS:
                return RegionListId | RoutesListId | TimeFrameId | WSHLFrameId | AnalysisTypeId | ChartConfigutratorId;
            case GROUP_ANALYTICS:
                return RegionListId | RoutesListId | TimeFrameId | WSHLFrameId | AnalysisTypeId | ChartConfigutratorId;
            case SENSOR_LOG:
                return  RegionListId | RoutesListId | SwitchListId | WSHLFrameId;
            case EVENT_LOG:
                return RegionListId | RoutesListId | SwitchListId | WSHLFrameId;
            case ALERTS:
                return RegionListId | RoutesListId | SwitchListId | WSHLFrameId;
        }
    }
    render(){
        return <FilterItems requiredIds={this.getFilterRequirementIds(this.context.location.pathname)}/>;
    }
}

const stateMap = (state, props, ownProps) => {
    
    return {
        filterItems: state.componentSettings.filter.items
    };
};

FilterList.contextTypes = {
    location: React.PropTypes.object
};

export default connect(stateMap)(FilterList);