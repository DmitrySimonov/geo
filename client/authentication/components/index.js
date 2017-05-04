import React from 'react';
import AuthWrapper from './templates/AuthWrapper';

import Login from './pages/login';
import ForgotPassword from './pages/forgotPassword';
import CompleteRegistration from './pages/completeRegistration';
import RequestInvite from './pages/requestInvite';
import RestorePassword from './pages/restorePassword';
import {Route, IndexRedirect} from 'react-router';
import { Routes } from './../constants';
import MissingPage from 'konux/common/components/pages/missingPage/MissingPage';

const authRoute = (
  <Route path="/" component={AuthWrapper}>
    <IndexRedirect to="/login"/>
    <Route path={Routes.LOGIN} component={Login}/>
    <Route path={Routes.FORGOT_PASSWORD} component={ForgotPassword}/>
    <Route path={Routes.COMPLETE_REGISTRATION} component={CompleteRegistration}/>
    <Route path={Routes.REQUEST_INVITE} component={RequestInvite}/>
    <Route path={Routes.RESTORE_PASSWORD} component={RestorePassword}/>
    <Route path="*" component={MissingPage}/>
  </Route>
);

export default authRoute;