import React, { useState, useEffect } from 'react';
import { initialize } from 'redux-form';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import UserTable from './components/userTable';
import GroupTable from './components/groupTable';
import claimHelper from '../../../helpers/claimHelper';
import { getPrimaryRole } from '../../../helpers/validateUser';
import { UserRole } from '../../../constants/userConstants';
import {
    addContributors,
    getUserClaims,
    getSchemeGroups,
    saveUserGroup,
    deleteUserGroup,
    getContributors,
    removeSchemeUser
} from './actions';
import { requestGetCommonClaims, fetchClaimToNotificationMap } from '../../dashboard/UserManagement/actions';
import { commonUserClaimIds } from '../../dashboard/UserManagement/selector';
import { getUserGroupsNotifications } from '../../../containers/notification/actions';

import {
    ADD_CLAIMS_GROUP_FORM,
    ADD_USER_FORM,
    ADD_SCHEME_USERS,
    EDIT_SCHEME_USERS,
    ADD_SCHEME_GROUPS,
    MODIFY_SCHEME_GROUPS,
    EDIT_OTP_PHONE_NUMBER
} from './constants';

const UserManagementContainer = props => {
    const dispatch = useDispatch();
    const { loggedUser, schemeName, schemeId, isLgimUserCreate, getLoggedUserClaims_data } = props;

    const [tabIndex, setTabIndex] = useState('user');
    const store_schemeData = useSelector(state => state.schemeOptionsReducer.store_schemeData);
    const userGroups = useSelector(state => state.userManagementReducer.userGroups);
    const userClaimById = useSelector(state => state.userManagementReducer.userClaimById);
    const isLoadingUserGroups = useSelector(state => state.userManagementReducer.isLoadingUserGroups);
    const isDeletingUserGroup = useSelector(state => state.userManagementReducer.isDeletingUserGroup);
    const usersData = useSelector(state => state.userManagementReducer.usersData);
    const userGroupsNotifications = useSelector(state => state.userGroupsNotificationsReducer.userGroupsNotifications);
    const isLoadingContributors = useSelector(state => state.userManagementReducer.getContributors_inProgress);
    const isRemovingSchemeUserFromScheme = useSelector(
        state => state.userManagementReducer.isRemovingSchemeUserFromScheme
    );
    const commonUserClaimIds_data = useSelector(state => commonUserClaimIds(state));

    useEffect(() => {
        if (loggedUser && store_schemeData) {
            const userType = 'client';
            const { userEmail } = store_schemeData;

            dispatch(getUserClaims({ userType, schemeId }));
            dispatch(getUserGroupsNotifications({ userType, schemeId }));
            dispatch(getSchemeGroups({ userType, schemeId }));

            if (loggedUser.organizationId) {
                dispatch(requestGetCommonClaims({ email: loggedUser.email, userType: getPrimaryRole(loggedUser) }));
            }

            dispatch(getContributors({ schemeId, userEmail }));
        }
    }, [dispatch, loggedUser, schemeId, store_schemeData]);

    useEffect(() => {
        dispatch(fetchClaimToNotificationMap());
    }, [dispatch]);

    const getContributorsList = () => {
        const { schemeId, userEmail } = store_schemeData;
        dispatch(getContributors({ schemeId, userEmail }));
    };

    const getActiveClass = tabName => {
        if (tabIndex && tabIndex === tabName) {
            return 'list-items active';
        }

        return 'list-items';
    };

    const saveGroup = (formData, visibleGroupSaveModal) => {
        const userType = 'client';
        dispatch(
            saveUserGroup({ ...formData, schemeId, userType }, visibleGroupSaveModal, () => {
                dispatch(getSchemeGroups({ userType, schemeId, type: userType }));
            })
        );
    };

    const deleteGroup = id => {
        dispatch(deleteUserGroup({ userGroupId: id, schemeId, type: 'client' }));
    };

    const editGroup = (userGroupId, visibleGroupSaveModal) => {
        const userGroup = userGroups.find(userGroup => userGroup.groupId === userGroupId);
        const { claims, notifications } = userGroup;
        const claimsArray =
            claims &&
            claims.length &&
            claims.map(claim => {
                return claim.claimId;
            });
        const notificationsArray =
            notifications &&
            notifications.length &&
            notifications.map(notification => {
                return notification.code;
            });

        dispatch(
            initialize(ADD_CLAIMS_GROUP_FORM, {
                ...userGroup,
                claims: claimsArray,
                notifications: notificationsArray
            })
        );
        visibleGroupSaveModal(true);
    };

    const resetForm = () => {
        dispatch(initialize(ADD_CLAIMS_GROUP_FORM));
        dispatch(initialize(ADD_USER_FORM, null));
    };

    const saveUser = (formData, visibleInviteUserModal, isEdit) => {
        dispatch(
            addContributors(
                {
                    ...formData,
                    schemeId,
                    schemeName,
                    loggedUser: loggedUser.name,
                    // isEdit,
                    isUserBeingEdited: isEdit,
                    type: 'client'
                },
                visibleInviteUserModal,
                () => {
                    const { schemeId, userEmail } = store_schemeData;
                    dispatch(getContributors({ schemeId, userEmail }));
                }
            )
        );
    };

    const editUser = (userEmail, visibleInviteUserModal) => {
        let user = usersData.find(user => user.email === userEmail);
        const { userGroups } = user;
        const userGroupsArray =
            userGroups &&
            userGroups.length &&
            userGroups
                .filter(g => g.groupId && g.schemeId === schemeId)
                .map(group => {
                    return group.groupId;
                });
        dispatch(initialize(ADD_USER_FORM, { ...user, userGroups: userGroupsArray }));
        visibleInviteUserModal(true);
    };

    const removeUser = user => {
        dispatch(
            removeSchemeUser(
                {
                    schemeId: schemeId,
                    schemeName: schemeName,
                    userId: user.userId,
                    userEmail: user.userEmail,
                    userName: user.userName,
                    type: 'client'
                },
                () => {
                    const { schemeId, userEmail } = store_schemeData;
                    dispatch(getContributors({ schemeId, userEmail }));
                }
            )
        );
    };

    return (
        <section className="proposal-registration-section">
            <Row gutter={20}>
                <Col xl={8} lg={8} xs={24}>
                    <div className="user-navigator m-30">
                        <div className="card card-wrap">
                            <div className="header">
                                <span className="title">Manage Users</span>
                            </div>
                            <div className="content">
                                <div
                                    className={getActiveClass('user')}
                                    onClick={() => {
                                        setTabIndex('user');
                                        getContributorsList();
                                    }}
                                >
                                    <span className="list-item-title">Scheme User</span>
                                </div>
                                {getPrimaryRole(loggedUser) === UserRole.GOVERN_USER ? (
                                    <div className={getActiveClass('group')} onClick={() => setTabIndex('group')}>
                                        <span className="list-item-title">
                                            {isLgimUserCreate ? 'LGIM group' : 'Scheme Group'}
                                        </span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={16} lg={16} xs={24}>
                    {tabIndex === 'user' ? (
                        <UserTable
                            dataArray={usersData}
                            schemeData={store_schemeData}
                            getContributors={getContributorsList}
                            loggedUser={loggedUser}
                            loading={isLoadingContributors}
                            isLgimUserCreate={isLgimUserCreate}
                            saveUser={saveUser}
                            editUser={editUser}
                            removeUser={removeUser}
                            isRemovingUser={isRemovingSchemeUserFromScheme}
                            userGroupsById={userGroups}
                            resetForm={resetForm}
                            permissionAddToUserMgt={claimHelper.getPermission(
                                getLoggedUserClaims_data,
                                commonUserClaimIds_data,
                                ADD_SCHEME_USERS
                            )}
                            permissionEditToUserMgt={claimHelper.getPermission(
                                getLoggedUserClaims_data,
                                commonUserClaimIds_data,
                                EDIT_SCHEME_USERS
                            )}
                            permissionToEditOtp={claimHelper.getPermission(
                                getLoggedUserClaims_data,
                                commonUserClaimIds_data,
                                EDIT_OTP_PHONE_NUMBER
                            )}
                        />
                    ) : (
                        <GroupTable
                            dataArray={userGroups}
                            schemeData={store_schemeData}
                            getContributors={getContributorsList}
                            loggedUser={loggedUser}
                            saveGroup={saveGroup}
                            deleteGroup={deleteGroup}
                            loding={isLoadingUserGroups}
                            deleting={isDeletingUserGroup}
                            editGroup={editGroup}
                            resetForm={resetForm}
                            userClaimById={userClaimById}
                            isLgimUserCreate={isLgimUserCreate}
                            notifications={userGroupsNotifications}
                            permissionToAddGroupMgt={claimHelper.getPermission(
                                getLoggedUserClaims_data,
                                commonUserClaimIds_data,
                                ADD_SCHEME_GROUPS
                            )}
                            permissionToEditGroupMgt={claimHelper.getPermission(
                                getLoggedUserClaims_data,
                                commonUserClaimIds_data,
                                MODIFY_SCHEME_GROUPS
                            )}
                        />
                    )}
                </Col>
            </Row>
        </section>
    );
};

export default UserManagementContainer;
