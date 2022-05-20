import { takeEvery, put, call } from 'redux-saga/effects';

import { DO_LOGOUT_REQUEST } from '../constants';
import { doLogoutInProgress, doLogoutSuccess, doLogoutFailed } from '../actions/logoutActions';
import apiHandler from '../../../middlewares/connectApi';
import { getError } from '../../../helpers/apiHelper';
import { LOGIN_FAIL } from '../../../config/constants';
import AwsIotSingleton from '../../../helpers/awsIot';
export function* doLogout(data) {
    try {
        yield put(doLogoutInProgress());
        yield call(apiHandler.doLogout, data);
        AwsIotSingleton.endConnection();
        yield put(doLogoutSuccess());
    } catch (error) {
        const errorObj = getError(error, LOGIN_FAIL);
        yield put(doLogoutFailed(errorObj));
    }
}
export default function* logoutSagas() {
    yield* [takeEvery(DO_LOGOUT_REQUEST, doLogout)];
}
