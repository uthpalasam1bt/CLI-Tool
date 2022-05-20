import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import IdleTimer from 'react-idle-timer';

import BrowserStorage from '../../middlewares/storage';
import { history } from '../../redux/store';
import NotificationHelper from '../../helpers/NotificationHelper';

import Header from '../../components/header';
import Footer from '../../components/footer';
import LoginModal from '../../components/modals/LoginModal';
import ForgotPasswordModal from '../../components/modals/ForgotPasswordModal';
import '../../assets/scss/layout.scss';
import SessionTimeoutModal from '../../components/modals/SessionTimeoutModal';

import { doLogin } from '../user/actions/loginActions';
import { login_inProgress, login_loggedUser, login_error } from '../user/selectors/loginSelectors';

import { doLogout } from '../user/actions/logoutActions';
import { logout_inProgress, logout_status, logout_error } from '../user/selectors/logoutSelectors';

import { sendPasswordResetCode } from '../user/actions/forgotPasswordActions';
import {
    forgotPassword_inProgress,
    forgotPassword_status,
    forgotPassword_error
} from '../user/selectors/forgotPasswordSelectors';

import {
    getUserNotifications,
    setUserNotificationStatus,
    resetNotificationBellRedDot,
    requestArtifacts
} from './actions';

import {
    getNotificationsList,
    getNotificationsInProgress,
    getEmailNotificationFlagStatus,
    getLatestNotificationsCount,
    session,
    getNotificationTotalCount,
    getNotificationRedDotVisibility
} from './selectors';
import { getPersonalDetails_data } from '../profile/selectors';
import {
    getTurnOnNotificationStatus,
    getTurnOnNotificationIsloading
} from '../../containers/notification/notifications/selectors';

import { USER_NOT_CONFIRM_EXCEPTION } from '../../constants/apiErrorCodes';
import {
    YOUR_EMAIL_IS_NOT_VERIFIED,
    WE_HAVE_SENT_YOU_A_VERIFICATION_CODE,
    DELETE_USER_FORCE_SIGNOUT,
    CONCURRENT_USER_FORCE_SIGNOUT
} from '../../config/constants';
import AwsIotSingleton from '../../helpers/awsIot';

// import Lex from '../../components/lex';

const storage = BrowserStorage.getInstance();
// if (storage.getUserSession() && storage.getUserSession().loggedUser.notificationFlag) {
// }

const FLO_ACCOUNT_DELETED = 'FLOAD';
// const FLO_CONCURRENT_LOGIN = 'FLOCLIN';

class LayoutContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoginModal: false,
            showForgotPasswordModal: false,
            showIdleModal: false,

            loggedUser: null,
            login_inProgress: false,
            login_error: null,
            loginEmail: null,

            logout_inProgress: false,
            logout_status: false,
            logout_error: null,

            forgotPassword_inProgress: false,
            forgotPassword_status: false,
            forgotPassword_error: null,
            forgotPasswordEmail: null,

            session: null,
            getPersonalDetails_data: null,
            userImage: null,
            isNewNotification: null //  notication message handle constant
        };

        this.listenRouteChange = this.listenRouteChange.bind(this);
        this.handleSession = this.handleSession.bind(this);

        this.handleShowLoginModal = this.handleShowLoginModal.bind(this);
        this.handleShowForgotPasswordModal = this.handleShowForgotPasswordModal.bind(this);

        this.handleSubmitLoginForm = this.handleSubmitLoginForm.bind(this);
        this.handleSubmitForgotPasswordForm = this.handleSubmitForgotPasswordForm.bind(this);

        this.handleLogout = this.handleLogout.bind(this);

        this.redirectTo = this.redirectTo.bind(this);

        this.idleTimer = null;
        this.onIdle = this.onIdle.bind(this);
        this.onCloseIdleModal = this.onCloseIdleModal.bind(this);
        this.handleGetUserNotifications = this.handleGetUserNotifications.bind(this);
    }
    UNSAFE_componentWillReceiveProps(np, nc) {
        const {
            login_inProgress,
            loginEmail,
            logout_inProgress,
            logout_status,
            forgotPasswordEmail,
            forgotPassword_inProgress,
            forgotPassword_status,

            session,

            getPersonalDetails_data
        } = this.state;

        if (np.login_inProgress !== null && login_inProgress !== np.login_inProgress) {
            this.setState({ login_inProgress: np.login_inProgress });
        }
        if (np.login_loggedUser !== null) {
            const { idToken } = np.login_loggedUser;
            const session = {
                data: np.login_loggedUser,
                loggedUser: { jwtToken: idToken.jwtToken, ...idToken.payload }
            };

            this.setState({ showLoginModal: false }, () => {
                this.handleSession(session);
            });
        }
        if (np.login_error !== null) {
            this.setState({ login_error: np.login_error }, () => {
                if (np.login_error.code === USER_NOT_CONFIRM_EXCEPTION) {
                    NotificationHelper.getInstance().warning(YOUR_EMAIL_IS_NOT_VERIFIED);
                    return this.redirectTo(`/user/confirm/${loginEmail}`);
                }

                NotificationHelper.getInstance().error(np.login_error.message);
            });
        }

        if (np.logout_inProgress !== null && logout_inProgress !== np.logout_inProgress) {
            this.setState({ logout_inProgress: np.logout_inProgress, logout_status: false });
        }
        if (np.logout_status !== null && logout_status !== np.logout_status) {
            if (np.logout_status === true)
                this.setState({ logout_status: np.logout_status }, () => {
                    this.handleSession(null);
                });
        }
        if (np.logout_error !== null) {
            this.handleSession(null);
        }

        if (np.forgotPassword_inProgress !== null && forgotPassword_inProgress !== np.forgotPassword_inProgress) {
            this.setState({
                forgotPassword_inProgress: np.forgotPassword_inProgress,
                forgotPassword_status: false
            });
        }
        if (np.forgotPassword_status !== null && forgotPassword_status !== np.forgotPassword_status) {
            this.setState({ forgotPassword_status: np.forgotPassword_status }, () => {
                if (np.forgotPassword_status === true) {
                    NotificationHelper.getInstance().success(WE_HAVE_SENT_YOU_A_VERIFICATION_CODE);
                    this.redirectTo(`/reset/password/${forgotPasswordEmail}`);
                }
            });
        }
        if (np.forgotPassword_error) {
            this.setState({ forgotPassword_error: np.forgotPassword_error }, () => {
                NotificationHelper.getInstance().error(np.forgotPassword_error.message);
            });
        }

        if (np.session !== null && JSON.stringify(np.session) !== JSON.stringify(session)) {
            const loggedUser = BrowserStorage.getInstance().getLoggedUser();
            this.setState({ session: np.session, loggedUser }, () => {
                this.handleSession(np.session, 'update');
            });
        }

        if (
            np.getPersonalDetails_data !== null &&
            JSON.stringify(getPersonalDetails_data) !== JSON.stringify(np.getPersonalDetails_data)
        ) {
            const sessionUser = storage.getUserSession();
            const { loggedUser } = sessionUser;

            const user = np.getPersonalDetails_data;
            this.setState({ getPersonalDetails_data: np.getPersonalDetails_data }, () => {
                if (user.imageUrl && loggedUser.imageUrl !== user.imageUrl) loggedUser.imageUrl = user.imageUrl;

                if (user.name && loggedUser.name !== user.name) loggedUser.name = user.name;

                this.handleSession(sessionUser, 'updateWithState');
            });
        }
    }

    componentDidMount() {
        this.listenRouteChange();
        this.props.requestArtifacts();

        const loggedUser = BrowserStorage.getInstance().getLoggedUser();
        this.setState({ loggedUser }, () => {
            this.handleGetUserNotifications(true);
            if (loggedUser) this.connectToSocket(loggedUser);
        });
    }

    componentWillUnmount() {
        this.historyListener();
    }

    //  socket connection establish
    connectToSocket = loggedUser => {
        if (loggedUser.iotDetails) {
            try {
                const { email, sessionId } = loggedUser;
                const { userTopic } = loggedUser.iotDetails;
                AwsIotSingleton.getPayloadFromSocket(
                    userTopic,
                    payload => {
                        if (payload && payload.topic && payload.topic === userTopic) {
                            this.props.getUserNotifications({ userEmail: loggedUser.email, isAll: false });
                        }
                    },
                    () => {
                        //reconnect handler
                        this.props.getUserNotifications({ userEmail: loggedUser.email, isAll: false });
                    }
                );

                AwsIotSingleton.getPayloadFromSocket(`${email}/force-logout`, payload => {
                    if (payload.type === FLO_ACCOUNT_DELETED) {
                        NotificationHelper.getInstance().warning(DELETE_USER_FORCE_SIGNOUT);
                        this.handleLogout();
                    } else {
                        console.log('sessionId', sessionId);
                        if (payload.sessionId !== sessionId) {
                            NotificationHelper.getInstance().warning(CONCURRENT_USER_FORCE_SIGNOUT);
                            this.handleLogout();
                        }
                    }
                });
            } catch (e) {
                // console.log('exception :' + e);
            }
        }
    };

    // callback function for header component
    handleGetUserNotifications(isAll = false) {
        const { loggedUser } = this.state;
        if (loggedUser) {
            this.setState({ isNewNotification: false });
            this.props.getUserNotifications({ userEmail: loggedUser.email, isAll }); // maxItem for limit the notification count
        }
    }

    // view login form
    handleShowLoginModal() {
        const { showLoginModal } = this.state;
        this.setState({ showLoginModal: !showLoginModal, showForgotPasswordModal: false });
    }

    // view frogot password form
    handleShowForgotPasswordModal() {
        const { showForgotPasswordModal } = this.state;
        this.setState({ showForgotPasswordModal: !showForgotPasswordModal, showLoginModal: false });
    }

    // handle login submit
    handleSubmitLoginForm(formData) {
        const { email: loginEmail } = formData;
        this.props.doLogin(formData);
        this.setState({ loginEmail });
    }

    // handle login submit
    handleSubmitForgotPasswordForm(formData) {
        const { email: forgotPasswordEmail } = formData;
        this.props.sendPasswordResetCode(formData);
        this.setState({ forgotPasswordEmail });
    }
    // handle logout
    handleLogout() {
        const { sessionId } = this.state.loggedUser;
        this.props.doLogout({ sessionId }); //email,
        AwsIotSingleton.endConnection();
    }

    handleSession(session, t) {
        // upadate only session
        if (t === 'update') return this.props.handleSession(session);
        // update session with state
        if (t === 'updateWithState')
            return this.setState({ loggedUser: session ? session.loggedUser : null }, () => {
                this.props.handleSession(session);
            });

        if (session !== null) {
            const iat = +session.loggedUser.iat;
            const exp = +session.loggedUser.exp - 600;

            const expMoment = moment()
                .add((exp - iat) / 60, 'minutes')
                .format('YYYY-MM-DD HH:mm');
            session.loggedUser.expMoment = expMoment; // timeout counter
        }

        this.setState({ loggedUser: session ? session.loggedUser : null }, () => {
            this.props.handleSession(session);
            this.redirectTo('/my-navigator');
            if (session && session.loggedUser) this.connectToSocket(session.loggedUser); // user connets to socket
        });
    }

    redirectTo(uri) {
        this.setState({ showLoginModal: false, showForgotPasswordModal: false });
        history.push(uri);
    }
    isNewNotificationsAvailable = () => {
        if (this.state.isNewNotification) {
            return true;
        } else {
            return false;
        }
    };
    // set the path into rout
    listenRouteChange() {
        this.historyListener = history.listen(() => {
            const { pathname } = window.location;
            this.setState({ pathname });
        });
    }
    // continue sesssion with new tocken {modal handler}
    onIdle() {
        //Patch fix start
        const loggedUser = BrowserStorage.getInstance().getLoggedUser();
        if (!loggedUser) return;
        //Patch fix end
        this.idleTimer.pause();
        this.setState({ showIdleModal: true });
    }
    // close session timeout modal
    onCloseIdleModal(resetTimer) {
        this.setState({ showIdleModal: false });
        if (resetTimer) return this.idleTimer.reset();

        this.handleLogout();
    }

    render() {
        const {
            pathname,
            showLoginModal,
            login_inProgress,
            logout_inProgress,
            showForgotPasswordModal,
            forgotPassword_inProgress,
            showIdleModal,
            getPersonalDetails_data,
            loggedUser
        } = this.state;
        const {
            children,
            userNotificationsList,
            getNotificationsInProgress,
            emailNotificationFlagSatus,
            setUserNotificationStatus,
            notificationTotalCount,
            isNotificationRedDotVisible,
            resetNotificationBellRedDot
        } = this.props;
        return (
            <>
                {loggedUser && (
                    <IdleTimer
                        ref={ref => {
                            this.idleTimer = ref;
                        }}
                        element={document}
                        onIdle={this.onIdle}
                        debounce={250}
                        timeout={1000 * 60 * 30}
                        stopOnIdle={true}
                    />
                )}
                {/* <Lex
          botAlias="TPIP_HELP_BOT_vPRE_ALPHA"
          botName="Legal & General Support"
          identityPoolId="eu-west-1:c9c5f6c8-0d02-40dc-a642-43ce2948de34"
          region="eu-west-1"
          placeholder="Type your question ..."
        /> */}
                <div className="lgim-styles-wrapper">
                    {pathname !== '/404' && (
                        <Header
                            loggedUser={loggedUser}
                            notificationTotalCount={notificationTotalCount}
                            login_inProgress={login_inProgress}
                            logoutInProgress={logout_inProgress}
                            handleShowLoginModal={this.handleShowLoginModal}
                            handleLogout={this.handleLogout}
                            handleGetUserNotifications={this.handleGetUserNotifications}
                            userNotificationsList={userNotificationsList}
                            getNotificationsInProgress={getNotificationsInProgress}
                            isTurnOnNotification={emailNotificationFlagSatus}
                            setUserNotificationStatus={setUserNotificationStatus}
                            profileImage={
                                getPersonalDetails_data && getPersonalDetails_data.imageUrl
                                    ? getPersonalDetails_data.imageUrl
                                    : null
                            }
                            name={
                                getPersonalDetails_data && getPersonalDetails_data.name
                                    ? getPersonalDetails_data.name
                                    : null
                            }
                            isTurnOnEmailNotifications={this.userFlag}
                            getTurnOnNotificationIsloading={this.props.getTurnOnNotificationIsloading}
                            isNotificationRedDotVisible={isNotificationRedDotVisible}
                            resetNotificationBellRedDot={resetNotificationBellRedDot}
                        />
                    )}
                    <div className={pathname !== '/' ? 'child-wrapper' : ''}>{children}</div>
                    <Footer loggedUser={loggedUser} />
                </div>
                {showLoginModal && (
                    <LoginModal
                        show={showLoginModal}
                        inProgress={login_inProgress}
                        handleShowLoginModal={this.handleShowLoginModal}
                        handleShowForgotPasswordModal={this.handleShowForgotPasswordModal}
                        handleSubmitLoginForm={this.handleSubmitLoginForm}
                        redirectTo={this.redirectTo}
                    />
                )}
                {showForgotPasswordModal && (
                    <ForgotPasswordModal
                        show={showForgotPasswordModal}
                        inProgress={forgotPassword_inProgress}
                        handleShowForgotPasswordModal={this.handleShowForgotPasswordModal}
                        handleSubmitForgotPasswordForm={this.handleSubmitForgotPasswordForm}
                    />
                )}
                {showIdleModal && <SessionTimeoutModal show={showIdleModal} handleClose={this.onCloseIdleModal} />}
            </>
        );
    }
}

