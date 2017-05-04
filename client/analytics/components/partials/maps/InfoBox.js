import React from 'react';
import InfoBox from 'react-google-maps/lib/addons/InfoBox';                    
import Label from './../../../../common/components/Label';
import Title from './../../../../common/components/Title';
import MapHelper from './../../../utils/map/MapHelper';
import {connect} from 'react-redux';

class InfoBoxWrapper extends React.Component {
    render(){
        let {smallIcon} = this.props;
        return this.props.asset ? <InfoBox position={MapHelper.preparePosition({
                                        lat: this.props.asset.latitude,
                                        lng: this.props.asset.longitude
                                    })}
                                    {...this.props}>
                    <div className="tooltip-innerwrap">
                        <Title>
                            <Label className="lbl-18">{this.props.asset.name}</Label>
                        </Title>
                        <Label className="lbl-6">{this.props.asset.latitude}</Label>
                        <Label className="lbl-6">{this.props.asset.longitude}</Label>
                    </div>
                </InfoBox> : null;
    }
}

const stateMap = (state, props, ownProps) => {
    var { asset } = state.componentSettings.markerInfoBox;
    const loading = asset && ((typeof state.data.asset_kpi_stats.response[asset.name] === 'undefined') ||
        (typeof state.data.asset_stats_search.response[asset.name] === 'undefined') ||
        (typeof state.data.asset_stats_aggregate.response === 'undefined'));
    return {
        asset: asset
    };
};

export default connect(stateMap)(InfoBoxWrapper);