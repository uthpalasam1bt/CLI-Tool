import {
    SET_SCHEME_DATA,
    SET_SCHEME_CONTRIBUTORS,
    GET_SCHEME_INFORMATION_DATA_SUCCESS,
    GET_SCHEME_INFORMATION_FAILED,
    GET_SCHEME_INFORMATION_DATA_INPROGRESS,
    CHECK_IF_SCHEME_EXISTS,
    CHECK_SCHEME_NAME_AVALIBILITY_SUCCESS
} from '../constants/schemeOptionConstants';

const initialState = {
    store_schemeData: null,
    store_schemeContributors: [],
    schemeInformationData: null,
    schemeInformationDataInprogress: false,
    checkingSchemeNameValidity: false,
    validSchemeName: true
};

export default function schemeOptionsReducer(state = initialState, action) {
    switch (action.type) {
        case CHECK_IF_SCHEME_EXISTS:
            return {
                ...state,
                checkingSchemeNameValidity: true,
                validSchemeName: true
            };
        case CHECK_SCHEME_NAME_AVALIBILITY_SUCCESS:
            return {
                ...state,
                checkingSchemeNameValidity: false,
                validSchemeName: action.payload
            };
        case SET_SCHEME_DATA:
            return { ...state, store_schemeData: action.data };

        case SET_SCHEME_CONTRIBUTORS:
            return { ...state, store_schemeContributors: action.data };

        case GET_SCHEME_INFORMATION_DATA_SUCCESS:
            return { ...state, schemeInformationData: action.data, schemeInformationDataInprogress: false };

        case GET_SCHEME_INFORMATION_FAILED:
            return { ...state, schemeInformationDataInprogress: false };

        case GET_SCHEME_INFORMATION_DATA_INPROGRESS:
            return { ...state, schemeInformationDataInprogress: true };

        default:
            return state;
    }
}
