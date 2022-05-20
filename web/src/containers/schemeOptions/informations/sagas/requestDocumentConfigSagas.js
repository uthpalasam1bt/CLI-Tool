import { takeEvery, put, call } from 'redux-saga/effects';

import { getError } from '../../../../helpers/apiHelper';
import apiHandler from '../../../../middlewares/connectApi';

import { GET_DOCUMENT_CONFIG_REQUEST } from '../constants';

import {
    doRequestDocumentConfigInProgress,
    doRequestDocumentConfigSuccess,
    doRequestDocumentConfigFailed
} from '../actions/documentDirectoryActions';

export function* getDocumentConfig(data) {
    try {
        yield put(doRequestDocumentConfigInProgress());
        const result = yield call(apiHandler.getDocumentConfig, data.payload);
        yield put(doRequestDocumentConfigSuccess(result));
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while fetching document config');
        yield put(doRequestDocumentConfigFailed(errorObj));
    }
}

export default function* requestDocumentConfigSagas() {
    yield* [takeEvery(GET_DOCUMENT_CONFIG_REQUEST, getDocumentConfig)];
}
