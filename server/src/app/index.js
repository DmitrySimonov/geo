import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import _ from 'lodash';
import { Routes as AnalyticsRoute } from '../../../client/analytics/constants';
import * as router from './routing';

const expressApp = () => {    

    var app = express();

    app.use(bodyParser.json({ type: 'application/*+json' }));
    app.use(cookieParser());

    app.use(router.authentication);
    app.use(router.analytics);

    app.use(express.static(path.join(__dirname, './../../../public')));

    return app;
};

export default expressApp;