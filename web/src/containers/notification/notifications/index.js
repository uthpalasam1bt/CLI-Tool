import React, { Component } from 'react';

import { Row, Input, Checkbox, Popover, Spin, Tooltip } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import debounce from 'lodash/debounce';

import { createStructuredSelector } from 'reselect';
import { getNotificationsList, isNotificationDeleted, isGetNotificationInProgress } from '../../layout/selectors';
import {
    setMarkAssReadNotifications,
    deleteNotifications,
    getUserNotifications,
    getSearchResult
} from '../../layout/actions';
import BrowserStorage from '../../../middlewares/storage';

const Search = Input.Search;

class Notifications extends Component {
    state = {
        selectAll: false,
        isSelectList: false,
        isMarkAsReadShow: false,
        selectedList: [],
        chekAll: false,
        selectAllCheck: false
    };
    selectedNotificationList = [];
    componentDidMount() {
        const loggedUser = BrowserStorage.getInstance().getLoggedUser();
        this.props.getUserNotifications({ userEmail: loggedUser.email, isAll: true });
    }
    UNSAFE_componentWillReceiveProps(np, nc) {
        // if (this.userselectedList.length >= 1) {
        //   this.userselectedList = [];
        //   this.setState({ isSelectList: false });
        //   this.setState({ isMarkAsReadShow: false });
        // }
    }
    setDataSource = () => {};
    markAsRead = notification => {
        this.props.markAsRead([notification]);
        this.userselectedList = [];
        this.setState({ selectedList: [] });
        this.setState({ isMarkAsReadShow: false });
    };
    readList = [];
    markAsReadSelection = () => {
        this.userselectedList.forEach(i => {
            this.readList.push(i.notificationId);
        });
        this.props.markAsRead(this.readList);
        this.userselectedList = [];
        this.readList = [];
        this.setState({ selectedList: [] });
        this.setState({ isSelectList: false });
        this.setState({ isMarkAsReadShow: false });
    };
    userselectedList = [];
    selectedList = [];

    checkBoxSelectionChange = e => {
        if (e.target.checked) {
            this.userselectedList.push(e.target.name);
            this.selectedList.push(e.target.name.notificationId);
        } else {
            this.userselectedList = this.userselectedList.filter(function(value, index, arr) {
                return value !== e.target.name;
            });
        }
        if (this.userselectedList.length > 0) {
            this.setState({ isSelectList: true });
        } else {
            this.setState({ isSelectList: false });
        }
        this.setState({ selectedList: this.userselectedList });
        let readCouunterList = [];
        this.userselectedList.forEach(item => {
            if (item.status !== 'R') {
                readCouunterList.push(item);
            }
        });
        if (readCouunterList.length > 0) {
            this.setState({ isMarkAsReadShow: true });
        } else {
            this.setState({ isMarkAsReadShow: false });
        }
    };
    deleteList = [];
    deleteSelection = () => {
        this.userselectedList.forEach(i => {
            this.deleteList.push(i.notificationId);
        });
        this.props.deleteNotification(this.deleteList);
        if (this.userselectedList.length === this.props.userNotificationsList.length) {
            const loggedUser = BrowserStorage.getInstance().getLoggedUser();
            this.props.getUserNotifications({ userEmail: loggedUser.email, isAll: true });
        }

        this.userselectedList = [];
        this.deleteList = [];

        this.setState({ isSelectList: false });
        this.setState({ isMarkAsReadShow: false });
    };
    renderLoadingContainer = () => {
        return (
            <div className="loading-container">
                <Spin />
            </div>
        );
    };
    deleteNotification = notificationId => {
        this.props.deleteNotification([notificationId]);

        //check if notification is already in selected list and remove from there also
        if (this.userselectedList.some(n => n.notificationId === notificationId)) {
            this.userselectedList = this.userselectedList.filter(n => n.notificationId !== notificationId);
            if (this.userselectedList.length < 1) {
                this.setState({ isSelectList: false });
                this.setState({ isMarkAsReadShow: false });
            }
        }
    };
    selectAll = e => {
        if (this.props.userNotificationsList.length <= 0) {
            this.setState({ isSelectList: false });
            this.setState({ isMarkAsReadShow: false });
        }
        // this.setState({ selectAllCheck: true });
        else {
            if (!e.target.checked) {
                this.setState({ isSelectList: false });
                this.setState({ isMarkAsReadShow: false });
                this.setState({ selectedList: [] });
                this.userselectedList = [];
            } else {
                // this.setState({ selectAllCheck: false });
                this.setState({ selectedList: this.props.userNotificationsList });
                this.userselectedList = this.props.userNotificationsList;
                this.setState({ isSelectList: true });
                this.userselectedList.forEach(item => {
                    if (item.status !== 'R') {
                        this.setState({ isMarkAsReadShow: true });
                    }
                });
            }
        }
    };
    handleRefresh = e => {
        const loggedUser = BrowserStorage.getInstance().getLoggedUser();
        this.props.getUserNotifications({ userEmail: loggedUser.email, isAll: true });
        this.userselectedList = [];
        this.setState({ isSelectList: false });
    };
    handleSelectAll = e => {
        if (e.target.checked) {
            this.userselectedList.push(this.props.userNotificationsList);
        } else {
            this.userselectedList = [];
        }
    };
    checkSelectAllStatus = (allNotificationCount, selectedNotificationCount) => {
        if (allNotificationCount === selectedNotificationCount && allNotificationCount !== 0) {
            return true;
        } else {
            return false;
        }
    };
    handleSearch = e => {
        if (e === '') {
            this.handleRefresh();
        }
        this.props.getSearchResult(e);
    };
    debounceSearch = debounce(e => this.handleSearch(e), 500);

