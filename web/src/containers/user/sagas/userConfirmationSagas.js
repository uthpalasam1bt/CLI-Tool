import { takeEvery, put, call } from 'redux-saga/effects';

import apiHandler from '../../../middlewares/connectApi';
import { getError } from '../../../helpers/apiHelper';
import { DO_CONFIRM_USER_REQUEST, RESEND_USER_CONFIRMATION_CODE_REQUEST } from '../constants';
import {
    doConfirmUserInProgress,
    doConfirmUserSuccess,
    doConfirmUserFailed,
    resendUserConfirmationCodeInProgress,
    resendUserConfirmationCodeSuccess,
    resendUserConfirmationCodeFailed
} from '../actions/userConfirmationActions';
import { ACCOUNT_CONFIRMATION_FAILED, SENDING_CONFIRMATION_CODE_FAILED } from '../../../config/constants';

export function* doConfirmUser(data) {
    try {
        yield put(doConfirmUserInProgress());
        yield call(apiHandler.doConfirmUser, data);
        yield put(doConfirmUserSuccess());
    } catch (error) {
        const errorMessage = getError(error, ACCOUNT_CONFIRMATION_FAILED);
        yield put(doConfirmUserFailed(errorMessage));
    }
}

export function* resendUserConfirmationCode(data) {
    try {
        yield put(resendUserConfirmationCodeInProgress());
        yield call(apiHandler.resendUserConfirmationCode, data);
        yield put(resendUserConfirmationCodeSuccess());
    } catch (error) {
        const errorMessage = getError(error, SENDING_CONFIRMATION_CODE_FAILED);
        yield put(resendUserConfirmationCodeFailed(errorMessage));
    }
}

export default function* userConfirmationSagas() {
    yield* [
        takeEvery(DO_CONFIRM_USER_REQUEST, doConfirmUser),
        takeEvery(RESEND_USER_CONFIRMATION_CODE_REQUEST, resendUserConfirmationCode)
    ];
}
