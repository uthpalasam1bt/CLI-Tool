import { takeEvery, put, call } from 'redux-saga/effects';

import { getError } from '../../../../helpers/apiHelper';
import apiHandler from '../../../../middlewares/connectApi';

import { GET_REPORT_CONFIG_REQUEST } from '../constants';

import {
    doRequestReportConfigInProgress,
    doRequestReportConfigSuccess,
    doRequestReportConfigFailed
} from '../actions/reportDirectoryActions';

export function* getReportConfig(data) {
    try {
        yield put(doRequestReportConfigInProgress());
        const result = yield call(apiHandler.getReportConfig, data.payload);
        yield put(doRequestReportConfigSuccess(result));
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while fetching document config');
        yield put(doRequestReportConfigFailed(errorObj));
    }
}

export default function* requestDocumentConfigSagas() {
    yield* [takeEvery(GET_REPORT_CONFIG_REQUEST, getReportConfig)];
}
