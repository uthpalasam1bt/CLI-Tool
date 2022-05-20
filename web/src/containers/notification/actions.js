import { GET_USER_GROUPS_NOTIFICATIONS, SUCCESS_GET_USER_GROUPS_NOTIFICATIONS } from './constants';

export const getUserGroupsNotifications = payload => ({
    type: GET_USER_GROUPS_NOTIFICATIONS,
    payload
});

export const getUserGroupsNotificationsSuccess = payload => ({
    type: SUCCESS_GET_USER_GROUPS_NOTIFICATIONS,
    payload
});
