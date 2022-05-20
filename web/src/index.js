import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/stable';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import * as serviceWorker from './serviceWorker';

const rootEl = document.getElementById('root');

ReactDOM.render(<App />, rootEl);

serviceWorker.unregister();

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        ReactDOM.render(<NextApp />, rootEl);
    });
}
