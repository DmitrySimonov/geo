import React from 'react';
import Scrollbars from 'konux/common/components/Scrollbars';

import PageWrapper from './PageWrapper';
import RightSideBar from 'konux/common/components/RightSideBar';
import FormWrap from 'konux/common/components/FormWrap';

class PageWrapperWithInformationBar extends React.Component{
    render() {
        return (
            <PageWrapper>
                <FormWrap className="tiles-wrapper">
                    <Scrollbars
                        renderTrackHorizontal="track-horizontal"
                        renderTrackVertical="track-vertical"
                        renderView="" >
                        { this.props.children }

                    </Scrollbars>
                </FormWrap>

                {/*<RightSideBar*/}
                    {/*selectedSwitches={this.props.selectedSwitches ? this.props.selectedSwitches : null}*/}
                    {/*activeSwitches={this.props.activeSwitches}*/}
                    {/*activeRegions={this.props.activeRegions}*/}
                    {/*switches={this.props.switches}*/}
                    {/*aggregatedStats={this.props.aggregatedStats}*/}
                    {/*loadAlertCount={this.props.loadAlertCount}*/}
                    {/*cancelPendingRequests={this.props.cancelPendingRequests}*/}
                    {/*sensorCount={this.props.sensorCount}*/}
                {/*/>*/}
            </PageWrapper>
        );
    }
}

export default PageWrapperWithInformationBar;