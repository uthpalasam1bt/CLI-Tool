export const DELETE_ACCOUNT_REQUEST_STATUS = {
    NONE: 'A',
    PENDING: 'PD',
    REJECTED: 'R'
};

export const SCHEME_USER_DELETE_ACCOUNT_SYSTEM_MESSAGES = {
    DELETE_ACCOUNT_REQUEST_DATA_LOADING_ERROR: 'Some error occured.',
    DELETE_ACCOUNT_REQUESTED: 'Successfully requested user account deletion.',
    DELETE_ACCOUNT_REQUEST_ERROR: 'Some error occured trying to send user account deletion request.',
    AGREE_TOC: 'Agree to account deletion.',
    INVALID_PASSWORD: 'Invalid password.'
};
