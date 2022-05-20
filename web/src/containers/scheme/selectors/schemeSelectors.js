import { createSelector } from 'reselect';
const schemeReducer = state => state.schemeReducer;

const createScheme_inProgress = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.createScheme_inProgress
    );
const createScheme_data = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.createScheme_data
    );
const createScheme_error = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.createScheme_error
    );

const getSchemes_inProgress = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.getSchemes_inProgress
    );
const getUpdateSchemeFlag_inProgress = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.updateSchemeFlag_inProgress
    );
const getSchemes_data = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.getSchemes_data
    );
const getSchemes_error = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.getSchemes_error
    );

const getScheme_inProgress = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.getScheme_inProgress
    );
const getScheme_data = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.getScheme_data
    );
const getScheme_error = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.getScheme_error
    );

const updateSchemeIsFavourite_inProgress = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.updateSchemeIsFavourite_inProgress
    );
const updateSchemeIsFavourite_data = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.updateSchemeIsFavourite_data
    );
const updateSchemeIsFavourite_error = () =>
    createSelector(
        schemeReducer,
        currentState => currentState.updateSchemeIsFavourite_error
    );

export {
    createScheme_inProgress,
    createScheme_data,
    createScheme_error,
    getSchemes_inProgress,
    getSchemes_data,
    getSchemes_error,
    getScheme_inProgress,
    getScheme_data,
    getScheme_error,
    updateSchemeIsFavourite_inProgress,
    updateSchemeIsFavourite_data,
    updateSchemeIsFavourite_error,
    getUpdateSchemeFlag_inProgress
};
