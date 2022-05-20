import constants from '../constants';
const {
    GET_WORKFLOW_STEP_IN_PROGRESS,
    GET_WORKFLOW_STEP_SUCCESS,
    GET_WORKFLOW_STEP_ERROR,
    UPDATE_WORKFLOW_STEP_IN_PROGRESS,
    UPDATE_WORKFLOW_STEP_SUCCESS,
    UPDATE_WORKFLOW_STEP_ERROR,
    GET_ASSIGN_USER_LIST_IN_PROGRESS,
    GET_ASSIGN_USER_LIST_SUCCESS,
    GET_ASSIGN_USER_LIST_FAILED,
    UPDATE_ASSIGN_USER_IN_PROGRESS,
    UPDATE_ASSIGN_USER_SUCCESS,
    UPDATE_ASSIGN_USER_ERROR,
    GET_ASSIGNED_USER_IN_PROGRESS,
    GET_ASSIGNED_USER_SUCCESS,
    GET_ASSIGNED_USER_ERROR,
    REQUEST_ABORT_IN_PROGRESS,
    REQUEST_ABORT_SUCCESS,
    REQUEST_ABORT_ERROR,
    INTERNAL_STEP_ACTION_IN_PROGRESS
} = constants;
const getWorkflowStepInitialState = {
    getWorkflowStep_inProgress: false,
    getWorkflowStep_data: {},
    getWorkflowStep_error: null
};

let updateWorkflowStepVersion = 0;
const updateWorkflowStepInitialState = {
    updateWorkflowStep_inProgress: false,
    updateWorkflowStep_data: {},
    updateWorkflowStep_error: null
};

const assignUserListInitialState = {
    getAssignUser_list_inProgress: false,
    getAssignUser_list_error: null,
    getAssignUser_list_data: null
};
const getAssignedUserState = {
    assignedUser_data: null,
    getAssignedUser_inProgress: false,
    getAssignedUser_error: null
};

const initialState = {
    ...getAssignedUserState,
    ...getWorkflowStepInitialState,
    ...updateWorkflowStepInitialState,
    ...assignUserListInitialState,
    abort_status_inProgress: false,
    internal_stepAction_inProgress: false
};

export default function workflowStepDataReducer(state = initialState, action) {
    switch (action.type) {
        case GET_WORKFLOW_STEP_IN_PROGRESS:
            return { ...state, ...getWorkflowStepInitialState, getWorkflowStep_inProgress: true };
        case GET_WORKFLOW_STEP_SUCCESS:
            return { ...state, ...getWorkflowStepInitialState, getWorkflowStep_data: action.result };
        case GET_WORKFLOW_STEP_ERROR:
            return { ...state, ...getWorkflowStepInitialState, getWorkflowStep_error: action.error };

        case UPDATE_WORKFLOW_STEP_IN_PROGRESS:
            return { ...state, ...updateWorkflowStepInitialState, updateWorkflowStep_inProgress: true };
        case UPDATE_WORKFLOW_STEP_SUCCESS:
            return {
                ...state,
                ...updateWorkflowStepInitialState,
                updateWorkflowStep_data: { ...action.result, version: ++updateWorkflowStepVersion }
            };
        case UPDATE_WORKFLOW_STEP_ERROR:
            return {
                ...state,
                ...updateWorkflowStepInitialState,
                updateWorkflowStep_error: action.error
            };

        case GET_ASSIGN_USER_LIST_IN_PROGRESS:
            return { ...state, ...assignUserListInitialState, getAssignUser_list_inProgress: true };
        case GET_ASSIGN_USER_LIST_SUCCESS:
            return {
                ...state,
                ...assignUserListInitialState,
                getAssignUser_list_data: action.payload.data.content
            };
        case GET_ASSIGN_USER_LIST_FAILED:
            return { ...state, ...assignUserListInitialState, getAssignUser_list_error: action.error };

        case UPDATE_ASSIGN_USER_IN_PROGRESS:
            return { ...state, ...getAssignedUserState, getAssignedUser_inProgress: true };
        case UPDATE_ASSIGN_USER_SUCCESS:
            return { ...state, ...getAssignedUserState, assignedUser_data: action.payload.data.content };
        case UPDATE_ASSIGN_USER_ERROR:
            return { ...state, ...getAssignedUserState, getAssignedUser_error: action.error };

        case GET_ASSIGNED_USER_IN_PROGRESS:
            return { ...state, ...getAssignedUserState, getAssignedUser_inProgress: true };
        case GET_ASSIGNED_USER_SUCCESS:
            return { ...state, ...getAssignedUserState, assignedUser_data: action.payload.data.content };
        case GET_ASSIGNED_USER_ERROR:
            return { ...state, ...getAssignedUserState, getAssignedUser_error: action.error };

        case REQUEST_ABORT_IN_PROGRESS:
            return { ...state, abort_status_inProgress: true };
        case REQUEST_ABORT_SUCCESS:
            return { ...state, abort_status_inProgress: false };
        case REQUEST_ABORT_ERROR:
            return { ...state, abort_status_inProgress: false };

        case INTERNAL_STEP_ACTION_IN_PROGRESS:
            return { ...state, internal_stepAction_inProgress: action.state };

        default:
            return state;
    }
}
