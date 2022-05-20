import { createSelector } from 'reselect';
const logoutReducer = state => state.logoutReducer;

const logout_inProgress = () =>
    createSelector(
        logoutReducer,
        currentState => currentState.inProgress
    );

const logout_status = () =>
    createSelector(
        logoutReducer,
        currentState => currentState.logoutStatus
    );

const logout_error = () =>
    createSelector(
        logoutReducer,
        currentState => currentState.error
    );

export { logout_inProgress, logout_status, logout_error };
