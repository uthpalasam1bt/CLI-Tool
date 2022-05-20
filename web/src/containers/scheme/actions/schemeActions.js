import {
    DO_CREATE_SCHEME_REQUEST,
    DO_CREATE_SCHEME_IN_PROGRESS,
    DO_CREATE_SCHEME_SUCCESS,
    DO_CREATE_SCHEME_FAILED,
    GET_SCHEMES_REQUEST,
    GET_SCHEMES_IN_PROGRESS,
    GET_SCHEMES_SUCCESS,
    GET_SCHEMES_FAILED,
    GET_SCHEME_REQUEST,
    GET_SCHEME_IN_PROGRESS,
    GET_SCHEME_SUCCESS,
    GET_SCHEME_FAILED,
    DO_UPDATE_IS_FAVOURITE_REQUEST,
    DO_UPDATE_IS_FAVOURITE_IN_PROGRESS,
    DO_UPDATE_IS_FAVOURITE_SUCCESS,
    DO_UPDATE_IS_FAVOURITE_FAILED,
    DO_UPDATE_SCHEME_FLAG_SUCCESS,
    DO_UPDATE_SCHEME_FLAG_IN_PROGRESS,
    DO_UPDATE_SCHEME_FLAG_REQUEST,
    DO_UPDATE_SCHEME_FLAG_FAILED
} from '../constants';

const doCreateScheme = (payload, callback) => ({
    type: DO_CREATE_SCHEME_REQUEST,
    payload,
    callback
});
const doCreateSchemeInProgress = () => ({
    type: DO_CREATE_SCHEME_IN_PROGRESS
});
const doCreateSchemeSuccess = result => ({
    type: DO_CREATE_SCHEME_SUCCESS,
    result
});
const doCreateSchemeFailed = error => ({
    type: DO_CREATE_SCHEME_FAILED,
    error
});

const getSchemes = payload => ({
    type: GET_SCHEMES_REQUEST,
    payload
});
const getSchemesInProgress = () => ({
    type: GET_SCHEMES_IN_PROGRESS
});
const getSchemesSuccess = result => ({
    type: GET_SCHEMES_SUCCESS,
    result
});
const getSchemesFailed = error => ({
    type: GET_SCHEMES_FAILED,
    error
});

const getScheme = payload => ({
    type: GET_SCHEME_REQUEST,
    payload
});
const getSchemeInProgress = () => ({
    type: GET_SCHEME_IN_PROGRESS
});
const getSchemeSuccess = result => ({
    type: GET_SCHEME_SUCCESS,
    result
});
const getSchemeFailed = error => ({
    type: GET_SCHEME_FAILED,
    error
});

const doUpdateIsFavourite = (payload, callback) => ({
    type: DO_UPDATE_IS_FAVOURITE_REQUEST,
    payload,
    callback
});
const doUpdateIsFavouriteInProgress = () => ({
    type: DO_UPDATE_IS_FAVOURITE_IN_PROGRESS
});
const doUpdateIsFavouriteSuccess = result => ({
    type: DO_UPDATE_IS_FAVOURITE_SUCCESS,
    result
});
const doUpdateIsFavouriteFailed = error => ({
    type: DO_UPDATE_IS_FAVOURITE_FAILED,
    error
});

const doUpdateSchemeFlag = (schemeId, flagName, flagValue, callback) => ({
    type: DO_UPDATE_SCHEME_FLAG_REQUEST,
    payload: { flagName, flagValue, schemeId },
    callback
});
const doUpdateSchemeFlagInProgress = () => ({
    type: DO_UPDATE_SCHEME_FLAG_IN_PROGRESS
});
const doUpdateSchemeFlagSuccess = result => ({
    type: DO_UPDATE_SCHEME_FLAG_SUCCESS,
    result
});
const doUpdateSchemeFlagFailed = error => ({
    type: DO_UPDATE_SCHEME_FLAG_FAILED,
    error
});

export {
    doCreateScheme,
    doCreateSchemeInProgress,
    doCreateSchemeSuccess,
    doCreateSchemeFailed,
    getSchemes,
    getSchemesInProgress,
    getSchemesSuccess,
    getSchemesFailed,
    getScheme,
    getSchemeInProgress,
    getSchemeSuccess,
    getSchemeFailed,
    doUpdateIsFavourite,
    doUpdateIsFavouriteInProgress,
    doUpdateIsFavouriteSuccess,
    doUpdateIsFavouriteFailed,
    doUpdateSchemeFlag,
    doUpdateSchemeFlagInProgress,
    doUpdateSchemeFlagSuccess,
    doUpdateSchemeFlagFailed
};
