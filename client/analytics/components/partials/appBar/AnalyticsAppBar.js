import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as appBar from './../../../actions/appBar';

import AppBar from './AppBar';
import AppBarLogoWrap from 'konux/common/components/AppbarLogoWrap';
import Logo from 'konux/common/components/Logo';
import Image from 'konux/common/components/Image';
import Label from 'konux/common/components/Label';
import AppBarNavMenu, {AppBarNavMenuItem} from 'konux/common/components/AppBarNavMenu';
import AppBarSubNavMenu from 'konux/common/components/AppBarSubNavMenu';
import AppBarProfile from 'konux/common/components/AppBarProfile';
import AppBarButtons from 'konux/common/components/AppBarButtons';

//Add className="status-active" to DropDownMenu for adding red point
class AnalyticsAppBar extends React.Component {
    constructor(props){
        super(props);
    }
    getAppBarButtons(){
        if (this.props && this.props.items) {
            return this.props.items.map((data, i) => <AppBarButtons index={0} buttonTitle={data.buttonTitle} items={data.items} key={i} />);
        }

        return null;
    }
    render() {
        return (
            <AppBar>
                <AppBarLogoWrap>
                    <Image src="assets/img/logo.svg" alt="logo"/>                   
                    <Label className="lbl-14">ANDROMEDA</Label>
                </AppBarLogoWrap>
                <AppBarNavMenu className="main-menu">
                    {this.getAppBarButtons()}
                </AppBarNavMenu>
                <AppBarProfile/>
            </AppBar>
        );
    };
}

const stateMap = (state, props, ownProps) => {
    return {
        enabled: state.componentSettings.appBar.enabled,
        items: state.componentSettings.appBar.items
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(appBar, dispatch);
}

export default connect(stateMap, mapDispatchToProps)(AnalyticsAppBar);