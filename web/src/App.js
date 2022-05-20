import React from 'react';

import { Provider } from 'react-redux';

import store from './redux/store';
import routes from './routes';
import config from 'appConfig';
const DomainMap = config.landingPageDomainMap;

const App = () => <Provider store={store}>{routes}</Provider>;

//dynamically set page title per domain
const hostName = window.location.hostname;
let DefaultComponent = DomainMap.find(d => d.url === 'default');
let Component = DomainMap.find(d => d.url === hostName) || DefaultComponent;
document.title = Component.title;

export default App;
