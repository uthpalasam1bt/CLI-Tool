import { combineReducers } from 'redux';

import {
    GET_TASKS_REQUEST,
    GET_TASKS_SUCCESS,
    GET_TASKS_ERROR,
    GET_SCHEMES_LIST_BY_USER_SUCCESS,
    GET_SCHEME_USER_LIST_SUCCESS,
    GET_LGIM_USER_LIST_SUCCESS,
    RESET_ASSIGNEE_LIST,
    RESET_SCHEME_LIST,
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_ERROR,
    DELETE_TASK_SUCCESS,
    MARK_AS_READ_SUCCESS,
    SET_TASK_EMAIL_CONFIG_REQUEST,
    SET_TASK_EMAIL_CONFIG_SUCCESS,
    SET_TASK_EMAIL_CONFIG_ERROR,
    GET_TASK_EMAIL_CONFIG_REQUEST,
    GET_TASK_EMAIL_CONFIG_SUCCESS,
    GET_TASK_EMAIL_CONFIG_ERROR
} from './constants';

const taskListLoading = (state = false, action) => {
    switch (action.type) {
        case GET_TASKS_REQUEST:
            return true;
        case GET_TASKS_SUCCESS:
        case GET_TASKS_ERROR:
            return false;
        default:
            return state;
    }
};

const taskCreateLoading = (state = false, action) => {
    switch (action.type) {
        case CREATE_TASK_REQUEST:
            return true;
        case CREATE_TASK_SUCCESS:
        case CREATE_TASK_ERROR:
            return false;
        default:
            return state;
    }
};

const taskEmailConfigLoading = (state = false, action) => {
    switch (action.type) {
        case SET_TASK_EMAIL_CONFIG_REQUEST:
        case GET_TASK_EMAIL_CONFIG_REQUEST:
            return true;
        case SET_TASK_EMAIL_CONFIG_SUCCESS:
        case GET_TASK_EMAIL_CONFIG_SUCCESS:
        case SET_TASK_EMAIL_CONFIG_ERROR:
        case GET_TASK_EMAIL_CONFIG_ERROR:
            return false;
        default:
            return state;
    }
};

const updateMarkAsRead = (state, action) => {
    return {
        ...state,
        ...action.result.content.reduce((obj, item) => {
            obj[item] = { ...state[item], markAsRead: true };
            return obj;
        }, {})
    };
};

const taskById = (state = {}, action) => {
    switch (action.type) {
        case GET_TASKS_SUCCESS:
            return {
                ...action.result.content.reduce((obj, item) => {
                    obj[item.taskId] = item;
                    return obj;
                }, {})
            };
        //    case CREATE_TASK_SUCCESS:
        //const { isSelfTask, ...restData } = action.result;
        // if (isSelfTask) {
        //   return {
        //     ...state,
        //     [restData.taskId]: restData
        //   };
        // }
        //   return state;
        case MARK_AS_READ_SUCCESS:
            return updateMarkAsRead(state, action);
        default:
            return state;
    }
};

const visibleTaskIds = (state = [], action) => {
    switch (action.type) {
        case GET_TASKS_SUCCESS:
            return action.result.content.map(item => item.taskId);
        //   case CREATE_TASK_SUCCESS:
        // const { isSelfTask, ...restData } = action.result;
        // if (isSelfTask) {
        //   return [restData.taskId, ...state];
        // }
        //    return state;
        case DELETE_TASK_SUCCESS:
            return state.filter(item => action.result.indexOf(item) < 0);
        default:
            return state;
    }
};

const schemeOptionList = (state = [], action) => {
    switch (action.type) {
        case GET_SCHEMES_LIST_BY_USER_SUCCESS:
            return action.result.content.map(item => {
                return { key: item.schemeId, value: item.schemeName };
            });
        case RESET_SCHEME_LIST:
            return [];
        default:
            return state;
    }
};
const assigneeList = (state = [], action) => {
    switch (action.type) {
        case GET_SCHEME_USER_LIST_SUCCESS:
        case GET_LGIM_USER_LIST_SUCCESS:
            return action.result.content.map(item => {
                return { key: item.userEmail, value: item.userName };
            });
        case RESET_ASSIGNEE_LIST:
            return [];
        default:
            return state;
    }
};

const sendEmailConfig = (state = false, action) => {
    switch (action.type) {
        case SET_TASK_EMAIL_CONFIG_SUCCESS:
        case GET_TASK_EMAIL_CONFIG_SUCCESS:
            return action.result.content || false;
        case SET_TASK_EMAIL_CONFIG_ERROR:
            return !state;
        default:
            return state;
    }
};

const reducer = combineReducers({
    taskById,
    visibleTaskIds,
    schemeOptionList,
    assigneeList,
    taskListLoading,
    taskCreateLoading,
    sendEmailConfig,
    taskEmailConfigLoading
});

export default reducer;

export const getTasksById = (state, id) => state.taskById[id];
export const getVisibleTaskList = state => {
    let unsortedTasks = state.visibleTaskIds.map(id => getTasksById(state, id));
    let unreadSorted = unsortedTasks
        .filter(task => !task.markAsRead)
        .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    let readSorted = unsortedTasks
        .filter(task => task.markAsRead)
        .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    return unreadSorted.concat(readSorted);
};
