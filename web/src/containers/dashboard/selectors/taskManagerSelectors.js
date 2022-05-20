import { createSelector } from 'reselect';
const tasksManagerReducer = state => state.tasksManagerReducer;

export const getTaskManagerTasks = () =>
    createSelector(
        tasksManagerReducer,
        currentState => currentState.tasks
    );

export const getTaskManagerTasks_InProgress = () =>
    createSelector(
        tasksManagerReducer,
        currentState => currentState.fetchingTasksInProgress
    );

export const getTaskManagerCount = () =>
    createSelector(
        tasksManagerReducer,
        currentState => currentState.tasksCount
    );

export const getTaskManagerTasksCount_InProgress = () =>
    createSelector(
        tasksManagerReducer,
        currentState => currentState.fetchingTasksCount
    );
