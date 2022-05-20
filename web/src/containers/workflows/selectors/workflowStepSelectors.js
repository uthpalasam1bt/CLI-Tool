import { createSelector } from 'reselect';
const workflowStepDataReducer = state => state.workflowStepDataReducer;

export const getWorkflowStep_inProgress = () =>
    createSelector(
        workflowStepDataReducer,
        currentState => currentState.getWorkflowStep_inProgress
    );

export const getWorkflowStep_data = () =>
    createSelector(
        workflowStepDataReducer,
        currentState => currentState.getWorkflowStep_data
    );

export const getWorkflowStep_error = () =>
    createSelector(
        workflowStepDataReducer,
        currentState => currentState.getWorkflowStep_error
    );

export const updateWorkflowStep_inProgress = () =>
    createSelector(
        workflowStepDataReducer,
        currentState => currentState.updateWorkflowStep_inProgress
    );

export const updateWorkflowStep_data = () =>
    createSelector(
        workflowStepDataReducer,
        currentState => currentState.updateWorkflowStep_data
    );

export const updateWorkflowStep_error = () =>
    createSelector(
        workflowStepDataReducer,
        currentState => currentState.updateWorkflowStep_error
    );
export const getAssignUser_data = () =>
    createSelector(
        workflowStepDataReducer,
        currentState => currentState.getAssignUser_data
    );

export const getAssignUser_inProgress = () =>
    createSelector(
        workflowStepDataReducer,
        currentState => currentState.getAssignUser_inProgress
    );

export const assignedUser_data = () =>
    createSelector(
        workflowStepDataReducer,
        currentState => currentState.assignedUser_data
    );

export const abort_status_inProgress = () =>
    createSelector(
        workflowStepDataReducer,
        currentState => currentState.abort_status_inProgress
    );

export const internal_stepAction_inProgress = () =>
    createSelector(
        workflowStepDataReducer,
        currentState => currentState.internal_stepAction_inProgress
    );
