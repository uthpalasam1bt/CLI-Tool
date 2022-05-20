import {
    SAVE_LGIM_ADVASARY_GROUPS_REQUEST,
    GET_LGIM_ADVASARY_GROUPS_SUCCESS,
    GET_LGIM_ADVASARY_GROUPS_FAILED,
    SAVE_LGIM_ADVASARY_GROUPS_SUCCESS,
    GET_LGIM_ADVASARY_GROUPS_REQUEST,
    DELTE_LGIM_ADVASARY_GROUP_REQUEST,
    GET_LGIM_ADVASARY_USERS_REQUEST,
    GET_LGIM_ADVASARY_USERS_SUCCESS,
    SAVE_LGIM_ADVASARY_USERS_REQUEST,
    SAVE_LGIM_ADVASARY_USERS_SUCCESS,
    SAVE_LGIM_ADVASARY_USERS_ERROR,
    GET_COMPANY_LIST_REQUEST,
    GET_COMPANY_LIST_SUCCESS,
    DO_REQUEST_COMMON_CLAIMS,
    DO_GET_COMMON_CLAIMS_IN_PROGRESS,
    DO_GET_COMMON_CLAIMS_SUCCESS,
    DO_GET_COMMON_CLAIMS_FAILED,
    DELETE_USERS_FROM_SYSTEM_REQUEST,
    DELETE_USERS_FROM_SYSTEM_IN_PROGRESS,
    DELETE_USERS_FROM_SYSTEM_SUCCESS,
    DELETE_USERS_FROM_SYSTEM_FAILURE,
    GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_REQUEST,
    GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_IN_PROGRESS,
    GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_SUCCESS,
    GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_FAILURE,
    REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_REQUEST,
    REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_IN_PROGRESS,
    REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_SUCCESS,
    REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_FAILURE,
    FETCH_CLIAM_NOTIFICATION_MAP,
    FETCH_CLIAM_NOTIFICATION_MAP_SUCCESS,
    SEARCH_CLIENT_USERS_REQUEST,
    SEARCH_CLIENT_USERS_SUCCESS,
    SEARCH_CLIENT_USERS_FAILURE,
    GET_CLIENT_AUTOFILL_DATA_REQUEST,
    GET_CLIENT_AUTOFILL_DATA_SUCCESS,
    GET_CLIENT_AUTOFILL_DATA_FAILURE
} from './constants';

export const saveUserGroup = (payload, visibleGroupSaveModal) => ({
    type: SAVE_LGIM_ADVASARY_GROUPS_REQUEST,
    payload,
    visibleGroupSaveModal
});

export const saveUserGroupSuccess = result => ({
    type: SAVE_LGIM_ADVASARY_GROUPS_SUCCESS,
    result
});

export const saveUserGroupFailed = error => ({
    type: GET_LGIM_ADVASARY_GROUPS_FAILED,
    error
});

export const getOrganizationGroups = payload => ({
    type: GET_LGIM_ADVASARY_GROUPS_REQUEST,
    payload
});

export const getUserGroupsSuccess = payload => ({
    type: GET_LGIM_ADVASARY_GROUPS_SUCCESS,
    payload
});

export const deleteUserGroup = payload => ({
    type: DELTE_LGIM_ADVASARY_GROUP_REQUEST,
    payload
});

export const getUsersRequest = payload => ({
    type: GET_LGIM_ADVASARY_USERS_REQUEST,
    payload
});

export const getUsersSuccess = payload => ({
    type: GET_LGIM_ADVASARY_USERS_SUCCESS,
    payload
});

export const saveUserRequest = (payload, visibleInviteUserModal) => ({
    type: SAVE_LGIM_ADVASARY_USERS_REQUEST,
    payload,
    visibleInviteUserModal
});

export const saveUserSuccess = () => ({
    type: SAVE_LGIM_ADVASARY_USERS_SUCCESS
});

export const saveUserError = () => ({
    type: SAVE_LGIM_ADVASARY_USERS_ERROR
});

export const getCompanyList = () => ({
    type: GET_COMPANY_LIST_REQUEST
});

export const getCompanyListSuccess = payload => ({
    type: GET_COMPANY_LIST_SUCCESS,
    payload
});

export const requestGetCommonClaims = payload => ({
    type: DO_REQUEST_COMMON_CLAIMS,
    payload
});

export const getCommonClaimsInProgress = () => ({
    type: DO_GET_COMMON_CLAIMS_IN_PROGRESS
});

export const getCommonClaimsSuccess = result => ({
    type: DO_GET_COMMON_CLAIMS_SUCCESS,
    result
});

export const getCommonClaimsFailed = error => ({
    type: DO_GET_COMMON_CLAIMS_FAILED,
    error
});

export const getSchemeUserDeleteAccountRequests = () => ({
    type: GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_REQUEST
});

export const getSchemeUserDeleteAccountRequestsInProgress = () => ({
    type: GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_IN_PROGRESS
});

export const getSchemeUserDeleteAccountRequestsSuccess = result => ({
    type: GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_SUCCESS,
    result
});

export const getSchemeUserDeleteAccountRequestsFailure = error => ({
    type: GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_FAILURE,
    error
});

export const rejectSchemeUserDeleteAccountRequests = (payload, refreshCallack) => ({
    type: REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_REQUEST,
    payload,
    refreshCallack
});

export const rejectSchemeUserDeleteAccountRequestsInProgress = () => ({
    type: REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_IN_PROGRESS
});

export const rejectSchemeUserDeleteAccountRequestsSuccess = result => ({
    type: REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_SUCCESS,
    result
});

export const rejectSchemeUserDeleteAccountRequestsFailure = error => ({
    type: REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_FAILURE,
    error
});

export const deleteUsersFromSystem = (payload, refreshCallack) => ({
    type: DELETE_USERS_FROM_SYSTEM_REQUEST,
    payload,
    refreshCallack
});

export const deleteUsersFromSystemInProgress = () => ({
    type: DELETE_USERS_FROM_SYSTEM_IN_PROGRESS
});

export const deleteUsersFromSystemSuccess = result => ({
    type: DELETE_USERS_FROM_SYSTEM_SUCCESS,
    result
});

export const deleteUsersFromSystemFailure = error => ({
    type: DELETE_USERS_FROM_SYSTEM_FAILURE,
    error
});

export const fetchClaimToNotificationMap = () => ({
    type: FETCH_CLIAM_NOTIFICATION_MAP
});

export const fetchClaimToNotificationMapSuccess = payload => ({
    type: FETCH_CLIAM_NOTIFICATION_MAP_SUCCESS,
    payload
});

export const getClientAutofillDataRequest = payload => ({
    type: GET_CLIENT_AUTOFILL_DATA_REQUEST,
    payload
});
export const getClientAutofillDataSuccess = payload => ({
    type: GET_CLIENT_AUTOFILL_DATA_SUCCESS,
    payload
});
export const getClientAutofillDataFailure = () => ({
    type: GET_CLIENT_AUTOFILL_DATA_FAILURE
});

export const searchClientUsersRequest = payload => ({
    type: SEARCH_CLIENT_USERS_REQUEST,
    payload
});
export const searchClientUsersSuccess = payload => ({
    type: SEARCH_CLIENT_USERS_SUCCESS,
    payload
});
export const searchClientUsersFailure = () => ({
    type: SEARCH_CLIENT_USERS_FAILURE
});
