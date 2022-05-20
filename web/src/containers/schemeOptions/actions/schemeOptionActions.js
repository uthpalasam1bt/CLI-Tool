import {
    SET_SCHEME_DATA,
    SET_SCHEME_CONTRIBUTORS,
    GET_SCHEME_INFORMATION_DATA_REQUEST,
    GET_SCHEME_INFORMATION_DATA_SUCCESS,
    GET_SCHEME_INFORMATION_FAILED,
    GET_SCHEME_INFORMATION_DATA_INPROGRESS,
    // ACTIONS,
    CHECK_IF_SCHEME_EXISTS,
    CHECK_SCHEME_NAME_AVALIBILITY_SUCCESS
} from '../constants/schemeOptionConstants';

const setSchemeData = data => ({
    type: SET_SCHEME_DATA,
    data
});

const setSchemeContributors = data => ({
    type: SET_SCHEME_CONTRIBUTORS,
    data
});

const getSchemeInformationData = data => ({
    type: GET_SCHEME_INFORMATION_DATA_REQUEST,
    data
});

const getSchemeInformationDataSuccess = data => ({
    type: GET_SCHEME_INFORMATION_DATA_SUCCESS,
    data
});

const getSchemeInformationDataInprogress = () => ({
    type: GET_SCHEME_INFORMATION_DATA_INPROGRESS
});

const getSchemeInformationDataFailed = data => ({
    type: GET_SCHEME_INFORMATION_FAILED,
    data
});

const checkIfSchemeWithNameExists = (schemeName, callback) => {
    let payload = {
        schemeName
    };
    return {
        type: CHECK_IF_SCHEME_EXISTS,
        payload,
        callback
    };
};

const updateSchemeNameAvaliability = avaliability => {
    return {
        type: CHECK_SCHEME_NAME_AVALIBILITY_SUCCESS,
        payload: avaliability
    };
};

export {
    checkIfSchemeWithNameExists,
    updateSchemeNameAvaliability,
    setSchemeData,
    setSchemeContributors,
    getSchemeInformationData,
    getSchemeInformationDataSuccess,
    getSchemeInformationDataInprogress,
    getSchemeInformationDataFailed
};
