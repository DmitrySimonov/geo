import React, { Component } from "react";
import { analytics } from './../../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Scrollbars from 'konux/common/components/Scrollbars';

import AnalyticsSubBar from './../../partials/subBar/AnalyticsSubBar';

import FormWrap from 'konux/common/components/FormWrap';
import SubBar from './../../partials/SubBar';
import SubBarHeader from './../../partials/SubBarHeader';
// import BreadCrumbs from './../../partials/appBar/BreadCrumbs';
import LastUpdateTime from 'konux/common/components/LastUpdateTime';
import Image from 'konux/common/components/Image';
import Button from 'konux/common/components/Button';
import Table from './../../partials/tables/Table';

import moment from 'moment';
import _ from 'lodash';
import { translate } from 'react-i18next';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    render() {
        let {t} = this.props;
        return (
            <FormWrap className="list-height">
                <FormWrap className="profile">
                    <div className="left-side">
                        <div className="list-item">
                            <p className="title">{t('profile picture')}</p>
                            <Image src="assets/img/profile.png" alt="profile" />
                        </div>
                        <div className="list-item disabled">
                            <p className="title">{t('region')}</p>
                            <input type="text" name="name" value="Norden Westfalen" readOnly />
                        </div>
                        <div className="list-item disabled">
                            <p className="title">{t('role')}</p>
                            <input type="text" name="name" value="Maintenance officer"  readOnly />
                        </div>
                    </div>
                    <div className="rigth-side">
                        <div className="list-item">
                            <p className="title">{t('job title')}</p>
                            <input type="text" name="name" placeholder="Maintenance officer"  />
                        </div>
                        <div className="list-item">
                            <p className="title">{t('full name')}</p>
                            <input type="text" name="name" placeholder="Maintenance officer"  />
                        </div>
                        <div className="list-item">
                            <p className="title">{t('email')}</p>
                            <input type="text" name="name" placeholder="Maintenance officer"  />
                        </div>
                        <div className="list-item">
                            <p className="title">{t('current password')}</p>
                            <input type="text" name="name" placeholder="Maintenance officer"  />
                        </div>
                        <div className="list-item">
                            <p className="title">{t('new password')}</p>
                            <input type="text" name="name" placeholder="Maintenance officer"  />
                        </div>
                        <div className="list-item">
                            <p className="title">{t('confirm password')}</p>
                            <input type="text" name="name" placeholder="Maintenance officer"  />
                        </div>
                        <Button className="btn-4 save-profile">Save</Button>
                    </div>
                </FormWrap>
            </FormWrap>
        );
    }
}


const stateMap = (state, props, ownProps) => {
    return {
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(analytics, dispatch);
};

const ConnectedProfile = connect(stateMap, mapDispatchToProps)(Profile);

export default translate(['common'])(ConnectedProfile);