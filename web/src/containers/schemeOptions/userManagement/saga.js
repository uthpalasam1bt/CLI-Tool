import { takeEvery, put, call } from 'redux-saga/effects';
import { initialize, change } from 'redux-form';
import { history } from '../../../redux/store';

import apiHandler from '../../../middlewares/connectApi';
import BrowserStorage from '../../../middlewares/storage';
import { getError } from '../../../helpers/apiHelper';
import NotificationHelper from '../../../helpers/NotificationHelper';
import {
    getContributorsInProgress,
    getContributorsSuccess,
    getContributorsFailed,
    addContributorsInProgress,
    addContributorsSuccess,
    addContributorsFailed,
    getUserClaimsSuccess,
    getUserClaimsFailed,
    saveUserGroupSuccess,
    saveUserGroupFailed,
    getUserGroupsSuccess,
    getUserGroupsFailed,
    deleteGroupSuccess,
    deleteGroupFailed,
    getFnameLnameByEmailSuccess,
    getFnameLnameByEmailFailed,
    getUserGroupByIdSuccess,
    getUserGroupByIdFailed,
    getContributorByIdSuccess,
    getContributorByIdFailed,
    getSchemeGroups,
    getClaimsForLoggedUserInprogress,
    getClaimsForLoggedUserSuccess,
    getClaimsForLoggedFailed,
    removeSchemeUserSuccess,
    removeSchemeUserFailure
} from './actions';

import {
    GET_CONTRIBUTORS_REQUEST,
    ADD_CONTRIBUTORS_REQUEST,
    SAVE_USER_GROUPS_REQUEST,
    GET_USER_CLAIMS_REQUEST,
    ADD_CLAIMS_GROUP_FORM,
    GET_USER_GROUPS_REQUEST,
    DELETE_GROUPS_REQUEST,
    GET_USER_GROUPS_BY_ID,
    GET_FN_N_LN_BY_EMAIL_REQUEST,
    ADD_USER_FORM,
    GET_CONTRIBUTOR_BY_ID_REQUEST,
    GET_LOGGED_USER_CLAIMS,
    REMOVE_SCHEME_USER_FROM_SCHEME_REQUEST,
    REMOVE_SCHEME_USER_ALERTS_SYSTEM_MESSAGES
} from './constants';
import {
    USER_MANAGEMENT_GETTING_COUTRIBUTORS_FAILED,
    USER_MANAGEMENT_ADDING_USER_FAILED,
    GET_USER_GROUPS,
    GET_USER_CLAIMS,
    DELETE_USER_GROUPS_ERROR,
    USER_GROUP_DELETE_SUCCESS
} from '../../../config/constants';
import AwsIotSingleton from '../../../helpers/awsIot';
import { IOT_TYPES } from '../../scheme';

const loggedUser = BrowserStorage.getInstance().getLoggedUser();

export function* getContributors(data) {
    try {
        yield put(getContributorsInProgress());
        const result = yield call(apiHandler.getContributors, data);
        yield put(getContributorsSuccess(result));
    } catch (error) {
        const errorObj = getError(error, USER_MANAGEMENT_GETTING_COUTRIBUTORS_FAILED);
        yield put(getContributorsFailed(errorObj));
    }
}

