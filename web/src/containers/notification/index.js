import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Row, Col, Switch } from 'antd';
import { Route, Switch as RouteSwitch } from 'react-router';

import UtilsHelper from 'helpers/UtilsHelper';
import Notifications from './notifications';
import Tasks from './tasks';
import BrowserStorage from '../../middlewares/storage';
import { setTaskEmailConfig, getTaskEmailConfig } from './tasks/actions';
import { setNotificationConfig } from './notifications/actions';
import { getPersonalDetails } from '../profile/actions';
import { createStructuredSelector } from 'reselect';
import { getPersonalDetails_data } from '../profile/selectors';
// import CreateTaskModal from '../../components/modals/CreateTaskModal';

const Notification = props => {
    const { loggedUser, location, history } = props;
    const dispatch = useDispatch();
    const [personalData, setPersonalData] = useState({});
    const [notifyEmail, setNotifyEmail] = useState(false);
    const [notifyTaskEmail, setNotifyTaskEmail] = useState(false);

    const taskEmailConfigLoading = useSelector(state => state.tasksReducer.taskEmailConfigLoading);
    const sendEmailConfig = useSelector(state => state.tasksReducer.sendEmailConfig);
    const notificationConfigLoading = useSelector(state => state.notificationReducer.notificationConfigLoading);

    useEffect(() => {
        const loggedUser = BrowserStorage.getInstance().getLoggedUser();

        if (loggedUser && loggedUser.email) {

            dispatch(getPersonalDetails(loggedUser.email));
        }
    }, [0, location.pathname]);

    useEffect(() => {
        if (!props.getPersonalDetails_data) return;

        const userData = props.getPersonalDetails_data;

        setNotifyEmail(userData.notifyEmail === 1 ? true : false);
        setNotifyTaskEmail(userData.sendTasksEmail === 1 ? true : false)
        setPersonalData(userData);
    }, [0, props.getPersonalDetails_data]);

    useEffect(() => {
        dispatch(getTaskEmailConfig({ userEmail: loggedUser.email }));
    }, [dispatch, loggedUser.email]);

    const navigate = screen => {
        history.push(screen);
    };

    const isActiveLink = path => {
        return UtilsHelper.getInstance().matchRuleShort(location.pathname, path) && 'active';
    };

    const handleTaskEmailConfigToggle = status => {
        dispatch(setTaskEmailConfig({ sendEmail: status }));
        setNotifyTaskEmail(status);
    };

    const handNotificationsConfigToggle = status => {
        dispatch(setNotificationConfig({ sendNotifications: status }));
        setNotifyEmail(status);
    };

    const ChildRoute = ({ component: Component, ...rest }) => {
        return (
            <Route {...rest}>
                <Component loggedUser={loggedUser} {...props} {...rest} />
            </Route>
        );
    };

    return (
        <>
            <section className="notification-container root-form-wrapper">
                <div className="notification-header clearfix">
                    <div className="container">
                        {location.pathname === '/notification' ? (
                            <div className="list">
                                <span className="list-items active">Turn on email notifications</span>
                                <span>
                                    <Switch
                                        onChange={handNotificationsConfigToggle}
                                        checked={notifyEmail}
                                        disabled={notificationConfigLoading}
                                    />
                                </span>
                            </div>
                        ) : (
                            <div className="list">
                                <span className="list-items active">Email messages</span>
                                <span>
                                    <Switch
                                            checked={notifyTaskEmail}
                                        disabled={taskEmailConfigLoading}
                                        onChange={handleTaskEmailConfigToggle}
                                    />
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="notification-content clearfix">
                    <div className="container">
                        <Row gutter={20}>
                            <Col xl={8} lg={8} xs={24}>
                                <div className="notification-navigator">
                                    <div className="card card-wrap">
                                        <div className="header">
                                            <span className="title">Notifications & Collaborate</span>
                                        </div>
                                        <div className="content">
                                            <div
                                                className={`step-items ${isActiveLink('/notification')}`}
                                                onClick={() => navigate('/notification')}
                                            >
                                                <span className="step-item-title">Notifications</span>
                                            </div>
                                            <div
                                                className={`step-items ${isActiveLink('/notification/tasks')}`}
                                                onClick={() => navigate('/notification/tasks')}
                                            >
                                                <span className="step-item-title">Collaborate</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xl={16} lg={16} xs={24}>
                                <RouteSwitch>
                                    {/* <ChildRoute exact path="/notification" component={Notifications} />
                  <ChildRoute exact path="/notification/tasks" component={Tasks} /> */}
                                    {/* //fix for rout components keep mounting and remounting at every render
                      //see ref: https://reacttraining.com/react-router/web/api/Route/component
                  */}
                                    {ChildRoute({ path: '/notification', exact: true, component: Notifications })}
                                    {ChildRoute({
                                        path: '/notification/tasks',
                                        exact: true,
                                        component: Tasks
                                    })}
                                </RouteSwitch>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    getPersonalDetails_data: getPersonalDetails_data()
});

export default connect(
    mapStateToProps,
    null
)(Notification);
