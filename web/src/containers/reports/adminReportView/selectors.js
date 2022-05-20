import { createSelector } from 'reselect';

const reportReducer = state => state.reportReducer;

const getReportTypes_inProgress = () =>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.getReportTypes_inProgress
    );
const getAdminReportTypes = () =>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.report_types
    );
const getReportTypes_error = () =>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.getReportTypes_error
    );

const getUploadReportSchemes_inProgress = () =>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.getUploadReportSchemes_inProgress
    );
const getUploadReportSchemes = () =>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.upload_schemes
    );
const getUploadSchemes_error = () =>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.getUploadScheme_error
    );

const getGenerateReportSchemes_inProgress = () =>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.getGenerateReportSchemes_inProgress
    );
const getGenerateReportSchemes = () =>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.generate_schemes
    );
const getGenerateSchemes_error = () =>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.getGenerateScheme_error
    );

const getReportUploadUrl_inProgress = () =>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.getUploadReportUrl_inProgress
    );
const getUploadUrl = () =>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.upload_url
    );
const getUploadUrl_error = () =>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.getUploadUrl_error
    );

const getUploadedReports = () =>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.uploadedReports
    );

    //
    const generateReportValidation_inProgress=()=>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.generateReportValidate_inProgress
    )


const generateReportValidationSuccess=()=>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.generateReportValidation_success
    )


const generateReportValidationError=()=>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.generateReportValidation_error
    )
    //

const generateReport_inProgress=()=>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.generate_inProgress
    )


const generateReportSuccess=()=>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.generate_success
    )


const generateReportError=()=>
    createSelector(
        reportReducer,
        currentState => currentState.adminReportReducer.generate_error
    )

export {
    getReportTypes_inProgress,
    getAdminReportTypes,
    getReportTypes_error,
    getUploadReportSchemes_inProgress,
    getUploadReportSchemes,
    getUploadSchemes_error,
    getUploadUrl,
    getUploadUrl_error,
    getReportUploadUrl_inProgress,
    getUploadedReports,
    generateReportValidation_inProgress,
    generateReportValidationSuccess,
    generateReportValidationError,
    generateReport_inProgress,
    generateReportSuccess,
    generateReportError,
    getGenerateReportSchemes_inProgress,
    getGenerateReportSchemes,
    getGenerateSchemes_error,
};