LayoutContainer.propTypes = {
    children: PropTypes.element.isRequired,

    login_inProgress: PropTypes.bool,
    login_loggedUser: PropTypes.object,
    login_error: PropTypes.object,

    logout_inProgress: PropTypes.bool,
    logout_status: PropTypes.bool,
    logout_error: PropTypes.object,

    forgotPassword_inProgress: PropTypes.bool,
    forgotPassword_status: PropTypes.bool,
    forgotPassword_error: PropTypes.object,

    session: PropTypes.object
};
LayoutContainer.defaultProps = {
    login_inProgress: false,
    login_loggedUser: null,
    login_error: null,

    logout_inProgress: false,
    logout_status: false,
    logout_error: null,

    forgotPassword_inProgress: false,
    forgotPassword_status: false,
    forgotPassword_error: null,

    session: null
};
const mapStateToProps = createStructuredSelector({
    login_inProgress: login_inProgress(),
    notificationTotalCount: getNotificationTotalCount(),
    isTurnOnEmailNotifications: getTurnOnNotificationStatus(),
    getTurnOnNotificationIsloading: getTurnOnNotificationIsloading(),
    isNotificationRedDotVisible: getNotificationRedDotVisibility(),

    login_loggedUser: login_loggedUser(),
    login_error: login_error(),

    logout_inProgress: logout_inProgress(),
    logout_status: logout_status(),
    logout_error: logout_error(),

    forgotPassword_inProgress: forgotPassword_inProgress(),
    forgotPassword_status: forgotPassword_status(),
    forgotPassword_error: forgotPassword_error(),
    userNotificationsList: getNotificationsList(),
    getNotificationsInProgress: getNotificationsInProgress(),
    emailNotificationFlagSatus: getEmailNotificationFlagStatus(),
    latestNotificationCount: getLatestNotificationsCount(),
    isLogout: logout_status(),

    session: session(),

    getPersonalDetails_data: getPersonalDetails_data()
});

const mapDispatchToProps = dispatch => ({
    doLogin: payload => {
        dispatch(doLogin(payload, true));
    },
    doLogout: payload => {
        dispatch(doLogout(payload));
    },
    sendPasswordResetCode: payload => {
        dispatch(sendPasswordResetCode(payload));
    },
    getUserNotifications: payload => {
        dispatch(getUserNotifications(payload));
    },
    setUserNotificationStatus: payload => {
        dispatch(setUserNotificationStatus(payload));
    },
    resetNotificationBellRedDot: email => {
        dispatch(resetNotificationBellRedDot(email));
    },
    requestArtifacts: payload => {
        dispatch(requestArtifacts(payload));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayoutContainer);
