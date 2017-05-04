import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sideBar } from './../../../../actions';
import { ListGroupItem } from 'react-bootstrap';

import { PopupTypes } from './../../../../constants';

import FormWrap from 'konux/common/components/FormWrap';
import Label from 'konux/common/components/Label';
import { translate } from 'react-i18next';

class RouteList extends React.Component {
    getName() {
        if (this.props.routes.length === 0) return 'No routes found';

        //-- check if we have only one route selected
        if (this.props.selected.length === 1) {
            return this.props.routes[this.props.selected[0]]['name'];
        } else if(this.props.selected.length > 1) {
            return this.props.selected.length + ' from ' + Object.keys(this.props.routes).length + ' routes';
        }

        return this.props.t('all routes');
    }

    render() {
        let {t} = this.props;
        return (
            <ListGroupItem onClick={() => (this.props.showDropdownMenu(PopupTypes.ROUTES_LIST))}>
                <FormWrap>
                    <Label className="lbl-6">{t('routes')}</Label>
                    <Label className="lbl-18">{this.getName()}</Label>
                </FormWrap>
            </ListGroupItem>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        selected : state.selected.routes,
        routes: state.filterOptions.routes
    };
};

function mapDispatchToProps(dispatch) {
    return {
        showDropdownMenu:bindActionCreators(sideBar.showDropdownMenu, dispatch)
    };
}

const ConnectedRouteList = connect(stateMap, mapDispatchToProps)(RouteList);

export default translate(['common'])(ConnectedRouteList);