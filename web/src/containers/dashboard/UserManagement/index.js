import React, { useState, useEffect } from 'react';
import { initialize } from 'redux-form';
import { Col, Row, Dropdown, Menu, Icon, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import UserTable from './components/userTable';
import GroupTable from './components/groupTable';
import SearchTable from './components/searchTable';
import DeleteAccountRequests from './components/deleteAccountRequests';
import claimHelper from '../../../helpers/claimHelper';
import NotificationHelper from '../../../helpers/NotificationHelper';
import { getPrimaryRole } from '../../../helpers/validateUser';

import {
    saveUserGroup,
    deleteUserGroup,
    getOrganizationGroups,
    saveUserRequest,
    getUsersRequest,
    getCompanyList,
    requestGetCommonClaims,
    deleteUsersFromSystem,
    fetchClaimToNotificationMap,
    getClientAutofillDataSuccess,
    searchClientUsersSuccess
} from './actions';
import {
    getLgimUserGroupsData,
    getLgimUserGroupsLoading,
    getLgimUser_inProgress,
    getLgimUserData,
    commonUserClaims,
    commonUserClaimIds,
    getCompanyList as getCompanyListSelector,
    deleteUsersFromSystem_inProgress,
    searchClientUsersResult,
    getClientAutofillData,
    searchClientUsersDatainProgress
} from './selector';
import { getUserClaims } from '../../schemeOptions/userManagement/actions';
import { getUserGroupsNotifications } from '../../../containers/notification/actions';
import {
    ADD_CLAIMS_GROUP_FORM,
    ADD_USER_FORM,
    ADD_LGIM_USERS,
    EDIT_LGIM_USERS,
    ADD_LGIM_GROUPS,
    MODIFY_LGIM_GROUPS,
    ADD_ADVISORY_USERS,
    EDIT_ADVISORY_USERS,
    ADD_ADVISORY_GROUPS,
    MODIFY_ADVISORY_GROUPS,
    DELETE_LGIM_ADVISORY_USER_ALERTS_SYSTEM_MESSAGES,
    DELETE_USER_CLAIMS,
    EDIT_OTP_PHONE_NUMBER
} from './constants';
import { UserRole } from '../../../constants/userConstants';

const { ADMIN, PLATFORM_ADMIN, SPECIAL_ADVISORY, ADVISORY, GOVERN_USER } = UserRole;

const UserManagementContainer = props => {
    const dispatch = useDispatch();
    const { loggedUser, schemeId, hasClaim } = props;

    const groupsData_store = useSelector(state => getLgimUserGroupsData(state));
    const userData_store = useSelector(state => getLgimUserData(state));
    const loadingLgimUserGroups = useSelector(state => getLgimUserGroupsLoading(state));
    const loadingUsers = useSelector(state => getLgimUser_inProgress(state));
    const userClaimById = useSelector(state => state.userManagementReducer.claimData);
    const companyList = useSelector(state => getCompanyListSelector(state));
    const commonUserClaims_data = useSelector(state => commonUserClaims(state));
    const commonUserClaimIds_data = useSelector(state => commonUserClaimIds(state));
    const isUserBeingDeletedFromSystem = useSelector(state => deleteUsersFromSystem_inProgress(state));
    const clientUsersData = useSelector(state => searchClientUsersResult(state));
    const loadingClientUsers = useSelector(state => searchClientUsersDatainProgress(state));
    const clientAutofillData = useSelector(state => getClientAutofillData(state));

    const [tabIndex, setTabIndex] = useState('user');
    const [selectedCompanyName, setSelectedCompanyName] = useState(null);
    const [organizationId, setOraganizationId] = useState(null);
    const [organizationType, setOraganizationType] = useState(null);

    const userGroupsNotifications = useSelector(state => state.userGroupsNotificationsReducer.userGroupsNotifications);
    const userType = getPrimaryRole(loggedUser);
    let actionForModifyGroups = null;
    let actionForAddUsers = null;
    let actionForAddGroups = null;
    let actionForEditUsers = null;

    if (organizationType === PLATFORM_ADMIN) {
        actionForAddUsers = ADD_LGIM_USERS;
        actionForEditUsers = EDIT_LGIM_USERS;
        actionForAddGroups = ADD_LGIM_GROUPS;
        actionForModifyGroups = MODIFY_LGIM_GROUPS;
    } else if (organizationType === SPECIAL_ADVISORY || organizationType === ADVISORY) {
        actionForAddUsers = ADD_ADVISORY_USERS;
        actionForEditUsers = EDIT_ADVISORY_USERS;
        actionForAddGroups = ADD_ADVISORY_GROUPS;
        actionForModifyGroups = MODIFY_ADVISORY_GROUPS;
    }

    useEffect(() => {
        const loggedUserOrganizationId = loggedUser.organizationId;
        dispatch(requestGetCommonClaims({ email: loggedUser.email, userType }));
        if ((companyList && companyList.length < 1) || !companyList) {
            dispatch(getCompanyList());
        } else {
            if (organizationId == null) {
                setOraganizationId(loggedUserOrganizationId);
                setSelectedCompanyName(
                    companyList && companyList.find(c => c.organizationId === loggedUserOrganizationId).name
                );
            } else {
                let type = companyList && companyList.find(c => c.organizationId === organizationId).type;
                setOraganizationType(type);
                dispatch(
                    getUserClaims({
                        userType: type
                    })
                );
                dispatch(
                    getOrganizationGroups({
                        organizationId
                    })
                );
                dispatch(
                    getUserGroupsNotifications({
                        userType: userType
                    })
                );
                dispatch(getUsersRequest({ organizationId }));
            }
        }
    }, [dispatch, loggedUser, schemeId, organizationId, companyList, tabIndex, userType]);

    useEffect(() => {
        dispatch(fetchClaimToNotificationMap());
    }, [dispatch]);

    useEffect(() => {
        if (tabIndex !== 'search') {
            dispatch(getClientAutofillDataSuccess([]));
            dispatch(searchClientUsersSuccess(null));
        }
    }, [dispatch, tabIndex]);

    const getActiveClass = tabName => {
        if (tabIndex === tabName) {
            return 'list-items active';
        }
        return 'list-items';
    };

    const saveGroup = (formData, visibleGroupSaveModal) => {
        let type = companyList && companyList.find(c => c.organizationId === organizationId).type;
        dispatch(
            saveUserGroup(
                {
                    ...formData,
                    organizationId,
                    type
                },
                visibleGroupSaveModal
            )
        );
    };

    const resetForm = () => {
        dispatch(initialize(ADD_CLAIMS_GROUP_FORM));
    };

    const deleteGroup = userGroupId => {
        let type = companyList && companyList.find(c => c.organizationId === organizationId).type;
        dispatch(
            deleteUserGroup({
                userGroupId,
                organizationId,
                organization: type,
                type
            })
        );
    };

    const editGroup = (userGroupId, visibleGroupSaveModal) => {
        visibleGroupSaveModal(true);
        const userGroup = groupsData_store.find(userGroup => userGroup.groupId === userGroupId);
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
    };

    const editUser = (email, visibleUserSaveModal) => {
        visibleUserSaveModal(true);
        let user = userData_store.find(user => user.email === email);
        const { userGroups } = user;
        const userGroupsArray =
            userGroups &&
            userGroups.length &&
            userGroups
                .filter(g => g.groupId && g.organizationId === organizationId)
                .map(group => {
                    return group.groupId;
                });
        dispatch(initialize(ADD_USER_FORM, { ...user, userGroups: userGroupsArray }));
    };

    const deleteLGIMorAdvisoryUser = userData => {
        let type = companyList && companyList.find(c => c.organizationId === organizationId).type;
        if (userData && userData.userId && userData.userEmail) {
            dispatch(
                deleteUsersFromSystem(
                    {
                        idList: [userData.userId],
                        organizationId,
                        type
                    },
                    result => {
                        if (result && result.data && result.data.content) {
                            if (result.data.content.deleted && result.data.content.deleted.length > 0) {
                                if (userData.userEmail == result.data.content.deleted[0]) {
                                    NotificationHelper.getInstance().success(
                                        DELETE_LGIM_ADVISORY_USER_ALERTS_SYSTEM_MESSAGES.REQUEST_SUCCESS
                                    );
                                }
                            } else if (
                                result.data.content.adminOfGroup &&
                                result.data.content.adminOfGroup.length > 0
                            ) {
                                if (userData.userEmail == result.data.content.adminOfGroup[0]) {
                                    NotificationHelper.getInstance().error(
                                        DELETE_LGIM_ADVISORY_USER_ALERTS_SYSTEM_MESSAGES.ADMIN_OF_GROUP_ERROR
                                    );
                                }
                            }
                        }
                    }
                )
            );
        }
    };

    const submitUser = (payload, visibleInviteUserModal, isEditMode = false) => {
        let type = companyList && companyList.find(c => c.organizationId === organizationId).type;
        dispatch(
            saveUserRequest(
                {
                    ...payload,
                    organizationId,
                    primaryRole: type === PLATFORM_ADMIN ? ADMIN : type,
                    isUserBeingEdited: isEditMode,
                    type: type
                },
                visibleInviteUserModal
            )
        );
    };

    const handleMenuClick = e => {
        setTabIndex('user');
        setOraganizationId(Number(e.key));
        if (companyList) setSelectedCompanyName(companyList.find(c => c.organizationId === Number(e.key)).name);
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            {companyList &&
                companyList.map(company => (
                    <Menu.Item key={company.organizationId}>
                        {/* <Icon type="user" /> */}
                        {company.name}
                    </Menu.Item>
                ))}
        </Menu>
    );

    return (
        <div>
            {tabIndex !== 'search' && loggedUser.primaryRole === GOVERN_USER && (
                <div className="user-navigator-type">
                    <div className="header">
                        <Row>
                            <Col xl={20} lg={18} xs={10} className="title">
                                <label>Select Company</label>
                            </Col>
                            <Col xl={4} lg={6} xs={10}>
                                <Dropdown overlay={menu} className="list-drop-down">
                                    <Button>
                                        {/* {<Icon type="user" className="user-icon" />} */}
                                        <span className="list-drop-down-selected-item">{selectedCompanyName}</span>
                                        <Icon type="down" className="down-icon" />
                                    </Button>
                                </Dropdown>
                            </Col>
                        </Row>
                    </div>
                </div>
            )}
            <section className="proposal-registration-section">
                <Row gutter={20}>
                    <Col xl={8} lg={8} xs={24}>
                        <div className="user-navigator">
                            <div className="card card-wrap">
                                <div className="header">
                                    <span className="title">User Management</span>
                                </div>
                                <div className="content">
                                    <div className={getActiveClass('user')} onClick={() => setTabIndex('user')}>
                                        <span className="list-item-title">
                                            {userType === GOVERN_USER
                                                ? `Manage ${selectedCompanyName} Users`
                                                : 'Manage Users'}
                                        </span>
                                    </div>
                                    <div className={getActiveClass('group')} onClick={() => setTabIndex('group')}>
                                        <span className="list-item-title">
                                            {userType === GOVERN_USER
                                                ? `Manage ${selectedCompanyName} Groups`
                                                : 'Manage Groups'}
                                        </span>
                                    </div>
                                    {/* NOTE :: DO NOT DELETE THE FOLLOWING LINES OF CODES - ISHAN  */}
                                    {/* RELATED TO LGIM'S REVIEW SCHEME USER DELETE REQUESTS FEATURE */}
                                    {userType === GOVERN_USER &&
                                    commonUserClaims_data &&
                                    commonUserClaims_data.includes(DELETE_USER_CLAIMS.DELETE_SCHEME_USER) ? (
                                        <div className={getActiveClass('delete')} onClick={() => setTabIndex('delete')}>
                                            <span className="list-item-title">Delete requests</span>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    <div className={getActiveClass('search')} onClick={() => setTabIndex('search')}>
                                        <span className="list-item-title">
                                            {userType === GOVERN_USER && `Search Platform Users`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={16} lg={16} xs={24}>
                        {tabIndex === 'user' ? (
                            <UserTable
                                hasClaim={hasClaim}
                                loading={loadingUsers}
                                dataArray={userData_store}
                                userGroups={groupsData_store}
                                editUser={editUser}
                                deleteUser={deleteLGIMorAdvisoryUser}
                                isDeletingUser={isUserBeingDeletedFromSystem}
                                isCompanyNameLGIM={userType === GOVERN_USER}
                                commonUserClaims_data={commonUserClaims_data}
                                submitUser={submitUser}
                                filterByCompanyId={organizationId}
                                permissionToModifyMgt={claimHelper.getPermission(
                                    commonUserClaims_data,
                                    commonUserClaimIds_data,
                                    actionForEditUsers
                                )}
                                permissionToAddMgt={claimHelper.getPermission(
                                    commonUserClaims_data,
                                    commonUserClaimIds_data,
                                    actionForAddUsers
                                )}
                                permissionToEditOtp={claimHelper.getPermission(
                                    commonUserClaims_data,
                                    commonUserClaimIds_data,
                                    EDIT_OTP_PHONE_NUMBER
                                )}
                            />
                        ) : //
                        // NOTE :: DO NOT DELETE THE FOLLOWING LINES OF CODES - ISHAN
                        // RELATED TO LGIM'S REVIEW SCHEME USER DELETE REQUESTS FEATURE
                        tabIndex === 'delete' && userType === GOVERN_USER ? (
                            <DeleteAccountRequests loggedUser={loggedUser} claims={commonUserClaims_data} />
                        ) : tabIndex === 'group' ? (
                            <GroupTable
                                hasClaim={hasClaim}
                                resetForm={resetForm}
                                saveGroup={saveGroup}
                                dataArray={groupsData_store}
                                loding={loadingLgimUserGroups}
                                userClaimById={userClaimById}
                                deleteGroup={deleteGroup}
                                editGroup={editGroup}
                                notifications={userGroupsNotifications}
                                permissionToEditGroupMgt={claimHelper.getPermission(
                                    commonUserClaims_data,
                                    commonUserClaimIds_data,
                                    actionForModifyGroups
                                )}
                                permissionToAddGroupMgt={claimHelper.getPermission(
                                    commonUserClaims_data,
                                    commonUserClaimIds_data,
                                    actionForAddGroups
                                )}
                            />
                        ) : tabIndex === 'search' ? (
                            <SearchTable
                                clientUsers={clientUsersData}
                                loading={loadingClientUsers}
                                clientAutofill={clientAutofillData}
                            />
                        ) : (
                            <></>
                        )}
                    </Col>
                </Row>
            </section>
        </div>
    );
};

export default UserManagementContainer;
