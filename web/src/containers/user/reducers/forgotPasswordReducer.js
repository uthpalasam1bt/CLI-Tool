import {
    SEND_PASSWORD_RESET_CODE_IN_PROGRESS,
    SEND_PASSWORD_RESET_CODE_SUCCESS,
    SEND_PASSWORD_RESET_CODE_FAILED,
    DO_RESET_PASSWORD_IN_PROGRESS,
    DO_RESET_PASSWORD_SUCCESS,
    DO_RESET_PASSWORD_FAILED
} from '../constants';
import { FORM_SET_SUBMIT_SUCCEEDED } from '../../../constants/formConstants';

const initialState = {
    forgotPassword_inProgress: false,
    forgotPassword_status: false,
    forgotPassword_error: null,

    resetPassword_inProgress: false,
    resetPassword_status: false,
    resetPassword_error: null
};

export default function forgotPasswordReducer(state = initialState, action) {
    switch (action.type) {
        case SEND_PASSWORD_RESET_CODE_IN_PROGRESS:
            return { ...initialState, forgotPassword_inProgress: true };
        case SEND_PASSWORD_RESET_CODE_SUCCESS:
            return { ...initialState, forgotPassword_status: true };
        case SEND_PASSWORD_RESET_CODE_FAILED:
            return { ...initialState, forgotPassword_error: action.error };

        case DO_RESET_PASSWORD_IN_PROGRESS:
            return { ...initialState, resetPassword_inProgress: true };
        case DO_RESET_PASSWORD_SUCCESS:
            return { ...initialState, resetPassword_status: true };
        case DO_RESET_PASSWORD_FAILED:
            return { ...initialState, resetPassword_error: action.error };

        case FORM_SET_SUBMIT_SUCCEEDED:
            return { ...state };

        default:
            return initialState;
    }
}
