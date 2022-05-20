import { createSelector } from 'reselect';
const workflowsReducer = state => state.workflowsReducer;

const workflows_data = () =>
    createSelector(
        workflowsReducer,
        currentState => currentState.workflows_data
    );
const get_workflows_inprogress = () =>
    createSelector(
        workflowsReducer,
        currentState => currentState.get_workflows_inprogress
    );

export { workflows_data, get_workflows_inprogress };
