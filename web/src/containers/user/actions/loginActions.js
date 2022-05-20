import {
    DO_LOGIN_REQUEST,
    DO_LOGIN_IN_PROGRESS,
    DO_LOGIN_SUCCESS,
    DO_LOGIN_FAILED,
    GET_USER_FL_NAME_REQUEST,
    GET_USER_FL_NAME_IN_PROGRESS,
    GET_USER_FL_NAME_SUCCESS,
    GET_USER_FL_NAME_ERROR,
    GET_USER_OTP_NUMBER_REQUEST
} from '../constants';

const doLogin = (payload, fromLogin = false) => ({
    type: DO_LOGIN_REQUEST,
    payload,
    fromLogin
});
const doLoginInProgress = () => ({
    type: DO_LOGIN_IN_PROGRESS
});
const doLoginSuccess = result => ({
    type: DO_LOGIN_SUCCESS,
    result
});
const doLoginFailed = error => ({
    type: DO_LOGIN_FAILED,
    error
});

const getFLNames_request = (payload, getFirstAndLastName) => ({
    type: GET_USER_FL_NAME_REQUEST,
    payload,
    getFirstAndLastName
});

const getFLNames_inProgress = error => ({
    type: GET_USER_FL_NAME_IN_PROGRESS,
    error
});

const getFLNames_success = error => ({
    type: GET_USER_FL_NAME_SUCCESS,
    error
});

const getFLNames_error = error => ({
    type: GET_USER_FL_NAME_ERROR,
    error
});

const otpValidate = (payload, callBack) => ({
    type: GET_USER_OTP_NUMBER_REQUEST,
    payload,
    callBack
});

export {
    doLogin,
    doLoginSuccess,
    doLoginFailed,
    doLoginInProgress,
    getFLNames_request,
    getFLNames_inProgress,
    getFLNames_success,
    getFLNames_error,
    otpValidate
};
