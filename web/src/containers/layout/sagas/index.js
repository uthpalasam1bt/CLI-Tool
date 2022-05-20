import { takeEvery, put, call } from 'redux-saga/effects';

import {
    GET_USER_NOTIFICATIONS_REQUEST,
    SET_EMAIL_NOTIFICATIONS_FLAG,
    SET_MARKAS_READ_REQUEST,
    SET_DELETE_NOTIFICATIONS_REQUEST,
    GET_SEARCH_RESULT_NOTIFICATIONS,
    ERROR_OCCURED,
    RESET_NOTIFICATION_BELL_RED_DOT,
    REQUEST_ARTIFACTS
} from '../constants';
import {
    ERROR_WHILE_GETTING_USER_NOTIFICATION,
    ERROR_WHILE_GETTING_USER_NOTIFICATION_FLAG,
    ERROR_WHILE_GETTING_ARTIFACTS
} from '../../../config/constants';
import NotificationHelper from '../../../helpers/NotificationHelper';

import {
    getUserNotificationsInProgress,
    getUserNotificationsSuccess,
    getUserNotificationsFailed,
    setUserNotificationStatusSuccess,
    setNotificationsMarkAsReadSuccess,
    deleteNotificationsSuccess,
    getSearchResultInProgress,
    getNotificationsSearchSuccess,
    getUserNotifications,
    resetNotificationBellRedDotInProgress,
    resetNotificationBellRedDotSuccess,
    getArtifactsSuccess,
    getArtifactsFailed
} from '../actions';

import apiHandler from '../../../middlewares/connectApi';
import { getError } from '../../../helpers/apiHelper';
import BrowserStorage from '../../../middlewares/storage';

export function* getNotificationForUser(action) {
    try {
        yield put(getUserNotificationsInProgress());
        const { data } = yield call(apiHandler.getUserNotifications, action);
        yield put(getUserNotificationsSuccess({ data, isAll: action.payload.isAll }));
    } catch (error) {
        const errorObj = getError(error, ERROR_WHILE_GETTING_USER_NOTIFICATION);
        yield put(getUserNotificationsFailed(errorObj));
    }
}
export function* getSearchResult(action) {
    try {
        yield put(getSearchResultInProgress());
        const { data } = yield call(apiHandler.getNotificationsSearchResult, action);
        yield put(getNotificationsSearchSuccess({ data, action }));
    } catch (error) {
        const errorObj = getError(error, ERROR_WHILE_GETTING_USER_NOTIFICATION);
        yield put(getUserNotificationsFailed(errorObj));
    }
}

export function* setEmailNotificationFlag(data) {
    try {
        const result = yield call(apiHandler.updateEmailNotificationFlag, data);
        yield put(setUserNotificationStatusSuccess(result));
    } catch (error) {
        const errorObj = getError(error, ERROR_WHILE_GETTING_USER_NOTIFICATION_FLAG);
        yield put(getUserNotificationsFailed(errorObj));
    }
}

// set notifications mark as read request
export function* setNotificationsMarkAsRead(data) {
    try {
        const result = yield call(apiHandler.setNotificationsMarkAsRead, data);
        NotificationHelper.getInstance().success(result.data.message);
        yield put(setNotificationsMarkAsReadSuccess(data));
    } catch (error) {
        // const errorObj = getError(error, ERROR_WHILE_GETTING_USER_NOTIFICATION_FLAG);
        // yield put(getUserNotificationsFailed(errorObj));
    }
}
export function* deleteNotifications(data) {
    try {
        const result = yield call(apiHandler.deleteNotifications, data);
        NotificationHelper.getInstance().success(result.data.message);
        yield put(deleteNotificationsSuccess(data));
    } catch (error) {
        // const errorObj = getError(error, ERROR_WHILE_GETTING_USER_NOTIFICATION_FLAG);
        // yield put(getUserNotificationsFailed(errorObj));
    }
}

export function* resetNotificationBellRedDot(action) {
    try {
        const { email } = action.payload;
        yield put(resetNotificationBellRedDotInProgress());
        yield call(apiHandler.resetRedDotNotification, action);
        yield put(getUserNotifications({ userEmail: email, isAll: false }));
        yield put(resetNotificationBellRedDotSuccess());
    } catch (error) {
        NotificationHelper.getInstance().error(ERROR_OCCURED);
    }
}

export function* requestArtifacts() {
    try {
        const systemArtifacts = BrowserStorage.getInstance().getArtifacts();
        const artifactVersion = (systemArtifacts && systemArtifacts.version) || 1;
        const { data } = yield call(apiHandler.getArtifacts, artifactVersion);
        if (data && (!systemArtifacts || !systemArtifacts.artifacts || data.content.version != artifactVersion)) {
            BrowserStorage.getInstance().setArtifactSession({
                version: data.content.version,
                artifacts: data.content.artifacts
            });
            yield put(getArtifactsSuccess());
        }
    } catch (error) {
        const errorObj = getError(error, ERROR_WHILE_GETTING_ARTIFACTS);
        yield put(getArtifactsFailed(errorObj));
    }
}

export default function* layoutSagas() {
    yield* [
        takeEvery(GET_USER_NOTIFICATIONS_REQUEST, getNotificationForUser),
        takeEvery(SET_EMAIL_NOTIFICATIONS_FLAG, setEmailNotificationFlag),
        takeEvery(SET_MARKAS_READ_REQUEST, setNotificationsMarkAsRead),
        takeEvery(SET_DELETE_NOTIFICATIONS_REQUEST, deleteNotifications),
        takeEvery(GET_SEARCH_RESULT_NOTIFICATIONS, getSearchResult),
        takeEvery(RESET_NOTIFICATION_BELL_RED_DOT, resetNotificationBellRedDot),
        takeEvery(REQUEST_ARTIFACTS, requestArtifacts)
    ];
}
