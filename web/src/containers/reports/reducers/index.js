import { combineReducers } from 'redux';
import adminReportReducer from '../adminReportView/adminReportReducer';
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

const initialState = {
    updateStepData_inProgress: false,
    updateStepData: null,
    updateStepData_error: null,

    getStepData_inProgress: false,
    getStepData: null,
    getStepData_error: null,

    uploadReport_inProgress: false,
    downloadReport_inProgress: false
};

const commonReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REPORT_DATA:
            return { ...state, updateStepData_inProgress: true, updateStepData: null, updateStepData_error: null };

        case UPDATE_REPORT_DATA_SUCCESS:
            return {
                ...state,
                updateStepData: action.payload,
                updateStepData_inProgress: false,
                updateStepData_error: null
            };
        case UPDATE_REPORT_DATA_ERROR:
            return {
                ...state,
                updateStepData_error: action.payload,
                updateStepData_inProgress: false,
                updateStepData: null
            };

        //get step data
        case GET_STEP_DATA:
            return { ...state, getStepData_inProgress: true, getStepData: null, getStepData_error: null };

        case GET_STEP_DATA_SUCCESS:
            return { ...state, getStepData: action.payload, getStepData_inProgress: false, getStepData_error: null };
        case GET_STEP_DATA_ERROR:
            return { ...state, getStepData_error: action.payload, getStepData_inProgress: false, getStepData: null };

        case UPLOAD_REPORT:
            return { ...state, uploadReport_inProgress: true };
        case UPLOAD_REPORT_SUCCESS:
            return { ...state, uploadReport_inProgress: false };

        case DOWNLOAD_REPORT:
            return { ...state, downloadReport_inProgress: true };
        case DOWNLOAD_REPORT_SUCCESS:
            return { ...state, downloadReport_inProgress: false };
        default:
            return state;
    }
};

export default combineReducers({
    adminReportReducer: adminReportReducer,
    commonReportReducer: commonReportReducer
});
