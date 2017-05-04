import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import analyticRoutes from './../../../../client/analytics/components';
import configureStore from './../store/analytics';
import renderAnalyticsPage from './../templates/analytics';

const renderPage = (req, res, next) => {
    try {
        match({routes: analyticRoutes,  location: req.url}, (error, redirectLocation, renderProps) => {
            if (error) {
                next();
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (renderProps) {
                
                var store = configureStore(req.url, req.query, req.body);
                
                console.log('#### enter');
                var intialHTML = null;
                try {
                    intialHTML = ReactDOMServer.renderToStaticMarkup(<Provider store={store}>
                                                                        <RouterContext {...renderProps}/>
                                                                    </Provider>);
                } catch (e) {
                    console.log('error', e);
                }
                
                console.log('#### end');
                
                const state = store.getState();
                const page =  renderAnalyticsPage(intialHTML, state);
                res.status(200).send(page);
                
                console.log('200 - returned with state');
            }
            else {
                res.redirect(302, '/login');
            }
        });
    } catch (e) {
        next();
    }
};

export default renderPage;