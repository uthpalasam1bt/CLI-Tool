import {
    DO_CREATE_SCHEME_IN_PROGRESS,
    DO_CREATE_SCHEME_SUCCESS,
    DO_CREATE_SCHEME_FAILED,
    GET_SCHEMES_IN_PROGRESS,
    GET_SCHEMES_SUCCESS,
    GET_SCHEMES_FAILED,
    GET_SCHEME_IN_PROGRESS,
    GET_SCHEME_SUCCESS,
    GET_SCHEME_FAILED,
    DO_UPDATE_IS_FAVOURITE_IN_PROGRESS,
    DO_UPDATE_IS_FAVOURITE_SUCCESS,
    DO_UPDATE_IS_FAVOURITE_FAILED,
    GET_SCHEME_REQUEST,
    DO_UPDATE_SCHEME_FLAG_IN_PROGRESS,
    DO_UPDATE_SCHEME_FLAG_SUCCESS,
    DO_UPDATE_SCHEME_FLAG_FAILED
} from '../constants';
import { FORM_SET_SUBMIT_SUCCEEDED } from '../../../constants/formConstants';

const initialState = {
    createScheme_inProgress: false,
    createScheme_data: null,
    createScheme_error: null,

    getSchemes_inProgress: false,
    updateSchemeFlag_inProgress: false,
    getSchemes_data: null,
    getSchemes_error: null,

    getScheme_inProgress: false,
    getScheme_data: null,
    getScheme_error: null,

    updateSchemeIsFavourite_inProgress: false,
    updateSchemeIsFavourite_data: null,
    updateSchemeIsFavourite_error: null,

    getContributors_inProgress: false,
    getContributors_data: null,
    getContributors_error: null
};

export default function schemeReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SCHEME_REQUEST:
            return { ...state, getScheme_data: null };
        case DO_CREATE_SCHEME_IN_PROGRESS:
            return { ...state, createScheme_inProgress: true };
        case DO_CREATE_SCHEME_SUCCESS:
            return { ...state, createScheme_data: action.result.data, createScheme_inProgress: false };
        case DO_CREATE_SCHEME_FAILED:
            return { ...state, createScheme_error: action.error, createScheme_inProgress: false };
        case GET_SCHEMES_IN_PROGRESS:
            return { ...state, getSchemes_inProgress: true };
        case GET_SCHEMES_SUCCESS:
            return { ...state, getSchemes_data: action.result, getSchemes_inProgress: false };
        case GET_SCHEMES_FAILED:
            return { ...state, getSchemes_error: action.error };
        case GET_SCHEME_IN_PROGRESS:
            return { ...state, getScheme_inProgress: true };
        case GET_SCHEME_SUCCESS:
            return { ...state, getScheme_data: action.result.data.content, getScheme_inProgress: false };
        case GET_SCHEME_FAILED:
            return { ...state, getScheme_error: action.error };

        case DO_UPDATE_IS_FAVOURITE_IN_PROGRESS:
            return { ...state, updateSchemeIsFavourite_inProgress: true };
        case DO_UPDATE_IS_FAVOURITE_SUCCESS:
            return {
                ...state,
                updateSchemeIsFavourite_data: action.result.data,
                updateSchemeIsFavourite_inProgress: false
            };
        case DO_UPDATE_IS_FAVOURITE_FAILED:
            return { ...state, updateSchemeIsFavourite_error: action.error };

        case FORM_SET_SUBMIT_SUCCEEDED:
            return { ...state };
        case DO_UPDATE_SCHEME_FLAG_IN_PROGRESS:
            return { ...state, updateSchemeFlag_inProgress: true };
        case DO_UPDATE_SCHEME_FLAG_SUCCESS:
        case DO_UPDATE_SCHEME_FLAG_FAILED:
            return { ...state, updateSchemeFlag_inProgress: false };
        default:
            return state;
    }
}
