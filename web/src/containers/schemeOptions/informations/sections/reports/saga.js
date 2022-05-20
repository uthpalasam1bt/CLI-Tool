import { takeEvery, put, call } from 'redux-saga/effects';

import { getError } from '../../../../../helpers/apiHelper';
import apiHandler from '../../../../../middlewares/connectApi';

import { GET_REPORT_DATA_REQUEST, GET_SELECTED_REPORT_DATA_REQUEST } from './constants';
import {
    doRequestReportInProgress,
    doRequestReportSuccess,
    doRequestReportFailed,
    doRequestSelectedReportInProgress,
    doRequestSelectedReportSuccess,
    doRequestSelectedReportFailed
} from './action';

export function* getInformationReportData(argu) {
    try {
        yield put(doRequestReportInProgress());
        const result = yield call(apiHandler.getInformationReportData, argu);
        yield put(doRequestReportSuccess(result));
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while getting document data');
        yield put(doRequestReportFailed(errorObj));
    }
}

export function* getSelectedInformationReportData(argu) {
    try {
        yield put(doRequestSelectedReportInProgress());
        const result = yield call(apiHandler.getSelectedInformationDocumentData, argu);
        // if (argu.payload.section === 'performancereports') {
        //   result.data.content.comments = [];
        // }
        yield put(doRequestSelectedReportSuccess(result));
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while getting report data');
        yield put(doRequestSelectedReportFailed(errorObj));
    }
}

export default function* requestDocumentSagas() {
    yield* [
        takeEvery(GET_REPORT_DATA_REQUEST, getInformationReportData),
        takeEvery(GET_SELECTED_REPORT_DATA_REQUEST, getSelectedInformationReportData)
    ];
}
