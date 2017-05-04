import React from 'react';
import ReactDOM from 'react-dom';

import Application from 'konux/common/components/Application';
import route from './components';
import reducers from './reducers';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import './../common/styles/common.sass';
import './styles/index.sass';

const App = (props) => {
    return(
        <I18nextProvider i18n={ i18n }>
            <Application reducers={reducers}>
                {route}
            </Application>
        </I18nextProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));