import {
    GET_KEY_METRICS_CONFIG_REQUEST,
    GET_KEY_METRICS_CONFIG_SUCCESS,
    GET_KEY_METRICS_CONFIG_IN_PROGRESS,
    GET_KEY_METRICS_CONFIG_FAILED,
    FILTER_SCHEMES_REQUEST,
    FILTER_SCHEMES_IN_PROGRESS,
    FILTER_SCHEMES_SUCCESS,
    FILTER_SCHEMES_FAILED,
    GET_MY_VIEWS_REQUEST,
    GET_MY_VIEWS_IN_PROGRESS,
    GET_MY_VIEWS_SUCCESS,
    GET_MY_VIEWS_FAILED,
    DELETE_VIEW_REQUEST,
    DELETE_VIEW_IN_PROGRESS,
    DELETE_VIEW_SUCCESS,
    DELETE_VIEW_FAILED,
    SAVE_VIEW_REQUEST,
    SAVE_VIEW_IN_PROGRESS,
    SAVE_VIEW_SUCCESS,
    SAVE_VIEW_FAILED,
    UPDATE_VIEW_REQUEST,
    UPDATE_VIEW_IN_PROGRESS,
    UPDATE_VIEW_SUCCESS,
    UPDATE_VIEW_FAILED,
    EDIT_VIEW_REQUEST,
    EDIT_VIEW_IN_PROGRESS,
    EDIT_VIEW_SUCCESS,
    EDIT_VIEW_FAILED,
    SCHEME_DATA_CHANGE_REQUEST,
    SCHEME_DATA_CHANGE_IN_PROGRESS,
    SCHEME_DATA_CHANGE_SUCCESS,
    SCHEME_DATA_CHANGE_FAILED,
    SAVE_GLOBAL_VIEW_REQUEST,
    SAVE_GLOBAL_VIEW_IN_PROGRESS,
    SAVE_GLOBAL_VIEW_SUCCESS,
    SAVE_GLOBAL_VIEW_FAILED,
    UPDATE_GLOBAL_VIEW_REQUEST,
    UPDATE_GLOBAL_VIEW_IN_PROGRESS,
    UPDATE_GLOBAL_VIEW_SUCCESS,
    UPDATE_GLOBAL_VIEW_FAILED,
    EDIT_GLOBAL_VIEW_REQUEST,
    EDIT_GLOBAL_VIEW_IN_PROGRESS,
    EDIT_GLOBAL_VIEW_SUCCESS,
    EDIT_GLOBAL_VIEW_FAILED,
    DELETE_GLOBAL_VIEW_REQUEST,
    DELETE_GLOBAL_VIEW_IN_PROGRESS,
    DELETE_GLOBAL_VIEW_SUCCESS,
    DELETE_GLOBAL_VIEW_FAILED,
    GET_MY_DEFAULT_ORG_GROUPS_REQUEST,
    GET_MY_DEFAULT_ORG_GROUPS_IN_PROGRESS,
    GET_MY_DEFAULT_ORG_GROUPS_SUCCESS,
    GET_MY_DEFAULT_ORG_GROUPS_FAILED,
    GET_MY_CURRENT_APPLIED_VIEW_REQUEST,
    GET_MY_CURRENT_APPLIED_VIEW_IN_PROGRESS,
    GET_MY_CURRENT_APPLIED_VIEW_SUCCESS,
    GET_MY_CURRENT_APPLIED_VIEW_FAILED,
    SAVE_MY_CURRENT_APPLIED_VIEW_REQUEST,
    SAVE_MY_CURRENT_APPLIED_VIEW_IN_PROGRESS,
    SAVE_MY_CURRENT_APPLIED_VIEW_SUCCESS,
    SAVE_MY_CURRENT_APPLIED_VIEW_FAILED,
    REMOVE_MY_CURRENT_APPLIED_VIEW_REQUEST,
    REMOVE_MY_CURRENT_APPLIED_VIEW_IN_PROGRESS,
    REMOVE_MY_CURRENT_APPLIED_VIEW_SUCCESS,
    REMOVE_MY_CURRENT_APPLIED_VIEW_FAILED
} from '../constants';

const getKeyMetricsConfig = payload => ({
    type: GET_KEY_METRICS_CONFIG_REQUEST,
    payload
});

const getKeyMetricsConfigSuccess = result => ({
    type: GET_KEY_METRICS_CONFIG_SUCCESS,
    result
});

const getKeyMetricsConfigInProgress = () => ({
    type: GET_KEY_METRICS_CONFIG_IN_PROGRESS
});

const getKeyMetricsConfigFailed = error => ({
    type: GET_KEY_METRICS_CONFIG_FAILED,
    error
});

const filterSchemes = payload => ({
    type: FILTER_SCHEMES_REQUEST,
    payload
});

