import {
    DO_SAVE_PROFILE_IMAGE_SUCCESS,
    DO_CLEAR_PROFILE_IMAGE,
    GET_PERSONAL_DETAILS_REQUEST,
    GET_PERSONAL_DETAILS_IN_PROGRESS,
    GET_PERSONAL_DETAILS_SUCCESS,
    GET_PERSONAL_DETAILS_FAILED,
    DO_SAVE_PERSONAL_DETAILS_REQUEST,
    DO_SAVE_PERSONAL_DETAILS_IN_PROGRESS,
    DO_SAVE_PERSONAL_DETAILS_SUCCESS,
    DO_SAVE_PERSONAL_DETAILS_FAILED,
    DO_UPDATE_USER_PASSWORD_REQUEST,
    DO_SAVE_USER_PASSWORD_IN_PROGRESS,
    DO_UPDATE_USER_PASSWORD_SUCCESS,
    DO_UPDATE_UPLOADING_STATE,
    GET_SCHEME_USER_ACCOUNT_DELETE_DATA_REQUEST,
    GET_SCHEME_USER_ACCOUNT_DELETE_DATA_IN_PROGRESS,
    GET_SCHEME_USER_ACCOUNT_DELETE_DATA_SUCCESS,
    GET_SCHEME_USER_ACCOUNT_DELETE_DATA_FAILURE,
    SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST,
    SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST_IN_PROGRESS,
    SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST_SUCCESS,
    SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST_FAILURE,
    VALIDATE_USER_PASSWORD,
    VALIDATE_USER_PASSWORD_SUCCESS,
    VALIDATE_USER_PASSWORD_ERROR,
    DO_OTP_CHANGE_REQUEST,
    DO_OTP_CHANGE_SUCCESS,
    DO_OTP_CHANGE_FAILED
} from '../constants';

const doUpdateUpdateState = () => ({
    type: DO_UPDATE_UPLOADING_STATE
});

const doUpdateProfileImageSuccess = result => ({
    type: DO_SAVE_PROFILE_IMAGE_SUCCESS,
    result
});

const doClearProfileImage = payload => ({
    type: DO_CLEAR_PROFILE_IMAGE,
    payload
});

const doSavePersonalDetails = payload => ({
    type: DO_SAVE_PERSONAL_DETAILS_REQUEST,
    payload
});
const doSavePersonalDetailsInProgress = () => ({
    type: DO_SAVE_PERSONAL_DETAILS_IN_PROGRESS
});
const doSavePersonalDetailsSuccess = result => ({
    type: DO_SAVE_PERSONAL_DETAILS_SUCCESS,
    result
});
const doSavePersonalDetailsFailed = error => ({
    type: DO_SAVE_PERSONAL_DETAILS_FAILED,
    error
});

const getPersonalDetails = payload => ({
    type: GET_PERSONAL_DETAILS_REQUEST,
    payload
});
const getPersonalDetailsInProgress = () => ({
    type: GET_PERSONAL_DETAILS_IN_PROGRESS
});
const getPersonalDetailsuccess = result => ({
    type: GET_PERSONAL_DETAILS_SUCCESS,
    result
});
const getPersonalDetailsFailed = error => ({
    type: GET_PERSONAL_DETAILS_FAILED,
    error
});

const doUpdateUserPasswordRequest = payload => ({
    type: DO_UPDATE_USER_PASSWORD_REQUEST,
    payload
});
const doUpdateUserPasswordInProgress = () => ({
    type: DO_SAVE_USER_PASSWORD_IN_PROGRESS
});
const doUpdatePasswordSuccess = () => ({
    type: DO_UPDATE_USER_PASSWORD_SUCCESS
});

const getUserDeleteAccountData = () => ({
    type: GET_SCHEME_USER_ACCOUNT_DELETE_DATA_REQUEST
});
const getUserDeleteAccountDataInProgress = () => ({
    type: GET_SCHEME_USER_ACCOUNT_DELETE_DATA_IN_PROGRESS
});
const getUserDeleteAccountDataSuccess = result => ({
    type: GET_SCHEME_USER_ACCOUNT_DELETE_DATA_SUCCESS,
    result
});
const getUserDeleteAccountDataFailure = error => ({
    type: GET_SCHEME_USER_ACCOUNT_DELETE_DATA_FAILURE,
    error
});

const sendUserDeleteAccountRequest = (payload, refreshCallack) => ({
    type: SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST,
    payload,
    refreshCallack
});
const sendUserDeleteAccountRequestInProgress = () => ({
    type: SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST_IN_PROGRESS
});
const sendUserDeleteAccountRequestSuccess = result => ({
    type: SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST_SUCCESS,
    result
});
const sendUserDeleteAccountRequestFailure = error => ({
    type: SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST_FAILURE,
    error
});
const validateUserPassword = (email, userPassword, callback) => ({
    type: VALIDATE_USER_PASSWORD,
    payload: { email, userPassword },
    callback
});
const validateUserPasswordSuccess = () => ({ type: VALIDATE_USER_PASSWORD_SUCCESS });
const validateUserPasswordError = () => ({ type: VALIDATE_USER_PASSWORD_ERROR });

const requestToChangeOtp = (payload, callback) => ({
    type: DO_OTP_CHANGE_REQUEST,
    payload,
    callback
});

const requestToChangeOtpSuccess = payload => ({
    type: DO_OTP_CHANGE_SUCCESS,
    payload
});

const requestToChangeOtpFailed = payload => ({
    type: DO_OTP_CHANGE_FAILED,
    payload
});

export {
    doUpdateProfileImageSuccess,
    doClearProfileImage,
    doSavePersonalDetails,
    doSavePersonalDetailsInProgress,
    doSavePersonalDetailsSuccess,
    doSavePersonalDetailsFailed,
    getPersonalDetails,
    getPersonalDetailsInProgress,
    getPersonalDetailsuccess,
    getPersonalDetailsFailed,
    doUpdateUserPasswordRequest,
    doUpdateUserPasswordInProgress,
    doUpdatePasswordSuccess,
    doUpdateUpdateState,
    getUserDeleteAccountData,
    getUserDeleteAccountDataInProgress,
    getUserDeleteAccountDataSuccess,
    getUserDeleteAccountDataFailure,
    sendUserDeleteAccountRequest,
    sendUserDeleteAccountRequestInProgress,
    sendUserDeleteAccountRequestSuccess,
    sendUserDeleteAccountRequestFailure,
    validateUserPassword,
    validateUserPasswordSuccess,
    validateUserPasswordError,
    requestToChangeOtp,
    requestToChangeOtpSuccess,
    requestToChangeOtpFailed
};
