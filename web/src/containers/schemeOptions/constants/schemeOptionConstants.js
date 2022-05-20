export const SET_SCHEME_DATA = 'SET_SCHEME_DATA';
export const SET_SCHEME_CONTRIBUTORS = 'SET_SCHEME_CONTRIBUTORS';

export const GET_WORKFLOW_POSITION_DATA_SUCCESS = 'GET_WORKFLOW_POSITION_DATA_SUCCESS';
export const GET_WORKFLOW_POSITION_FAILED = 'GET_WORKFLOW_POSITION__FAILED';
export const GET_CURRENT_WORKFLOW_POSITION = 'GET_CURRENT_WORKFLOW_POSITION';

export const GET_SCHEME_INFORMATION_DATA_REQUEST = 'GET_SCHEME_INFORMATION_DATA_REQUEST';
export const GET_SCHEME_INFORMATION_DATA_SUCCESS = 'GET_SCHEME_INFORMATION_DATA_SUCCESS';
export const GET_SCHEME_INFORMATION_FAILED = 'GET_SCHEME_INFORMATION__FAILED';
export const GET_SCHEME_INFORMATION_DATA_INPROGRESS = 'GET_SCHEME_INFORMATION_DATA_INPROGRESS';
export const CHECK_IF_SCHEME_EXISTS = 'CHECK_IF_SCHEME_EXISTS';
export const CHECK_SCHEME_NAME_AVALIBILITY_SUCCESS = 'CHECK_SCHEME_NAME_AVALIBILITY_SUCCESS';

export const INVALID_ENTRY_MESSAGE = 'Invalid entry. Please re-enter.';
export const GREATER_THAN_ZERO_MESSAGE = 'Must be greater than zero';
export const SIX_DIGITS_MESSAGE = 'Sort Code should have six digits.  Please re-enter';
export const CHARACTER_LIMIT_2_20_MESSAGE = 'Character limit should be withing 2 - 200 characters.';
export const SPECIAL_CRACT_NOT_ALLOWED_MESSAGE = 'Special characters are not allowed for scheme name.';

export const STEP_FUNC_CONFIG = {
    registration_revip: {
        function: 'adhoc_docGen',
        step: 'dowip'
    },
    registration_revar: {
        function: 'adhoc_docGen',
        step: 'appamao'
    },
    rtnTargUpd_schAprvAdvReprt: {
        function: 'adhoc_docGen',
        step: 'dwnRtnTarg'
    },
    flStrtgRevw_schAprvAdvReprt: {
        function: 'adhoc_docGen',
        step: 'dwndStrtgRvw'
    }
};

export default {
    SET_SCHEME_DATA,
    SET_SCHEME_CONTRIBUTORS,

    GET_WORKFLOW_POSITION_DATA_SUCCESS,
    GET_WORKFLOW_POSITION_FAILED,
    GET_CURRENT_WORKFLOW_POSITION,

    STEP_FUNC_CONFIG
};
//http://localhost:3000/scheme/options/sample/6d045ac0-c8e5-11eb-9c6f-591ca46b4708/0906navg
