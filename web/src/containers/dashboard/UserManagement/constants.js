export const ADD_USER_FORM = 'AddUserForm';

export const SAVE_LGIM_ADVASARY_GROUPS_REQUEST = 'SAVE_LGIM_GROUPS_REQUEST';
export const SAVE_LGIM_ADVASARY_GROUPS_SUCCESS = 'SAVE_LGIM_GROUPS_SUCCESS';
export const SAVE_LGIM_ADVASARY_USERS_REQUEST = 'SAVE_LGIM_USERS_REQUEST';
export const SAVE_LGIM_ADVASARY_USERS_SUCCESS = 'SAVE_LGIM_USERS_SUCCESS';
export const SAVE_LGIM_ADVASARY_USERS_ERROR = 'SAVE_LGIM_USERS_ERROR';
export const GET_LGIM_ADVASARY_GROUPS_REQUEST = 'GET_LGIM_GROUPS_REQUEST';
export const GET_LGIM_ADVASARY_GROUPS_SUCCESS = 'GET_LGIM_GROUPS_SUCCESS';
export const GET_LGIM_ADVASARY_GROUPS_FAILED = 'GET_LGIM_GROUPS_FAILED';
export const DELTE_LGIM_ADVASARY_GROUP_REQUEST = 'DELTE_LGIM_GROUP_REQUEST';

export const ADD_CLAIMS_GROUP_FORM = 'AddClaimsGroupForm';

export const GET_LGIM_ADVASARY_USERS_REQUEST = 'GET_LGIM_USERS_REQUEST';
export const GET_LGIM_ADVASARY_USERS_SUCCESS = 'GET_LGIM_USERS_SUCCESS_UMGR';

export const DELETE_LGIM_ADVASARY_USER = 'DELETE_LGIM_USER';

export const GET_COMPANY_LIST_REQUEST = 'GET_COMPANY_LIST';
export const GET_COMPANY_LIST_SUCCESS = 'GET_COMPANY_LIST_SUCCESS';
export const DO_REQUEST_COMMON_CLAIMS = 'DO_REQUEST_COMMON_CLAIMS';
export const DO_GET_COMMON_CLAIMS_IN_PROGRESS = 'DO_GET_COMMON_CLAIMS_IN_PROGRESS';
export const DO_GET_COMMON_CLAIMS_SUCCESS = 'DO_GET_COMMON_CLAIMS_SUCCESS';
export const DO_GET_COMMON_CLAIMS_FAILED = 'DO_GET_COMMON_CLAIMS_FAILED';

//claims
export const ADD_LGIM_USERS = 'addLgimUsers';
export const EDIT_LGIM_USERS = 'editLgimUsers';
export const ADD_LGIM_GROUPS = 'addLgimGroups';
export const MODIFY_LGIM_GROUPS = 'modifyLgimGroups';
export const EDIT_OTP_PHONE_NUMBER = 'editOtp';

export const ADD_ADVISORY_USERS = 'addAdvisoryUsers';
export const EDIT_ADVISORY_USERS = 'editAdvisoryUsers';
export const ADD_ADVISORY_GROUPS = 'addAdvisoryGroups';
export const MODIFY_ADVISORY_GROUPS = 'modifyAdvisoryGroups';

export const FETCH_CLIAM_NOTIFICATION_MAP = 'FETCH_CLIAM_NOTIFICATION_MAP';
export const FETCH_CLIAM_NOTIFICATION_MAP_SUCCESS = 'FETCH_CLIAM_NOTIFICATION_MAP_SUCCESS';

// DELETE USER(S) FROM SYSTEM

export const DELETE_USER_CLAIMS = {
    DELETE_SCHEME_USER: 'cl-um-2',
    DELETE_LGIM: 'cl-um-3',
    DELETE_ADVISORY: 'cl-um-4'
};

export const DELETE_USERS_FROM_SYSTEM_REQUEST = 'deleteUsersFromSystem_Request';
export const DELETE_USERS_FROM_SYSTEM_IN_PROGRESS = 'deleteUsersFromSystem_InProgress';
export const DELETE_USERS_FROM_SYSTEM_SUCCESS = 'deleteUsersFromSystem_Success';
export const DELETE_USERS_FROM_SYSTEM_FAILURE = 'deleteUsersFromSystem_Failure';

export const DELETE_LGIM_ADVISORY_USER_ALERTS_SYSTEM_MESSAGES = {
    CONFIRMATION_MODAL_TITLE: 'Are you sure you want to delete this user from the system?',
    CONFIRMATION_MODAL_CONTENT: 'This user will lose complete access to system.',
    REQUEST_SUCCESS: 'Successfully deleted the user from system.',
    ADMIN_OF_GROUP_ERROR: 'The user could not be deleted as they are associated with the admin user group.',
    REQUEST_FAILURE: 'Error occured attempting to delete the user from system.'
};

export const DELETE_SCHEME_USERS_SYSTEM_MESSAGES = {
    NO_SELECTION: 'No account delete requests are selected.',
    DELETE_ACCOUNT_REQUESTS_LOADING_ERROR:
        'Some error occured attempting to retrieve scheme user delete account requests.',
    REJECT_DELETE_ACCOUNT_REQUESTS_SUCCESS: 'Successfully rejected selected scheme user account delete request(s).',
    REJECT_DELETE_ACCOUNT_REQUESTS_ERROR:
        'Some error occured attempting to reject scheme user delete account request(s).',
    DELETE_SUCCESS: 'Successfully deleted the scheme user(s) from system.'
};

// GET SCHEME USER DELETE ACCOUNT REQUESTS
export const GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_REQUEST = 'getSchemeUserDeleteAccountRequests_Request';
export const GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_IN_PROGRESS = 'getSchemeUserDeleteAccountRequests_InProgress';
export const GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_SUCCESS = 'getSchemeUserDeleteAccountRequests_Success';
export const GET_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_FAILURE = 'getSchemeUserDeleteAccountRequests_Failure';

// REJECT SCHEME USER DELETE ACCOUNT REQUESTS
export const REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_REQUEST = 'rejectSchemeUserDeleteAccountRequests_Request';
export const REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_IN_PROGRESS =
    'rejectSchemeUserDeleteAccountRequests_InProgress';
export const REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_SUCCESS = 'rejectSchemeUserDeleteAccountRequests_Success';
export const REJECT_SCHEME_USER_DELETE_ACCOUNT_REQUESTS_FAILURE = 'rejectSchemeUserDeleteAccountRequests_Failure';

export const SELECT_AT_LEAST_ONE_NOTI_AND_CLAIM =
    'Please select at least one permission and one notification to set up a group.';

export const ERROR_FETCH_CLIAM_NOTIFICATION_MAP = 'Error occured while fetching cliams to notification map.';

export const SEARCH_CLIENT_USERS_REQUEST = 'SEARCH_CLIENT_USERS_REQUEST';
export const SEARCH_CLIENT_USERS_SUCCESS = 'SEARCH_CLIENT_USERS_SUCCESS';
export const SEARCH_CLIENT_USERS_FAILURE = 'SEARCH_CLIENT_USERS_FAILURE';

export const GET_CLIENT_AUTOFILL_DATA_REQUEST = 'GET_CLIENT_AUTOFILL_DATA_REQUEST';
export const GET_CLIENT_AUTOFILL_DATA_SUCCESS = 'GET_CLIENT_AUTOFILL_DATA_SUCCESS';
export const GET_CLIENT_AUTOFILL_DATA_FAILURE = 'GET_CLIENT_AUTOFILL_DATA_FAILURE';
