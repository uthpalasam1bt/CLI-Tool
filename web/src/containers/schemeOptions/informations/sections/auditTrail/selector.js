import { createSelector } from 'reselect';
const auditTrailReducer = state => state.auditTrailReducer;

const audit_trail_data_inProgress = () =>
    createSelector(
        auditTrailReducer,
        currentState => currentState.audit_trail_data_inProgress
    );
const audit_trail_data = () =>
    createSelector(
        auditTrailReducer,
        currentState => currentState.audit_trail_data
    );
const audit_trail_data_error = () =>
    createSelector(
        auditTrailReducer,
        currentState => currentState.audit_trail_data_error
    );

export { audit_trail_data_inProgress, audit_trail_data, audit_trail_data_error };