const filterSchemesInProgress = () => ({
    type: FILTER_SCHEMES_IN_PROGRESS
});

const filterSchemesSuccess = result => ({
    type: FILTER_SCHEMES_SUCCESS,
    result
});

const filterSchemesFailed = error => ({
    type: FILTER_SCHEMES_FAILED,
    error
});

const getMyViews = payload => ({
    type: GET_MY_VIEWS_REQUEST,
    payload
});

const getMyViewsInProgress = () => ({
    type: GET_MY_VIEWS_IN_PROGRESS
});

const getMyViewsSuccess = result => ({
    type: GET_MY_VIEWS_SUCCESS,
    result
});

const getMyViewsFailed = error => ({
    type: GET_MY_VIEWS_FAILED,
    error
});

const deleteView = payload => ({
    type: DELETE_VIEW_REQUEST,
    payload
});

const deleteViewInProgress = () => ({
    type: DELETE_VIEW_IN_PROGRESS
});

const deleteViewSuccess = () => ({
    type: DELETE_VIEW_SUCCESS
});

const deleteViewFailed = error => ({
    type: DELETE_VIEW_FAILED,
    error
});

const saveView = payload => ({
    type: SAVE_VIEW_REQUEST,
    payload
});

const saveViewInProgress = () => ({
    type: SAVE_VIEW_IN_PROGRESS
});

const saveViewSuccess = result => ({
    type: SAVE_VIEW_SUCCESS,
    result
});

const saveViewFailed = error => ({
    type: SAVE_VIEW_FAILED,
    error
});

const updateView = payload => ({
    type: UPDATE_VIEW_REQUEST,
    payload
});

const updateViewInProgress = () => ({
    type: UPDATE_VIEW_IN_PROGRESS
});

const updateViewSuccess = result => ({
    type: UPDATE_VIEW_SUCCESS,
    result
});

const updateViewFailed = error => ({
    type: UPDATE_VIEW_FAILED,
    error
});

const editView = payload => ({
    type: EDIT_VIEW_REQUEST,
    payload
});

const editViewInProgress = () => ({
    type: EDIT_VIEW_IN_PROGRESS
});

const editViewSuccess = result => ({
    type: EDIT_VIEW_SUCCESS,
    result
});

const editViewFailed = error => ({
    type: EDIT_VIEW_FAILED,
    error
});

const schemeDataChange = payload => ({
    type: SCHEME_DATA_CHANGE_REQUEST,
    payload
});

const schemeDataChangeInProgress = () => ({
    type: SCHEME_DATA_CHANGE_IN_PROGRESS
});

const schemeDataChangeSuccess = result => ({
    type: SCHEME_DATA_CHANGE_SUCCESS,
    result
});

const schemeDataChangeFailed = error => ({
    type: SCHEME_DATA_CHANGE_FAILED,
    error
});

const saveGlobalView = payload => ({
    type: SAVE_GLOBAL_VIEW_REQUEST,
    payload
});

const saveGlobalViewInProgress = () => ({
    type: SAVE_GLOBAL_VIEW_IN_PROGRESS
});

const saveGlobalViewSuccess = result => ({
    type: SAVE_GLOBAL_VIEW_SUCCESS,
    result
});

const saveGlobalViewFailed = error => ({
    type: SAVE_GLOBAL_VIEW_FAILED,
    error
});

const updateGlobalView = payload => ({
    type: UPDATE_GLOBAL_VIEW_REQUEST,
    payload
});

const updateGlobalViewInProgress = () => ({
    type: UPDATE_GLOBAL_VIEW_IN_PROGRESS
});

const updateGlobalViewSuccess = result => ({
    type: UPDATE_GLOBAL_VIEW_SUCCESS,
    result
});

const updateGlobalViewFailed = error => ({
    type: UPDATE_GLOBAL_VIEW_FAILED,
    error
});

const editGlobalView = payload => ({
    type: EDIT_GLOBAL_VIEW_REQUEST,
    payload
});

const editGlobalViewInProgress = () => ({
    type: EDIT_GLOBAL_VIEW_IN_PROGRESS
});

const editGlobalViewSuccess = result => ({
    type: EDIT_GLOBAL_VIEW_SUCCESS,
    result
});

const editGlobalViewFailed = error => ({
    type: EDIT_GLOBAL_VIEW_FAILED,
    error
});

const deleteGlobalView = payload => ({
    type: DELETE_GLOBAL_VIEW_REQUEST,
    payload
});

const deleteGlobalViewInProgress = () => ({
    type: DELETE_GLOBAL_VIEW_IN_PROGRESS
});

const deleteGlobalViewSuccess = () => ({
    type: DELETE_GLOBAL_VIEW_SUCCESS
});

const deleteGlobalViewFailed = error => ({
    type: DELETE_GLOBAL_VIEW_FAILED,
    error
});

