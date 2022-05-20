import { takeEvery, put, call } from 'redux-saga/effects';
import { SET_NOTIFICATINS_CONFIG_REQUEST } from './constants';
import { getError } from 'helpers/apiHelper';
import NotificationHelper from 'helpers/NotificationHelper';

import { setNotificationConfigSuccess, setNotificationConfigError } from './actions';

import { SET_NOTIFICATION_CONFIG_ERROR } from 'config/constants';

import apiHandler from 'middlewares/connectApi';

export function* setNotificationConfig(action) {
    try {
        const { sendNotifications } = action.payload;

        yield call(apiHandler.sendNotificationConfig, action);
        yield put(setNotificationConfigSuccess({ data: sendNotifications }));
        // NotificationHelper.getInstance().success(SET_NOTIFICATION_CONFIG_SUCCES);
    } catch (error) {
        const errorObj = getError(error, SET_NOTIFICATION_CONFIG_ERROR);
        yield put(setNotificationConfigError(errorObj));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export default function* tasksSagas() {
    yield* [takeEvery(SET_NOTIFICATINS_CONFIG_REQUEST, setNotificationConfig)];
}
