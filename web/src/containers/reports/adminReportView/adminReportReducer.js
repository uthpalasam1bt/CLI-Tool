import {
    GET_REPORT_TYPES,
    GET_REPORT_TYPES_ERROR,
    GET_REPORT_TYPES_SUCCESS,
    GET_UPLOAD_REPORT_SCHEME,
    GET_UPLOAD_REPORT_SCHEME_SUCCESS,
    GET_UPLOAD_REPORT_SCHEME_ERROR,
    GET_REPORT_UPLOAD_URL,
    GET_REPORT_UPLOAD_URL_SUCCESS,
    GET_REPORT_UPLOAD_URL_ERROR,
    SET_UPLOADED_REPORTS,
    RESET_UPLOADED_REPORTS,
    GENERATE_REPORT_VALIDATION_REQUEST,
    GENERATE_REPORT_VALIDATION_SUCCESS,
    GENERATE_REPORT_VALIDATION_ERROR,
    GENERATE_REPORT_REQUEST,
    GENERATE_REPORT_SUCCESS,
    GENERATE_REPORT_ERROR,
    GET_GENERATE_REPORT_SCHEME,
    GET_GENERATE_REPORT_SCHEME_SUCCESS,
    GET_GENERATE_REPORT_SCHEME_ERROR,
    GENERATE_REPORT_SUCCESS_RESET
} from './constant';

const initialState = {
    // for report types
    getReportTypes_inProgress: false,
    report_types: [],
    getReportTypes_error: null,

    // for upload schemes
    getUploadReportSchemes_inProgress: false,
    upload_schemes: [],
    getUploadScheme_error: null,

     // for generate schemes
     getGenerateReportSchemes_inProgress: false,
     generate_schemes: [],
     getGenerateScheme_error: null,

    // for upload report url
    getUploadReportUrl_inProgress: false,
    upload_url: null,
    getUploadUrl_error: null,

    uploadedReports: [],

    // for generate report 
    generateReportValidate_inProgress: false,
    generateReportValidation_success: null,
    generateReportValidation_error: null,

    generate_inProgress:false,
    generate_success:null,
    generate_error:null
};

export default function adminReportReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REPORT_TYPES:
            return {
                ...state,
                getReportTypes_inProgress: true
            };
        case GET_REPORT_TYPES_SUCCESS:
            return { ...state, report_types: action.payload, getReportTypes_inProgress: false };
        case GET_REPORT_TYPES_ERROR:
            return { ...state, report_types: action.payload, getReportTypes_inProgress: false };

        //upload report schemes
        case GET_UPLOAD_REPORT_SCHEME:
            return {
                ...state,
                getUploadReportSchemes_inProgress: true,
                getUploadScheme_error: null,
                upload_schemes: []
            };
        case GET_UPLOAD_REPORT_SCHEME_SUCCESS:
            return {
                ...state,
                upload_schemes: action.payload,
                getUploadReportSchemes_inProgress: false,
                getUploadScheme_error: null
            };
        case GET_UPLOAD_REPORT_SCHEME_ERROR:
            return {
                ...state,
                getUploadScheme_error: action.payload,
                getUploadReportSchemes_inProgress: false,
                upload_schemes: []
            };
         //generate report schemes
         case GET_GENERATE_REPORT_SCHEME:
            return {
                ...state,
                getGenerateReportSchemes_inProgress: true,
                getGenerateScheme_error: null,
                generate_schemes: []
            };
        case GET_GENERATE_REPORT_SCHEME_SUCCESS:
            return {
                ...state,
                generate_schemes: action.payload,
                getGenerateReportSchemes_inProgress: false,
                getGenerateScheme_error: null
            };
        case GET_GENERATE_REPORT_SCHEME_ERROR:
            return {
                ...state,
                getGenerateScheme_error: action.payload,
                getGenerateReportSchemes_inProgress: false,
                generate_schemes: []
            };

        //upload url
        case GET_REPORT_UPLOAD_URL:
            return { ...state, getUploadReportUrl_inProgress: true, upload_url: null, getUploadUrl_error: null };
        case GET_REPORT_UPLOAD_URL_SUCCESS:
            return {
                ...state,
                upload_url: action.payload,
                getUploadReportUrl_inProgress: false,
                getUploadUrl_error: null
            };
        case GET_REPORT_UPLOAD_URL_ERROR:
            return {
                ...state,
                getUploadUrl_error: action.payload,
                getUploadReportUrl_inProgress: false,
                upload_url: null
            };

        case SET_UPLOADED_REPORTS:
            return { ...state, uploadedReports: [...action.payload] };
        case RESET_UPLOADED_REPORTS:
            return { ...state, uploadedReports: [] };
        
        case GENERATE_REPORT_VALIDATION_REQUEST:
            return {...state, generateReportValidate_inProgress: true,
                generateReportValidation_success: null,
                generateReportValidation_error: null,}
        case GENERATE_REPORT_VALIDATION_SUCCESS:
            return {...state, generateReportValidate_inProgress: false,
                generateReportValidation_success: action.payload,
                generateReportValidation_error: null,}
        case GENERATE_REPORT_VALIDATION_ERROR:
            return {...state, generateReportValidate_inProgress: false,
                generateReportValidation_success: null,
                generateReportValidation_error: action.payload,}

        case GENERATE_REPORT_REQUEST:
            return {
                ...state,
                generate_inProgress:true,
                generate_success:null,
                generate_error:null
            }
        case GENERATE_REPORT_SUCCESS:
    
            return {
                ...state,
                generate_inProgress:false,
                generate_success:action.payload,
                generate_error:null
            }
        case GENERATE_REPORT_ERROR:
            return {
                ...state,
                generate_inProgress:false,
                generate_success:null,
                generate_error:action.payload
            }
            case GENERATE_REPORT_SUCCESS_RESET:
                console.log("triggered")
                return {
                    ...state,
                    generate_success:null
                }
        default:
            return state;
    }
}
