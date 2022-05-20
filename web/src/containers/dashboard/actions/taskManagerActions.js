import {
    GET_TASK_MANAGER_TASKS,
    GET_TASK_MANAGER_TASKS_SUCCESS,
    GET_TASK_MANAGER_TASKS_FAILED,
    GET_TASK_MANAGER_COUNT,
    GET_TASK_MANAGER_COUNT_SUCCESS,
    GET_TASK_MANAGER_COUNT_FAIL
} from '../../scheme/constants';

export const getTasks = filterGroups => ({
    type: GET_TASK_MANAGER_TASKS,
    payload: filterGroups || []
});

export const getTasksSuccess = tasks => ({
    type: GET_TASK_MANAGER_TASKS_SUCCESS,
    payload: tasks
});

export const getTasksFailed = () => ({
    type: GET_TASK_MANAGER_TASKS_FAILED
});

export const getTasksCount = () => ({
    type: GET_TASK_MANAGER_COUNT
});

export const getTasksManagerCountSuccess = data => ({
    type: GET_TASK_MANAGER_COUNT_SUCCESS,
    payload: data
});

export const getTasksManagerCountFail = () => ({
    type: GET_TASK_MANAGER_COUNT_FAIL
});
