import { createSelector } from 'reselect';
const contactUsReducer = state => state.contactUsReducer;

const contactUs_inProgress = () =>
    createSelector(
        contactUsReducer,
        currentState => currentState.inProgress
    );

const contactUs_status = () =>
    createSelector(
        contactUsReducer,
        currentState => currentState.status
    );

const contactUs_error = () =>
    createSelector(
        contactUsReducer,
        currentState => currentState.error
    );

export { contactUs_inProgress, contactUs_status, contactUs_error };
