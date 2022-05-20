import {
    SET_NOTIFICATINS_CONFIG_REQUEST,
    SET_NOTIFICATINS_CONFIG_SUCCESS,
    SET_NOTIFICATINS_CONFIG_ERROR
} from './constants';

export const setNotificationConfig = payload => ({
    type: SET_NOTIFICATINS_CONFIG_REQUEST,
    payload
});
export const setNotificationConfigSuccess = result => ({
    type: SET_NOTIFICATINS_CONFIG_SUCCESS,
    result
});
export const setNotificationConfigError = error => ({
    type: SET_NOTIFICATINS_CONFIG_ERROR,
    error
});
