import {
    GET_USER_NOTIFICATIONS_REQUEST,
    GET_USER_NOTIFICATIONS_IN_PROGRESS,
    GET_USER_NOTIFICATIONS_SUCCESS,
    GET_USER_NOTIFICATIONS_FAILED,
    SET_EMAIL_NOTIFICATIONS_FLAG,
    SET_EMAIL_NOTIFICATIONS_FLAG_SUCCESS,
    UPDATE_LOGGED_USER,
    SET_MARKAS_READ_REQUEST,
    SET_NOTIFICATIONS_MARK_AS_READ_SUCCESS,
    SET_DELETE_NOTIFICATIONS_REQUEST,
    DELETE_NOTIFICATIONS_SUCCESS,
    GET_SEARCH_RESULT_NOTIFICATIONS,
    GET_NOTIFICATIONS_SEARCH_RESULT_INPROGRESS,
    GET_NOTIFICATIONS_SEARCH_SUCCESS,
    RESET_NOTIFICATION_BELL_RED_DOT,
    RESET_NOTIFICATION_BELL_RED_DOT_IN_PROGRESS,
    RESET_NOTIFICATION_BELL_RED_DOT_SUCCEESS,
    REQUEST_ARTIFACTS,
    GET_ARTIFACTS_SUCCESS,
    GET_ARTIFACTS_FAILED
} from '../constants';

export const setMarkAssReadNotifications = payload => ({
    type: SET_MARKAS_READ_REQUEST,
    payload
});

export const deleteNotifications = payload => ({
    type: SET_DELETE_NOTIFICATIONS_REQUEST,
    payload
});
export const deleteNotificationsSuccess = result => ({
    type: DELETE_NOTIFICATIONS_SUCCESS,
    result
});

export const getUserNotifications = payload => ({
    type: GET_USER_NOTIFICATIONS_REQUEST,
    payload
});

export const getUserNotificationsInProgress = () => ({
    type: GET_USER_NOTIFICATIONS_IN_PROGRESS
});

export const getUserNotificationsSuccess = result => ({
    type: GET_USER_NOTIFICATIONS_SUCCESS,
    result
});
export const getSearchResult = key => ({
    type: GET_SEARCH_RESULT_NOTIFICATIONS,
    key
});
export const getSearchResultInProgress = result => ({
    type: GET_NOTIFICATIONS_SEARCH_RESULT_INPROGRESS,
    result
});
export const getNotificationsSearchSuccess = result => ({
    type: GET_NOTIFICATIONS_SEARCH_SUCCESS,
    result
});

export const getUserNotificationsFailed = error => ({
    type: GET_USER_NOTIFICATIONS_FAILED,
    error
});

export const setUserNotificationStatus = payload => ({
    type: SET_EMAIL_NOTIFICATIONS_FLAG,
    payload
});
export const setUserNotificationStatusSuccess = result => ({
    type: SET_EMAIL_NOTIFICATIONS_FLAG_SUCCESS,
    result
});

export const setNotificationsMarkAsReadSuccess = result => ({
    type: SET_NOTIFICATIONS_MARK_AS_READ_SUCCESS,
    result
});
export const updateLoggedUser = result => ({
    type: UPDATE_LOGGED_USER,
    result
});
export const resetNotificationBellRedDot = email => ({
    type: RESET_NOTIFICATION_BELL_RED_DOT,
    payload: { email, hasNotification: false }
});

export const resetNotificationBellRedDotInProgress = () => ({
    type: RESET_NOTIFICATION_BELL_RED_DOT_IN_PROGRESS
});

export const resetNotificationBellRedDotSuccess = () => ({
    type: RESET_NOTIFICATION_BELL_RED_DOT_SUCCEESS
});

export const requestArtifacts = payload => ({
    type: REQUEST_ARTIFACTS,
    payload
});

export const getArtifactsSuccess = () => ({
    type: GET_ARTIFACTS_SUCCESS
});

export const getArtifactsFailed = error => ({
    type: GET_ARTIFACTS_FAILED,
    error
});
