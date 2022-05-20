import {
    DO_CONFIRM_USER_REQUEST,
    DO_CONFIRM_USER_IN_PROGRESS,
    DO_CONFIRM_USER_SUCCESS,
    DO_CONFIRM_USER_FAILED,
    RESEND_USER_CONFIRMATION_CODE_REQUEST,
    RESEND_USER_CONFIRMATION_CODE_IN_PROGRESS,
    RESEND_USER_CONFIRMATION_CODE_SUCCESS,
    RESEND_USER_CONFIRMATION_CODE_FAILED
} from '../constants';

const doConfirmUser = payload => ({
    type: DO_CONFIRM_USER_REQUEST,
    payload
});
const doConfirmUserInProgress = () => ({
    type: DO_CONFIRM_USER_IN_PROGRESS
});
const doConfirmUserSuccess = () => ({
    type: DO_CONFIRM_USER_SUCCESS
});
const doConfirmUserFailed = error => ({
    type: DO_CONFIRM_USER_FAILED,
    error
});

const resendUserConfirmationCode = payload => ({
    type: RESEND_USER_CONFIRMATION_CODE_REQUEST,
    payload
});
const resendUserConfirmationCodeInProgress = () => ({
    type: RESEND_USER_CONFIRMATION_CODE_IN_PROGRESS
});
const resendUserConfirmationCodeSuccess = () => ({
    type: RESEND_USER_CONFIRMATION_CODE_SUCCESS
});
const resendUserConfirmationCodeFailed = error => ({
    type: RESEND_USER_CONFIRMATION_CODE_FAILED,
    error
});

export {
    doConfirmUser,
    doConfirmUserInProgress,
    doConfirmUserSuccess,
    doConfirmUserFailed,
    resendUserConfirmationCode,
    resendUserConfirmationCodeInProgress,
    resendUserConfirmationCodeSuccess,
    resendUserConfirmationCodeFailed
};
