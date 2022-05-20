import { DO_REGISTER_IN_PROGRESS, DO_REGISTER_SUCCESS, DO_REGISTER_FAILED } from '../constants';
import { FORM_SET_SUBMIT_SUCCEEDED } from '../../../constants/formConstants';

const initialState = {
    inProgress: false,
    status: false,
    error: null
};

export default function registerReducer(state = initialState, action) {
    switch (action.type) {
        case DO_REGISTER_IN_PROGRESS:
            return { ...initialState, inProgress: true };
        case DO_REGISTER_SUCCESS:
            return { ...initialState, status: true };
        case DO_REGISTER_FAILED:
            return { ...initialState, error: action.error };

        case FORM_SET_SUBMIT_SUCCEEDED:
            return { ...state };

        default:
            return initialState;
    }
}
