import React from 'react';
import ReactDOM from 'react-dom';

import Application from 'konux/common/components/Application';
import routes from './components';
import reducers from './reducers';

import 'konux/common/styles/common.sass';
import './styles/auth.sass';

const App = (props) => {
    return(
        <Application reducers={reducers}>
            {routes}
        </Application>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));