const getMyDefaultOrgGroups = payload => ({
    type: GET_MY_DEFAULT_ORG_GROUPS_REQUEST,
    payload
});

const getMyDefaultOrgGroupsInProgress = () => ({
    type: GET_MY_DEFAULT_ORG_GROUPS_IN_PROGRESS
});

const getMyDefaultOrgGroupsSuccess = result => ({
    type: GET_MY_DEFAULT_ORG_GROUPS_SUCCESS,
    result
});

const getMyDefaultOrgGroupsFailed = error => ({
    type: GET_MY_DEFAULT_ORG_GROUPS_FAILED,
    error
});

const getMyCurrentAppliedView = payload => ({
    type: GET_MY_CURRENT_APPLIED_VIEW_REQUEST,
    payload
});

const getMyCurrentAppliedViewInProgress = () => ({
    type: GET_MY_CURRENT_APPLIED_VIEW_IN_PROGRESS
});

const getMyCurrentAppliedViewSuccess = result => ({
    type: GET_MY_CURRENT_APPLIED_VIEW_SUCCESS,
    result
});

const getMyCurrentAppliedViewFailed = error => ({
    type: GET_MY_CURRENT_APPLIED_VIEW_FAILED,
    error
});

const saveMyCurrentAppliedView = payload => ({
    type: SAVE_MY_CURRENT_APPLIED_VIEW_REQUEST,
    payload
});

const saveMyCurrentAppliedViewInProgress = () => ({
    type: SAVE_MY_CURRENT_APPLIED_VIEW_IN_PROGRESS
});

const saveMyCurrentAppliedViewSuccess = result => ({
    type: SAVE_MY_CURRENT_APPLIED_VIEW_SUCCESS,
    result
});

const saveMyCurrentAppliedViewFailed = error => ({
    type: SAVE_MY_CURRENT_APPLIED_VIEW_FAILED,
    error
});

const removeMyCurrentAppliedView = () => ({
    type: REMOVE_MY_CURRENT_APPLIED_VIEW_REQUEST
});

const removeMyCurrentAppliedViewInProgress = () => ({
    type: REMOVE_MY_CURRENT_APPLIED_VIEW_IN_PROGRESS
});

const removeMyCurrentAppliedViewSuccess = result => ({
    type: REMOVE_MY_CURRENT_APPLIED_VIEW_SUCCESS,
    result
});

const removeMyCurrentAppliedViewFailed = error => ({
    type: REMOVE_MY_CURRENT_APPLIED_VIEW_FAILED,
    error
});

export {
    getKeyMetricsConfig,
    getKeyMetricsConfigSuccess,
    getKeyMetricsConfigInProgress,
    getKeyMetricsConfigFailed,
    filterSchemes,
    filterSchemesInProgress,
    filterSchemesSuccess,
    filterSchemesFailed,
    getMyViews,
    getMyViewsInProgress,
    getMyViewsSuccess,
    getMyViewsFailed,
    deleteView,
    deleteViewInProgress,
    deleteViewSuccess,
    deleteViewFailed,
    saveView,
    saveViewInProgress,
    saveViewSuccess,
    saveViewFailed,
    updateView,
    updateViewInProgress,
    updateViewSuccess,
    updateViewFailed,
    editView,
    editViewInProgress,
    editViewSuccess,
    editViewFailed,
    schemeDataChange,
    schemeDataChangeInProgress,
    schemeDataChangeSuccess,
    schemeDataChangeFailed,
    saveGlobalView,
    saveGlobalViewInProgress,
    saveGlobalViewSuccess,
    saveGlobalViewFailed,
    updateGlobalView,
    updateGlobalViewInProgress,
    updateGlobalViewSuccess,
    updateGlobalViewFailed,
    editGlobalView,
    editGlobalViewInProgress,
    editGlobalViewSuccess,
    editGlobalViewFailed,
    deleteGlobalView,
    deleteGlobalViewInProgress,
    deleteGlobalViewSuccess,
    deleteGlobalViewFailed,
    getMyDefaultOrgGroups,
    getMyDefaultOrgGroupsInProgress,
    getMyDefaultOrgGroupsSuccess,
    getMyDefaultOrgGroupsFailed,
    getMyCurrentAppliedView,
    getMyCurrentAppliedViewInProgress,
    getMyCurrentAppliedViewSuccess,
    getMyCurrentAppliedViewFailed,
    saveMyCurrentAppliedView,
    saveMyCurrentAppliedViewInProgress,
    saveMyCurrentAppliedViewSuccess,
    saveMyCurrentAppliedViewFailed,
    removeMyCurrentAppliedView,
    removeMyCurrentAppliedViewInProgress,
    removeMyCurrentAppliedViewSuccess,
    removeMyCurrentAppliedViewFailed
};
