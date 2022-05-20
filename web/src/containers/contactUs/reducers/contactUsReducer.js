import { DO_CONTACT_US_IN_PROGRESS, DO_CONTACT_US_SUCCESS, DO_CONTACT_US_FAILED } from '../constants';
import { FORM_SET_SUBMIT_SUCCEEDED } from '../../../constants/formConstants';

const initialState = {
    inProgress: false,
    status: false,
    error: null
};

export default function contactUsReducer(state = initialState, action) {
    switch (action.type) {
        case DO_CONTACT_US_IN_PROGRESS:
            return { ...initialState, inProgress: true };
        case DO_CONTACT_US_SUCCESS:
            return { ...initialState, status: true };
        case DO_CONTACT_US_FAILED:
            return { ...initialState, error: action.error };

        case FORM_SET_SUBMIT_SUCCEEDED:
            return { ...state };
        default:
            return state;
    }
}
