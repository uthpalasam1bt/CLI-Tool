import constants from '../constants';
const {
    GET_WORKFLOW_STEP_REQUEST,
    GET_WORKFLOW_STEP_IN_PROGRESS,
    GET_WORKFLOW_STEP_SUCCESS,
    GET_WORKFLOW_STEP_ERROR,
    UPDATE_WORKFLOW_STEP_REQUEST,
    UPDATE_WORKFLOW_STEP_IN_PROGRESS,
    UPDATE_WORKFLOW_STEP_SUCCESS,
    UPDATE_WORKFLOW_STEP_ERROR,
    GET_ASSIGN_USER_LIST,
    GET_ASSIGN_USER_LIST_IN_PROGRESS,
    GET_ASSIGN_USER_LIST_SUCCESS,
    GET_ASSIGN_USER_LIST_FAILED,
    UPDATE_ASSIGN_USER_REQUEST,
    UPDATE_ASSIGN_USER_IN_PROGRESS,
    UPDATE_ASSIGN_USER_SUCCESS,
    UPDATE_ASSIGN_USER_ERROR,
    GET_ASSIGNED_USER_REQUEST,
    GET_ASSIGNED_USER_IN_PROGRESS,
    GET_ASSIGNED_USER_SUCCESS,
    GET_ASSIGNED_USER_ERROR,
    REQUEST_ABORT,
    REQUEST_ABORT_IN_PROGRESS,
    REQUEST_ABORT_SUCCESS,
    REQUEST_ABORT_ERROR,
    INTERNAL_STEP_ACTION_IN_PROGRESS
} = constants;
export const getWorkflowStep_request = payload => ({
    type: GET_WORKFLOW_STEP_REQUEST,
    payload
});

export const getWorkflowStep_inProgress = () => ({
    type: GET_WORKFLOW_STEP_IN_PROGRESS
});

export const getWorkflowStep_success = result => ({
    type: GET_WORKFLOW_STEP_SUCCESS,
    result
});

export const getWorkflowStep_error = error => ({
    type: GET_WORKFLOW_STEP_ERROR,
    error
});

export const updateWorkflowStep_request = (payload, callback) => ({
    type: UPDATE_WORKFLOW_STEP_REQUEST,
    payload,
    callback
});

export const updateWorkflowStep_inProgress = () => ({
    type: UPDATE_WORKFLOW_STEP_IN_PROGRESS
});

export const updateWorkflowStep_success = result => ({
    type: UPDATE_WORKFLOW_STEP_SUCCESS,
    result
});

export const updateWorkflowStep_error = error => ({
    type: UPDATE_WORKFLOW_STEP_ERROR,
    error
});

export const AssignUserList_request = payload => ({
    type: GET_ASSIGN_USER_LIST,
    payload
});

export const getAssignUserList_inProgress = payload => ({
    type: GET_ASSIGN_USER_LIST_IN_PROGRESS,
    payload
});

export const getAssignUserList_success = payload => ({
    type: GET_ASSIGN_USER_LIST_SUCCESS,
    payload
});

export const getAssignUserList_error = payload => ({
    type: GET_ASSIGN_USER_LIST_FAILED,
    payload
});

export const updateAssignUser_request = payload => ({
    type: UPDATE_ASSIGN_USER_REQUEST,
    payload
});

export const updateAssignUser_inProgress = payload => ({
    type: UPDATE_ASSIGN_USER_IN_PROGRESS,
    payload
});

export const updateAssignUser_success = payload => ({
    type: UPDATE_ASSIGN_USER_SUCCESS,
    payload
});

export const updateAssignUser_error = payload => ({
    type: UPDATE_ASSIGN_USER_ERROR,
    payload
});

export const getAssignedUser_request = payload => ({
    type: GET_ASSIGNED_USER_REQUEST,
    payload
});

export const getAssignedUser_inProgress = payload => ({
    type: GET_ASSIGNED_USER_IN_PROGRESS,
    payload
});

export const getAssignedUser_success = payload => ({
    type: GET_ASSIGNED_USER_SUCCESS,
    payload
});

export const getAssignedUser_error = payload => ({
    type: GET_ASSIGNED_USER_ERROR,
    payload
});

export const abort_request = payload => ({
    type: REQUEST_ABORT,
    payload
});

export const abort_inProgress = () => ({
    type: REQUEST_ABORT_IN_PROGRESS
});

export const abort_success = result => ({
    type: REQUEST_ABORT_SUCCESS,
    result
});

export const abort_error = error => ({
    type: REQUEST_ABORT_ERROR,
    error
});

export const internal_stepAction_inProgress = state => ({
    type: INTERNAL_STEP_ACTION_IN_PROGRESS,
    state
});
