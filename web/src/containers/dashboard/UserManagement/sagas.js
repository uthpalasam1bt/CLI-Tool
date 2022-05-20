import { takeEvery, put, call, takeLatest } from 'redux-saga/effects';
import { initialize } from 'redux-form';

import {
    SAVE_LGIM_ADVASARY_GROUPS_REQUEST,
    GET_LGIM_ADVASARY_GROUPS_REQUEST,
    DELTE_LGIM_ADVASARY_GROUP_REQUEST,
    GET_LGIM_ADVASARY_USERS_REQUEST,
    SAVE_LGIM_ADVASARY_USERS_REQUEST,
    GET_COMPANY_LIST_REQUEST,
    ADD_CLAIMS_GROUP_FORM,
    ADD_USER_FORM,
    DO_REQUEST_COMMON_CLAIMS,
    GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_REQUEST,
    REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_REQUEST,
    DELETE_USERS_FROM_SYSTEM_REQUEST,
    FETCH_CLIAM_NOTIFICATION_MAP,
    ERROR_FETCH_CLIAM_NOTIFICATION_MAP,
    SEARCH_CLIENT_USERS_REQUEST,
    GET_CLIENT_AUTOFILL_DATA_REQUEST
} from './constants';
import {
    saveUserGroupSuccess,
    saveUserGroupFailed,
    getUserGroupsSuccess,
    getOrganizationGroups as fetchLgimGroups,
    getUsersSuccess,
    saveUserSuccess,
    getUsersRequest,
    saveUserError,
    getCompanyListSuccess,
    getCommonClaimsInProgress,
    getCommonClaimsSuccess,
    getCommonClaimsFailed,
    getSchemeUserDeleteAccountRequestsInProgress,
    getSchemeUserDeleteAccountRequestsSuccess,
    getSchemeUserDeleteAccountRequestsFailure,
    rejectSchemeUserDeleteAccountRequestsInProgress,
    rejectSchemeUserDeleteAccountRequestsSuccess,
    rejectSchemeUserDeleteAccountRequestsFailure,
    deleteUsersFromSystemInProgress,
    deleteUsersFromSystemSuccess,
    deleteUsersFromSystemFailure,
    fetchClaimToNotificationMapSuccess,
    getClientAutofillDataSuccess,
    getClientAutofillDataFailure,
    searchClientUsersSuccess,
    searchClientUsersFailure
} from './actions';
import { DELETE_USER_GROUPS_ERROR, GET_LGIM_USERS_ERROR, SAVE_LGIM_USER_ERROR } from '../../../config/constants';

import apiHandler from '../../../middlewares/connectApi';
import NotificationHelper from '../../../helpers/NotificationHelper';
import { getError } from '../../../helpers/apiHelper';
import connectApi from '../../../middlewares/connectApi';
import { DELETE_LGIM_ADVISORY_USER_ALERTS_SYSTEM_MESSAGES, DELETE_SCHEME_USERS_SYSTEM_MESSAGES } from './constants';

