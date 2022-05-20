import { createSelector } from 'reselect';
const lgimUserManagementReducer = state => state.lgimUserManagementReducer;
const userGroupsNotificationsReducer = state => state.userGroupsNotificationsReducer;

const saveUserGroup_inProgress = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.lgimGroupSaveRequest_inProgress
);

const getLgimUserGroupsData = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.lgimGroupsData
);

const getLgimUserGroupsLoading = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.lgimGroupGetRequest_inProgress
);

const getLgimUser_inProgress = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.lgimUsersRequest_inProgress
);

const getLgimUserData = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.lgimUsersData
);

const getLgimUserSave_inProgress = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.lgimUserSave_inProgress
);

const getUserGroupsNotifications = createSelector(
    userGroupsNotificationsReducer,
    currentState =>
        currentState.userGroupsNotifications.map(notification => ({
            label: notification.title,
            value: notification.notificationCode
        }))
);

const getCompanyList = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.companyList
);

const commonUserClaims = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.commonUserClaims
);

const commonUserClaimIds = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.commonUserClaimIds
);

const getSchemeUserAccountDeleteRequests_inProgress = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.getSchemeUserAccountDeleteRequests_inProgress
);

const getSchemeUserAccountDeleteRequestsResult = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.getSchemeUserAccountDeleteRequests_result
);

const rejectSchemeUserAccountDeleteRequests_inProgress = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.rejectSchemeUserAccountDeleteRequests_inProgress
);

const rejectSchemeUserAccountDeleteRequestsResult = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.rejectSchemeUserAccountDeleteRequests_result
);

const deleteUsersFromSystem_inProgress = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.deleteUsersFromSystem_inProgress
);

const deleteUsersFromSystemResult = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.deleteUsersFromSystem_result
);

const getClaimToNoficationMap = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.claimToNotificationMap
);

const searchClientUsersResult = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.searchClientUsersData_result
);
const searchClientUsersDatainProgress = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.searchClientUsersData_inProgress
);
const getClientAutofillData = createSelector(
    lgimUserManagementReducer,
    currentState => currentState.getClientAutofillData_result
);

export {
    saveUserGroup_inProgress,
    getLgimUserGroupsData,
    getLgimUserGroupsLoading,
    getLgimUser_inProgress,
    getLgimUserData,
    getLgimUserSave_inProgress,
    getUserGroupsNotifications,
    getCompanyList,
    commonUserClaims,
    commonUserClaimIds,
    getSchemeUserAccountDeleteRequests_inProgress,
    getSchemeUserAccountDeleteRequestsResult,
    rejectSchemeUserAccountDeleteRequests_inProgress,
    rejectSchemeUserAccountDeleteRequestsResult,
    deleteUsersFromSystem_inProgress,
    deleteUsersFromSystemResult,
    getClaimToNoficationMap,
    searchClientUsersResult,
    getClientAutofillData,
    searchClientUsersDatainProgress
};
