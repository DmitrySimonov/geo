import React from 'react';
import { connect } from 'react-redux';

import Region from './Region';

class Regions extends React.Component {
    render() {
        return (
            <div>
                {Object.keys(this.props.regions).map((key, i) => (
                    <Region
                        mapHolderRef={this.props.mapHolderRef}
                        key={this.props.regions[key].id}
                        region={this.props.regions[key]} />
                ))}
            </div>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        regions: state.data.regions.response
    };
};

export default connect(stateMap, null)(Regions);
