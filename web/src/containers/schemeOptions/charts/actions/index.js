import {
    GET_CHART_REQUEST,
    GET_CHART_SUCCESS,
    GET_CHART_ERROR,
    GET_CHART_BY_PAGE,
    CLEAR_CHARTS,
    GET_DATE_LIST_REQUEST,
    GET_DATE_LIST_REQUEST_SUCCESS,
    GET_DATE_LIST_REQUEST_ERROR,
    GET_CHART_LIST_REQUEST,
    GET_CHART_LIST_SUCCESS,
    GET_CHART_LIST_ERROR,
    EXECUTE_STEP_FUNCTION_REQUEST,
    EXECUTE_STEP_FUNCTION_SUCCESS,
    EXECUTE_STEP_FUNCTION_ERROR,
    GENERATE_CHARTS_DOCUMENT_REQUEST,
    GENERATE_CHARTS_DOCUMENT_SUCCESS,
    GENERATE_CHARTS_DOCUMENT_ERROR,
    GENERATE_ADHOC_REPORT_REQUEST,
    GENERATE_ADHOC_REPORT_SUCCESS,
    GENERATE_ADHOC_REPORT_ERROR
} from '../constants';

export const getChartsByPage = (payload, date, schemeId, userEmail) => ({
    type: GET_CHART_BY_PAGE,
    payload,
    date,
    schemeId,
    userEmail
});

export const getChartData = (payload, chartKey) => ({
    type: GET_CHART_REQUEST,
    payload,
    chartKey
});

export const getChartDataSucccess = (result, chartKey) => ({
    type: GET_CHART_SUCCESS,
    result,
    chartKey
});

export const getChartDataError = (error, chartKey) => ({
    type: GET_CHART_ERROR,
    error,
    chartKey
});

export const getChartList = payload => ({
    type: GET_CHART_LIST_REQUEST,
    payload
});

export const getChartListSucccess = result => ({
    type: GET_CHART_LIST_SUCCESS,
    result
});

export const getChartListError = error => ({
    type: GET_CHART_LIST_ERROR,
    error
});

// GET CHART DATE LIST
export const getChartDateList = payload => ({
    type: GET_DATE_LIST_REQUEST,
    payload
});

export const getChartDateListSucccess = payload => ({
    type: GET_DATE_LIST_REQUEST_SUCCESS,
    payload
});

export const getChartDateListError = error => ({
    type: GET_DATE_LIST_REQUEST_ERROR,
    error
});

export const executeStepfunctionRequest = payload => ({
    type: EXECUTE_STEP_FUNCTION_REQUEST,
    payload
});

export const executeStepfunctionSuccess = error => ({
    type: EXECUTE_STEP_FUNCTION_SUCCESS,
    error
});

export const executeStepfunctionError = error => ({
    type: EXECUTE_STEP_FUNCTION_ERROR,
    error
});

export const clearCharts = () => ({
    type: CLEAR_CHARTS
});

// GENERATE ACTIVE SCHEME DASHBOARD CHARTS DOCUMENT

export const generateChartsDocumentRequest = (payload, refreshCallBack) => ({
    type: GENERATE_CHARTS_DOCUMENT_REQUEST,
    payload,
    refreshCallBack
});

export const generateChartsDocumentSucccess = result => ({
    type: GENERATE_CHARTS_DOCUMENT_SUCCESS,
    result
});

export const generateChartsDocumentError = error => ({
    type: GENERATE_CHARTS_DOCUMENT_ERROR,
    error
});

// GENERATE ACTIVE SCHEME DASHBOARD ADHOC REPORT

export const generateAdHocReportRequest = (payload, refreshCallBack) => ({
    type: GENERATE_ADHOC_REPORT_REQUEST,
    payload,
    refreshCallBack
});

export const generateAdHocReportSucccess = result => ({
    type: GENERATE_ADHOC_REPORT_SUCCESS,
    result
});

export const generateAdHocReportError = error => ({
    type: GENERATE_ADHOC_REPORT_ERROR,
    error
});
