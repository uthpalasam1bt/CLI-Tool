import {
    GET_ASSIGN_USER_LIST_IN_PROGRESS,
    GET_ASSIGN_USER_LIST_SUCCESS,
    GET_ASSIGN_USER_LIST_FAILED
} from './constants';

let initialState = {
    getAssignUser_data: [],
    getAssignUser_error: null,
    getAssignUser_inProgress: false
};

export default function userAssignReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ASSIGN_USER_LIST_IN_PROGRESS:
            return { ...state, getAssignUser_inProgress: true };
        case GET_ASSIGN_USER_LIST_SUCCESS:
            return {
                ...state,
                getAssignUser_data: action.payload.data.content,
                getAssignUser_inProgress: false
            };
        case GET_ASSIGN_USER_LIST_FAILED:
            return { ...state, getAssignUser_error: action.error, getAssignUser_inProgress: false };
        default:
            return state;
    }
}
