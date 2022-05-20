import { createSelector } from 'reselect';
const userConfirmationReducer = state => state.userConfirmationReducer;

const confirmUser_inProgress = () =>
    createSelector(
        userConfirmationReducer,
        currentState => currentState.confirmUser_inProgress
    );
const confirmUser_status = () =>
    createSelector(
        userConfirmationReducer,
        currentState => currentState.confirmUser_status
    );
const confirmUser_error = () =>
    createSelector(
        userConfirmationReducer,
        currentState => currentState.confirmUser_error
    );

const resendUserConfirmationCode_inProgress = () =>
    createSelector(
        userConfirmationReducer,
        currentState => currentState.resendUserConfirmationCode_inProgress
    );
const resendUserConfirmationCode_status = () =>
    createSelector(
        userConfirmationReducer,
        currentState => currentState.resendUserConfirmationCode_status
    );
const resendUserConfirmationCode_error = () =>
    createSelector(
        userConfirmationReducer,
        currentState => currentState.resendUserConfirmationCode_error
    );

export {
    confirmUser_inProgress,
    confirmUser_status,
    confirmUser_error,
    resendUserConfirmationCode_inProgress,
    resendUserConfirmationCode_status,
    resendUserConfirmationCode_error
};
