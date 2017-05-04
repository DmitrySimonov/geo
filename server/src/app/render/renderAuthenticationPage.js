import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import authRoutes from './../../../../client/authentication/components';
import configureStore from './../store/authentication';
import renderAuthPage from './../templates/authentication';

const renderPage = (req, res, next) => {
    try {
        match({routes: authRoutes,  location: req.url}, (error, redirectLocation, renderProps) => {
            if (error) {
                console.log('error', error);
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
                const page =  renderAuthPage(intialHTML, state);
                res.status(200).send(page);
                
                console.log('200 - returned with state');
            }
            else {
                res.redirect(302, '/login');
            }
        });
    } catch (e) {
        console.log('error', e);
    }
};

export default renderPage;