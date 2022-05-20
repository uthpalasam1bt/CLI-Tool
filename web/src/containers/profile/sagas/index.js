import { takeEvery, put, call } from 'redux-saga/effects';

import apiHandler from '../../../middlewares/connectApi';
import { getError } from '../../../helpers/apiHelper';
import NotificationHelper from '../../../helpers/NotificationHelper';

import {
    doUpdateProfileImageSuccess,
    doSavePersonalDetailsInProgress,
    doSavePersonalDetailsSuccess,
    doSavePersonalDetailsFailed,
    getPersonalDetailsInProgress,
    getPersonalDetailsuccess,
    getPersonalDetailsFailed,
    doUpdateUserPasswordInProgress,
    doUpdatePasswordSuccess,
    getUserDeleteAccountDataInProgress,
    getUserDeleteAccountDataSuccess,
    getUserDeleteAccountDataFailure,
    sendUserDeleteAccountRequestInProgress,
    sendUserDeleteAccountRequestSuccess,
    sendUserDeleteAccountRequestFailure,
    validateUserPasswordSuccess,
    validateUserPasswordError,
    requestToChangeOtpSuccess,
    requestToChangeOtpFailed,
    getPersonalDetails as getPersonalDetails_action
} from '../actions';
import {
    DO_SAVE_PERSONAL_DETAILS_REQUEST,
    GET_PERSONAL_DETAILS_REQUEST,
    DO_CLEAR_PROFILE_IMAGE,
    DO_UPDATE_USER_PASSWORD_REQUEST,
    GET_SCHEME_USER_ACCOUNT_DELETE_DATA_REQUEST,
    SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST,
    VALIDATE_USER_PASSWORD,
    DO_OTP_CHANGE_REQUEST
} from '../constants';
import { SCHEME_USER_DELETE_ACCOUNT_SYSTEM_MESSAGES } from '../deleteAccount/constants';
import {
    DELETE_PROFILE_IMAGE_SUCCESS,
    UPDATE_PERONAL_DETAILS_SUCCESS,
    PROFILE_IMAGE_SUCCESSFULLY_UPLOADED,
    DELETE_PROFILE_IMAGE_FAILED,
    UPDATE_PASSWORD_SUCCESS,
    ERROR_WHILE_UPDATING_PERSONAL_DATA,
    ERROR_WHILE_GETING_PERSONAL_DATA
} from '../../../config/constants';

export function* doClearProfileImageSaga(data) {
    const { email } = data.payload;
    try {
        delete data.payload.email;
        const response = yield call(apiHandler.doClearProfileImage, data);
        if (response.data.result) {
            const resultS = yield call(apiHandler.getPersonalDetails, email);
            yield put(getPersonalDetailsuccess(resultS));
            yield put(doUpdateProfileImageSuccess(response));

            NotificationHelper.getInstance().success(DELETE_PROFILE_IMAGE_SUCCESS);
        } else {
            NotificationHelper.getInstance().error(response.data.message);
        }
    } catch (error) {
        NotificationHelper.getInstance().error(DELETE_PROFILE_IMAGE_FAILED);
    }
}

export function* doUpdatePassword(data) {
    try {
        const result = yield call(apiHandler.doUpdatePassword, data.payload);
        yield put(doUpdateUserPasswordInProgress());

        yield put(doUpdatePasswordSuccess(result));
        NotificationHelper.getInstance().success(UPDATE_PASSWORD_SUCCESS);
    } catch (error) {
        NotificationHelper.getInstance().error(error.response.data.message);
    }
}

export function* doSavePersonalDetails(data) {
    try {
        yield put(doSavePersonalDetailsInProgress());

        if (data.payload.primaryRole !== 'other') {
            data.payload.otherRole = null;
        }

        if (!data.payload.primaryRole) {
            delete data.payload.otherRole;
        }
        const result = yield call(apiHandler.doSavePersonalDetails, data.payload);

        yield put(doSavePersonalDetailsSuccess(result));
        if (data.payload.email) yield put(getPersonalDetails_action(data.payload.email));
        if (data.payload && data.payload.path) {
            NotificationHelper.getInstance().success(PROFILE_IMAGE_SUCCESSFULLY_UPLOADED);
        } else {
            NotificationHelper.getInstance().success(UPDATE_PERONAL_DETAILS_SUCCESS);
        }
    } catch (error) {
        const errorObj = getError(error, ERROR_WHILE_UPDATING_PERSONAL_DATA);
        NotificationHelper.getInstance().error(errorObj.message);
        yield put(doSavePersonalDetailsFailed(errorObj));
    }
}

