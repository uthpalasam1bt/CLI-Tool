import {
    DO_CONFIRM_USER_IN_PROGRESS,
    DO_CONFIRM_USER_SUCCESS,
    DO_CONFIRM_USER_FAILED,
    RESEND_USER_CONFIRMATION_CODE_IN_PROGRESS,
    RESEND_USER_CONFIRMATION_CODE_SUCCESS,
    RESEND_USER_CONFIRMATION_CODE_FAILED
} from '../constants';
import { FORM_SET_SUBMIT_SUCCEEDED } from '../../../constants/formConstants';

const initialState = {
    confirmUser_inProgress: false,
    confirmUser_status: false,
    confirmUser_error: null,

    resendUserConfirmationCode_inProgress: false,
    resendUserConfirmationCode_status: false,
    resendUserConfirmationCode_error: null
};

export default function userConfirmationReducer(state = initialState, action) {
    switch (action.type) {
        case DO_CONFIRM_USER_IN_PROGRESS:
            return { ...initialState, confirmUser_inProgress: true };
        case DO_CONFIRM_USER_SUCCESS:
            return { ...initialState, confirmUser_status: true };
        case DO_CONFIRM_USER_FAILED:
            return { ...initialState, confirmUser_error: action.error };

        case RESEND_USER_CONFIRMATION_CODE_IN_PROGRESS:
            return { ...initialState, resendUserConfirmationCode_inProgress: true };
        case RESEND_USER_CONFIRMATION_CODE_SUCCESS:
            return { ...initialState, resendUserConfirmationCode_status: true };
        case RESEND_USER_CONFIRMATION_CODE_FAILED:
            return { ...initialState, resendUserConfirmationCode_error: action.error };

        case FORM_SET_SUBMIT_SUCCEEDED:
            return { ...state };

        default:
            return initialState;
    }
}
