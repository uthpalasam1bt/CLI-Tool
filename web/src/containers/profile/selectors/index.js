import { createSelector } from 'reselect';
const profileDetailsReducer = state => state.profileDetailsReducer;

const doSavePersonalDetails_inProgress = () =>
    createSelector(
        profileDetailsReducer,
        currentState => currentState.doSavePersonalDetails_inProgress
    );
const doSavePersonalDetails_status = () =>
    createSelector(
        profileDetailsReducer,
        currentState => currentState.doSavePersonalDetails_status
    );
const doSavePersonalDetails_error = () =>
    createSelector(
        profileDetailsReducer,
        currentState => currentState.doSavePersonalDetails_error
    );
const getPersonalDetails_inProgress = () =>
    createSelector(
        profileDetailsReducer,
        currentState => currentState.getPersonalDetails_inProgress
    );
const getPersonalDetails_data = () =>
    createSelector(
        profileDetailsReducer,
        currentState => currentState.getPersonalDetails_data
    );
const getPersonalDetails_error = () =>
    createSelector(
        profileDetailsReducer,
        currentState => currentState.getPersonalDetails_error
    );

const getSchemeUserAccountDeleteData_inProgress = createSelector(
    profileDetailsReducer,
    currentState => currentState.getSchemeUserAccountDeleteData_inProgress
);

const getSchemeUserAccountDeleteDataResult = createSelector(
    profileDetailsReducer,
    currentState => currentState.getSchemeUserAccountDeleteData_result
);

const sendSchemeUserAccountDeleteRequest_inProgress = createSelector(
    profileDetailsReducer,
    currentState => currentState.sendSchemeUserAccountDeleteRequest_inProgress
);

const sendSchemeUserAccountDeleteRequestResult = createSelector(
    profileDetailsReducer,
    currentState => currentState.sendSchemeUserAccountDeleteRequest_result
);

const getValidatingUserPassword_inProgress = createSelector(
    profileDetailsReducer,
    currentState => currentState.validatingUserPassword
);

export {
    doSavePersonalDetails_inProgress,
    doSavePersonalDetails_status,
    doSavePersonalDetails_error,
    getPersonalDetails_inProgress,
    getPersonalDetails_data,
    getPersonalDetails_error,
    getSchemeUserAccountDeleteData_inProgress,
    getSchemeUserAccountDeleteDataResult,
    sendSchemeUserAccountDeleteRequest_inProgress,
    sendSchemeUserAccountDeleteRequestResult,
    getValidatingUserPassword_inProgress
};
