import {
    GET_CONTRIBUTORS_IN_PROGRESS,
    GET_CONTRIBUTORS_SUCCESS,
    GET_CONTRIBUTORS_FAILED,
    ADD_CONTRIBUTORS_IN_PROGRESS,
    ADD_CONTRIBUTORS_SUCCESS,
    ADD_CONTRIBUTORS_FAILED,
    GET_USER_CLAIMS_SUCCESS,
    SAVE_USER_GROUPS_REQUEST,
    SAVE_USER_GROUPS_SUCCESS,
    SAVE_USER_GROUPS_FAILED,
    GET_USER_GROUPS_REQUEST,
    GET_USER_GROUPS_SUCCESS,
    GET_USER_GROUPS_FAILED,
    DELETE_GROUPS_REQUEST,
    DELETE_GROUPS_SUCCESS,
    DELETE_GROUPS_FAILED,
    GET_LOGGED_USER_CLAIMS_IN_PROGRESS,
    GET_LOGGED_USER_CLAIMS_SUCCESS,
    GET_LOGGED_USER_CLAIMS_FAILED,
    REMOVE_SCHEME_USER_FROM_SCHEME_REQUEST,
    REMOVE_SCHEME_USER_FROM_SCHEME_SUCCESS,
    REMOVE_SCHEME_USER_FROM_SCHEME_FAILURE
} from './constants';

const getClaimsInitialState = {
    getLoggedUserClaims_inProgress: false,
    getLoggedUserClaims_data: null,
    getLoggedUserClaims_error: null
};

const initialState = {
    ...getClaimsInitialState,
    userGroupSaveRequest_inProgress: false,
    getContributors_inProgress: false,
    userGroupGetRequest_inProgress: false,
    addContributors_inProgress: false,
    usersRequest_inProgress: false,
    userSave_inProgress: false,
    isDeletingUserGroup: false,
    userGroups: [],
    usersData: [],
    claimData: [],
    userGroupRequest_error: null,
    userGroupRequest_success: null,
    userGroupRequest_data: null,
    isRemovingSchemeUserFromScheme: false
};

const userManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_CLAIMS_SUCCESS:
            const { content } = action.result.data;
            return {
                ...state,
                claimData: content.map(claim => {
                    return { value: claim.claimId, label: claim.claim };
                })
            };

        case GET_USER_GROUPS_REQUEST:
            return { ...state, userGroupGetRequest_inProgress: true };

        case GET_USER_GROUPS_SUCCESS:
            return {
                ...state,
                userGroups: action.result.data.content,
                userGroupGetRequest_inProgress: false
            };

        case GET_USER_GROUPS_FAILED:
            return { ...state, userGroupGetRequest_inProgress: false };

        case SAVE_USER_GROUPS_REQUEST:
            return {
                ...state,
                userGroupSaveRequest_inProgress: true
            };

        case SAVE_USER_GROUPS_SUCCESS:
        case SAVE_USER_GROUPS_FAILED:
            return {
                ...state,
                userGroupSaveRequest_inProgress: false
            };

        case ADD_CONTRIBUTORS_IN_PROGRESS:
            return {
                ...state,
                addContributors_inProgress: true
            };

        case ADD_CONTRIBUTORS_SUCCESS:
        case ADD_CONTRIBUTORS_FAILED:
            return {
                ...state,
                addContributors_inProgress: false
            };

        case GET_CONTRIBUTORS_IN_PROGRESS:
            return {
                ...state,
                getContributors_inProgress: true
            };

        case GET_CONTRIBUTORS_SUCCESS:
            return {
                ...state,
                usersData: action.result.data.content,
                getContributors_inProgress: false
            };

        case GET_CONTRIBUTORS_FAILED:
            return {
                ...state,
                getContributors_inProgress: false
            };

        case DELETE_GROUPS_REQUEST:
            return { ...state, isDeletingUserGroup: true };

        case DELETE_GROUPS_SUCCESS:
            return {
                ...state,
                isDeletingUserGroup: false
            };

        case DELETE_GROUPS_FAILED:
            return { ...state, isDeletingUserGroup: false };

        case GET_LOGGED_USER_CLAIMS_IN_PROGRESS:
            return { ...state, getLoggedUserClaims_inProgress: true };

        case GET_LOGGED_USER_CLAIMS_SUCCESS:
            return { ...state, getLoggedUserClaims_data: action.payload.data.content.claims };

        case GET_LOGGED_USER_CLAIMS_FAILED:
            return { ...state, getLoggedUserClaims_error: action.error };

        case REMOVE_SCHEME_USER_FROM_SCHEME_REQUEST:
            return { ...state, isRemovingSchemeUserFromScheme: true };

        case REMOVE_SCHEME_USER_FROM_SCHEME_SUCCESS:
            return { ...state, isRemovingSchemeUserFromScheme: false };

        case REMOVE_SCHEME_USER_FROM_SCHEME_FAILURE:
            return { ...state, isRemovingSchemeUserFromScheme: false };

        default:
            return state;
    }
};

export default userManagementReducer;
