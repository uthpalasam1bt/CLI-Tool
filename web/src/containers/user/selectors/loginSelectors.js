import { createSelector } from 'reselect';
const loginReducer = state => state.loginReducer;

const login_inProgress = () =>
    createSelector(
        loginReducer,
        currentState => currentState.inProgress
    );

const login_loggedUser = () =>
    createSelector(
        loginReducer,
        currentState => currentState.loggedUser
    );

const login_error = () =>
    createSelector(
        loginReducer,
        currentState => currentState.error
    );
const getFLName_data = () =>
    createSelector(
        loginReducer,
        currentState => currentState.getFLName_data
    );

export { login_inProgress, login_loggedUser, login_error, getFLName_data };
