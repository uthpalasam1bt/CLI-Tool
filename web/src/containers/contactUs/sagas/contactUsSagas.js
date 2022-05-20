import { takeEvery, put, call } from 'redux-saga/effects';

import { DO_CONTACT_US_REQUEST } from '../constants';
import { doContactUsInProgress, doContactUsSuccess, doContactUsFailed } from '../actions/contactUsActions';
import apiHandler from '../../../middlewares/connectApi';
import { getError } from '../../../helpers/apiHelper';
import { DETAILS_SENDING_FAILED } from '../../../config/constants';
import NotificationHelper from '../../../helpers/NotificationHelper';

export function* doContactUs(data) {
    try {
        yield put(doContactUsInProgress());
        const result = yield call(apiHandler.doContactUs, data);
        yield put(doContactUsSuccess(result));
    } catch (error) {
        const errorMessage = getError(error, DETAILS_SENDING_FAILED);
        NotificationHelper.getInstance().error(errorMessage.message);
        yield put(doContactUsFailed(errorMessage));
    }
}
export default function* connectUsSagas() {
    yield* [takeEvery(DO_CONTACT_US_REQUEST, doContactUs)];
}
