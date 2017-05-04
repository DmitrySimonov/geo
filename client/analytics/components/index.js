import React from 'react';
import {Route, Redirect, IndexRedirect} from 'react-router';

import AnalyticsWrapper from './templates/AnalyticsWrapper';
import UINavigationWrapper from './templates/UINavigationWrapper';
import Overview from './pages/overview/overview';
import TileOverview from './pages/overview/tileOverview';
import GroupReport from './pages/overview/groupReport';
import AssetReport from './pages/overview/assetReport/AssetReport';
//
import AssetAnalytics from './pages/analytics/assetAnalytics/AssetAnalytics';
import SensorLog from './pages/data/SensorLog';
import EventLog from './pages/data/EventLog';
import GroupAnalytics from './pages/analytics/groupAnalytics/GroupAnalytics';
import Profile from './pages/profile/Profile';
import InviteMembers from './pages/profile/InviteMembers';
import MissingPage from 'konux/common/components/pages/missingPage/MissingPage';
import Alerts from './pages/alerts/Alerts';
import AlertsSetting from './pages/alerts/alertsSetting/AlertsSetting';
import { Routes } from '../constants';

const analyticRoute = (
      <Route path="/" component={AnalyticsWrapper}>
            <IndexRedirect to={Routes.OVERVIEW}/>
            <Route component={UINavigationWrapper}>
                  <Route path={Routes.OVERVIEW} component={Overview}/>
                  <Route path={Routes.TILE_OVERVIEW} component={TileOverview}/>
                  <Route path={Routes.GROUP_REPORT} component={GroupReport}/>
                  <Route path={Routes.ASSET_REPORT} component={AssetReport}/>
                  <Route path={Routes.ASSET_ANALYTICS} component={AssetAnalytics}/>
                  <Route path={Routes.SENSOR_LOG} component={SensorLog}/>
                  <Route path={Routes.EVENT_LOG} component={EventLog}/>
                  <Route path={Routes.GROUP_ANALYTICS} component={GroupAnalytics}/>
                  <Route path={Routes.ALERTS} component={Alerts}/>
                  <Route path={Routes.PROFILE} component={Profile}/>
                  <Route path={Routes.INVITE_MEMBERS} component={InviteMembers}/>
                  <Route path={Routes.ALERTS_SETTING} component={AlertsSetting}/>
            </Route>
            <Route path="*" component={MissingPage}/>
      </Route>
);

export default analyticRoute;