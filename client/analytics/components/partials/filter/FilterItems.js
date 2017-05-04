import React from 'react';
import { connect } from 'react-redux';

import {RegionListId, ChartConfigutratorId, RoutesListId, TimeFrameId, WSHLFrameId, SwitchListId, AddNewFilterId, AnalysisTypeId, AxelXId, AxelYId} from './../../../constants/filterItemId';
import { ListGroup } from 'react-bootstrap';

import { ChartType } from './../../../constants';

import AxelX from './filterItems/AxelX';
import AxelY from './filterItems/AxelY';
import AnalysisTypeList from './filterItems/AnalysisTypeList';

import AssetList from './filterItems/AssetList';
import WSHLFrame from './filterItems/WshlFrame';

import TimeFrame from './filterItems/TimeFrame';
import RouteList from './filterItems/RouteList';
import RegionList from './filterItems/RegionList';
import AddNewFilter from './filterItems/AddNewFilter';

class FilterItems extends React.Component {
    getFilterComponents(requiredIds) {
        let key = 0;
        let result = [];

        if (requiredIds & RegionListId) {
            result.push(<RegionList key={result.length}/>);
        }
        if (requiredIds & RoutesListId) {
            result.push(<RouteList key={result.length} />);
        }
        if (requiredIds & TimeFrameId) {            
            result.push(<TimeFrame key={result.length} />);
        }
        if (requiredIds & WSHLFrameId) {
            result.push(<WSHLFrame key={result.length} />);
        }
        if (requiredIds & SwitchListId) {
            result.push(<AssetList key={result.length} />);
        }

        if (requiredIds & ChartConfigutratorId)
        {
            result.push(<AnalysisTypeList key={result.length} />);

            if (this.props.selectedType !== ChartType.SHOW_ASSET_PREDICTION_CHART && this.props.selectedType !== ChartType.SHOW_ASSET_MEASURED_CHART) {
                result.push(<AxelX key={result.length} />);
                result.push(<AxelY key={result.length} />);
            }
        }
        if (requiredIds & AddNewFilterId) {
            result.push(<AddNewFilter key={result.length}/>);
        }
        return result;
    }
    render(){
        return  <ListGroup>{this.getFilterComponents(this.props.requiredIds)}</ListGroup>;
    };
}

const stateMap = (state, props, ownProps) => {
    return {
        selectedType: state.selected.chart.type.name ? state.selected.chart.type.name : ChartType.SHOW_ASSET_PREDICTION_CHART
    };
};

export default connect(stateMap)(FilterItems);