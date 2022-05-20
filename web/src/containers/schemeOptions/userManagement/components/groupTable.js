import React, { useState } from 'react';
import { Table, Tooltip, Popover, Modal } from 'antd';

import FormHeaderComponent from '../../../../UILibrary/components/forms/formHeader';
import Loading from 'components/Loading';

import CreateGroupModal from './CreateGroupModal';
import PermissionModal from './PermissionModal';
import NotificationsModal from './NotificationsModal';

import { addContributors_inProgress } from 'containers/schemeOptions/userManagement/selector';
import uiLibConstants from '../../../../UILibrary/constants';

const { FORM_ACTION_TYPES } = uiLibConstants;

const GroupTable = props => {
    const {
        userClaimById,
        saveGroup,
        dataArray,
        deleteGroup,
        resetForm,
        editGroup,
        loding,
        deleting,
        isLgimUserCreate,
        permissionToAddGroupMgt,
        permissionToEditGroupMgt
    } = props;
    const [isShowGroupSaveModal, visibleGroupSaveModal] = useState(false);
    const [isShowPermissionsModal, visiblePermissionsModal] = useState(false);
    const [selectedPermissionList, setPermissionModalData] = useState([]);
    const [isShowPopover, visiblePopover] = useState(false);
    const [isShowNotificationsModal, setShowNotificationsModal] = useState(false);
    const [selectedNotificationsList, setSelectedNotificationsList] = useState([]);

    const setEditGroupData = permissions => {
        visiblePermissionsModal(true);
        setPermissionModalData(permissions);
    };

    const handlePopoverVisibleChange = (status, groupId) => {
        visiblePopover({ ...isShowPopover, [groupId]: status });
    };

    const sortByGroupName = (a, b) => {
        let aString = a.name.toLowerCase();
        let bString = b.name.toLowerCase();
        if (aString < bString) return -1;
        if (aString > bString) return 1;
        return 0;
    };

    const sortByPermissionCount = (a, b) => {
        let aString = a.claims && a.claims.length;
        let bString = b.claims && b.claims.length;
        if (aString < bString) return -1;
        if (aString > bString) return 1;
        return 0;
    };

    const sortByNotificationCount = (a, b) => {
        let aString = a.notifications && a.notifications.length;
        let bString = b.notifications && b.notifications.length;
        if (aString < bString) return -1;
        if (aString > bString) return 1;
        return 0;
    };

    const deleteUserGroup = groupId => {
        Modal.confirm({
            title: 'Do you want to delete this scheme group?',
            content: 'The group and associated claims will be removed for all users',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                deleteGroup(groupId);
            }
        });
    };

    const showNotificationsModal = notificationsCodes => {
        setSelectedNotificationsList([]);
        if (notificationsCodes) {
            setSelectedNotificationsList(
                notificationsCodes.map(notificationCode => {
                    return notificationCode.title;
                })
            );
        }
        setShowNotificationsModal(true);
    };

    const columnsMap = [
        {
            title: 'Group name',
            key: 'name',
            dataIndex: 'name',
            sorter: sortByGroupName,
            render: name => (
                <Tooltip placement="bottom" title={name}>
                    <span className="ellipsis-text">{name}</span>
                </Tooltip>
            )
        },
        {
            title: 'Permissions',
            key: 'claims',
            dataIndex: 'claims',
            sorter: sortByPermissionCount,
            render: permissions => {
                return (
                    <span onClick={() => setEditGroupData(permissions)} className="ellipsis-text">{`${
                        permissions ? permissions.length : 0
                    } ${permissions && permissions.length === 1 ? 'Permission' : 'Permissions'}`}</span>
                );
            }
        },
        {
            title: 'Notifications',
            key: 'notifications',
            sorter: sortByNotificationCount,
            dataIndex: 'notifications',
            render: notifications => (
                <span className="ellipsis-text" onClick={() => showNotificationsModal(notifications)}>{`${
                    notifications ? notifications.length : 0
                } ${notifications && notifications.length === 1 ? 'Notification' : 'Notifications'}`}</span>
            )
        },
        {
            title: 'Action',
            key: 'groupId',
            dataIndex: 'groupId',
            className: 'action-column',
            render: (groupId, data) => {
                const content = (
                    <div className="notify-popover">
                        <span
                            className="notify-content"
                            onClick={() => {
                                editGroup(groupId, visibleGroupSaveModal);
                                visiblePopover({ ...isShowPopover, [groupId]: false });
                            }}
                        >
                            <i className="fa fa-pencil-square-o icon"></i>Edit Group
                        </span>
                        <span
                            className="notify-content"
                            onClick={() => {
                                deleteUserGroup(groupId);
                                visiblePopover({ ...isShowPopover, [groupId]: false });
                            }}
                        >
                            {deleting ? (
                                <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                            ) : (
                                <i className="fa fa-trash icon"></i>
                            )}{' '}
                            Delete
                        </span>
                    </div>
                );

                const nonDefaultGroup = (
                    <Popover
                        visible={isShowPopover[groupId]}
                        onVisibleChange={status => handlePopoverVisibleChange(status, groupId)}
                        placement="bottom"
                        content={data.name && data.name.toLowerCase() !== 'admin' ? content : null}
                        trigger="click"
                    >
                        <span>
                            <i className="fa fa-ellipsis-h action-icon"></i>
                        </span>
                    </Popover>
                );
                const defaultGroup = <span></span>;

                if (data.isDefaultGroup) return defaultGroup;
                else return nonDefaultGroup;
            }
        }
    ];

    const formHeaderProps = {
        title: isLgimUserCreate ? 'LGIM user' : 'Manage groups',
        actions: [
            {
                type: FORM_ACTION_TYPES.ADD_GROUP,
                state: { inProgress: false },
                onClick: () => visibleGroupSaveModal(true),
                bool: permissionToAddGroupMgt
            }
        ]
    };

    const closeModal = status => {
        visibleGroupSaveModal(status);
        resetForm();
    };

    return (
        <div className="root-form-wrapper-information">
            <div className="card card-wrapper">
                <FormHeaderComponent {...formHeaderProps} />
                <div className="user-table-container">
                    {loding ? (
                        <Loading />
                    ) : (
                        <Table
                            className="user-table"
                            columns={
                                permissionToEditGroupMgt
                                    ? columnsMap
                                    : columnsMap.filter(function(obj) {
                                          return obj.title !== 'Action';
                                      })
                            }
                            dataSource={dataArray}
                            pagination={false}
                            Key={columnsMap.groupId}
                        ></Table>
                    )}
                </div>
                <CreateGroupModal
                    show={isShowGroupSaveModal}
                    handleShow={closeModal}
                    handleSubmit={formData => saveGroup(formData, visibleGroupSaveModal)}
                    inProgress={addContributors_inProgress}
                />
                <PermissionModal
                    data={selectedPermissionList}
                    show={isShowPermissionsModal}
                    handleShow={visiblePermissionsModal}
                    userClaimById={userClaimById}
                />

                <NotificationsModal
                    notifications={selectedNotificationsList}
                    show={isShowNotificationsModal}
                    handleShow={setShowNotificationsModal}
                />
            </div>
        </div>
    );
};

export default GroupTable;
