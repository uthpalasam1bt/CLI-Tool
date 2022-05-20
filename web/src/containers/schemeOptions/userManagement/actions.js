import {
    GET_CONTRIBUTORS_FAILED,
    GET_CONTRIBUTORS_IN_PROGRESS,
    GET_CONTRIBUTORS_REQUEST,
    GET_CONTRIBUTORS_SUCCESS,
    ADD_CONTRIBUTORS_REQUEST,
    ADD_CONTRIBUTORS_IN_PROGRESS,
    ADD_CONTRIBUTORS_SUCCESS,
    ADD_CONTRIBUTORS_FAILED,
    GET_USER_GROUPS_REQUEST,
    GET_USER_GROUPS_SUCCESS,
    GET_USER_GROUPS_FAILED,
    SAVE_USER_GROUPS_REQUEST,
    SAVE_USER_GROUPS_SUCCESS,
    SAVE_USER_GROUPS_FAILED,
    DELETE_GROUPS_REQUEST,
    DELETE_GROUPS_SUCCESS,
    DELETE_GROUPS_FAILED,
    GET_USER_CLAIMS_REQUEST,
    GET_USER_CLAIMS_SUCCESS,
    GET_USER_CLAIMS_FAILED,
    GET_USER_GROUPS_BY_ID,
    GET_USER_GROUPS_BY_ID_SUCCESS,
    GET_USER_GROUPS_BY_ID_FAILED,
    GET_FN_N_LN_BY_EMAIL_REQUEST,
    GET_FN_N_LN_BY_EMAIL_SUCCESS,
    GET_FN_N_LN_BY_EMAIL_FAILED,
    GET_CONTRIBUTOR_BY_ID_REQUEST,
    GET_CONTRIBUTOR_BY_ID_SUCCESS,
    GET_CONTRIBUTOR_BY_ID_FAILED,
    GET_LOGGED_USER_CLAIMS,
    GET_LOGGED_USER_CLAIMS_IN_PROGRESS,
    GET_LOGGED_USER_CLAIMS_SUCCESS,
    GET_LOGGED_USER_CLAIMS_FAILED,
    REMOVE_SCHEME_USER_FROM_SCHEME_REQUEST,
    REMOVE_SCHEME_USER_FROM_SCHEME_SUCCESS,
    REMOVE_SCHEME_USER_FROM_SCHEME_FAILURE
} from './constants';

export const getFnameLnameByEmail = (payload, toggleDissabledFields) => ({
    type: GET_FN_N_LN_BY_EMAIL_REQUEST,
    payload,
    toggleDissabledFields
});

export const getFnameLnameByEmailSuccess = result => ({
    type: GET_FN_N_LN_BY_EMAIL_SUCCESS,
    result
});

export const getFnameLnameByEmailFailed = error => ({
    type: GET_FN_N_LN_BY_EMAIL_FAILED,
    error
});

export const getContributors = payload => ({
    type: GET_CONTRIBUTORS_REQUEST,
    payload
});

export const getContributorById = payload => ({
    type: GET_CONTRIBUTOR_BY_ID_REQUEST,
    payload
});

export const getContributorByIdSuccess = payload => ({
    type: GET_CONTRIBUTOR_BY_ID_SUCCESS
});

export const getContributorByIdFailed = payload => ({
    type: GET_CONTRIBUTOR_BY_ID_FAILED
});

export const getContributorsInProgress = () => ({
    type: GET_CONTRIBUTORS_IN_PROGRESS
});

export const getContributorsSuccess = result => ({
    type: GET_CONTRIBUTORS_SUCCESS,
    result
});

export const getContributorsFailed = error => ({
    type: GET_CONTRIBUTORS_FAILED,
    error
});

export const addContributors = (payload, visibleInviteUserModal, refreshCallack) => ({
    type: ADD_CONTRIBUTORS_REQUEST,
    payload,
    visibleInviteUserModal,
    refreshCallack
});

export const addContributorsInProgress = () => ({
    type: ADD_CONTRIBUTORS_IN_PROGRESS
});

export const addContributorsSuccess = result => ({
    type: ADD_CONTRIBUTORS_SUCCESS,
    result
});

export const addContributorsFailed = error => ({
    type: ADD_CONTRIBUTORS_FAILED,
    error
});

export const getSchemeGroups = payload => ({
    type: GET_USER_GROUPS_REQUEST,
    payload
});

export const getUserGroupsSuccess = result => ({
    type: GET_USER_GROUPS_SUCCESS,
    result
});

export const getUserGroupsFailed = error => ({
    type: GET_USER_GROUPS_FAILED,
    error
});

export const saveUserGroup = (payload, visibleGroupSaveModal, refreshGroups) => ({
    type: SAVE_USER_GROUPS_REQUEST,
    payload,
    visibleGroupSaveModal,
    refreshGroups
});

export const saveUserGroupSuccess = result => ({
    type: SAVE_USER_GROUPS_SUCCESS,
    result
});

export const saveUserGroupFailed = error => ({
    type: SAVE_USER_GROUPS_FAILED,
    error
});

export const deleteUserGroup = payload => ({
    type: DELETE_GROUPS_REQUEST,
    payload
});

export const deleteGroupSuccess = result => ({
    type: DELETE_GROUPS_SUCCESS,
    result
});

export const deleteGroupFailed = error => ({
    type: DELETE_GROUPS_FAILED,
    error
});

export const getUserClaims = payload => ({
    type: GET_USER_CLAIMS_REQUEST,
    payload
});

export const getUserClaimsSuccess = result => ({
    type: GET_USER_CLAIMS_SUCCESS,
    result
});

export const getUserClaimsFailed = error => ({
    type: GET_USER_CLAIMS_FAILED,
    error
});

export const getUserGroupById = payload => ({
    type: GET_USER_GROUPS_BY_ID,
    payload
});

export const getUserGroupByIdSuccess = () => ({
    type: GET_USER_GROUPS_BY_ID_SUCCESS
});

export const getUserGroupByIdFailed = () => ({
    type: GET_USER_GROUPS_BY_ID_FAILED
});

export const requestGetClaimsForLoggedUser = payload => ({
    type: GET_LOGGED_USER_CLAIMS,
    payload
});

export const getClaimsForLoggedUserInprogress = payload => ({
    type: GET_LOGGED_USER_CLAIMS_IN_PROGRESS,
    payload
});

export const getClaimsForLoggedUserSuccess = payload => ({
    type: GET_LOGGED_USER_CLAIMS_SUCCESS,
    payload
});

export const getClaimsForLoggedFailed = payload => ({
    type: GET_LOGGED_USER_CLAIMS_FAILED,
    payload
});

export const removeSchemeUser = (payload, refreshCallack) => ({
    type: REMOVE_SCHEME_USER_FROM_SCHEME_REQUEST,
    payload,
    refreshCallack
});

export const removeSchemeUserSuccess = result => ({
    type: REMOVE_SCHEME_USER_FROM_SCHEME_SUCCESS,
    result
});

export const removeSchemeUserFailure = error => ({
    type: REMOVE_SCHEME_USER_FROM_SCHEME_FAILURE,
    error
});
