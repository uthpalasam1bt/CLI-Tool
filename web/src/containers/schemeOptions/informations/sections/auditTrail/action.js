import {
    GET_AUDIT_TRAIL_DATA_REQUEST,
    GET_AUDIT_TRAIL_DATA_INPROGRESS,
    GET_AUDIT_TRAIL_DATA_SUCCESS,
    GET_AUDIT_TRAIL_DATA_FAILED
} from './constants';

const doRequestAuditTrail = payload => ({
    type: GET_AUDIT_TRAIL_DATA_REQUEST,
    payload
});
const doRequestAuditTrailInProgress = () => ({
    type: GET_AUDIT_TRAIL_DATA_INPROGRESS
});
const doRequestAuditTrailSuccess = result => ({
    type: GET_AUDIT_TRAIL_DATA_SUCCESS,
    result
});
const doRequestAuditTrailFailed = error => ({
    type: GET_AUDIT_TRAIL_DATA_FAILED,
    error
});

export { doRequestAuditTrail, doRequestAuditTrailInProgress, doRequestAuditTrailSuccess, doRequestAuditTrailFailed };
