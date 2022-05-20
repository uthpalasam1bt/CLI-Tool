import React, { useState } from 'react';
import { Table, Tooltip, Popover, Modal } from 'antd';

import FormHeaderComponent from '../../../../UILibrary/components/forms/formHeader';
import InviteUsersModal from './InviteUsersModal';
import GroupModal from './GroupModal';
import { UserRole } from '../../../../constants/userConstants';
import claimHelper from '../../../../helpers/claimHelper';

import Loading from 'components/Loading';
import { getRoleFromPrimary, getPrimaryRole } from '../../../../helpers/validateUser';
import { REMOVE_SCHEME_USER_ALERTS_SYSTEM_MESSAGES, TEMP_REMOVE_SCHEME_USER_CLAIM } from '../constants';
import uiLibConstants from '../../../../UILibrary/constants';

const { FORM_ACTION_TYPES } = uiLibConstants;
const { CLIENT } = UserRole;

const UserTable = props => {
    const {
        dataArray,
        loading,
        saveUser,
        editUser,
        removeUser,
        isRemovingUser,
        userGroupsById,
        resetForm,
        isLgimUserCreate,
        permissionAddToUserMgt,
        permissionEditToUserMgt,
        permissionToEditOtp,
        loggedUser
    } = props;

    const [isShowInviteUserModal, visibleInviteUserModal] = useState(false);
    const [isShowPopover, visiblePopover] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isShowGroupModal, setShowGroupModal] = useState(false);
    const [schemeGroupsForUser, setSchemeGroupsForUser] = useState([]);
    let dataSourceMap = [];
    if (dataArray) {
        dataSourceMap = dataArray.map((user, key) => {
            return {
                key,
                userId: user.userId,
                userName: user.name,
                userEmail: user.email,
                userType: getRoleFromPrimary(user.primaryRole),
                action: user.action,
                registered: user.confirm,
                groups: user.userGroups
            };
        });
    }

    const sortByName = (a, b) => {
        let aString = a.userName.toLowerCase();
        let bString = b.userName.toLowerCase();
        if (aString < bString) return -1;
        if (aString > bString) return 1;
        return 0;
    };

    const sortByEmail = (a, b) => {
        let aString = a.userEmail.toLowerCase();
        let bString = b.userEmail.toLowerCase();
        if (aString < bString) return -1;
        if (aString > bString) return 1;
        return 0;
    };

    const sortByGroupCount = (a, b) => {
        let aString = a.groups && a.groups.length;
        let bString = b.groups && b.groups.length;
        if (aString < bString) return -1;
        if (aString > bString) return 1;
        return 0;
    };

    const handlePopoverVisibleChange = (status, userEmail) => {
        visiblePopover({ ...isShowPopover, [userEmail]: status });
    };

    const removeSchemeUserFromScheme = userData => {
        Modal.confirm({
            title: REMOVE_SCHEME_USER_ALERTS_SYSTEM_MESSAGES.CONFIRMATION_MODAL_TITLE,
            content: REMOVE_SCHEME_USER_ALERTS_SYSTEM_MESSAGES.CONFIRMATION_MODAL_CONTENT,
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                removeUser(userData);
            }
        });
    };

    const columnsMap = [
        {
            title: 'Name',
            key: 'userName',
            dataIndex: 'userName',
            sorter: sortByName,
            render: userName => (
                <Tooltip placement="bottom" title={userName}>
                    <span className="ellipsis-text">{userName}</span>
                </Tooltip>
            )
        },
        {
            title: 'Email',
            key: 'userEmail',
            dataIndex: 'userEmail',
            sorter: sortByEmail,
            render: userEmail => (
                <Tooltip placement="bottom" title={userEmail}>
                    <span className="ellipsis-text">{userEmail}</span>
                </Tooltip>
            )
        },
        {
            title: 'Groups',
            key: 'groups',
            sorter: sortByGroupCount,
            dataIndex: 'groups',
            render: groups => {
                if (groups) {
                    return (
                        <span
                            className="ellipsis-text"
                            onClick={() => {
                                setSchemeGroupsForUser(
                                    groups.map(group => {
                                        let userGroup = userGroupsById.find(ug => ug.groupId === group.groupId);
                                        return userGroup ? userGroup.name : 'Could not find group.';
                                    })
                                );
                                setShowGroupModal(groups && groups.length > 0 ? true : false);
                            }}
                        >
                            {groups && groups.length}{' '}
                            {groups && groups.length > 0 ? (groups.length === 1 ? 'Group' : 'Groups') : 'Groups'}
                        </span>
                    );
                }
                return '';
            }
        },
        {
            title: 'Platform Status',
            key: 'registered',
            sorter: false,
            dataIndex: 'registered',
            render: registered => <span>{registered ? 'Registered' : 'Un-registered'}</span>
        },
        {
            title: 'Action',
            key: 'userEmail2',
            dataIndex: 'userEmail',
            className: 'action-column',
            render: (userEmail, userData) => {
                const content = (
                    <div className="notify-popover">
                        <span
                            className="notify-content"
                            onClick={() => {
                                editUser(userEmail, visibleInviteUserModal);

                                visiblePopover({ ...isShowPopover, [userEmail]: false });
                                setEditMode(true);
                            }}
                        >
                            <i className="fa fa-pencil-square-o icon"></i>Edit User
                        </span>
                        <span
                            className="notify-content"
                            onClick={() => {
                                removeSchemeUserFromScheme(userData);
                                visiblePopover({ ...isShowPopover, [userEmail]: false });
                            }}
                            hidden={!claimHelper.checkIfUserHasClaim(TEMP_REMOVE_SCHEME_USER_CLAIM)}
                        >
                            {isRemovingUser ? (
                                <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                            ) : (
                                <i className="fa fa-trash icon"></i>
                            )}
                            Remove
                        </span>
                    </div>
                );
                return (
                    <Popover
                        visible={isShowPopover[userEmail]}
                        onVisibleChange={status => handlePopoverVisibleChange(status, userEmail)}
                        placement="bottom"
                        content={
                            !(getPrimaryRole(loggedUser) === CLIENT && userData.userType !== CLIENT) ? content : null
                        }
                        trigger="click"
                    >
                        <span>
                            <i className="fa fa-ellipsis-h action-icon"></i>
                        </span>
                    </Popover>
                );
            }
        }
    ];

    const closeModal = status => {
        visibleInviteUserModal(status);
        resetForm();
    };

    const formHeaderProps = {
        title: 'Manage users',
        actions: [
            {
                type: isLgimUserCreate ? FORM_ACTION_TYPES.CREATE : FORM_ACTION_TYPES.ADD,
                state: { inProgress: false },
                onClick: () => {
                    setEditMode(false);
                    visibleInviteUserModal(true);
                },
                bool: permissionAddToUserMgt
            }
        ]
    };

    return (
        <div className="root-form-wrapper-information">
            <div className="card card-wrapper">
                <FormHeaderComponent {...formHeaderProps} />
                <div className="user-table-container">
                    {loading ? (
                        <Loading />
                    ) : (
                        <Table
                            className="user-table"
                            columns={
                                permissionEditToUserMgt
                                    ? columnsMap
                                    : columnsMap.filter(function(obj) {
                                          return obj.title !== 'Action';
                                      })
                            }
                            dataSource={dataSourceMap}
                            pagination={false}
                            Key={columnsMap.userEmail}
                        ></Table>
                    )}
                </div>
                <InviteUsersModal
                    show={isShowInviteUserModal}
                    handleShow={() => closeModal(false)}
                    inProgress={false}
                    handleSubmit={formData => saveUser(formData, visibleInviteUserModal, isEditMode)}
                    editMode={isEditMode}
                    permissionToEditOtp={permissionToEditOtp}
                />
                <GroupModal show={isShowGroupModal} handleShow={setShowGroupModal} groups={schemeGroupsForUser} />
            </div>
        </div>
    );
};

export default UserTable;
