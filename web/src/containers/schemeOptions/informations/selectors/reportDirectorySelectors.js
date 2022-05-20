import { createSelector } from 'reselect';

const reportDirectoryReducer = state => state.reportDirectoryReducer;

const report_config_inProgress = () =>
    createSelector(
        reportDirectoryReducer,
        currentState => currentState.report_config_inProgress
    );

const report_config = () =>
    createSelector(
        reportDirectoryReducer,
        currentState => currentState.report_config
    );

const report_config_error = () =>
    createSelector(
        reportDirectoryReducer,
        currentState => currentState.report_config_error
    );

export { report_config_inProgress, report_config, report_config_error };
