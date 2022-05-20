import React from 'react';
import { Router as ReactRouter, Route, Switch, Redirect } from 'react-router';
import { history } from '../redux/store';
import BrowserStorage from '../middlewares/storage';
import { getSystemArtifacts } from '../helpers/artifactHelper';

import ComingSoonComponent from '../components/comingSoon';
import PageNotFoundComponent from '../components/404';

import Layout from '../containers/layout';
import LandingContainer from '../containers/landing';
import RegisterContainer from '../containers/user/RegisterContainer';
import UserConfirmationContainer from '../containers/user/UserConfirmationContainer';
import ResetPasswordContainer from '../containers/user/ResetPasswordContainer';
import ContactUsContainer from '../containers/contactUs/ContactUsContainer';
import DashboardContainer from '../containers/dashboard';
import SchemeContainer from '../containers/scheme';
import SchemeOptionsContainer from '../containers/schemeOptions';
import { RearrangeContainer } from '../containers/schemeOptions/charts/dashboard/rearrange';
import ProfileContainer from '../containers/profile';
import NotificationContainer from '../containers/notification';
import IframeLoader from '../containers/knowladgeCenter';
import Reports from '../containers/reports';
import MultiClient from '../containers/multiClient';
import TaskContainer from '../containers/dashboard/task';
import PortFolio from '../containers/schemeOptions/charts/portfolioBuilder';

let loggedUser = BrowserStorage.getInstance().getLoggedUser();
const handleSession = session => {
    loggedUser = session ? session.loggedUser : null;
    BrowserStorage.getInstance().setUserSession(session);
};

const UnAuthRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            loggedUser === null ? <Component {...props} artifacts={getSystemArtifacts()} /> : <Redirect to="/" />
        }
    />
);
const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            loggedUser !== null ? (
                <Component loggedUser={loggedUser} artifacts={getSystemArtifacts()} {...props} />
            ) : (
                <Redirect to="/" />
            )
        }
    />
);

const routes = (
    <Layout handleSession={handleSession}>
        <ReactRouter history={history}>
            <Switch>
                <Route exact path="/" component={LandingContainer} />

                <UnAuthRoute path="/register" component={RegisterContainer} />
                <UnAuthRoute path="/user/confirm/:email" component={UserConfirmationContainer} />
                <UnAuthRoute path="/reset/password/:email" component={ResetPasswordContainer} />
                <UnAuthRoute path="/contact-us" component={ContactUsContainer} />

                <AuthRoute path="/my-navigator" component={DashboardContainer} />
                <AuthRoute exact path="/scheme" component={SchemeContainer} />
                <AuthRoute path="/scheme/options/dashboard/rearrange/:schemeId" component={RearrangeContainer} />
                <AuthRoute path="/scheme/options/:container/:schemeId/:schemeName" component={SchemeOptionsContainer} />
                <AuthRoute path="/profile" component={ProfileContainer} />
                <AuthRoute path="/notification" component={NotificationContainer} />
                <AuthRoute path="/reports/:reportName?" component={Reports} />
                <AuthRoute path="/multi-client" component={MultiClient} />
                <AuthRoute path="/tasks" component={TaskContainer} />
                <AuthRoute path="/scheme/options/portfolio-builder" component={PortFolio} />

                <Route path="/knowledge-centre" component={IframeLoader} />
                <Route path="/coming-soon" component={ComingSoonComponent} />
                <Route path="/404" component={PageNotFoundComponent} />

                <Redirect from="/*" to="/404" />
            </Switch>
        </ReactRouter>
    </Layout>
);

export default routes;
