import { takeEvery, put, call } from 'redux-saga/effects';

import { getError } from '../../../../../helpers/apiHelper';
import apiHandler from '../../../../../middlewares/connectApi';

import { GET_DOCUMENT_DATA_REQUEST, GET_SELECTED_DOCUMENT_DATA_REQUEST } from './constants';
import {
    doRequestDocumentInProgress,
    doRequestDocumentSuccess,
    doRequestDocumentFailed,
    doRequestSelectedDocumentInProgress,
    doRequestSelectedDocumentSuccess,
    doRequestSelectedDocumentFailed
} from './action';

export function* getInformationDocumentData(argu) {
    try {
        yield put(doRequestDocumentInProgress());
        const result = yield call(apiHandler.getInformationDocumentData, argu);
        yield put(doRequestDocumentSuccess(result));
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while getting document data');
        yield put(doRequestDocumentFailed(errorObj));
    }
}

export function* getSelectedInformationDocumentData(argu) {
    try {
        yield put(doRequestSelectedDocumentInProgress());
        const result = yield call(apiHandler.getSelectedInformationDocumentData, argu);

        yield put(doRequestSelectedDocumentSuccess(result));
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while getting document data');
        yield put(doRequestSelectedDocumentFailed(errorObj));
    }
}

export default function* requestDocumentSagas() {
    yield* [
        takeEvery(GET_DOCUMENT_DATA_REQUEST, getInformationDocumentData),
        takeEvery(GET_SELECTED_DOCUMENT_DATA_REQUEST, getSelectedInformationDocumentData)
    ];
}