export function* getPersonalDetails(data) {
    try {
        yield put(getPersonalDetailsInProgress());
        //
        const result = yield call(apiHandler.getPersonalDetails, data.payload);
        yield put(getPersonalDetailsuccess(result));
    } catch (error) {
        const errorObj = getError(error, ERROR_WHILE_GETING_PERSONAL_DATA);
        NotificationHelper.getInstance().error(errorObj.message);
        yield put(getPersonalDetailsFailed(errorObj));
    }
}

export function* getSchemeUserDeleteAccountData(action) {
    try {
        yield put(getUserDeleteAccountDataInProgress());
        const result = yield call(apiHandler.getSchemeUserDeleteAccountData, {});
        yield put(getUserDeleteAccountDataSuccess(result));
    } catch (error) {
        yield put(getUserDeleteAccountDataFailure(error));
        const errorObj = getError(
            error,
            SCHEME_USER_DELETE_ACCOUNT_SYSTEM_MESSAGES.DELETE_ACCOUNT_REQUEST_DATA_LOADING_ERROR
        );
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* sendSchemeUserDeleteAccountRequest(action) {
    const { payload, refreshCallack } = action;
    const { email } = payload;
    try {
        yield put(sendUserDeleteAccountRequestInProgress());
        const result = yield call(apiHandler.sendSchemeUserDeleteAccountRequest, email);
        yield put(sendUserDeleteAccountRequestSuccess(result));
        if (refreshCallack) {
            refreshCallack();
        }
        // NotificationHelper.getInstance().success(
        //   SCHEME_USER_DELETE_ACCOUNT_SYSTEM_MESSAGES.DELETE_ACCOUNT_REQUESTED
        // );
    } catch (error) {
        yield put(sendUserDeleteAccountRequestFailure(error));
        const errorObj = getError(error, SCHEME_USER_DELETE_ACCOUNT_SYSTEM_MESSAGES.DELETE_ACCOUNT_REQUEST_ERROR);
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* validateUserPassword(action) {
    const { callback } = action;
    try {
        yield call(apiHandler.doLogin, action);
        yield put(validateUserPasswordSuccess());
        if (callback) {
            callback(true);
        }
    } catch (error) {
        callback(false);
        yield put(validateUserPasswordError());
        NotificationHelper.getInstance().warning(SCHEME_USER_DELETE_ACCOUNT_SYSTEM_MESSAGES.INVALID_PASSWORD);
    }
}

export function* requestToChangeOtp(action) {
    const { callback } = action;
    try {
        yield call(apiHandler.requestToChangeOtp, action);
        yield put(requestToChangeOtpSuccess());
        if (callback) {
            callback();
        }
        NotificationHelper.getInstance().success('Successfully send your request to the administrator.');
    } catch (error) {
        yield put(requestToChangeOtpFailed());
        if (callback) {
            callback();
        }
        const errorObj = getError(error, 'Please try again.');
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export default function* profileDetailSagas() {
    yield* [
        takeEvery(DO_CLEAR_PROFILE_IMAGE, doClearProfileImageSaga),
        takeEvery(DO_SAVE_PERSONAL_DETAILS_REQUEST, doSavePersonalDetails),
        takeEvery(GET_PERSONAL_DETAILS_REQUEST, getPersonalDetails),
        takeEvery(DO_UPDATE_USER_PASSWORD_REQUEST, doUpdatePassword),
        takeEvery(GET_SCHEME_USER_ACCOUNT_DELETE_DATA_REQUEST, getSchemeUserDeleteAccountData),
        takeEvery(SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST, sendSchemeUserDeleteAccountRequest),
        takeEvery(VALIDATE_USER_PASSWORD, validateUserPassword),
        takeEvery(DO_OTP_CHANGE_REQUEST, requestToChangeOtp)
    ];
}
