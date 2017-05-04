import React from 'react';

import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';

import { prepareStore } from 'konux/common/utils/store';

class Application extends React.Component {
    render(){
        const store = prepareStore(this.props.reducers);
        const history = syncHistoryWithStore(browserHistory, store);

        return(
            <Provider store={store}>
                <Router history={history}>
                    {this.props.children}
                </Router>
            </Provider>
        );
    }
};


export default Application;