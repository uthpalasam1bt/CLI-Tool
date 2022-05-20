import { createSelector } from 'reselect';
const forgotPasswordReducer = state => state.forgotPasswordReducer;

const forgotPassword_inProgress = () =>
    createSelector(
        forgotPasswordReducer,
        currentState => currentState.forgotPassword_inProgress
    );
const forgotPassword_status = () =>
    createSelector(
        forgotPasswordReducer,
        currentState => currentState.forgotPassword_status
    );
const forgotPassword_error = () =>
    createSelector(
        forgotPasswordReducer,
        currentState => currentState.forgotPassword_error
    );

const resetPassword_inProgress = () =>
    createSelector(
        forgotPasswordReducer,
        currentState => currentState.resetPassword_inProgress
    );
const resetPassword_status = () =>
    createSelector(
        forgotPasswordReducer,
        currentState => currentState.resetPassword_status
    );
const resetPassword_error = () =>
    createSelector(
        forgotPasswordReducer,
        currentState => currentState.resetPassword_error
    );

export {
    forgotPassword_inProgress,
    forgotPassword_status,
    forgotPassword_error,
    resetPassword_inProgress,
    resetPassword_status,
    resetPassword_error
};
