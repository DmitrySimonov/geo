import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RightSideBar from 'konux/common/components/RightSideBar';
import Title from 'konux/common/components/Title';
import Label from 'konux/common/components/Label';
import SideBarInfoList from './SideBarInfoList';
import LastActivityList from './LastActivityList';
import Scrollbars from 'konux/common/components/Scrollbars';

class SideBarPullRight extends React.Component {
    getTitle() {
        if (this.props.selected.assets && this.props.selected.assets.length === 1)
        {
            return this.props.assets[this.props.selected.assets[0]].name;
        }
        else if (this.props.selected.assets && this.props.selected.assets.length > 0) {
            return this.props.selected.assets.length + ' Switches';
        } else {
            return 'All switches';
        }
    }

    render() {
        return (
            <RightSideBar>
                {(this.props.selected.assets && this.props.selected.assets.length !== 0) ?
                    <Title>
                        <Label className="lbl-16">
                            {this.getTitle()}
                        </Label>
                    </Title>
                : null}
                <div className="right-side">
                    <Scrollbars
                        renderTrackHorizontal="track-horizontal"
                        renderTrackVertical="track-vertical"
                        renderView="view">
                        <SideBarInfoList />
                        <LastActivityList/>
                    </Scrollbars>
                </div>
            </RightSideBar>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selected:      state.selected,
        assets:        state.data.assets.response,
    };
};

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(stateMap, mapDispatchToProps)(SideBarPullRight);