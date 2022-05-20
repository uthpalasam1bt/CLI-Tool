import {
    SAVE_LGIM_ADVASARY_GROUPS_REQUEST,
    GET_LGIM_ADVASARY_GROUPS_SUCCESS,
    GET_LGIM_ADVASARY_GROUPS_FAILED,
    SAVE_LGIM_ADVASARY_GROUPS_SUCCESS,
    GET_LGIM_ADVASARY_GROUPS_REQUEST,
    GET_LGIM_ADVASARY_USERS_REQUEST,
    GET_LGIM_ADVASARY_USERS_SUCCESS,
    SAVE_LGIM_ADVASARY_USERS_REQUEST,
    SAVE_LGIM_ADVASARY_USERS_SUCCESS,
    SAVE_LGIM_ADVASARY_USERS_ERROR,
    GET_COMPANY_LIST_SUCCESS,
    DO_GET_COMMON_CLAIMS_IN_PROGRESS,
    DO_GET_COMMON_CLAIMS_SUCCESS,
    DO_GET_COMMON_CLAIMS_FAILED,
    GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_IN_PROGRESS,
    GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_SUCCESS,
    GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_FAILURE,
    REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_IN_PROGRESS,
    REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_SUCCESS,
    REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_FAILURE,
    DELETE_USERS_FROM_SYSTEM_IN_PROGRESS,
    DELETE_USERS_FROM_SYSTEM_SUCCESS,
    DELETE_USERS_FROM_SYSTEM_FAILURE,
    FETCH_CLIAM_NOTIFICATION_MAP_SUCCESS,
    SEARCH_CLIENT_USERS_REQUEST,
    SEARCH_CLIENT_USERS_SUCCESS,
    SEARCH_CLIENT_USERS_FAILURE,
    GET_CLIENT_AUTOFILL_DATA_REQUEST,
    GET_CLIENT_AUTOFILL_DATA_SUCCESS,
    GET_CLIENT_AUTOFILL_DATA_FAILURE
} from './constants';
import { commonClaimIds } from '../../../config/constants';

const initialState = {
    lgimGroupSaveRequest_inProgress: false,
    lgimGroupGetRequest_inProgress: false,
    lgimUsersRequest_inProgress: false,
    lgimUserSave_inProgress: false,
    lgimGroupsData: [],
    lgimUsersData: [],
    companyList: [],
    lgimGroupRequest_error: null,
    lgimGroupRequest_success: null,
    lgimGroupRequest_data: null,
    commonUserClaims_inProgress: false,
    commonUserClaims: null,
    commonUserClaimIds: commonClaimIds,
    commonUserClaimsError: null,

    getSchemeUserAccountDeleteRequests_inProgress: false,
    getSchemeUserAccountDeleteRequests_result: null,
    getSchemeUserAccountDeleteRequests_error: null,

    rejectSchemeUserAccountDeleteRequests_inProgress: false,
    rejectSchemeUserAccountDeleteRequests_result: null,
    rejectSchemeUserAccountDeleteRequests_error: null,

    deleteUsersFromSystem_inProgress: false,
    deleteUsersFromSystem_result: null,
    deleteUsersFromSystem_error: null,
    claimToNotificationMap: [],

    searchClientUsersData_inProgress: false,
    searchClientUsersData_result: [],
    searchClientUsersData_error: null,

    getClientAutofillData_inProgress: false,
    getClientAutofillData_result: [],
    getClientAutofillData_error: null
};

const lgimUserManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_LGIM_ADVASARY_GROUPS_REQUEST:
            return { ...state, lgimGroupSaveRequest_inProgress: true };

        case SAVE_LGIM_ADVASARY_GROUPS_SUCCESS:
            return { ...state, lgimGroupSaveRequest_inProgress: false };

        case GET_LGIM_ADVASARY_GROUPS_REQUEST:
            return { ...state, lgimGroupGetRequest_inProgress: true };

        case GET_LGIM_ADVASARY_GROUPS_SUCCESS:
            return {
                ...state,
                lgimGroupGetRequest_inProgress: false,
                lgimGroupsData: action.payload
            };

        case GET_LGIM_ADVASARY_GROUPS_FAILED:
            return {
                ...state,
                lgimGroupRequest_error: action.error,
                lgimGroupGetRequest_inProgress: false,
                lgimUserSave_inProgress: false,
                lgimGroupSaveRequest_inProgress: false
            };

        case GET_LGIM_ADVASARY_USERS_REQUEST:
            return {
                ...state,
                lgimUsersRequest_inProgress: true
            };

        case GET_LGIM_ADVASARY_USERS_SUCCESS:
            return {
                ...state,
                lgimUsersRequest_inProgress: false,
                lgimUsersData: action.payload
            };

        case SAVE_LGIM_ADVASARY_USERS_REQUEST:
            return {
                ...state,
                lgimUserSave_inProgress: true
            };

        case SAVE_LGIM_ADVASARY_USERS_SUCCESS:
            return {
                ...state,
                lgimUserSave_inProgress: false,
                lgimGroupSaveRequest_inProgress: false
            };

        case SAVE_LGIM_ADVASARY_USERS_ERROR:
            return {
                ...state,
                lgimUserSave_inProgress: false
            };

        case GET_COMPANY_LIST_SUCCESS:
            return {
                ...state,
                companyList: action.payload
            };

        case DO_GET_COMMON_CLAIMS_IN_PROGRESS:
            return { ...state, commonUserClaims_inProgress: true };

        case DO_GET_COMMON_CLAIMS_SUCCESS:
            const { content } = action.result.data;
            return {
                ...state,
                commonUserClaimIds: commonClaimIds,
                commonUserClaims: content.claims || null
            };

        case DO_GET_COMMON_CLAIMS_FAILED:
            return { ...state, commonUserClaimsError: action.error };

        case GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_IN_PROGRESS:
            return { ...state, getSchemeUserAccountDeleteRequests_inProgress: true };

        case GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_SUCCESS:
            return {
                ...state,
                getSchemeUserAccountDeleteRequests_inProgress: false,
                getSchemeUserAccountDeleteRequests_result: action.result
            };

        case GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_FAILURE:
            return {
                ...state,
                getSchemeUserAccountDeleteRequests_inProgress: false,
                getSchemeUserAccountDeleteRequests_error: action.error
            };

        case REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_IN_PROGRESS:
            return { ...state, rejectSchemeUserAccountDeleteRequests_inProgress: true };

        case REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_SUCCESS:
            return {
                ...state,
                rejectSchemeUserAccountDeleteRequests_inProgress: false,
                rejectSchemeUserAccountDeleteRequests_result: action.result
            };

        case REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_FAILURE:
            return {
                ...state,
                rejectSchemeUserAccountDeleteRequests_inProgress: false,
                rejectSchemeUserAccountDeleteRequests_error: action.error
            };

        case DELETE_USERS_FROM_SYSTEM_IN_PROGRESS:
            return { ...state, deleteUsersFromSystem_inProgress: true };

        case DELETE_USERS_FROM_SYSTEM_SUCCESS:
            return {
                ...state,
                deleteUsersFromSystem_inProgress: false,
                deleteUsersFromSystem_result: action.result
            };

        case DELETE_USERS_FROM_SYSTEM_FAILURE:
            return {
                ...state,
                deleteUsersFromSystem_inProgress: false,
                deleteUsersFromSystem_error: action.error
            };
        case FETCH_CLIAM_NOTIFICATION_MAP_SUCCESS:
            return {
                ...state,
                claimToNotificationMap: action.payload
            };
        case GET_CLIENT_AUTOFILL_DATA_REQUEST:
            return { ...state, getClientAutofillData_inProgress: true };
        case GET_CLIENT_AUTOFILL_DATA_SUCCESS:
            return {
                ...state,
                getClientAutofillData_inProgress: false,
                getClientAutofillData_result: action.payload
            };
        case GET_CLIENT_AUTOFILL_DATA_FAILURE:
            return {
                ...state,
                getClientAutofillData_inProgress: false,
                getClientAutofillData_error: action.error
            };
        case SEARCH_CLIENT_USERS_REQUEST:
            return { ...state, searchClientUsersData_inProgress: true };
        case SEARCH_CLIENT_USERS_SUCCESS:
            return {
                ...state,
                searchClientUsersData_inProgress: false,
                searchClientUsersData_result: action.payload
            };
        case SEARCH_CLIENT_USERS_FAILURE:
            return {
                ...state,
                searchClientUsersData_inProgress: false,
                searchClientUsersData_error: action.error
            };
        default:
            return state;
    }
};

export default lgimUserManagementReducer;
