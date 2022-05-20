import { call, put, takeLatest } from '@redux-saga/core/effects';
import apiHandler from '../../../middlewares/connectApi';
import apiHandlerConnect from '../../../middlewares/activeConnectApi';
import { CHECK_IF_SCHEME_EXISTS, GET_SCHEME_INFORMATION_DATA_REQUEST } from '../constants/schemeOptionConstants';

import { getError } from '../../../helpers/apiHelper';
import NotificationHelper from '../../../helpers/NotificationHelper';

import {
    getSchemeInformationDataSuccess,
    getSchemeInformationDataInprogress,
    getSchemeInformationDataFailed,
    updateSchemeNameAvaliability
} from '../actions/schemeOptionActions';

export function* getSchemeInformationData(data) {
    try {
        yield put(getSchemeInformationDataInprogress());
        const { data: result = {} } = yield call(apiHandler.schemeInformationData, data);
        yield put(getSchemeInformationDataSuccess(result.content));
    } catch (error) {
        const errorObj = getError(error, 'error_getting_workflow');
        yield put(getSchemeInformationDataFailed(error));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

function* checkSchemeName(action) {
    try {
        let result = yield call(apiHandlerConnect.validateSchemeName, action);
        let {
            content: { isSchemeNameAvailable }
        } = result.data;

        if (action.callback) action.callback(isSchemeNameAvailable);

        yield put(updateSchemeNameAvaliability(isSchemeNameAvailable));
    } catch (error) {
        const errorObj = getError(error, 'error');
        NotificationHelper.getInstance().error(errorObj.message);
    }
}
export default function* schemeOptionSagas() {
    yield* [
        takeLatest(GET_SCHEME_INFORMATION_DATA_REQUEST, getSchemeInformationData),
        takeLatest(CHECK_IF_SCHEME_EXISTS, checkSchemeName)
    ];
}
