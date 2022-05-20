import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import BrowserStorage from '../../middlewares/storage';

import { login_loggedUser } from '../user/selectors/loginSelectors';
import { logout_status } from '../user/selectors/logoutSelectors';

import { Spin } from 'antd';

import config from 'appConfig';
const DomainMap = config.landingPageDomainMap;

class LandingContainer extends Component {
    state = {
        loggedUser: null,
        logout_status: false
    };

    componentDidMount() {
        const loggedUser = BrowserStorage.getInstance().getLoggedUser();
        this.setState({ loggedUser });
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        const { logout_status } = this.state;

        if (np.login_loggedUser !== null) {
            const { idToken } = np.login_loggedUser;
            const loggedUser = { jwtToken: idToken.jwtToken, ...idToken.payload };

            this.setState({ loggedUser });
        }

        if (np.logout_status !== null && logout_status !== np.logout_status) {
            if (np.logout_status === true) this.setState({ logout_status: np.logout_status, loggedUser: null });
        }
    }

    //Returns landing for the domain
    //If no page for domain returns default
    getLandingPage = () => {
        const { loggedUser } = this.state;
        const hostName = window.location.hostname;

        let Component = DomainMap.find(d => d.url === hostName);
        let DefaultComponent = DomainMap.find(d => d.url === 'default');
        //should remove this after ui development, this makes it easy for the ui developer to switch
        //landing screens
        if (window.overrideLanding) {
            const L = DomainMap.find(d => d.url === window.overrideLanding).component;
            return <L loggedUser={loggedUser} />;
        }

        return Component ? (
            <Component.component loggedUser={loggedUser} />
        ) : (
            <DefaultComponent.component loggedUser={loggedUser} />
        );
    };

    render() {
        return (
            <section className="landing-section">
                <React.Suspense fallback={<Spin />}>{this.getLandingPage()}</React.Suspense>
            </section>
        );
    }
}

LandingContainer.propTypes = {
    login_loggedUser: PropTypes.object,
    logout_status: PropTypes.bool
};
LandingContainer.defaultProps = {
    login_loggedUser: null,
    logout_status: false
};
const mapStateToProps = createStructuredSelector({
    login_loggedUser: login_loggedUser(),
    logout_status: logout_status()
});

export default connect(
    mapStateToProps,
    null
)(LandingContainer);
