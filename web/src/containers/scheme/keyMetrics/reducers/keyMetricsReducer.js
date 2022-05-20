import {
    GET_KEY_METRICS_CONFIG_REQUEST,
    GET_KEY_METRICS_CONFIG_IN_PROGRESS,
    GET_KEY_METRICS_CONFIG_SUCCESS,
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

const initialState = {
    getKeyMetricsConfig_inProgress: false,
    getKeyMetricsConfig_data: null,
    getKeyMetricsConfig_error: null,

    filterSchemes_inProgress: false,
    filterSchemes_data: null,
    filterSchemes_error: null,

    getMyViews_inProgress: false,
    getMyViews_data: null,
    getMyViews_error: null,

    deleteView_inProgress: false,
    deleteView_data: null,
    deleteView_error: null,

    saveView_inProgress: false,
    saveView_data: null,
    saveView_error: null,

    updateView_inProgress: false,
    updateView_data: null,
    updateView_error: null,

    editView_inProgress: false,
    editView_data: null,
    editView_error: null,

    schemeDataChange_inProgress: false,
    schemeDataChange_data: null,
    schemeDataChange_error: null,

    saveGlobalView_inProgress: false,
    saveGlobalView_data: null,
    saveGlobalView_error: null,

    updateGlobalView_inProgress: false,
    updateGlobalView_data: null,
    updateGlobalView_error: null,

    editGlobalView_inProgress: false,
    editGlobalView_data: null,
    editGlobalView_error: null,

    deleteGlobalView_inProgress: false,
    deleteGlobalView_data: null,
    deleteGlobalView_error: null,

    getMyDefaultOrgGroups_inProgress: false,
    getMyDefaultOrgGroups_data: null,
    getMyDefaultOrgGroups_error: null,

    getMyCurrentAppliedView_inProgress: false,
    getMyCurrentAppliedView_data: null,
    getMyCurrentAppliedView_error: null,

    saveMyCurrentAppliedView_inProgress: false,
    saveMyCurrentAppliedView_data: null,
    saveMyCurrentAppliedView_error: null,

    removeMyCurrentAppliedView_inProgress: false,
    removeMyCurrentAppliedView_data: null,
    removeMyCurrentAppliedView_error: null
};

const keyMetricsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_KEY_METRICS_CONFIG_REQUEST:
            return { ...state, getKeyMetricsConfig_data: null };
        case GET_KEY_METRICS_CONFIG_IN_PROGRESS:
            return { ...state, getKeyMetricsConfig_inProgress: true };
        case GET_KEY_METRICS_CONFIG_SUCCESS:
            return { ...state, getKeyMetricsConfig_data: action.result, getKeyMetricsConfig_inProgress: false };
        case GET_KEY_METRICS_CONFIG_FAILED:
            return { ...state, getKeyMetricsConfig_error: action.error, getKeyMetricsConfig_inProgress: false };
        case FILTER_SCHEMES_REQUEST:
            return { ...state, filterSchemes_data: null };
        case FILTER_SCHEMES_IN_PROGRESS:
            return { ...state, filterSchemes_inProgress: true };
        case FILTER_SCHEMES_SUCCESS:
            return { ...state, filterSchemes_data: action.result, filterSchemes_inProgress: false };
        case FILTER_SCHEMES_FAILED:
            return { ...state, filterSchemes_error: null };
        case GET_MY_VIEWS_REQUEST:
            return { ...state, getMyViews_data: null };
        case GET_MY_VIEWS_IN_PROGRESS:
            return { ...state, getMyViews_inProgress: true };
        case GET_MY_VIEWS_SUCCESS:
            return { ...state, getMyViews_data: action.result, getMyViews_inProgress: false };
        case GET_MY_VIEWS_FAILED:
            return { ...state, getMyViews_error: null };
        case DELETE_VIEW_REQUEST:
            return { ...state, deleteView_data: null };
        case DELETE_VIEW_IN_PROGRESS:
            return { ...state, deleteView_inProgress: true };
        case DELETE_VIEW_SUCCESS:
            return { ...state, deleteView_data: action.result, deleteView_inProgress: false };
        case DELETE_VIEW_FAILED:
            return { ...state, deleteView_error: null };
        case SAVE_VIEW_REQUEST:
            return { ...state, saveView_data: null };
        case SAVE_VIEW_IN_PROGRESS:
            return { ...state, saveView_inProgress: true };
        case SAVE_VIEW_SUCCESS:
            return { ...state, saveView_data: action.result, saveView_inProgress: false };
        case SAVE_VIEW_FAILED:
            return { ...state, saveView_error: null };
        case UPDATE_VIEW_REQUEST:
            return { ...state, updateView_data: null };
        case UPDATE_VIEW_IN_PROGRESS:
            return { ...state, updateView_inProgress: true };
        case UPDATE_VIEW_SUCCESS:
            return { ...state, updateView_data: action.result, updateView_inProgress: false };
        case UPDATE_VIEW_FAILED:
            return { ...state, updateView_error: null };
        case EDIT_VIEW_REQUEST:
            return { ...state, editView_data: null };
        case EDIT_VIEW_IN_PROGRESS:
            return { ...state, editView_inProgress: true };
        case EDIT_VIEW_SUCCESS:
            return { ...state, editView_data: action.result, editView_inProgress: false };
        case EDIT_VIEW_FAILED:
            return { ...state, editView_error: null };
        case SCHEME_DATA_CHANGE_REQUEST:
            return { ...state, schemeDataChange_data: null };
        case SCHEME_DATA_CHANGE_IN_PROGRESS:
            return { ...state, schemeDataChange_inProgress: true };
        case SCHEME_DATA_CHANGE_SUCCESS:
            return { ...state, schemeDataChange_data: action.result, schemeDataChange_inProgress: false };
        case SCHEME_DATA_CHANGE_FAILED:
            return { ...state, schemeDataChange_error: null };
        case SAVE_GLOBAL_VIEW_REQUEST:
            return { ...state, saveGlobalView_data: null };
        case SAVE_GLOBAL_VIEW_IN_PROGRESS:
            return { ...state, saveGlobalView_inProgress: true };
        case SAVE_GLOBAL_VIEW_SUCCESS:
            return { ...state, saveGlobalView_data: action.result, saveGlobalView_inProgress: false };
        case SAVE_GLOBAL_VIEW_FAILED:
            return { ...state, saveGlobalView_error: null };
        case UPDATE_GLOBAL_VIEW_REQUEST:
            return { ...state, updateGlobalView_data: null };
        case UPDATE_GLOBAL_VIEW_IN_PROGRESS:
            return { ...state, updateGlobalView_inProgress: true };
        case UPDATE_GLOBAL_VIEW_SUCCESS:
            return { ...state, updateGlobalView_data: action.result, updateGlobalView_inProgress: false };
        case UPDATE_GLOBAL_VIEW_FAILED:
            return { ...state, updateGlobalView_error: null };
        case EDIT_GLOBAL_VIEW_REQUEST:
            return { ...state, editGlobalView_data: null };
        case EDIT_GLOBAL_VIEW_IN_PROGRESS:
            return { ...state, editGlobalView_inProgress: true };
        case EDIT_GLOBAL_VIEW_SUCCESS:
            return { ...state, editGlobalView_data: action.result, editGlobalView_inProgress: false };
        case EDIT_GLOBAL_VIEW_FAILED:
            return { ...state, editGlobalView_error: null };
        case DELETE_GLOBAL_VIEW_REQUEST:
            return { ...state, deleteGlobalView_data: null };
        case DELETE_GLOBAL_VIEW_IN_PROGRESS:
            return { ...state, deleteGlobalView_inProgress: true };
        case DELETE_GLOBAL_VIEW_SUCCESS:
            return { ...state, deleteGlobalView_data: action.result, deleteGlobalView_inProgress: false };
        case DELETE_GLOBAL_VIEW_FAILED:
            return { ...state, deleteGlobalView_error: null };
        case GET_MY_DEFAULT_ORG_GROUPS_REQUEST:
            return { ...state, getMyDefaultOrgGroups_data: null };
        case GET_MY_DEFAULT_ORG_GROUPS_IN_PROGRESS:
            return { ...state, getMyDefaultOrgGroups_inProgress: true };
        case GET_MY_DEFAULT_ORG_GROUPS_SUCCESS:
            return { ...state, getMyDefaultOrgGroups_data: action.result, getMyDefaultOrgGroups_inProgress: false };
        case GET_MY_DEFAULT_ORG_GROUPS_FAILED:
            return { ...state, getMyDefaultOrgGroups_error: null };
        case GET_MY_CURRENT_APPLIED_VIEW_REQUEST:
            return { ...state, getMyCurrentAppliedView_data: null };
        case GET_MY_CURRENT_APPLIED_VIEW_IN_PROGRESS:
            return { ...state, getMyCurrentAppliedView_inProgress: true };
        case GET_MY_CURRENT_APPLIED_VIEW_SUCCESS:
            return { ...state, getMyCurrentAppliedView_data: action.result, getMyCurrentAppliedView_inProgress: false };
        case GET_MY_CURRENT_APPLIED_VIEW_FAILED:
            return { ...state, getMyCurrentAppliedView_error: null };
        case SAVE_MY_CURRENT_APPLIED_VIEW_REQUEST:
            return { ...state, saveMyCurrentAppliedView_data: null };
        case SAVE_MY_CURRENT_APPLIED_VIEW_IN_PROGRESS:
            return { ...state, saveMyCurrentAppliedView_inProgress: true };
        case SAVE_MY_CURRENT_APPLIED_VIEW_SUCCESS:
            return {
                ...state,
                saveMyCurrentAppliedView_data: action.result,
                saveMyCurrentAppliedView_inProgress: false
            };
        case SAVE_MY_CURRENT_APPLIED_VIEW_FAILED:
            return { ...state, saveMyCurrentAppliedView_error: null };
        case REMOVE_MY_CURRENT_APPLIED_VIEW_REQUEST:
            return { ...state, removeMyCurrentAppliedView_data: null };
        case REMOVE_MY_CURRENT_APPLIED_VIEW_IN_PROGRESS:
            return { ...state, removeMyCurrentAppliedView_inProgress: true };
        case REMOVE_MY_CURRENT_APPLIED_VIEW_SUCCESS:
            return {
                ...state,
                removeMyCurrentAppliedView_data: action.result,
                removeMyCurrentAppliedView_inProgress: false
            };
        case REMOVE_MY_CURRENT_APPLIED_VIEW_FAILED:
            return { ...state, removeMyCurrentAppliedView_error: null };

        default:
            return state;
    }
};

export default keyMetricsReducer;
