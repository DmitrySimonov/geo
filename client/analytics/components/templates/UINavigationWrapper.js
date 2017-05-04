import React, { Component } from 'react';
import ComponentWrapper from 'konux/common/components/ComponentWrapper';

import Loading from './../partials/loading/Loading';
import PopupsWrapper from '../partials/PopupsWrapper';
import ModalsWrapper from '../partials/ModalsWrapper';

import AnalyticsAppBar from './../partials/appBar/AnalyticsAppBar';
import LeftSideBar from './../partials/LeftSideBar';
import FormWrap from 'konux/common/components/FormWrap';

class componentName extends Component {
    render() {
        return <ComponentWrapper>
                    <AnalyticsAppBar/>
                    <LeftSideBar/>
                    <FormWrap>
                        {this.props.children}
                    </FormWrap>
                    <PopupsWrapper />
                    <ModalsWrapper />
                    <Loading />
                </ComponentWrapper>; 
    }
}

export default componentName;