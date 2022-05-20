import { call, put, takeLatest } from '@redux-saga/core/effects';
import _ from 'lodash';

import apiHandler from '../../../middlewares/connectApi';
import constants from '../constants';

import { getError } from '../../../helpers/apiHelper';
import NotificationHelper from '../../../helpers/NotificationHelper';

import { getOutputFiles_inProgress, getOutputFiles_success, getOutputFiles_error } from '../actions/commonActions';

const { REQUEST_GET_OUTPUT_FILES } = constants;

export function* getOutputFiles(request) {
    try {
        yield put(getOutputFiles_inProgress());
        const { data: result = {} } = yield call(apiHandler.getOutputFiles, request);
        yield put(getOutputFiles_success(result.content));
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while getting workflow data');
        yield put(getOutputFiles_error(error));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export default function* commonActionSagas() {
    yield* [takeLatest(REQUEST_GET_OUTPUT_FILES, getOutputFiles)];
}
