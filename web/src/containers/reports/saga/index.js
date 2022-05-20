import {
    updateReportDataSuccess,
    updateReportDataError,
    getStepReportDataSuccess,
    getStepReportDataError
} from '../actions';
import { GET_STEP_DATA, UPDATE_REPORT_DATA } from '../constants/commonConstatnt';
import { takeEvery, put, call } from 'redux-saga/effects';
import NotificationHelper from '../../../UILibrary/helpers/NotificationHelper';
import reportApi from '../../../middlewares/reportApi';
import { getError } from '../../../helpers/apiHelper';

function* updateReportStepData(action) {
    try {
        const result = yield call(reportApi.updateReportStepData, action.payload.payload);
        if (result && result.data && result.data.result) {
            yield put(updateReportDataSuccess(result.data.content));
            if (action.payload.cb) action.payload.cb();
        }
    } catch (error) {
        const errorObj = getError(error, 'Access denied.');
        if (errorObj && errorObj.message) {
            NotificationHelper.getInstance().error(errorObj.message);
        } else {
            NotificationHelper.getInstance().error('step action failed');
        }
        yield put(updateReportDataError(error));
    }
}

function* getReportStepData(action) {
    try {
        const result = yield call(reportApi.getStepReportData, action.payload);
        if (result && result.data && result.data.result) {
            yield put(getStepReportDataSuccess(result.data.content));
        } else {
            throw new Error(' failed');
        }
    } catch (error) {
        NotificationHelper.getInstance().error('getStep data Failed');
        yield put(getStepReportDataError(error));
    }
}

export default function* commonReportSagas() {
    yield* [takeEvery(UPDATE_REPORT_DATA, updateReportStepData)];
    yield* [takeEvery(GET_STEP_DATA, getReportStepData)];
}
