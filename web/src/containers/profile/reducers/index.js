import {
    DO_SAVE_PROFILE_IMAGE_SUCCESS,
    DO_SAVE_PERSONAL_DETAILS_IN_PROGRESS,
    DO_SAVE_PERSONAL_DETAILS_SUCCESS,
    DO_SAVE_PERSONAL_DETAILS_FAILED,
    GET_PERSONAL_DETAILS_IN_PROGRESS,
    GET_PERSONAL_DETAILS_SUCCESS,
    GET_PERSONAL_DETAILS_FAILED,
    DO_UPDATE_USER_PASSWORD_INPROGRESS,
    DO_UPDATE_USER_PASSWORD_SUCCESS,
    DO_UPDATE_USER_PASSWORD_FAILED,
    DO_SAVE_PERSONAL_DETAILS_REQUEST,
    DO_UPDATE_UPLOADING_STATE,
    GET_SCHEME_USER_ACCOUNT_DELETE_DATA_IN_PROGRESS,
    GET_SCHEME_USER_ACCOUNT_DELETE_DATA_SUCCESS,
    GET_SCHEME_USER_ACCOUNT_DELETE_DATA_FAILURE,
    SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST_IN_PROGRESS,
    SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST_SUCCESS,
    SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST_FAILURE,
    VALIDATE_USER_PASSWORD_SUCCESS,
    VALIDATE_USER_PASSWORD_ERROR,
    VALIDATE_USER_PASSWORD,
    DO_OTP_CHANGE_REQUEST,
    DO_OTP_CHANGE_SUCCESS,
    DO_OTP_CHANGE_FAILED
} from '../constants';

const personalDetailsInitialState = {
    doSavePersonalDetails_inProgress: false,
    doSavePersonalDetails_status: false,
    doSavePersonalDetails_error: null,

    getPersonalDetails_inProgress: false,
    getPersonalDetails_data: null,
    getPersonalDetails_error: null,

    doUpdatePassword_inProgress: false,
    doUpdatePassword_data: null,
    doUpdatePassword_error: null,

    getSchemeUserAccountDeleteData_inProgress: false,
    getSchemeUserAccountDeleteData_result: null,
    getSchemeUserAccountDeleteData_error: null,

    sendSchemeUserAccountDeleteRequest_inProgress: false,
    sendSchemeUserAccountDeleteRequest_result: null,
    sendSchemeUserAccountDeleteRequest_error: null,
    validatingUserPassword: false,

    requestOtpChange_inProgress: false
};

export default function profileDetailsReducer(state = { ...personalDetailsInitialState }, action) {
    switch (action.type) {
        case DO_SAVE_PROFILE_IMAGE_SUCCESS: {
            const setData = state.getPersonalDetails_data;
            if (setData) {
                setData.imageUrl = action.result.data.content.path;
            }

            return {
                ...state,
                ...personalDetailsInitialState,
                doSavePersonalDetails_status: true,
                doSavePersonalDetails_inProgress: false,
                getPersonalDetails_data: setData
            };
        }
        case DO_SAVE_PERSONAL_DETAILS_REQUEST: {
            return { ...state, ...personalDetailsInitialState, doSavePersonalDetails_inProgress: true };
        }

        case DO_UPDATE_UPLOADING_STATE:
            return { ...state, ...personalDetailsInitialState, doSavePersonalDetails_inProgress: true };
        case DO_SAVE_PERSONAL_DETAILS_IN_PROGRESS:
            return { ...state, ...personalDetailsInitialState, doSavePersonalDetails_inProgress: true };
        case DO_SAVE_PERSONAL_DETAILS_SUCCESS:
            return {
                ...state,
                ...personalDetailsInitialState,
                doSavePersonalDetails_status: true,
                doSavePersonalDetails_inProgress: false,
                getPersonalDetails_data: action.result.data.content
            };
        case DO_SAVE_PERSONAL_DETAILS_FAILED:
            return {
                ...state,
                ...personalDetailsInitialState,
                doSavePersonalDetails_error: action.error,
                doSavePersonalDetails_inProgress: false
            };

        case GET_PERSONAL_DETAILS_IN_PROGRESS:
            return { ...state, ...personalDetailsInitialState, getPersonalDetails_inProgress: true };
        case GET_PERSONAL_DETAILS_SUCCESS:
            if (action.result.data.content.primaryRole !== 'other') {
                delete action.result.data.content.otherRole;
            }
            return {
                ...state,
                //...personalDetailsInitialState,
                getPersonalDetails_data: action.result.data.content,
                getPersonalDetails_inProgress: false
            };
        case GET_PERSONAL_DETAILS_FAILED:
            return {
                ...state,
                ...personalDetailsInitialState,
                getPersonalDetails_error: action.error,
                getPersonalDetails_inProgress: false
            };
        case DO_UPDATE_USER_PASSWORD_INPROGRESS:
            return { ...state, personalDetailsInitialState, doUpdatePassword_inProgress: true };

        case DO_UPDATE_USER_PASSWORD_SUCCESS:
            return {
                ...state,
                personalDetailsInitialState,
                // doUpdatePassword_data: action.result.data.content,
                doUpdatePassword_inProgress: false
            };
        case DO_UPDATE_USER_PASSWORD_FAILED:
            return {
                ...state,
                personalDetailsInitialState,
                doUpdatePassword_data: action.error,
                doUpdatePassword_inProgress: false
            };

        case GET_SCHEME_USER_ACCOUNT_DELETE_DATA_IN_PROGRESS:
            return {
                ...state,
                ...personalDetailsInitialState,
                getSchemeUserAccountDeleteData_inProgress: true
            };
        case GET_SCHEME_USER_ACCOUNT_DELETE_DATA_SUCCESS:
            return {
                ...state,
                ...personalDetailsInitialState,
                getSchemeUserAccountDeleteData_inProgress: false,
                getSchemeUserAccountDeleteData_result: action.result
            };
        case GET_SCHEME_USER_ACCOUNT_DELETE_DATA_FAILURE:
            return {
                ...state,
                ...personalDetailsInitialState,
                getSchemeUserAccountDeleteData_inProgress: false,
                getSchemeUserAccountDeleteData_error: action.error
            };

        case SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST_IN_PROGRESS:
            return {
                ...state,
                ...personalDetailsInitialState,
                sendSchemeUserAccountDeleteRequest_inProgress: true
            };
        case SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST_SUCCESS:
            return {
                ...state,
                ...personalDetailsInitialState,
                sendSchemeUserAccountDeleteRequest_inProgress: false,
                sendSchemeUserAccountDeleteRequest_result: action.result
            };
        case SEND_SCHEME_USER_ACCOUNT_DELETE_REQUEST_FAILURE:
            return {
                ...state,
                ...personalDetailsInitialState,
                sendSchemeUserAccountDeleteRequest_inProgress: false,
                sendSchemeUserAccountDeleteRequest_error: action.error
            };
        case VALIDATE_USER_PASSWORD:
            return {
                ...state,
                validatingUserPassword: true
            };
        case VALIDATE_USER_PASSWORD_SUCCESS:
        case VALIDATE_USER_PASSWORD_ERROR:
            return {
                ...state,
                validatingUserPassword: false
            };
        case DO_OTP_CHANGE_REQUEST:
            return {
                ...state,
                requestOtpChange_inProgress: true
            };
        case DO_OTP_CHANGE_SUCCESS:
        case DO_OTP_CHANGE_FAILED:
            return {
                ...state,
                requestOtpChange_inProgress: false
            };
        default:
            return state;
    }
}
