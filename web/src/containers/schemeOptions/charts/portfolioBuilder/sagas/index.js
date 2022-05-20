import { takeEvery, put, call } from 'redux-saga/effects';
import apiHandler from '../../../../../middlewares/connectApi';
import { getError } from '../../../../../helpers/apiHelper';
import NotificationHelper from '../../../../../helpers/NotificationHelper';
import { history } from '../../../../../redux/store';

import {
    getInitialValuesSuccess,
    getInitialValuesFail,
    rejectInitialProposalSuccess,
    rejectInitialProposalFail,
    paAnalyzeInProgress,
    paAnalyzeSuccess,
    paAnalyzeError,
    rejectInitialProposalInprogress
} from '../actions';

import { DO_GET_INITIAL_VALUES, DO_REJECT_INITIAL_PROPOSAL, PA_ANALYZE_REQUEST, EXECUTION_ERROR } from '../constants';

export function* getInitialValuesHandler(action) {
    try {
        const result = yield call(apiHandler.getUpdatedTargerReturn, action.data);

        if (result && result.data) {
            const { content } = result.data;
            yield put(getInitialValuesSuccess(content));
        }
    } catch (error) {
        const errorObj = getError(error, EXECUTION_ERROR);
        yield put(getInitialValuesFail(error));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}
export function* rejectInitialProposalHandler(action) {
    try {
        yield put(rejectInitialProposalInprogress());
        const result = yield call(apiHandler.rejectInitialProposal, action.data);
        const { schemeId, schemeName, flowKey } = action.data;

        if (result && result.data) {
            const { content } = result.data;
            yield put(rejectInitialProposalSuccess(content));
            history.push(`/scheme`);
            history.push(`/scheme/options/active-workflow/${schemeId}/${schemeName}`);
        }
    } catch (error) {
        const errorObj = getError(error, EXECUTION_ERROR);
        yield put(rejectInitialProposalFail(error));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* paAnalyze(data) {
    const { payload } = data;
    try {
        yield put(paAnalyzeInProgress());
        const result = yield call(apiHandler.portfolioAnalyze, payload);
        if (result) {
            yield put(paAnalyzeSuccess());
        }
    } catch (error) {
        const errorObj = getError(error, EXECUTION_ERROR);
        yield put(paAnalyzeError(error));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export default function* portfolioSagas() {
    yield* [
        takeEvery(DO_GET_INITIAL_VALUES, getInitialValuesHandler),
        takeEvery(DO_REJECT_INITIAL_PROPOSAL, rejectInitialProposalHandler),
        takeEvery(PA_ANALYZE_REQUEST, paAnalyze)
    ];
}
