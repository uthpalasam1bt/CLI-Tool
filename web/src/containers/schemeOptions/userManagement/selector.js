import { createSelector } from 'reselect';
const schemeReducer = state => state.userManagementReducer;

const getContributors_inProgress = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.getContributors_inProgress
    );
const getContributors_data = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.getContributors_data
    );
const getContributors_error = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.getContributors_error
    );

const addContributors_inProgress = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.addContributors_inProgress
    );
const addContributors_status = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.addContributors_status
    );
const addContributors_error = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.addContributors_error
    );

const getLoggedUserClaims_data = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.getLoggedUserClaims_data
    );
const getLoggedUserClaims_inProgress = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.getLoggedUserClaims_inProgress
    );

export {
    getContributors_inProgress,
    getContributors_data,
    getContributors_error,
    addContributors_inProgress,
    addContributors_status,
    addContributors_error,
    getLoggedUserClaims_data,
    getLoggedUserClaims_inProgress
};
