import { takeEvery, takeLatest, put, call, select } from 'redux-saga/effects';
import { initialize } from 'redux-form';
import {
    GET_TASKS_REQUEST,
    GET_SCHEMES_LIST_BY_USER_REQUEST,
    GET_SCHEME_USER_LIST_REQUEST,
    GET_LGIM_USER_LIST_REQUEST,
    CREATE_TASK_REQUEST,
    DELETE_TASK_REQUEST,
    MARK_AS_READ_REQUEST,
    SET_TASK_EMAIL_CONFIG_REQUEST,
    GET_TASK_EMAIL_CONFIG_REQUEST
} from './constants';
import { getError } from 'helpers/apiHelper';
import NotificationHelper from 'helpers/NotificationHelper';

import {
    getTasks as fetchTasks,
    getTasksSuccess,
    getSchemesListByUserSuccess,
    getSchemesListByUserError,
    getSchemeUserListSuccess,
    getSchemeUserListError,
    getLGIMUserListSuccess,
    getLGIMUserListError,
    createTaskSuccess,
    createTaskError,
    deleteTasksSuccess,
    deleteTasksError,
    getTasksError,
    markAsReadError,
    setTaskEmailConfigSuccess,
    setTaskEmailConfigError,
    getTaskEmailConfigSuccess,
    getTaskEmailConfigError
} from './actions';

import {
    LOAD_TASKS_ERROR,
    GET_SCHEMES_LIST_ERROR,
    GET_SCHEME_USER_LIST_ERROR,
    GET_LGIM_USER_LIST_ERROR,
    CREATE_TASK_ERROR,
    CREATE_TASK_SUCCESS,
    DELETE_TASK_ERROR,
    TASK_MARK_AS_ERROR,
    DELETE_TASK,
    SET_TASK_CONFIG_ERROR,
    GET_TASK_CONFIG_ERROR
} from 'config/constants';

import apiHandler from 'middlewares/connectApi';

export function* getTasks(action) {
    try {
        const result = yield call(apiHandler.getTasks, action);
        yield put(getTasksSuccess(result.data));
    } catch (error) {
        const errorObj = getError(error, LOAD_TASKS_ERROR);
        yield put(getTasksError(errorObj));
        // NotificationHelper.getInstance().error(errorObj.message);
    }
}
export function* getSchemesListByUser(action) {
    try {
        const result = yield call(apiHandler.getSchemesListByUser, action);
        yield put(getSchemesListByUserSuccess(result.data));
    } catch (error) {
        const errorObj = getError(error, GET_SCHEMES_LIST_ERROR);
        yield put(getSchemesListByUserError(errorObj));
        // NotificationHelper.getInstance().error(errorObj.message);
    }
}
export function* getSchemeUserList(action) {
    try {
        const result = yield call(apiHandler.getSchemeUsersList, action);
        yield put(getSchemeUserListSuccess(result.data));
    } catch (error) {
        const errorObj = getError(error, GET_SCHEME_USER_LIST_ERROR);
        yield put(getSchemeUserListError(errorObj));
        // NotificationHelper.getInstance().error(errorObj.message);
    }
}
export function* getLGIMUserList() {
    try {
        const result = yield call(apiHandler.getLgimUsersList);
        yield put(getLGIMUserListSuccess(result.data));
    } catch (error) {
        const errorObj = getError(error, GET_LGIM_USER_LIST_ERROR);
        yield put(getLGIMUserListError(errorObj));
        // NotificationHelper.getInstance().error(errorObj.message);
    }
}
export function* createTask(action) {
    try {
        const { payload } = action;
        const result = yield call(apiHandler.saveTask, action);
        const isSelfTask = payload.userEmail === payload.assignee;
        yield put(createTaskSuccess({ ...payload, isSelfTask, taskId: result.data }));
        if (isSelfTask) yield put(fetchTasks({ userEmail: payload.userEmail }));
        NotificationHelper.getInstance().success(CREATE_TASK_SUCCESS);
        yield call(action.cb, {});
        yield put(initialize('createTaskForm'));
    } catch (error) {
        const errorObj = getError(error, CREATE_TASK_ERROR);
        yield put(createTaskError(errorObj));
        // NotificationHelper.getInstance().error(errorObj.message);
    }
}

const getTasksList = state => state.tasksReducer.taskById;

export function* deleteTask(action) {
    try {
        const tasksList = yield select(getTasksList);
        const deleteItemList = action.payload.map(id => {
            return {
                taskId: id,
                userEmail: tasksList[id].userEmail
            };
        });
        // Delete Items from state before send to server and need to implement undo if failed api.
        yield put(deleteTasksSuccess(action.payload));
        yield call(action.cb, {});
        yield call(apiHandler.deleteTask, { ids: deleteItemList });
        NotificationHelper.getInstance().success(DELETE_TASK);
    } catch (error) {
        const errorObj = getError(error, DELETE_TASK_ERROR);
        yield put(deleteTasksError(errorObj));
        // NotificationHelper.getInstance().error(errorObj.message);
    }
}
export function* markAsRead(action) {
    try {
        const tasksList = yield select(getTasksList);
        const updateItemList = action.payload.map(id => {
            return {
                taskId: id,
                userEmail: tasksList[id].userEmail
            };
        });
        //  yield call(action.cb, {});
        yield call(apiHandler.updateMarkAsRead, { ids: updateItemList });
        const result = yield call(apiHandler.getTasks, action);
        yield put(getTasksSuccess(result.data));
        //  yield put(markAsReadSuccess(action.payload));
        // NotificationHelper.getInstance().success(TASK_MARK_AS_READ);
    } catch (error) {
        const errorObj = getError(error, TASK_MARK_AS_ERROR);
        yield put(markAsReadError(errorObj));
        // NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* setTaskEmailConfig(action) {
    try {
        console.log('action', action);
        const { sendEmail } = action.payload;
        yield call(apiHandler.sendEmailNotificationConfig, action);
        yield put(setTaskEmailConfigSuccess({ data: sendEmail }));
    } catch (error) {
        const errorObj = getError(error, SET_TASK_CONFIG_ERROR);
        yield put(setTaskEmailConfigError(errorObj));
        // NotificationHelper.getInstance().error(errorObj.message);
    }
}
export function* getTaskEmailConfig(action) {
    try {
        const result = yield call(apiHandler.getEmailNotificationConfig, action);
        yield put(getTaskEmailConfigSuccess(result));
    } catch (error) {
        const errorObj = getError(error, GET_TASK_CONFIG_ERROR);
        yield put(getTaskEmailConfigError(errorObj));
        // NotificationHelper.getInstance().error(errorObj.message);
    }
}

export default function* tasksSagas() {
    yield* [
        takeEvery(GET_TASKS_REQUEST, getTasks),
        takeEvery(GET_SCHEMES_LIST_BY_USER_REQUEST, getSchemesListByUser),
        takeEvery(GET_SCHEME_USER_LIST_REQUEST, getSchemeUserList),
        takeEvery(GET_LGIM_USER_LIST_REQUEST, getLGIMUserList),
        takeLatest(CREATE_TASK_REQUEST, createTask),
        takeEvery(DELETE_TASK_REQUEST, deleteTask),
        takeEvery(MARK_AS_READ_REQUEST, markAsRead),
        takeEvery(SET_TASK_EMAIL_CONFIG_REQUEST, setTaskEmailConfig),
        takeEvery(GET_TASK_EMAIL_CONFIG_REQUEST, getTaskEmailConfig)
    ];
}
