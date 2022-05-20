import {
    GENERATE_CHARTS_DOCUMENT_REQUEST,
    GENERATE_CHARTS_DOCUMENT_SUCCESS,
    GENERATE_CHARTS_DOCUMENT_ERROR,
    GENERATE_ADHOC_REPORT_REQUEST,
    GENERATE_ADHOC_REPORT_SUCCESS,
    GENERATE_ADHOC_REPORT_ERROR
} from '../constants';

const initialState = {
    // Manages dashboard charts document generation request in-progress status
    isChartsDocumentGenerationRequestInProgress: false,

    // Manages dashboard ad hoc report generation request in-progress status
    isAdHocReportGenerationRequestInProgress: false
};

const dashboardDocumentsGenerationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GENERATE_CHARTS_DOCUMENT_REQUEST:
            return { ...state, isChartsDocumentGenerationRequestInProgress: true };
        case GENERATE_CHARTS_DOCUMENT_SUCCESS:
            return { ...state, isChartsDocumentGenerationRequestInProgress: false };
        case GENERATE_CHARTS_DOCUMENT_ERROR:
            return { ...state, isChartsDocumentGenerationRequestInProgress: false };

        case GENERATE_ADHOC_REPORT_REQUEST:
            return { ...state, isAdHocReportGenerationRequestInProgress: true };
        case GENERATE_ADHOC_REPORT_SUCCESS:
            return { ...state, isAdHocReportGenerationRequestInProgress: false };
        case GENERATE_ADHOC_REPORT_ERROR:
            return { ...state, isAdHocReportGenerationRequestInProgress: false };

        default:
            return state;
    }
};

export default dashboardDocumentsGenerationReducer;
