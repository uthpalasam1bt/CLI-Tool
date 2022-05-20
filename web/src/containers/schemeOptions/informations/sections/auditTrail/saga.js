import { takeEvery, put, call } from 'redux-saga/effects';

import { getError } from '../../../../../helpers/apiHelper';
import apiHandler from '../../../../../middlewares/connectApi';

import { GET_AUDIT_TRAIL_DATA_REQUEST } from './constants';
import { doRequestAuditTrailInProgress, doRequestAuditTrailSuccess, doRequestAuditTrailFailed } from './action';

export function* getAuditTrailData(argu) {
    try {
        yield put(doRequestAuditTrailInProgress());
        const result = yield call(apiHandler.getAuditTrail, argu);
        yield put(doRequestAuditTrailSuccess(result));
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while getting audit trail data');
        yield put(doRequestAuditTrailFailed(errorObj));
    }
}

export default function* requestAuditTrailSagas() {
    yield* [takeEvery(GET_AUDIT_TRAIL_DATA_REQUEST, getAuditTrailData)];
}
