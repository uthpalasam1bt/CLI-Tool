import { createSelector } from 'reselect';
const userAssignReducer = state => state.userAssignReducer;

export const getAssignUser_data = () =>
    createSelector(
        userAssignReducer,
        currentState => currentState.getAssignUser_data
    );
export const getAssignUser_inProgress = () =>
    createSelector(
        userAssignReducer,
        currentState => currentState.getAssignUser_inProgress
    );
