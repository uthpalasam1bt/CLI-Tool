import {
    SEND_PASSWORD_RESET_CODE_REQUEST,
    SEND_PASSWORD_RESET_CODE_IN_PROGRESS,
    SEND_PASSWORD_RESET_CODE_SUCCESS,
    SEND_PASSWORD_RESET_CODE_FAILED,
    DO_RESET_PASSWORD_REQUEST,
    DO_RESET_PASSWORD_IN_PROGRESS,
    DO_RESET_PASSWORD_SUCCESS,
    DO_RESET_PASSWORD_FAILED
} from '../constants';

const sendPasswordResetCode = payload => ({
    type: SEND_PASSWORD_RESET_CODE_REQUEST,
    payload
});
const sendPasswordResetCodeInProgress = () => ({
    type: SEND_PASSWORD_RESET_CODE_IN_PROGRESS
});
const sendPasswordResetCodeSuccess = () => ({
    type: SEND_PASSWORD_RESET_CODE_SUCCESS
});
const sendPasswordResetCodeFailed = error => ({
    type: SEND_PASSWORD_RESET_CODE_FAILED,
    error
});

const doResetPassword = payload => ({
    type: DO_RESET_PASSWORD_REQUEST,
    payload
});
const doResetPasswordInProgress = () => ({
    type: DO_RESET_PASSWORD_IN_PROGRESS
});
const doResetPasswordSuccess = () => ({
    type: DO_RESET_PASSWORD_SUCCESS
});
const doResetPasswordFailed = error => ({
    type: DO_RESET_PASSWORD_FAILED,
    error
});

export {
    sendPasswordResetCode,
    sendPasswordResetCodeInProgress,
    sendPasswordResetCodeSuccess,
    sendPasswordResetCodeFailed,
    doResetPassword,
    doResetPasswordInProgress,
    doResetPasswordSuccess,
    doResetPasswordFailed
};
