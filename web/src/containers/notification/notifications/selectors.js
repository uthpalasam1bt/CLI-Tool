import { createSelector } from 'reselect';
const notificationReducer = state => state.notificationReducer;

export const getTurnOnNotificationStatus = () =>
    createSelector(
        notificationReducer,
        currentState => currentState.notificationConfig
    );
export const getTurnOnNotificationIsloading = () =>
    createSelector(
        notificationReducer,
        currentState => currentState.notificationConfigLoading
    );
