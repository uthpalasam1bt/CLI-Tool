import {
    GET_USER_NOTIFICATIONS_IN_PROGRESS,
    GET_USER_NOTIFICATIONS_SUCCESS,
    GET_USER_NOTIFICATIONS_FAILED,
    SET_EMAIL_NOTIFICATIONS_FLAG_SUCCESS,
    UPDATE_LOGGED_USER,
    DELETE_NOTIFICATIONS_SUCCESS,
    SET_NOTIFICATIONS_MARK_AS_READ_SUCCESS,
    GET_NOTIFICATIONS_SEARCH_SUCCESS,
    GET_NOTIFICATIONS_SEARCH_RESULT_INPROGRESS,
    GET_USER_NOTIFICATIONS_REQUEST,
    RESET_NOTIFICATION_BELL_RED_DOT_SUCCEESS,
    RESET_NOTIFICATION_BELL_RED_DOT_IN_PROGRESS
} from '../constants';

const initialState = {
    getUserNotificationInProgress: false,
    getUserNotificationError: null,
    userNotificationsData: [],
    isDeleted: false
};

const handleNotificationUpdate = (state, { data, isAll }) => {
    return {
        ...state,
        ...(isAll && {
            userNotificationsData: data.content.notifications,
            totalNotificationCount: data.content.count
        }),
        newNotificationCount: isAll ? 0 : data.content.notifications.length,
        getUserNotificationInProgress: false,
        getUserNotificationError: null,
        newNotification: data.content.newNotification
    };
};

export default function layoutReducer(state = initialState, action) {
    switch (action.type) {
        case RESET_NOTIFICATION_BELL_RED_DOT_IN_PROGRESS:
            return { ...state, getUserNotificationInProgress: true };
        case RESET_NOTIFICATION_BELL_RED_DOT_SUCCEESS:
            return { ...state, getUserNotificationInProgress: false };
        case GET_USER_NOTIFICATIONS_IN_PROGRESS:
            return { ...state, getUserNotificationInProgress: true };
        case GET_USER_NOTIFICATIONS_REQUEST:
            return { ...state, getUserNotificationInProgress: true };

        case GET_NOTIFICATIONS_SEARCH_RESULT_INPROGRESS:
            return { ...state, getUserNotificationInProgress: true };

        case GET_USER_NOTIFICATIONS_SUCCESS:
            return handleNotificationUpdate(state, action.result);
        case GET_USER_NOTIFICATIONS_FAILED:
            return {
                ...state,
                getUserNotificationError: action.error,
                getUserNotificationInProgress: false
            };
        case SET_EMAIL_NOTIFICATIONS_FLAG_SUCCESS:
            return { ...state, emailNotificationFlag: action.result };

        case DELETE_NOTIFICATIONS_SUCCESS:
            return {
                ...state,

                userNotificationsData: state.userNotificationsData.filter(function(el) {
                    return !action.result.payload.includes(el.notificationId);
                })
            };
        case GET_NOTIFICATIONS_SEARCH_SUCCESS: {
            const newData = { data: action.result.data.content.notifications };
            return {
                ...state,
                userNotificationsData: newData.data,
                getUserNotificationInProgress: false
            };
        }
        case SET_NOTIFICATIONS_MARK_AS_READ_SUCCESS:
            let newList = state.userNotificationsData.map(item => {
                if (action.result.payload.includes(item.notificationId)) {
                    item.status = 'R';
                }
                return item;
            });

            return {
                ...state,

                userNotificationsData: newList
            };

        case UPDATE_LOGGED_USER:
            return { ...state, session: action.result };

        default:
            return state;
    }
}
