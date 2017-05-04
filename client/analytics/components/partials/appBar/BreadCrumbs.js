import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as analytics from './../../../actions';

import { Nav } from 'react-bootstrap';
import Label from 'konux/common/components/Label';

class BreadCrumbs extends React.Component {
    constructor(props) {
        super(props);
        this.breadCrumbs = null;
    }
    onClick(){
        this.props.switchClick(null);
    }
    addCrumb(title, handler) {
        this.breadCrumbs.push({
            title:title,
            handler:handler
        });
    }
    render(){
        this.breadCrumbs = [];

        let { switches, activeSwitches, selectedSwitches, activeRegions, regions, selectedRoutes, activeRoutes, routes } = this.props;
        if (activeRegions && activeRegions.length === 1) {
            this.addCrumb(activeRegions[0].name, () => {
                    if (selectedRoutes && selectedRoutes.length > 0) {
                        this.props.routeClick(null);
                    } else {
                        this.props.switchClick(null);
                    }
                });
        } else if (regions && regions.length > 0 || activeRegions && activeRegions.length > 1) {
            let reg = activeRegions || regions;
            if (reg) {
                this.addCrumb(reg.length + ' Regions', () => {
                    if (selectedRoutes && selectedRoutes.length > 0) {
                        this.props.routeClick(null);
                    } else {
                        this.props.switchClick(null);
                    }
                });
            }
        }

        if (selectedRoutes && selectedRoutes.length > 0) {
            if (selectedRoutes.length === 1) {
                this.addCrumb(selectedRoutes[0].name, () => this.props.switchClick(null));
            } else {
                this.addCrumb(selectedRoutes.length + ' Routes', () => this.props.switchClick(null));
            }
        }

        if (selectedSwitches && selectedSwitches.length > 0) {
            if (selectedSwitches.length === 1) {
                this.addCrumb(selectedSwitches[0].name, null);
            } else {
                this.addCrumb(selectedSwitches.length + ' Switches', null);
            }
        }


        return(
            <ul className="bread-crumbs">
                {this.breadCrumbs ? this.breadCrumbs.map((data, i) => {
                    return (<li key={i} onClick={data.handler ? data.handler.bind(this) : null} >
                                <Label className="lbl-3">{data.title}</Label>
                            </li>);
                    }) : null                       
                }
            </ul>
        );
    }
}

const stateMap = (state, props, ownProps) => {
    return {
        activeRegions: state.data.activeRegions,
        activeRoutes: state.data.activeRoutes,
        selectedRoutes: state.data.selectedRoutes,
        selectedSwitches: state.data.selectedSwitches,
        activeSwitches: state.data.activeSwitches,
        regions: state.data.regions.response,
        switches: state.data.switches,
        routes: state.data.routes.response
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(analytics, dispatch);
};

export default connect(stateMap, mapDispatchToProps)(BreadCrumbs);