import { takeEvery, put, call } from 'redux-saga/effects';

import { SEND_PASSWORD_RESET_CODE_REQUEST, DO_RESET_PASSWORD_REQUEST } from '../constants';
import {
    sendPasswordResetCodeInProgress,
    sendPasswordResetCodeSuccess,
    sendPasswordResetCodeFailed,
    doResetPasswordInProgress,
    doResetPasswordSuccess,
    doResetPasswordFailed
} from '../actions/forgotPasswordActions';
import apiHandler from '../../../middlewares/connectApi';
import { getError } from '../../../helpers/apiHelper';
import { SENDING_SEND_PASSWORD_RESET_CODE, PASSWORD_RESET_FAILED } from '../../../config/constants';

export function* sendPasswordResetCode(data) {
    try {
        yield put(sendPasswordResetCodeInProgress());
        yield call(apiHandler.sendPasswordResetCode, data);
        yield put(sendPasswordResetCodeSuccess());
    } catch (error) {
        const errorMessage = getError(error, SENDING_SEND_PASSWORD_RESET_CODE);
        yield put(sendPasswordResetCodeFailed(errorMessage));
    }
}

export function* doResetPassword(data) {
    try {
        yield put(doResetPasswordInProgress());
        yield call(apiHandler.doResetPassword, data);
        yield put(doResetPasswordSuccess());
    } catch (error) {
        const errorMessage = getError(error, PASSWORD_RESET_FAILED);
        yield put(doResetPasswordFailed(errorMessage));
    }
}

export default function* forgotPasswordSagas() {
    yield* [
        takeEvery(SEND_PASSWORD_RESET_CODE_REQUEST, sendPasswordResetCode),
        takeEvery(DO_RESET_PASSWORD_REQUEST, doResetPassword)
    ];
}
