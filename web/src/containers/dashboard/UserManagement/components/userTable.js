import React, { useState } from 'react';
import { Table, Tooltip, Popover, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { initialize } from 'redux-form';

import FormHeaderComponent from '../../../../UILibrary/components/forms/formHeader';
import constants from '../../../../UILibrary/constants';

import InviteUsersModal from '../components/InviteUserModal';
import Loading from 'components/Loading';
import GroupModal from './GroupModal';
import { getLgimUserSave_inProgress } from '../../UserManagement/selector';

import { ADD_USER_FORM, DELETE_LGIM_ADVISORY_USER_ALERTS_SYSTEM_MESSAGES, DELETE_USER_CLAIMS } from '../constants';

const { FORM_ACTION_TYPES } = constants;

const UserTable = props => {
    const {
        hasClaim,
        dataArray,
        loading,
        userGroups,
        editUser,
        deleteUser,
        isDeletingUser,
        isCompanyNameLGIM,
        commonUserClaims_data,
        submitUser,
        permissionToModifyMgt,
        permissionToAddMgt,
        filterByCompanyId,
        permissionToEditOtp
    } = props;

    const [isShowInviteUserModal, visibleInviteUserModal] = useState(false);
    const [isShowGroupModal, setShowGroupModal] = useState(false);
    const [GroupsForUser, setGroupsForUser] = useState([]);
    const [isEditMode, setEditMode] = useState(false);
    const [isShowPopover, visiblePopover] = useState(false);

    const isSavingLgimUser = useSelector(state => getLgimUserSave_inProgress(state));

    const dispatch = useDispatch();
    let dataSourceMap = [];

    if (dataArray.length) {
        dataSourceMap = dataArray.map((user, key) => ({
            key,
            userId: user.userId,
            userName: `${user.firstName} ${user.lastName}`,
            userEmail: user.email,
            userType: user.userType,
            action: user.email,
            registered: user.confirm,
            groups: user.userGroups.filter(groupData => {
                return groupData.organizationId === filterByCompanyId;
            })
        }));
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

    const triggerDeleteUser = userData => {
        Modal.confirm({
            title: DELETE_LGIM_ADVISORY_USER_ALERTS_SYSTEM_MESSAGES.CONFIRMATION_MODAL_TITLE,
            content: DELETE_LGIM_ADVISORY_USER_ALERTS_SYSTEM_MESSAGES.CONFIRMATION_MODAL_CONTENT,
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                deleteUser(userData);
            }
        });
    };

    const showGroupsModal = groups => {
        setGroupsForUser(
            groups.map(group => {
                let userGroup = userGroups.find(ug => ug.groupId === group.groupId);
                return userGroup ? userGroup.name : 'Could not find group.';
            })
        );
        setShowGroupModal(true);
    };

    const hasDeleteUserClaim = () => {
        if (isCompanyNameLGIM) {
            return commonUserClaims_data.includes(DELETE_USER_CLAIMS.DELETE_LGIM);
        } else {
            return commonUserClaims_data.includes(DELETE_USER_CLAIMS.DELETE_ADVISORY);
        }
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
            render: groups => (
                <span
                    className={groups && groups.length && groups.length > 0 ? `ellipsis-text` : `remove-hand`}
                    onClick={() => groups && groups.length && groups.length > 0 && showGroupsModal(groups)}
                >{`${groups && groups.length} ${groups && groups.length === 1 ? 'Group' : 'Groups'}`}</span>
            )
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
            key: 'action',
            dataIndex: 'action',
            className: 'action-column',
            render: (email, userData) => {
                const content = (
                    <div className="notify-popover">
                        <span
                            className="notify-content"
                            onClick={() => {
                                setEditMode(true);
                                editUser(email, visibleInviteUserModal);
                                visiblePopover({ ...isShowPopover, [email]: false });
                            }}
                        >
                            <i className="fa fa-pencil-square-o icon"></i>Edit User
                        </span>
                        <span
                            className="notify-content"
                            onClick={() => {
                                triggerDeleteUser(userData);
                                visiblePopover({ ...isShowPopover, [email]: false });
                            }}
                            hidden={!hasDeleteUserClaim()}
                        >
                            {isDeletingUser ? (
                                <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                            ) : (
                                <i className="fa fa-trash icon"></i>
                            )}
                            Delete
                        </span>
                    </div>
                );

                return hasClaim ? (
                    <Popover
                        placement="bottom"
                        content={content}
                        trigger="click"
                        visible={isShowPopover[email]}
                        onVisibleChange={status => handlePopoverVisibleChange(status, email)}
                    >
                        <span>
                            <i className="fa fa-ellipsis-h action-icon"></i>
                        </span>
                    </Popover>
                ) : null;
            }
        }
    ];

    const formHeaderProps = {
        title: 'Manage users',
        actions: [
            {
                type: FORM_ACTION_TYPES.CREATE_USER,
                state: { inProgress: false },
                onClick: () => {
                    setEditMode(false);
                    dispatch(initialize(ADD_USER_FORM));
                    visibleInviteUserModal(true);
                },
                bool: permissionToAddMgt
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
                                permissionToModifyMgt
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
                    handleShow={visibleInviteUserModal}
                    handleSubmit={payload => {
                        submitUser(payload, visibleInviteUserModal, isEditMode);
                    }}
                    inProgress={isSavingLgimUser}
                    userGroups={userGroups}
                    editMode={isEditMode}
                    permissionToEditOtp={permissionToEditOtp}
                />

                <GroupModal show={isShowGroupModal} handleShow={setShowGroupModal} groups={GroupsForUser} />
            </div>
        </div>
    );
};

export default UserTable;
