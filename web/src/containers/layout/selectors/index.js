import { createSelector } from 'reselect';
const layoutReducer = state => state.layoutReducer;

export const getNotificationsList = () =>
    createSelector(
        layoutReducer,
        currentState => currentState.userNotificationsData
    );
export const getNotificationTotalCount = () =>
    createSelector(
        layoutReducer,
        currentState => currentState.totalNotificationCount
    );

//for bell icon
export const getNotificationRedDotVisibility = () =>
    createSelector(
        layoutReducer,
        currentState => currentState.newNotification
    );

export const isGetNotificationInProgress = () =>
    createSelector(
        layoutReducer,
        currentState => currentState.getUserNotificationInProgress
    );

export const isNotificationDeleted = () =>
    createSelector(
        layoutReducer,
        currentState => currentState.isDeleted
    );

export const getNotificationsInProgress = () =>
    createSelector(
        layoutReducer,
        currentState => currentState.getUserNotificationInProgress
    );

export const getEmailNotificationFlagStatus = () =>
    createSelector(
        layoutReducer,
        currentState => currentState.emailNotificationFlag
    );

export const getLatestNotificationsCount = () =>
    createSelector(
        layoutReducer,
        currentState => currentState.newNotificationCount
    );

export const session = () =>
    createSelector(
        layoutReducer,
        currentState => currentState.session
    );
