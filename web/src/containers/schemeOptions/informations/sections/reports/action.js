import {
    GET_REPORT_DATA_REQUEST,
    GET_REPORT_DATA_INPROGRESS,
    GET_REPORT_DATA_SUCCESS,
    GET_REPORT_DATA_FAILED,
    GET_SELECTED_REPORT_DATA_REQUEST,
    GET_SELECTED_REPORT_DATA_INPROGRESS,
    GET_SELECTED_REPORT_DATA_SUCCESS,
    GET_SELECTED_REPORT_DATA_FAILED
} from './constants';

const doRequestReport = payload => ({
    type: GET_REPORT_DATA_REQUEST,
    payload
});
const doRequestReportInProgress = () => ({
    type: GET_REPORT_DATA_INPROGRESS
});
const doRequestReportSuccess = result => ({
    type: GET_REPORT_DATA_SUCCESS,
    result
});
const doRequestReportFailed = error => ({
    type: GET_REPORT_DATA_FAILED,
    error
});

const doRequestSelectedReport = payload => ({
    type: GET_SELECTED_REPORT_DATA_REQUEST,
    payload
});
const doRequestSelectedReportInProgress = () => ({
    type: GET_SELECTED_REPORT_DATA_INPROGRESS
});
const doRequestSelectedReportSuccess = result => ({
    type: GET_SELECTED_REPORT_DATA_SUCCESS,
    result
});
const doRequestSelectedReportFailed = error => ({
    type: GET_SELECTED_REPORT_DATA_FAILED,
    error
});

export {
    doRequestReport,
    doRequestReportInProgress,
    doRequestReportSuccess,
    doRequestReportFailed,
    doRequestSelectedReport,
    doRequestSelectedReportInProgress,
    doRequestSelectedReportSuccess,
    doRequestSelectedReportFailed
};
