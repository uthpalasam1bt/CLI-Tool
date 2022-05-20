import { GET_TASK_MANAGER_TASKS, GET_TASK_MANAGER_COUNT } from '../../scheme/constants';
import {
    getTasksSuccess,
    getTasksFailed,
    getTasksManagerCountSuccess,
    getTasksManagerCountFail
} from '../actions/taskManagerActions';
import connectApi from '../../../middlewares/connectApi';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getError } from '../../../helpers/apiHelper';
import { LOAD_TASKS_ERROR, LOAD_TASKS_COUNT_ERROR } from '../../../config/constants';
import NotificationHelper from '../../../helpers/NotificationHelper';

export function* fetchTasks(data) {
    try {
        const result = yield call(connectApi.fetchTasks, data);
        yield put(getTasksSuccess(result.data.content));
    } catch (error) {
        const errorObj = getError(error, LOAD_TASKS_ERROR);
        NotificationHelper.getInstance().error(errorObj.message);
        yield put(getTasksFailed());
    }
}

export function* fetchTaskMgrCount(data) {
    try {
        const result = yield call(connectApi.fetchTaskMgrCount, data);
        const count = result && result.data.content.tasks.length ? result.data.content.tasks.length : 0;
        yield put(getTasksManagerCountSuccess(count));
    } catch (error) {
        const errorObj = getError(error, LOAD_TASKS_COUNT_ERROR);
        NotificationHelper.getInstance().error(errorObj.message);
        yield put(getTasksManagerCountFail());
    }
}

export default function* tasksManagerSagas() {
    yield* [takeEvery(GET_TASK_MANAGER_TASKS, fetchTasks)];
    yield* [takeEvery(GET_TASK_MANAGER_COUNT, fetchTaskMgrCount)];
}
