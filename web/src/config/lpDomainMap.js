//Landing page domain map
const React = require('react');
const UtilsHelper = require('../helpers/UtilsHelper').default;
const retry = UtilsHelper.getInstance().retry;
const Default = React.lazy(() => retry(() => import('../containers/landing/domains/DefaultLanding')));
const BrideLgim = React.lazy(() => retry(() => import('../containers/landing/domains/bridge.lgim.com')));
const NavGuide = React.lazy(() => retry(() => import('../containers/landing/domains/navguide.com')));

//Add new landing pages here with the targetted domain
const DomainMap = [
    {
        url: 'tpipbridgeuat.net',
        component: BrideLgim,
        title: 'LGIM Bridge'
    },
    {
        url: 'excubeduat.net',
        component: NavGuide,
        title: 'LGIM NavGuide'
    },
    {
        url: 'localhost',
        component: NavGuide,
        title: 'LGIM NavGuide'
    },
    {
        url: 'default',
        component: Default,
        title: 'LGIM NavGuide'
    },
    {
        url: 'tpipprodsite.net',
        component: NavGuide
    },
    {
        url: 'tpipiprodbridge.net',
        component: BrideLgim
    }
];

module.exports = DomainMap;
