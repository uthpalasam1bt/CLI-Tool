import { DO_LOGOUT_IN_PROGRESS, DO_LOGOUT_SUCCESS, DO_LOGOUT_FAILED } from '../constants';
import { FORM_SET_SUBMIT_SUCCEEDED } from '../../../constants/formConstants';

const initialState = {
    inProgress: false,
    logoutStatus: false,
    error: null
};

export default function logoutReducer(state = initialState, action) {
    switch (action.type) {
        case DO_LOGOUT_IN_PROGRESS:
            return { ...initialState, inProgress: true };
        case DO_LOGOUT_SUCCESS:
            return { ...initialState, logoutStatus: true, state: null };
        case DO_LOGOUT_FAILED:
            return { ...initialState, error: action.error };

        case FORM_SET_SUBMIT_SUCCEEDED:
            return { ...state };

        default:
            return initialState;
    }
}
