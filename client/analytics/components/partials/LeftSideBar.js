import React from 'react';

import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { analytics, common } from './../../actions';
import * as MenuType from './../../constants/popupType';
import LeftSideBarHeader from './sideBar/LeftSideBarHeader';
import LeftSideBar from 'konux/common/components/LeftSideBar';
import Scrollbars from 'konux/common/components/Scrollbars';
import Filter from './filter';

class SideBarPullLeft extends React.Component {
    constructor(props){
        super(props);
        this.cancelToken = axios.CancelToken.source();
    }
    render(){
        return(
            <LeftSideBar>
                <LeftSideBarHeader />
                <Scrollbars 
                    renderTrackHorizontal="track-horizontal"
                    renderTrackVertical="track-vertical"
                    renderView="filter-list-view">
                    <Filter />
                </Scrollbars>
            </LeftSideBar>
        );
    }
}

export default SideBarPullLeft;