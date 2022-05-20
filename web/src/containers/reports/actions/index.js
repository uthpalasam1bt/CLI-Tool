import {
    DOWNLOAD_REPORT,
    DOWNLOAD_REPORT_SUCCESS,
    GET_STEP_DATA,
    GET_STEP_DATA_ERROR,
    GET_STEP_DATA_SUCCESS,
    UPDATE_REPORT_DATA,
    UPDATE_REPORT_DATA_ERROR,
    UPDATE_REPORT_DATA_SUCCESS,
    UPLOAD_REPORT,
    UPLOAD_REPORT_SUCCESS
} from '../constants/commonConstatnt';

export const updateReportData = payload => {
    return { type: UPDATE_REPORT_DATA, payload: payload };
};
export const updateReportDataSuccess = data => {
    return { type: UPDATE_REPORT_DATA_SUCCESS, payload: data };
};
export const updateReportDataError = error => {
    return { type: UPDATE_REPORT_DATA_ERROR, payload: error };
};

export const getStepReportData = payload => {
    return { type: GET_STEP_DATA, payload: payload };
};
export const getStepReportDataSuccess = data => {
    return { type: GET_STEP_DATA_SUCCESS, payload: data };
};
export const getStepReportDataError = error => {
    return { type: GET_STEP_DATA_ERROR, payload: error };
};

//uplaod report

export const uploadingReport = () => {
    return { type: UPLOAD_REPORT };
};
export const uploadingReportSuccess = () => {
    return { type: UPLOAD_REPORT_SUCCESS };
};

//download report

export const downloadingReport = () => {
    return { type: DOWNLOAD_REPORT };
};
export const downloadingReportSuccess = () => {
    return { type: DOWNLOAD_REPORT_SUCCESS };
};
