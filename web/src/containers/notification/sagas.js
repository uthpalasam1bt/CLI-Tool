import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_USER_GROUPS_NOTIFICATIONS } from './constants';
import { getUserGroupsNotificationsSuccess } from './actions';
import apiHandler from 'middlewares/connectApi';
import NotificationHelper from '../../helpers/NotificationHelper';
import { GET_USER_GROUPS_NOTIFICATION_ERROR } from 'config/constants';

export function* getUserGroupNotifications(action) {
    try {
        let result = yield call(apiHandler.getUserGroupsNotifications, action);
        let { content } = result.data;
        yield put(getUserGroupsNotificationsSuccess(content));
    } catch (error) {
        NotificationHelper.getInstance().error(GET_USER_GROUPS_NOTIFICATION_ERROR);
    }
}

export default function* tasksSagas() {
    yield* [takeEvery(GET_USER_GROUPS_NOTIFICATIONS, getUserGroupNotifications)];
}
