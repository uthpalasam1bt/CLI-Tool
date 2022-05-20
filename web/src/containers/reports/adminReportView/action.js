import {
    GENERATE_REPORT_ERROR,
    GENERATE_REPORT_REQUEST,
    GENERATE_REPORT_SUCCESS,
    GENERATE_REPORT_SUCCESS_RESET,
    GENERATE_REPORT_VALIDATION_ERROR,
    GENERATE_REPORT_VALIDATION_REQUEST,
    GENERATE_REPORT_VALIDATION_SUCCESS,
    GET_GENERATE_REPORT_SCHEME,
    GET_GENERATE_REPORT_SCHEME_ERROR,
    GET_GENERATE_REPORT_SCHEME_SUCCESS,
    GET_REPORT_TYPES,
    GET_REPORT_TYPES_ERROR,
    GET_REPORT_TYPES_SUCCESS,
    GET_REPORT_UPLOAD_URL,
    GET_REPORT_UPLOAD_URL_ERROR,
    GET_REPORT_UPLOAD_URL_SUCCESS,
    GET_UPLOAD_REPORT_SCHEME,
    GET_UPLOAD_REPORT_SCHEME_ERROR,
    GET_UPLOAD_REPORT_SCHEME_SUCCESS,
    RESET_UPLOADED_REPORTS,
    SET_UPLOADED_REPORTS
} from './constant';

//actions for getting the meta data for report types
export const getReportTypes = () => {
    return { type: GET_REPORT_TYPES, payload: null };
};

export const getReportTypesSuccess = data => {
    return { type: GET_REPORT_TYPES_SUCCESS, payload: data };
};
export const getReportTypesError = error => {
    return { type: GET_REPORT_TYPES_ERROR, payload: error };
};

//actions for getting the schems for upload
export const getUploadReportSchemesData = payload => {
    return { type: GET_UPLOAD_REPORT_SCHEME, payload: payload };
};
export const getUploadReportSchemesSuccess = data => {
    return { type: GET_UPLOAD_REPORT_SCHEME_SUCCESS, payload: data };
};
export const getUploadReportSchemesError = error => {
    return { type: GET_UPLOAD_REPORT_SCHEME_ERROR, payload: error };
};

//actions for getting the schems for generate
export const getGenerateReportSchemesData = payload => {
    return { type: GET_GENERATE_REPORT_SCHEME, payload: payload };
};
export const getGenerateReportSchemesSuccess = data => {
    return { type: GET_GENERATE_REPORT_SCHEME_SUCCESS, payload: data };
};
export const getGenerateReportSchemesError = error => {
    return { type: GET_GENERATE_REPORT_SCHEME_ERROR, payload: error };
};

//actions for getting the upload url

export const getUploadReportUrl = payload => {
    return { type: GET_REPORT_UPLOAD_URL, payload: payload };
};
export const getUploadReportUrlSuccess = data => {
    return { type: GET_REPORT_UPLOAD_URL_SUCCESS, payload: data };
};
export const getUploadReportUrlError = error => {
    return { type: GET_REPORT_UPLOAD_URL_ERROR, payload: error };
};

export const setUploadedReports = data => {
    return { type: SET_UPLOADED_REPORTS, payload: data };
};
export const resetUploadedReports = data => {
    return { type: RESET_UPLOADED_REPORTS, payload: data };
};


//actions for generate reports

export const generateReportValidation = payload => {
    return { type: GENERATE_REPORT_VALIDATION_REQUEST, payload: payload };
};
export const generateReportValidationSuccess = data => {
    return { type: GENERATE_REPORT_VALIDATION_SUCCESS, payload: data };
};
export const generateReportValidationError = error => {
    return { type: GENERATE_REPORT_VALIDATION_ERROR, payload: error };
};


export const generateReport = payload => {
    return { type: GENERATE_REPORT_REQUEST, payload: payload };
};
export const generateReportSuccess = data => {
    return { type: GENERATE_REPORT_SUCCESS, payload: data };
};
export const generateReportError = error => {
    return { type: GENERATE_REPORT_ERROR, payload: error };
};

export const generateReportReset = () => {
    return { type: GENERATE_REPORT_SUCCESS_RESET };
};
