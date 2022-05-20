import {
    GET_TASK_MANAGER_TASKS_FAILED,
    GET_TASK_MANAGER_TASKS_SUCCESS,
    GET_TASK_MANAGER_TASKS,
    GET_TASK_MANAGER_COUNT_SUCCESS,
    GET_TASK_MANAGER_COUNT,
    GET_TASK_MANAGER_COUNT_FAIL
} from '../../scheme/constants';

const initialState = {
    tasks: [],
    fetchingTasksInProgress: false,
    tasksCount: 0,
    fetchingTasksCount: false
};

export default function taskManagerReducer(state = initialState, action) {
    const { payload } = action;
    switch (action.type) {
        case GET_TASK_MANAGER_TASKS:
            return { ...state, fetchingTasksInProgress: true };
        case GET_TASK_MANAGER_TASKS_SUCCESS:
            return { ...state, fetchingTasksInProgress: false, tasks: payload };
        case GET_TASK_MANAGER_TASKS_FAILED:
            return { ...state, fetchingTasksInProgress: false };
        case GET_TASK_MANAGER_COUNT:
            return { ...state, fetchingTasksCount: true };
        case GET_TASK_MANAGER_COUNT_SUCCESS:
            return { ...state, tasksCount: payload, fetchingTasksCount: false };
        case GET_TASK_MANAGER_COUNT_FAIL:
            return { ...state, fetchingTasksCount: false };
        default:
            return state;
    }
}
