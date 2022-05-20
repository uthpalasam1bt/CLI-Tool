import React, { Component } from 'react';
import { Switch, Spin } from 'antd';
import { history } from '../../redux/store';
import { connect } from 'react-redux';
import { setMarkAssReadNotifications } from '../../containers/layout/actions';
import { createStructuredSelector } from 'reselect';
import { setNotificationConfig } from '../../containers/notification/notifications/actions';
import BrowserStorage from '../../middlewares/storage';
import { getPersonalDetails } from '../../containers/profile/actions';
import { getPersonalDetails_data } from '../../containers/profile/selectors';

class NotificationPopover extends Component {
    static defaultProps = {
        data: [],
        isTurnOnNotification: false,
        getPersonalDetails_data: null
    };

    state = {
        notifyEmail: false
    };

    componentDidMount() {
        const loggedUser = BrowserStorage.getInstance().getLoggedUser();

        if (loggedUser && loggedUser.email) this.props.getPersonalDetails(loggedUser.email);
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        const { getPersonalDetails_data } = this.state;

        if (
            np.getPersonalDetails_data &&
            JSON.stringify(getPersonalDetails_data) !== JSON.stringify(np.getPersonalDetails_data)
        ) {
            const { notifyEmail } = np.getPersonalDetails_data;

            this.setState({ getPersonalDetails_data: np.getPersonalDetails_data, notifyEmail });
        }
    }

    /**
        TODO: Should change to this format later ( with notification title )
        <div key={item.notificationId} className="notification-list-item">
            <i className="fa fa-circle fa-icon active" ></i><span className="title">{item.content.title}</span>
            <span className="description">{item.content.message}</span>
        </div>
     */
    renderNotificationItem = item => {
        return (
            <div key={item.notificationId} className="notification-list-item">
                {item.status !== 'R' ? (
                    <span
                        onClick={() => {
                            // console.log(item.notificationId);
                            this.props.markAsRead([item.notificationId]);
                        }}
                    >
                        <i className="fa fa-circle fa-icon active notification-circle"></i>{' '}
                    </span>
                ) : (
                    <i className="fa fa-circle fa-icon in-active"></i>
                )}
                <span className="description">{item.content}</span>
            </div>
        );
    };

    handleNotificationFlagStatus = checked => {
        // TODO: Should do this once the userGroup feature is available
        // const { setUserNotificationStatus, loggedUser } = this.props;
    };

    handNotificationsConfigToggle = state => {
        this.setState({ notifyEmail: state });
        this.props.setNotificationConfig({ sendNotifications: state });
    };

    renderLoadingContainer = () => {
        return (
            <div className="loading-container">
                <Spin />
            </div>
        );
    };

    redirectToNotification() {
        return history.push(`/notification`);
    }

    render() {
        const { data, isLoading } = this.props;
        const { pathname } = window.location;
        const { notifyEmail } = this.state;
        return (
            <>
                <div className="lgim-styles-wrapper notification clearfix">
                    <div className="notification-header clearfix">
                        <div className="pull-left">
                            <span className="main-title">
                                Notifications (
                                {this.props.totalNotificationCount >= 3500
                                    ? '3500+'
                                    : this.props.totalNotificationCount}
                                )
                            </span>
                        </div>
                        <div className="pull-right">
                            <span
                                className="view-link"
                                onClick={() => {
                                    this.redirectToNotification();
                                }}
                            >
                                Manage
                            </span>
                        </div>
                    </div>
                    <div className="notification-content">
                        {isLoading ? this.renderLoadingContainer() : data.map(this.renderNotificationItem)}
                    </div>
                    <div className="notification-footer clearfix">
                        <div className="pull-left">
                            <span className="notification-text">Turn on email notifications</span>
                        </div>
                        <div className="pull-right">
                            {/* 
                                TODO: Should do this, once the userGroup feature is available
                                <Switch size="small" onChange={this.handleNotificationFlagStatus} checked={isTurnOnNotification} />
                            */}
                            <Switch
                                size="small"
                                defaultChecked
                                checked={notifyEmail}
                                onChange={this.handNotificationsConfigToggle}
                                disabled={pathname === '/notification'}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
const mapStateToProps = createStructuredSelector({
    getPersonalDetails_data: getPersonalDetails_data()
});

const mapDispatchToProps = dispatch => ({
    markAsRead: payload => {
        dispatch(setMarkAssReadNotifications(payload));
    },
    setNotificationConfig: payload => {
        dispatch(setNotificationConfig(payload));
    },
    getPersonalDetails: payload => {
        dispatch(getPersonalDetails(payload));
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationPopover);
