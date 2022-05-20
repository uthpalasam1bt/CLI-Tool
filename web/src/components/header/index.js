import React, { Component } from 'react';
import { Drawer, Menu, Dropdown, Popover, Badge, Avatar } from 'antd';

import { history } from '../../redux/store';

import UtilsHelper from '../../helpers/UtilsHelper';
import NotificationPopover from '../../components/popover/NotificationPopover';

import logo from '../../assets/images/logo.svg';
import notification from '../../assets/images/common/notify.svg';
import { getPrimaryRole } from '../../helpers/validateUser';
export class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDrawer: false,
            pathname: '/',
            isShowRedDot: false
        };

        this.listenRouteChange = this.listenRouteChange.bind(this);
        this.handleDrawer = this.handleDrawer.bind(this);
    }

    componentDidMount() {
        const { pathname } = window.location;
        this.setState({ pathname });
        this.listenRouteChange();
        this.getNotifications();
    }

    componentWillUnmount() {
        this.historyListener();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { ProfileImage_data } = this.props;
        const { ProfileImage_data: state_ProfileImage_data } = this.state;
        if (
            ProfileImage_data !== null &&
            JSON.stringify(ProfileImage_data) !== JSON.stringify(state_ProfileImage_data)
        ) {
            this.setState({ ProfileImage_data });
        }
    }

    getNotifications = () => {
        this.props.handleGetUserNotifications(true);
    };

    doNavigate(uri) {
        if (uri === '/login') {
            this.props.handleShowLoginModal();
            return;
        }

        if (uri === '/sign-out') {
            this.props.handleLogout();
            return;
        }

        // cr - knowledge center be within website
        // if (uri === '/knowledge-centre') {
        //   window.open('http://www.lgim.com/uk/en/insights/macro-matters-blog/');
        //   return;
        // }

        if (uri.match(/^(\/portfolio-builder|\/portfolio-builder)$/)) return history.push('/coming-soon');

        history.push(uri);
    }

    handleDrawer() {
        const { showDrawer } = this.state;
        this.setState({ showDrawer: !showDrawer });
    }

    listenRouteChange() {
        this.historyListener = history.listen(() => {
            const { pathname } = window.location;

            this.setState({ pathname, showDrawer: false });
        });
    }

    matchRuleShort(str, rule) {
        if (str === '/' || rule === '/*') {
            if (`${str}*` === rule) return true;
        } else {
            return UtilsHelper.getInstance().matchRuleShort(str, rule);
        }
    }

    renderNotificationPopOver() {
        const {
            loggedUser,
            userNotificationsList,
            isTurnOnNotification,
            setUserNotificationStatus,
            getNotificationsInProgress: isLoading,
            notificationTotalCount,
            isTurnOnEmailNotifications,
            getTurnOnNotificationIsloading
        } = this.props;
        const latestNotifications = userNotificationsList && userNotificationsList.slice(0, 10);

        return (
            <NotificationPopover
                totalNotificationCount={notificationTotalCount}
                data={latestNotifications}
                isLoading={isLoading}
                loggedUser={loggedUser}
                isTurnOnNotification={isTurnOnNotification}
                setUserNotificationStatus={setUserNotificationStatus}
                isTurnOnEmailNotifications={isTurnOnEmailNotifications}
                getTurnOnNotificationIsloading={getTurnOnNotificationIsloading}
            />
        );
    }

    setRedirect() {
        history.push('/');
    }

    render() {
        const { pathname, showDrawer } = this.state;
        const { loggedUser, logoutInProgress, isNotificationRedDotVisible } = this.props;

        const unAuthRoutes = [
            {
                name: ' ',
                uri: '/'
            },
            {
                name: 'Home',
                uri: '/my-navigator'
            },
            // {
            //   name: 'Portfolio Builder',
            //   uri: '/portfolio-builder'
            // },
            {
                name: 'Knowledge Centre',
                uri: '/knowledge-centre'
            },

            {
                name: 'Contact Us',
                uri: '/contact-us'
            },
            {
                name: 'Log in',
                uri: '/login'
            },
            {
                name: 'Register',
                uri: '/register'
            }
        ];
        const authRoutes = [
            {
                name: 'Home',
                uri: '/my-navigator'
            },
            {
                name: 'Schemes',
                uri: '/scheme'
            },
            {
                name: 'Tasks',
                uri: '/tasks'
            },
            {
                name: 'Reports',
                uri: '/reports'
            },

            loggedUser &&
                getPrimaryRole(loggedUser) !== 'client' && {
                    name: 'Multiclient',
                    uri: '/multi-client'
                },
            // {
            //   name: 'Portfolio Builder',
            //   uri: '/portfolio-builder'
            // },
            {
                name: 'Knowledge Centre',
                uri: '/knowledge-centre'
            },
            {
                name: 'Notification',
                uri: '/notification'
            },
            {
                name: 'Profile',
                menuItems: [
                    { name: 'My Profile', uri: '/profile', icon: 'fa-user' },
                    // { name: 'Settings', uri: '/settings', icon: 'fa-cog' },
                    { name: 'Sign Out', uri: '/sign-out', icon: 'fa-power-off' }
                ]
            }
        ].filter(Boolean);

        let profileImageAvaliable =
            loggedUser && loggedUser.imageUrl && loggedUser.imageUrl.indexOf('/profile.png') < 0 ? true : false;

        return (
            <header className="tpip-header clearfix">
                <div className="container-fluid">
                    <div className="header-content">
                        <div className="logo-wrapper">
                            <img
                                src={logo}
                                alt="TPIP"
                                //onClick={this.setRedirect}
                                className="img img-responsive logo"
                            />
                        </div>
                        <div className="header-items-wrapper">
                            {loggedUser
                                ? authRoutes.map((route, rKey) =>
                                      route.name === 'Profile' ? (
                                          <Dropdown
                                              className="lgim-styles-wrapper"
                                              key={rKey}
                                              overlay={
                                                  <Menu className="lgim-styles-wrapper menu-item-wrapper menu-wrapper-dropdown">
                                                      {/* <Menu.Item className="dropdown-menu-padding custom-menu">
                            <span className="dropdown-username">
                              {loggedUser.name}
                            </span>
                            <span className="dropdown-email">
                             xys@gmail.com
                            </span>
                          </Menu.Item> */}
                                                      {route.menuItems.map((item, iKey) => (
                                                          <Menu.Item
                                                              key={iKey}
                                                              onClick={() => {
                                                                  this.doNavigate(item.uri);
                                                              }}
                                                              disabled={item.uri === '/sign-out' && logoutInProgress}
                                                          >
                                                              <span className="menu-item">
                                                                  {' '}
                                                                  <i
                                                                      className={`fa-icons fa ${
                                                                          item.uri === '/sign-out' && logoutInProgress
                                                                              ? 'fa-circle-o-notch fa-spin'
                                                                              : item.icon
                                                                      }`}
                                                                  ></i>
                                                                  {item.name}
                                                              </span>
                                                          </Menu.Item>
                                                      ))}
                                                  </Menu>
                                              }
                                          >
                                              {/* <span className="header-item">
                          <Avatar
                            src={loggedUser.imageUrl ? loggedUser.imageUrl : user}
                            size="default"
                          />
                          <span className="header-username">{loggedUser.name.split(' ')[0]}</span>
                          <i className="fa-icon fa fa-chevron-down"></i>
                        </span> */}
                                              <span className="header-item">
                                                  {/* {loggedUser.imageUrl ? (
                          <Avatar
                            src={loggedUser.imageUrl && loggedUser.imageUrl}
                            size="default"
                          />
                        ) : (
                            <Avatar size="large" icon="user" />
                          )} */}
                                                  {
                                                      <Avatar
                                                          size="default"
                                                          style={{ backgroundColor: '#1899cc' }}
                                                          src={profileImageAvaliable ? loggedUser.imageUrl : null}
                                                      >
                                                          {loggedUser.name.charAt(0).toUpperCase()}
                                                      </Avatar>
                                                  }
                                                  <span className="header-username">
                                                      {loggedUser.name.split(' ')[0].slice(0, 15)}
                                                  </span>
                                                  <i className="fa-icon fa fa-chevron-down"></i>
                                              </span>
                                          </Dropdown>
                                      ) : route.name === 'Notification' ? (
                                          <Popover
                                              id="lgim-popover"
                                              className="notification-popover lgim-styles-wrapper"
                                              placement="bottomRight"
                                              content={this.renderNotificationPopOver()}
                                              trigger="click"
                                              key={rKey}
                                              onClick={() => {
                                                  const { loggedUser } = this.props;
                                                  if (loggedUser)
                                                      this.props.resetNotificationBellRedDot(loggedUser.email);
                                                  this.getNotifications();
                                              }}
                                          >
                                              <span className={`header-item ${pathname === route.uri ? 'active' : ''}`}>
                                                  <Badge dot={isNotificationRedDotVisible}>
                                                      {/* <i className="fa fa-bell-o notification-icon"></i> */}
                                                      <img
                                                          src={notification}
                                                          alt="notfy-icon"
                                                          className="notification-icon"
                                                      />
                                                  </Badge>{' '}
                                              </span>
                                          </Popover>
                                      ) : (
                                          <span
                                              className={`header-item ${
                                                  this.matchRuleShort(pathname, `${route.uri}*`) ? 'active' : ''
                                              }`}
                                              key={rKey}
                                              onClick={() => {
                                                  this.doNavigate(route.uri);
                                              }}
                                          >
                                              {route.name}
                                          </span>
                                      )
                                  )
                                : unAuthRoutes.map((route, rKey) =>
                                      route.name === 'Log in' ? (
                                          <button
                                              key={rKey}
                                              className="btn btn-blue-o btn-login"
                                              onClick={() => {
                                                  this.doNavigate(route.uri);
                                              }}
                                          >
                                              {route.name}
                                          </button>
                                      ) : route.name === 'Register' ? (
                                          <button
                                              key={rKey}
                                              className="btn btn-green btn-register"
                                              onClick={() => {
                                                  this.doNavigate(route.uri);
                                              }}
                                          >
                                              {route.name}
                                          </button>
                                      ) : (
                                          <span
                                              className={`header-item ${
                                                  pathname === route.uri && pathname !== '/' ? 'active' : ''
                                              }`}
                                              key={rKey}
                                              onClick={() => {
                                                  this.doNavigate(route.uri);
                                              }}
                                          >
                                              {route.name}
                                          </span>
                                      )
                                  )}
                        </div>
                        <span className="bars-menu" onClick={this.handleDrawer}>
                            <span className="bars-btn" />
                            <span className="bars-btn" />
                            <span className="bars-btn" />
                        </span>
                        <Drawer
                            className="lgim-styles-wrapper"
                            placement="right"
                            onClose={this.handleDrawer}
                            visible={showDrawer}
                        >
                            <div className="drawer-item-wrapper">
                                {loggedUser ? (
                                    <>
                                        <span className="drawer-item drawer-title">
                                            <i className="drawer-icon fa fa-user-circle"></i>
                                            {loggedUser.name}
                                        </span>
                                        <span>
                                            <hr className="menu-separator" />
                                        </span>
                                        {authRoutes.map(
                                            (route, rKey) =>
                                                route.name !== 'Profile' && (
                                                    <span
                                                        className="drawer-item"
                                                        key={rKey}
                                                        onClick={() => {
                                                            this.doNavigate(route.uri);
                                                        }}
                                                    >
                                                        {route.name}
                                                    </span>
                                                )
                                        )}
                                        <span>
                                            <hr className="menu-separator" />
                                        </span>
                                        <span className="drawer-item text-center">
                                            <button
                                                className="btn-red-o"
                                                onClick={() => {
                                                    this.doNavigate('/sign-out');
                                                }}
                                                disabled={logoutInProgress}
                                            >
                                                Sign Out{' '}
                                                {logoutInProgress && (
                                                    <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                                                )}
                                            </button>
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        {unAuthRoutes.map(
                                            (route, rKey) =>
                                                route.name !== 'Login' &&
                                                route.name !== 'Register' && (
                                                    <span
                                                        className="drawer-item"
                                                        key={rKey}
                                                        onClick={() => {
                                                            this.doNavigate(route.uri);
                                                        }}
                                                    >
                                                        {route.name}
                                                    </span>
                                                )
                                        )}
                                        <span>
                                            <hr className="menu-separator" />
                                        </span>
                                        <span className="drawer-item text-center">
                                            <button
                                                className="btn-blue-o btn-login"
                                                onClick={() => {
                                                    this.doNavigate('/login');
                                                }}
                                            >
                                                Login
                                            </button>
                                        </span>
                                        <span className="drawer-item text-center">
                                            <button
                                                className="btn-green btn-register"
                                                onClick={() => {
                                                    this.doNavigate('/register');
                                                }}
                                            >
                                                Register
                                            </button>
                                        </span>
                                    </>
                                )}
                            </div>
                        </Drawer>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
