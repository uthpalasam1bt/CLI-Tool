import { createSelector } from 'reselect';

const reportReducer = state => state.reportReducer;

const updateReportStep_inProgress = () =>
    createSelector(
        reportReducer,
        currentState => currentState.commonReportReducer.updateStepData_inProgress
    );
const updateReportStepData = () =>
    createSelector(
        reportReducer,
        currentState => currentState.commonReportReducer.updateStepData
    );
const updateReportStepError = () =>
    createSelector(
        reportReducer,
        currentState => currentState.commonReportReducer.updateStepData_error
    );

const getStepData_inProgress = () =>
    createSelector(
        reportReducer,
        currentState => currentState.commonReportReducer.getStepData_inProgress
    );
const getStepData = () =>
    createSelector(
        reportReducer,
        currentState => currentState.commonReportReducer.getStepData
    );
const getStepDataError = () =>
    createSelector(
        reportReducer,
        currentState => currentState.commonReportReducer.getStepData_error
    );

const uploadReportProgress = () =>
    createSelector(
        reportReducer,
        currentState => currentState.commonReportReducer.uploadReport_inProgress
    );
const downloadReportProgress = () =>
    createSelector(
        reportReducer,
        currentState => currentState.commonReportReducer.downloadReport_inProgress
    );

export {
    updateReportStep_inProgress,
    updateReportStepData,
    updateReportStepError,
    getStepData_inProgress,
    getStepData,
    getStepDataError,
    uploadReportProgress,
    downloadReportProgress
};
