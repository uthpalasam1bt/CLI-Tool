import { createSelector } from 'reselect';
const registerReducer = state => state.registerReducer;

const register_inProgress = () =>
    createSelector(
        registerReducer,
        currentState => currentState.inProgress
    );

const register_status = () =>
    createSelector(
        registerReducer,
        currentState => currentState.status
    );

const register_error = () =>
    createSelector(
        registerReducer,
        currentState => currentState.error
    );

export { register_inProgress, register_status, register_error };