export function* saveLgimGroup(data) {
    const { visibleGroupSaveModal, payload } = data;
    const { organizationId, organization, groupId } = payload;
    let result = null;
    try {
        if (groupId) {
            result = yield call(apiHandler.editGroup, data);
        } else {
            result = yield call(apiHandler.saveGroup, data);
        }

        visibleGroupSaveModal(false);
        yield put(saveUserGroupSuccess(result.status));
        yield put(fetchLgimGroups({ organizationId, organization }));
        NotificationHelper.getInstance().success(result.data.message);
        yield put(initialize(ADD_CLAIMS_GROUP_FORM));
    } catch (error) {
        visibleGroupSaveModal(false);
        yield put(saveUserGroupFailed(error));
        const errorObj = getError(error, 'Something went wrong while creating user group.');
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* getOrganizationGroups(data) {
    try {
        const result = yield call(apiHandler.getOrganizationGroups, data);
        const { content } = result.data;
        yield put(getUserGroupsSuccess(content));
    } catch (error) {
        const errorObj = getError(error, 'Something went wrong while fetching organization groups.');
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* deleteLgimUserGroup(data) {
    try {
        const result = yield call(apiHandler.deleteGroup, data);
        const { organization, organizationId } = data.payload;
        yield put(fetchLgimGroups({ organization, organizationId }));
        const { message } = result.data;
        NotificationHelper.getInstance().success(message);
    } catch (error) {
        NotificationHelper.getInstance().error(DELETE_USER_GROUPS_ERROR);
    }
}

export function* getLgimUsers(data) {
    try {
        const result = yield call(apiHandler.getLgimUsers, data);
        const { content } = result.data;
        yield put(getUsersSuccess(content));
    } catch (error) {
        NotificationHelper.getInstance().error(GET_LGIM_USERS_ERROR);
    }
}

export function* saveLgimUser(data) {
    try {
        const result = yield call(apiHandler.addUserFromUserManagement, data);
        const { organizationId } = data.payload;
        let { content, message } = result.data;
        if (content === 'error') {
            NotificationHelper.getInstance().error(message);
            yield put(saveUserError());
        } else {
            yield put(saveUserSuccess());
            yield put(getUsersRequest({ organizationId }));
            NotificationHelper.getInstance().success(message);
            if (data.visibleInviteUserModal) {
                data.visibleInviteUserModal(false);
            }
            yield put(initialize(ADD_USER_FORM));
        }
    } catch (error) {
        yield put(saveUserError());
        const errorObj = getError(error, SAVE_LGIM_USER_ERROR);
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* getCompanyList(action) {
    let result = yield call(connectApi.getOrganizations, action);
    let { content } = result && result.data ? result.data : { content: null };
    yield put(getCompanyListSuccess(content));
}

export function* requestCommonClaims(data) {
    try {
        yield put(getCommonClaimsInProgress());
        const result = yield call(apiHandler.getCommonClaimsForUser, data);
        yield put(getCommonClaimsSuccess(result));
    } catch (error) {
        yield put(getCommonClaimsFailed(error));
    }
}

export function* getSchemeUserDeleteAccountRequests() {
    try {
        yield put(getSchemeUserDeleteAccountRequestsInProgress());
        const result = yield call(apiHandler.getSchemeUserDeleteAccountRequests, {});
        yield put(getSchemeUserDeleteAccountRequestsSuccess(result.data.content));
    } catch (error) {
        yield put(getSchemeUserDeleteAccountRequestsFailure(error));
        const errorObj = getError(error, DELETE_SCHEME_USERS_SYSTEM_MESSAGES.DELETE_ACCOUNT_REQUESTS_LOADING_ERROR);
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* rejectSchemeUserDeleteAccountRequests(action) {
    const { payload, refreshCallack } = action;
    try {
        yield put(rejectSchemeUserDeleteAccountRequestsInProgress());
        const result = yield call(apiHandler.rejectSchemeUserDeleteAccountRequests, payload);
        yield put(rejectSchemeUserDeleteAccountRequestsSuccess(result));
        NotificationHelper.getInstance().success(
            DELETE_SCHEME_USERS_SYSTEM_MESSAGES.REJECT_DELETE_ACCOUNT_REQUESTS_SUCCESS
        );
        if (refreshCallack) {
            refreshCallack(result);
        }
    } catch (error) {
        yield put(rejectSchemeUserDeleteAccountRequestsFailure(error));
        const errorObj = getError(error, DELETE_SCHEME_USERS_SYSTEM_MESSAGES.REJECT_DELETE_ACCOUNT_REQUESTS_ERROR);
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* deleteUsersFromSystem(action) {
    const { payload, refreshCallack } = action;
    const { idList, organizationId } = payload;
    try {
        yield put(deleteUsersFromSystemInProgress());
        const result = yield call(apiHandler.deleteUserFromSystem, idList);
        yield put(deleteUsersFromSystemSuccess(result));
        if (refreshCallack) {
            refreshCallack(result);
        }
        if (organizationId) yield put(getUsersRequest({ organizationId }));
    } catch (error) {
        yield put(deleteUsersFromSystemFailure(error));
        const errorObj = getError(error, DELETE_LGIM_ADVISORY_USER_ALERTS_SYSTEM_MESSAGES.REQUEST_FAILURE);
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* fetchClaimNotificationMap() {
    try {
        const result = yield call(apiHandler.getClaimToNotificationMap, {});
        // console.log(result, 'resut ffrom calll');
        const {
            data: { content }
        } = result;
        yield put(fetchClaimToNotificationMapSuccess(content));
    } catch (error) {
        NotificationHelper.getInstance().error(ERROR_FETCH_CLIAM_NOTIFICATION_MAP);
    }
}

export function* getClientAutofillData(data) {
    try {
        const result = yield call(apiHandler.getClientAutofillData, data.payload);
        const { content } = result.data;
        yield put(getClientAutofillDataSuccess(content));
    } catch (error) {
        yield put(getClientAutofillDataFailure(error));
        const errorObj = getError(error, 'Something went wrong while autofilling client users.');
        NotificationHelper.getInstance().error(errorObj.message);
    }
}
export function* searchClientUsers(data) {
    try {
        const result = yield call(apiHandler.searchClientUsers, data.payload);
        const { content } = result.data;
        yield put(searchClientUsersSuccess(content));
    } catch (error) {
        yield put(searchClientUsersFailure(error));
        const errorObj = getError(error, 'Something went wrong while searching client users.');
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export default function* lgimManagementSagas() {
    yield* [takeEvery(SAVE_LGIM_ADVASARY_GROUPS_REQUEST, saveLgimGroup)];
    yield* [takeEvery(GET_LGIM_ADVASARY_GROUPS_REQUEST, getOrganizationGroups)];
    yield* [takeEvery(DELTE_LGIM_ADVASARY_GROUP_REQUEST, deleteLgimUserGroup)];
    yield* [takeEvery(GET_LGIM_ADVASARY_USERS_REQUEST, getLgimUsers)];
    yield* [takeEvery(SAVE_LGIM_ADVASARY_USERS_REQUEST, saveLgimUser)];
    yield* [takeEvery(GET_COMPANY_LIST_REQUEST, getCompanyList)];
    yield* [takeEvery(DO_REQUEST_COMMON_CLAIMS, requestCommonClaims)];
    yield* [takeEvery(GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_REQUEST, getSchemeUserDeleteAccountRequests)];
    yield* [takeEvery(REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_REQUEST, rejectSchemeUserDeleteAccountRequests)];
    yield* [takeEvery(DELETE_USERS_FROM_SYSTEM_REQUEST, deleteUsersFromSystem)];
    yield* [takeEvery(FETCH_CLIAM_NOTIFICATION_MAP, fetchClaimNotificationMap)];
    yield* [takeLatest(GET_CLIENT_AUTOFILL_DATA_REQUEST, getClientAutofillData)];
    yield* [takeEvery(SEARCH_CLIENT_USERS_REQUEST, searchClientUsers)];
}
