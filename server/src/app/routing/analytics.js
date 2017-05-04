import express from 'express';

import * as AnalyticsRoute from '../../../../client/analytics/constants/routes';
import { Routes as AuthRoute } from '../../../../client/authentication/constants';
import _ from 'lodash';
import analyticsPage from './../render/renderAnalyticsPage';

const app = express();

const checkToken = (req, res, next) => {
    var { token } = req.cookies;
    if (_.isNil(token) || token.length === 0){
        return res.redirect(AuthRoute.LOGIN);
    }
    
    return next();
};

app.route(AnalyticsRoute.OVERVIEW).get(checkToken, analyticsPage);
app.route(AnalyticsRoute.GROUP_REPORT).get(checkToken, analyticsPage);
app.route(AnalyticsRoute.ASSET_REPORT).get(checkToken, analyticsPage);
app.route(AnalyticsRoute.TILE_OVERVIEW).get(checkToken, analyticsPage);
app.route(AnalyticsRoute.ASSET_ANALYTICS).get(checkToken, analyticsPage);
app.route(AnalyticsRoute.GROUP_ANALYTICS).get(checkToken, analyticsPage);
app.route(AnalyticsRoute.SENSOR_LOG).get(checkToken, analyticsPage);
app.route(AnalyticsRoute.EVENT_LOG).get(checkToken, analyticsPage);

export default app;