import { takeEvery, put, call } from 'redux-saga/effects';
import {
    doLoginInProgress,
    doLoginSuccess,
    doLoginFailed,
    getFLNames_inProgress,
    getFLNames_success,
    getFLNames_error
} from '../actions/loginActions';
import { getUserNotifications } from '../../layout/actions';
import apiHandler from '../../../middlewares/connectApi';
import { DO_LOGIN_REQUEST, GET_USER_FL_NAME_REQUEST, GET_USER_OTP_NUMBER_REQUEST } from '../constants';

export function* doLogin(data) {
    try {
        yield put(doLoginInProgress());
        const result = yield call(apiHandler.doLogin, data);
        yield put(doLoginSuccess(result));
        if (result && result.data && result.data.content.idToken) {
            yield put(
                getUserNotifications({
                    isAll: true,
                    userEmail: result.data.content.idToken.payload.email
                })
            );
        }
    } catch (error) {
        //const errorObj = getError(error, LOGIN_FAIL);
        let {
            response: { data }
        } = error;
        yield put(doLoginFailed(data));
    }
}

export function* getUserFLNameByEmail(data) {
    try {
        yield put(getFLNames_inProgress());
        const result = yield call(apiHandler.getUserName, data);
        let { firstName, lastName, phoneNumber, primaryRole } = result.data.content;
        data.getFirstAndLastName(firstName, lastName, phoneNumber, primaryRole);
        yield put(getFLNames_success(result));
    } catch (error) {
        yield put(getFLNames_error(error));
    }
}

export function* otpNumberValidate(data) {
    try {
        const result = yield call(apiHandler.otpValidate, data);
        let { content } = result.data;
        data.callBack(content);
    } catch (error) {
        data.callBack({ error: true });
    }
}

export default function* loginSagas() {
    yield* [
        takeEvery(DO_LOGIN_REQUEST, doLogin),
        takeEvery(GET_USER_FL_NAME_REQUEST, getUserFLNameByEmail),
        takeEvery(GET_USER_OTP_NUMBER_REQUEST, otpNumberValidate)
    ];
}
