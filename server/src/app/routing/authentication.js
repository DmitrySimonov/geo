import express from 'express';

import { Routes as AuthRoute } from '../../../../client/authentication/constants';
import { Routes as AnalyticsRoute } from '../../../../client/analytics/constants';

import authenticationPage from './../render/renderAuthenticationPage';
import _ from 'lodash';

const app = express();

const checkToken = (req, res, next) => {
    var { token } = req.cookies;

    if (!_.isNil(token) && token.length > 0){
        
        return res.redirect(AnalyticsRoute.OVERVIEW);
    }
    
    return next();
    
};

app.route('/').get(checkToken);
app.route(AuthRoute.LOGIN).get(checkToken, authenticationPage);

app.route(AuthRoute.FORGOT_PASSWORD).get(authenticationPage);
app.route(AuthRoute.COMPLETE_REGISTRATION).get(authenticationPage);
app.route(AuthRoute.COMPLETE_REGISTRATION).get(authenticationPage);
app.route(AuthRoute.REQUEST_INVITE).get(authenticationPage);
app.route(AuthRoute.RESTORE_PASSWORD).get(authenticationPage);

export default app;