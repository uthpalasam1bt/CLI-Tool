import { SUCCESS_GET_USER_GROUPS_NOTIFICATIONS, GET_USER_GROUPS_NOTIFICATIONS } from './constants';

const intialState = {
    userGroupsNotifications: []
};

export const userGroupsNotificationsReducer = (state = intialState, action) => {
    switch (action.type) {
        case GET_USER_GROUPS_NOTIFICATIONS:
            return {
                ...state,
                userGroupsNotifications: []
            };
        case SUCCESS_GET_USER_GROUPS_NOTIFICATIONS:
            return {
                ...state,
                userGroupsNotifications: action.payload
            };
        default:
            return {
                ...state
            };
    }
};
