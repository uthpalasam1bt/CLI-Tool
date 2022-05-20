import {
    SET_NOTIFICATINS_CONFIG_REQUEST,
    SET_NOTIFICATINS_CONFIG_SUCCESS,
    SET_NOTIFICATINS_CONFIG_ERROR
} from './constants';

const initialState = {
    notificationConfigLoading: false,
    notificationConfig: null,
    error: null
};

export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_NOTIFICATINS_CONFIG_REQUEST:
            return { ...initialState, notificationConfigLoading: true };
        case SET_NOTIFICATINS_CONFIG_SUCCESS:
            return {
                ...state,
                notificationConfigLoading: false,
                notificationConfig: action.result.data
            };

        case SET_NOTIFICATINS_CONFIG_ERROR:
            return { ...initialState, notificationConfigLoading: false };

        default:
            return initialState;
    }
}
