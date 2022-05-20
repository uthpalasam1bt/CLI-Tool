import {
    GET_REPORT_DATA_INPROGRESS,
    GET_REPORT_DATA_SUCCESS,
    GET_REPORT_DATA_FAILED,
    GET_SELECTED_REPORT_DATA_INPROGRESS,
    GET_SELECTED_REPORT_DATA_SUCCESS,
    GET_SELECTED_REPORT_DATA_FAILED
} from './constants';

const initialStateReports = {
    report_data: null,
    report_data_inProgress: false,
    report_data_error: null
};

const initialStateSelectedReports = {
    selected_report_data_inProgress: false,
    selected_report_data: null,
    selected_report_data_error: null
};

export default function reportReducer(state = { ...initialStateReports, ...initialStateSelectedReports }, action = {}) {
    switch (action.type) {
        case GET_REPORT_DATA_INPROGRESS:
            return {
                ...state,
                ...initialStateReports,
                report_data_inProgress: true,
                selected_report_data_inProgress: true,
                report_data: null,
                selected_report_data: null
            };

        case GET_REPORT_DATA_SUCCESS:
            return { ...state, ...initialStateReports, report_data: action.result.data.content };

        case GET_REPORT_DATA_FAILED:
            return { ...state, ...initialStateReports, selected_report_data_error: action.error };

        case GET_SELECTED_REPORT_DATA_INPROGRESS:
            return {
                ...state,
                ...initialStateSelectedReports,

                selected_report_data_inProgress: true,
                selected_report_data: null
            };

        case GET_SELECTED_REPORT_DATA_SUCCESS:
            return {
                ...state,
                ...initialStateSelectedReports,

                selected_report_data: action.result.data.content
            };

        case GET_SELECTED_REPORT_DATA_FAILED:
            return {
                ...state,
                ...initialStateSelectedReports,

                selected_report_data_error: action.error
            };

        default:
            return state;
    }
}
