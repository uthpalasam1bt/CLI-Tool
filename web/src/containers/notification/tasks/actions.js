import {
    GET_TASKS_REQUEST,
    GET_TASKS_SUCCESS,
    GET_TASKS_ERROR,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_ERROR,
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_ERROR,
    MARK_AS_READ_REQUEST,
    MARK_AS_READ_SUCCESS,
    MARK_AS_READ_ERROR,
    GET_SCHEMES_LIST_BY_USER_REQUEST,
    GET_SCHEMES_LIST_BY_USER_SUCCESS,
    GET_SCHEMES_LIST_BY_USER_ERROR,
    GET_SCHEME_USER_LIST_REQUEST,
    GET_SCHEME_USER_LIST_SUCCESS,
    GET_SCHEME_USER_LIST_ERROR,
    GET_LGIM_USER_LIST_REQUEST,
    GET_LGIM_USER_LIST_SUCCESS,
    GET_LGIM_USER_LIST_ERROR,
    SET_TASK_EMAIL_CONFIG_REQUEST,
    SET_TASK_EMAIL_CONFIG_SUCCESS,
    SET_TASK_EMAIL_CONFIG_ERROR,
    GET_TASK_EMAIL_CONFIG_REQUEST,
    GET_TASK_EMAIL_CONFIG_SUCCESS,
    GET_TASK_EMAIL_CONFIG_ERROR,
    RESET_ASSIGNEE_LIST,
    RESET_SCHEME_LIST
} from './constants';

export const getTasks = payload => ({
    type: GET_TASKS_REQUEST,
    payload
});

export const getTasksSuccess = result => ({
    type: GET_TASKS_SUCCESS,
    result
});

export const getTasksError = error => ({
    type: GET_TASKS_ERROR,
    error
});

export const deleteTasks = (payload, cb) => ({
    type: DELETE_TASK_REQUEST,
    payload,
    cb
});

export const deleteTasksSuccess = result => ({
    type: DELETE_TASK_SUCCESS,
    result
});

export const deleteTasksError = error => ({
    type: DELETE_TASK_ERROR,
    error
});

export const createTask = (payload, cb) => ({
    type: CREATE_TASK_REQUEST,
    payload,
    cb
});

export const createTaskSuccess = result => ({
    type: CREATE_TASK_SUCCESS,
    result
});

export const createTaskError = error => ({
    type: CREATE_TASK_ERROR,
    error
});

export const markAsRead = (payload, cb) => ({
    type: MARK_AS_READ_REQUEST,
    payload,
    cb
});

export const markAsReadSuccess = result => ({
    type: MARK_AS_READ_SUCCESS,
    result
});

export const markAsReadError = error => ({
    type: MARK_AS_READ_ERROR,
    error
});

export const getSchemesListByUser = payload => ({
    type: GET_SCHEMES_LIST_BY_USER_REQUEST,
    payload
});

export const getSchemesListByUserSuccess = result => ({
    type: GET_SCHEMES_LIST_BY_USER_SUCCESS,
    result
});

export const getSchemesListByUserError = error => ({
    type: GET_SCHEMES_LIST_BY_USER_ERROR,
    error
});

export const getSchemeUserList = payload => ({
    type: GET_SCHEME_USER_LIST_REQUEST,
    payload
});

export const getSchemeUserListSuccess = result => ({
    type: GET_SCHEME_USER_LIST_SUCCESS,
    result
});

export const getSchemeUserListError = error => ({
    type: GET_SCHEME_USER_LIST_ERROR,
    error
});

export const getLGIMUserList = () => ({
    type: GET_LGIM_USER_LIST_REQUEST
});

export const getLGIMUserListSuccess = result => ({
    type: GET_LGIM_USER_LIST_SUCCESS,
    result
});

export const getLGIMUserListError = error => ({
    type: GET_LGIM_USER_LIST_ERROR,
    error
});

export const restAssigneeList = () => ({
    type: RESET_ASSIGNEE_LIST
});

export const restSchemeList = () => ({
    type: RESET_SCHEME_LIST
});

export const setTaskEmailConfig = payload => ({
    type: SET_TASK_EMAIL_CONFIG_REQUEST,
    payload
});
export const setTaskEmailConfigSuccess = result => ({
    type: SET_TASK_EMAIL_CONFIG_SUCCESS,
    result
});
export const setTaskEmailConfigError = error => ({
    type: SET_TASK_EMAIL_CONFIG_ERROR,
    error
});

export const getTaskEmailConfig = payload => ({
    type: GET_TASK_EMAIL_CONFIG_REQUEST,
    payload
});

export const getTaskEmailConfigSuccess = result => ({
    type: GET_TASK_EMAIL_CONFIG_SUCCESS,
    result
});

export const getTaskEmailConfigError = error => ({
    type: GET_TASK_EMAIL_CONFIG_ERROR,
    error
});
