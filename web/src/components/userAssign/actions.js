import {
    GET_ASSIGN_USER_LIST,
    GET_ASSIGN_USER_LIST_IN_PROGRESS,
    GET_ASSIGN_USER_LIST_SUCCESS,
    GET_ASSIGN_USER_LIST_FAILED,
    UPDATE_ASSIGN_USER
} from './constants';

export const requestAssignUserList = payload => ({
    type: GET_ASSIGN_USER_LIST,
    payload
});

export const getAssignUserListInprogress = payload => ({
    type: GET_ASSIGN_USER_LIST_IN_PROGRESS,
    payload
});

export const getAssignUserListSuccess = payload => ({
    type: GET_ASSIGN_USER_LIST_SUCCESS,
    payload
});

export const getAssignUserListFailed = payload => ({
    type: GET_ASSIGN_USER_LIST_FAILED,
    payload
});

export const updateAssignUser = payload => ({
    type: UPDATE_ASSIGN_USER,
    payload
});
