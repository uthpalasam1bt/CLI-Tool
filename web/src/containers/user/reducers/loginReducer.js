import {
    DO_LOGIN_IN_PROGRESS,
    DO_LOGIN_SUCCESS,
    DO_LOGIN_FAILED,
    GET_USER_FL_NAME_IN_PROGRESS,
    GET_USER_FL_NAME_SUCCESS,
    GET_USER_FL_NAME_ERROR
} from '../constants';
import { FORM_SET_SUBMIT_SUCCEEDED } from '../../../constants/formConstants';

const initialState = {
    inProgress: false,
    loggedUser: null,
    error: null,
    getFLName_inProgress: false,
    getFLName_data: {},
    getFLName_error: false
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case DO_LOGIN_IN_PROGRESS:
            return { ...initialState, inProgress: true };
        case DO_LOGIN_SUCCESS:
            return { ...initialState, loggedUser: action.result.data.content };
        case DO_LOGIN_FAILED:
            return { ...initialState, error: action.error };

        case FORM_SET_SUBMIT_SUCCEEDED:
            return { ...state };

        case GET_USER_FL_NAME_IN_PROGRESS:
            return { ...state, ...initialState, getFLName_inProgress: true };
        case GET_USER_FL_NAME_SUCCESS:
            return { ...state, ...initialState, getFLName_data: action.result };
        case GET_USER_FL_NAME_ERROR:
            return { ...state, ...initialState, getFLName_error: true };

        default:
            return initialState;
    }
}
