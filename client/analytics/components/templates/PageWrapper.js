import React from 'react';

import SubBar from './../partials/SubBar';
import BreadCrumbs from '../partials/appBar/BreadCrumbs';
import FormWrap from 'konux/common/components/FormWrap';
import LastUpdateTime from 'konux/common/components/LastUpdateTime';
import SubBarHeader from './../partials/SubBarHeader';

class PageWrapper extends React.Component {
    render() {
        return (
            <FormWrap className="full-width">
                <SubBar>
                    <SubBarHeader pageName={this.props.pageName}/>
                    {/*<BreadCrumbs/>*/}
                    <LastUpdateTime date="(since Fri Apr23, 2017 to  Tue Apr29)"/>
                </SubBar>
                {this.props.children}
            </FormWrap>
        );
    }
}

export default PageWrapper;