    renderContent = data => {
        return (
            <div className="notify-popover">
                {data.status !== 'R' ? (
                    <span
                        className="notify-content"
                        onClick={() => {
                            this.markAsRead(data.notificationId);
                        }}
                    >
                        <i class="fa fa-envelope-open icon"></i>Mark as read
                    </span>
                ) : null}
                <span
                    className="notify-content"
                    onClick={() => {
                        this.deleteNotification(data.notificationId);
                    }}
                >
                    <i class="fa fa-trash icon"></i>Delete
                </span>
            </div>
        );
    };
    listNotifications = () => {
        if (this.props.userNotificationsList) {
            return this.props.userNotificationsList.map(data => (
                <Row key={data.notificationId}>
                    <div className="notification-list clearfix">
                        <span className="checkbox-wrap">
                            <Checkbox
                                checked={this.state.selectedList.indexOf(data) > -1}
                                name={data}
                                onChange={this.checkBoxSelectionChange}
                            ></Checkbox>
                        </span>
                        {data.status !== 'R' && <span className="dot"></span>}
                        <div className="description">
                            <span className="notification-description">{data.content}</span>
                        </div>
                        <div className="date-wrap">
                            <span className="date">{moment(data.createdAt).format('MMM DD')}</span>
                            <Popover placement="bottom" content={this.renderContent(data)} trigger="hover">
                                <span className="cursor">
                                    <i class="fa fa-ellipsis-v icon"></i>
                                </span>
                            </Popover>
                        </div>
                    </div>
                </Row>
            ));
        } else {
            return null;
        }
    };

    render() {
        return (
            <>
                <div className="notification-wrap notification-details">
                    <div className="card card-wrapper">
                        <div className="header">
                            <span className="header-icons clearfix">
                                <Tooltip title="Select all">
                                    <Checkbox
                                        onChange={this.selectAll}
                                        checked={this.checkSelectAllStatus(
                                            this.props.userNotificationsList.length,
                                            this.userselectedList.length
                                        )}
                                    ></Checkbox>
                                </Tooltip>
                            </span>
                            <Tooltip title="Refresh">
                                <span className="header-icons clearfix" onClick={this.handleRefresh}>
                                    <i class="fa fa-repeat ic-light"></i>
                                </span>
                            </Tooltip>

                            {this.state.isSelectList ? (
                                <Tooltip title="Delete">
                                    <span className="header-icons" onClick={this.deleteSelection}>
                                        <i class="fa fa-trash ic-light"></i>
                                    </span>
                                </Tooltip>
                            ) : null}
                            {this.state.isSelectList && this.state.isMarkAsReadShow ? (
                                <Tooltip title="Mark as read">
                                    <span className="header-icons" onClick={this.markAsReadSelection}>
                                        <i class="fa fa-check ic-light"></i>
                                    </span>
                                </Tooltip>
                            ) : null}
                            <div className="search-icon">
                                {' '}
                                <Search
                                    placeholder="search"
                                    style={{ width: 200 }}
                                    onChange={e => this.debounceSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="content">
                            {this.props.IsGetNotificationListInProgress
                                ? this.renderLoadingContainer()
                                : this.listNotifications()
                            // this.code()
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    userNotificationsList: getNotificationsList(),
    isNotificationDeleted: isNotificationDeleted(),
    IsGetNotificationListInProgress: isGetNotificationInProgress()
});

const mapDispatchToProps = dispatch => ({
    getUserNotifications: payload => {
        dispatch(getUserNotifications(payload));
    },
    markAsRead: payload => {
        dispatch(setMarkAssReadNotifications(payload));
    },
    deleteNotification: payload => {
        dispatch(deleteNotifications(payload));
    },
    getSearchResult: payload => {
        dispatch(getSearchResult(payload));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notifications);
