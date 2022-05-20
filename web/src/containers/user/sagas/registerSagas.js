import { takeEvery, put, call } from 'redux-saga/effects';

import { DO_REGISTER_REQUEST } from '../constants';
import { doRegisterInProgress, doRegisterSuccess, doRegisterFailed } from '../actions/registerActions';
import apiHandler from '../../../middlewares/connectApi';
import { getError } from '../../../helpers/apiHelper';
import { REGISTRATION_FAILED } from '../../../config/constants';

export function* doRegister(data) {
    try {
        yield put(doRegisterInProgress());
        yield call(apiHandler.doRegister, data);
        yield put(doRegisterSuccess());
    } catch (error) {
        const errorObj = getError(error, REGISTRATION_FAILED);
        yield put(doRegisterFailed(errorObj));
    }
}
export default function* registerSagas() {
    yield* [takeEvery(DO_REGISTER_REQUEST, doRegister)];
}
