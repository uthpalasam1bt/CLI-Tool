import { createSelector } from 'reselect';
const informationReportReducer = state => state.informationReportReducer;

const report_data_inProgress = () =>
    createSelector(
        informationReportReducer,
        currentState => currentState.report_data_inProgress
    );
const report_data = () =>
    createSelector(
        informationReportReducer,
        currentState => currentState.report_data
    );
const report_data_error = () =>
    createSelector(
        informationReportReducer,
        currentState => currentState.report_data_error
    );
const selected_report_data_inProgress = () =>
    createSelector(
        informationReportReducer,
        currentState => currentState.selected_report_data_inProgress
    );
const selected_report_data = () =>
    createSelector(
        informationReportReducer,
        currentState => currentState.selected_report_data
    );
const selected_report_data_error = () =>
    createSelector(
        informationReportReducer,
        currentState => currentState.selected_report_data_error
    );

export {
    report_data_inProgress,
    report_data,
    report_data_error,
    selected_report_data_inProgress,
    selected_report_data,
    selected_report_data_error
};
