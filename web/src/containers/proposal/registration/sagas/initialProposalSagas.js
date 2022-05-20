import { takeEvery, put, call } from 'redux-saga/effects';
import { DO_SAVE_PROPOSAL_FORM, DO_GET_PROPOSAL_NAMES } from '../constants';
import { DO_GET_PROPOSAL_FORM } from '../constants';
import {
    doSaveProposalFormProgress,
    doSaveProposalFormSuccess,
    doSaveProposalFormFailed,
    doGetProposalFormProgress,
    doGetProposalFormSuccess,
    doGetProposalFormFailed,
    doGetProposalNamesProgress,
    doGetProposalNamesSuccess,
    doGetProposalNamesFailed
} from '../actions/initialProposalActions';
import apiHandler from '../../../../middlewares/connectApi';
import { getError } from '../../../../helpers/apiHelper';

export function* doProposalFormSave(data) {
    try {
        yield put(doSaveProposalFormProgress());
        const result = yield call(apiHandler.doInitialProposalFormSave, data);
        yield put(doSaveProposalFormSuccess(result));
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while saving proposal data');
        yield put(doSaveProposalFormFailed(errorObj));
    }
}

// get the data from the backend
export function* doProposalFormGet(data) {
    try {
        yield put(doGetProposalFormProgress());
        const result = yield call(apiHandler.doInitialProposalFormGet, data);
        yield put(doGetProposalFormSuccess(result));
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while getting proposal data');
        yield put(doGetProposalFormFailed(errorObj));
    }
}

export function* doProposalNamesGet(data) {
    try {
        yield put(doGetProposalNamesProgress());
        const result = yield call(apiHandler.doInitialProposalNamesGet, data);
        yield put(doGetProposalNamesSuccess(result));
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while getting proposal names');
        yield put(doGetProposalNamesFailed(errorObj));
    }
}

export default function* initialProposalRequestFormSagas() {
    yield* [
        takeEvery(DO_SAVE_PROPOSAL_FORM, doProposalFormSave),
        takeEvery(DO_GET_PROPOSAL_FORM, doProposalFormGet),
        takeEvery(DO_GET_PROPOSAL_NAMES, doProposalNamesGet)
    ];
}
