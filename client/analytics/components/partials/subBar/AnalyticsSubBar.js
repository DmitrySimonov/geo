import React from 'react';

import SubBar from './../../partials/SubBar';
import SubBarHeader from './../SubBarHeader';
import BreadCrumbs from './../appBar/BreadCrumbs';
import ExportButton from './../ExportButton';
import LastUpdateTime from 'konux/common/components/LastUpdateTime';

class AnalyticsSubBar extends React.Component {
    render(){
        return(
            <SubBar>
                <SubBarHeader pageName={this.props.title}/>
                {this.props.additionButton}
                <BreadCrumbs/>
                <div className="pull-right right-block-wrap">
                    <LastUpdateTime date={'(since ' + this.props.lastUpdated + ')'}/>
                    {this.props.export ? <ExportButton /> : null}
                </div>
            </SubBar>
        );
    }
}

export default AnalyticsSubBar;