export function* addContributors(action) {
    try {
        yield put(addContributorsInProgress());
        const result = yield call(apiHandler.addUserFromUserManagement, action);
        const {
            payload: { email }
        } = action;
        yield put(addContributorsSuccess(action.payload));
        AwsIotSingleton.publishPayloadWithinSocket(`/${email}/me`, { type: IOT_TYPES.SCHEMES_REFRESH });
        if (result.data.content === 'error') {
            NotificationHelper.getInstance().error(result.data.message);
        } else {
            NotificationHelper.getInstance().success(result.data.message);
        }
        if (action.refreshCallack) {
            action.refreshCallack();
        }
        yield put(initialize(ADD_USER_FORM));
        if (action.visibleInviteUserModal) {
            yield call(action.visibleInviteUserModal);
        }
    } catch (error) {
        const errorObj = getError(error, USER_MANAGEMENT_ADDING_USER_FAILED);
        yield put(addContributorsFailed(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* getUserClaims(action) {
    try {
        const result = yield call(apiHandler.getUserClaims, action);
        yield put(getUserClaimsSuccess(result));
    } catch (error) {
        yield put(getUserClaimsFailed(error));
        NotificationHelper.getInstance().error(GET_USER_CLAIMS);
    }
}

export function* saveGroups(action) {
    const { visibleGroupSaveModal, payload } = action;
    const { schemeId, userType, groupId } = payload;
    let result = null;

    try {
        if (!groupId) {
            result = yield call(apiHandler.saveSchemeGroup, action);
        } else {
            result = yield call(apiHandler.editGroup, action);
        }

        if (result.data.content === 'error') {
            yield put(saveUserGroupFailed(result.data.content));
            NotificationHelper.getInstance().error(result.data.message);
        } else {
            yield put(saveUserGroupSuccess(result.status));
            yield put(getSchemeGroups({ userType, schemeId }));
            yield put(initialize(ADD_CLAIMS_GROUP_FORM));
            visibleGroupSaveModal(false);
            if (action.refreshGroups) {
                action.refreshGroups();
            }
            NotificationHelper.getInstance().success(result.data.message);
        }
    } catch (error) {
        visibleGroupSaveModal(false);
        yield put(saveUserGroupFailed(error));

        const errorObj = getError(error, 'Something went wrong while creating user group.');
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* getUSchemeGroups(action) {
    try {
        const result = yield call(apiHandler.getSchemeGroups, action);
        yield put(getUserGroupsSuccess(result));
    } catch (error) {
        yield put(getUserGroupsFailed(error));
        NotificationHelper.getInstance().error(GET_USER_GROUPS);
    }
}

export function* deleteUserGroups(action) {
    const { payload } = action;
    const { schemeId } = payload;
    try {
        yield call(apiHandler.deleteGroup, action);
        yield put(deleteGroupSuccess(action.payload));
        yield put(getSchemeGroups({ userType: 'client', schemeId }));
        NotificationHelper.getInstance().success(USER_GROUP_DELETE_SUCCESS);
    } catch (error) {
        yield put(deleteGroupFailed(error));
        const errorObj = getError(error, DELETE_USER_GROUPS_ERROR);
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* getUserGroupById(action) {
    try {
        const result = yield call(apiHandler.getUserGroups, action);
        yield put(initialize(ADD_CLAIMS_GROUP_FORM, result.data.content[0]));
        yield put(getUserGroupByIdSuccess());
    } catch (error) {
        yield put(getUserGroupsFailed(error));
        yield put(getUserGroupByIdFailed());
        NotificationHelper.getInstance().error(GET_USER_GROUPS);
    }
}

export function* getUserNameByEmail(action) {
    try {
        const result = yield call(apiHandler.getUserName, action);
        yield put(change(ADD_USER_FORM, 'firstName', result.data.content.firstName));
        yield put(change(ADD_USER_FORM, 'lastName', result.data.content.lastName));
        yield put(getFnameLnameByEmailSuccess(result));
        if (result.data.content.firstName && result.data.content.lastName) {
            yield call(action.toggleDissabledFields, true);
        } else {
            yield call(action.toggleDissabledFields, false);
            yield put(change(ADD_USER_FORM, 'firstName', ''));
            yield put(change(ADD_USER_FORM, 'lastName', ''));
        }
    } catch (error) {
        yield put(getFnameLnameByEmailFailed(error));
    }
}

export function* getContributorById(action) {
    try {
        const result = yield call(apiHandler.getSchemeContributorById, action);
        yield put(initialize(ADD_USER_FORM, result.data.content));
        yield put(getContributorByIdSuccess());
    } catch (error) {
        yield put(getContributorByIdFailed());
        NotificationHelper.getInstance().error(error.message);
    }
}

export function* getClaimsForLoggedUser(data) {
    try {
        yield put(getClaimsForLoggedUserInprogress());
        const result = yield call(apiHandler.getClaimsForLoggedUser, data);
        yield put(getClaimsForLoggedUserSuccess(result));
    } catch (error) {
        yield put(getClaimsForLoggedFailed(error));
        const errorObj = getError(error, 'An unexpected error occurred while getting logged user claims');
        yield NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* removeSchemeUser(action) {
    const { payload } = action;
    try {
        yield call(apiHandler.removeSchemeUserFromScheme, action);
        yield put(removeSchemeUserSuccess(payload));
        if (action.refreshCallack) {
            action.refreshCallack();
        }
        NotificationHelper.getInstance().success(REMOVE_SCHEME_USER_ALERTS_SYSTEM_MESSAGES.REQUEST_SUCCESS);
        if (loggedUser && loggedUser.email && payload.userEmail === loggedUser.email) history.push('/scheme');
    } catch (error) {
        yield put(removeSchemeUserFailure(error));
        const errorObj = getError(error, REMOVE_SCHEME_USER_ALERTS_SYSTEM_MESSAGES.REQUEST_FAILURE);
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export default function* userManagementSagas() {
    yield* [
        takeEvery(GET_CONTRIBUTORS_REQUEST, getContributors),
        takeEvery(ADD_CONTRIBUTORS_REQUEST, addContributors),
        takeEvery(GET_USER_CLAIMS_REQUEST, getUserClaims),
        takeEvery(SAVE_USER_GROUPS_REQUEST, saveGroups),
        takeEvery(GET_USER_GROUPS_REQUEST, getUSchemeGroups),
        takeEvery(DELETE_GROUPS_REQUEST, deleteUserGroups),
        takeEvery(GET_USER_GROUPS_BY_ID, getUserGroupById),
        takeEvery(GET_FN_N_LN_BY_EMAIL_REQUEST, getUserNameByEmail),
        takeEvery(GET_CONTRIBUTOR_BY_ID_REQUEST, getContributorById),
        takeEvery(GET_LOGGED_USER_CLAIMS, getClaimsForLoggedUser),
        takeEvery(REMOVE_SCHEME_USER_FROM_SCHEME_REQUEST, removeSchemeUser)
    ];
}
