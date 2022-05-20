import { takeEvery, put, call } from 'redux-saga/effects';

import { getError } from '../../../../helpers/apiHelper';
import apiHandler from '../../../../middlewares/connectApi';

import { GET_INFORMATION_DIRECTORY_CONFIG_REQUEST, GET_INFORMATION_DIRECTORY_DATA_REQUEST } from '../constants';

import {
    doRequestInformationDirectoryConfigInProgress,
    doRequestInformationDirectoryConfigSuccess,
    doRequestInformationDirectoryConfigFailed,
    doRequestInformationDirectoryDataInProgress,
    doRequestInformationDirectoryDataSuccess,
    doRequestInformationDirectoryDataFailed
} from '../actions/InformationDirectoryActions';

export function* getInformationDirectoryConfigs(data) {
    try {
        yield put(doRequestInformationDirectoryConfigInProgress());
        const result = yield call(apiHandler.getInformationDirectoryConfigs, data);
        yield put(doRequestInformationDirectoryConfigSuccess(result));
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while fetching document config');
        yield put(doRequestInformationDirectoryConfigFailed(errorObj));
    }
}

export function* getInformationDirectoryData(data) {
    try {
        yield put(doRequestInformationDirectoryDataInProgress());
        const result = yield call(apiHandler.getInformationDirectoryData, data);
        yield put(doRequestInformationDirectoryDataSuccess(result));
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while fetching document config');
        yield put(doRequestInformationDirectoryDataFailed(errorObj));
    }
}

export default function* requestInformationDirectoryConfigSagas() {
    yield* [
        takeEvery(GET_INFORMATION_DIRECTORY_CONFIG_REQUEST, getInformationDirectoryConfigs),
        takeEvery(GET_INFORMATION_DIRECTORY_DATA_REQUEST, getInformationDirectoryData)
    ];
}
