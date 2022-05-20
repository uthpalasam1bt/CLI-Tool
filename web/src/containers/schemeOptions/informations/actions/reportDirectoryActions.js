import {
    GET_REPORT_CONFIG_REQUEST,
    GET_REPORT_CONFIG_INPROGRESS,
    GET_REPORT_CONFIG_SUCCESS,
    GET_REPORT_CONFIG_FAILED
} from '../constants';

const doRequestReportConfig = payload => ({
    payload,
    type: GET_REPORT_CONFIG_REQUEST
});

const doRequestReportConfigInProgress = () => ({
    type: GET_REPORT_CONFIG_INPROGRESS
});

const doRequestReportConfigSuccess = result => ({
    type: GET_REPORT_CONFIG_SUCCESS,
    result
});

const doRequestReportConfigFailed = error => ({
    type: GET_REPORT_CONFIG_FAILED,
    error
});

export {
    doRequestReportConfig,
    doRequestReportConfigInProgress,
    doRequestReportConfigSuccess,
    doRequestReportConfigFailed
};
