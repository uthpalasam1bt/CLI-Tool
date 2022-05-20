import { takeEvery, put, call } from 'redux-saga/effects';
import apiHandler from '../../middlewares/connectApi';
import { getAssignUserListInprogress, getAssignUserListFailed, getAssignUserListSuccess } from './actions';
import { GET_ASSIGN_USER_LIST, UPDATE_ASSIGN_USER } from './constants';
import AwsIotSingleton from '../../helpers/awsIot';
//import { getWorkFlowPositionSuccess } from '../../containers/schemeOptions/registration/actions'; //TODO:REMOVE IMPORT
import { getError } from '../../helpers/apiHelper';
import NotificationHelper from '../../helpers/NotificationHelper';

export function* getAssignUserList(data) {
    try {
        yield put(getAssignUserListInprogress());
        const result = yield call(apiHandler.getUsersForSpecificClaim, data);
        yield put(getAssignUserListSuccess(result));
    } catch (error) {
        yield put(getAssignUserListFailed(error));
    }
}

export function* updateAssignUser(data) {
    const { isActiveWorkflow } = data.payload;
    try {
        const result = yield call(apiHandler.updateAssignUser, data);
        if (
            data &&
            data.payload &&
            data.payload.schemeId &&
            data.payload.step &&
            data.payload.assignedUser &&
            result &&
            result.status === 200 &&
            isActiveWorkflow
        ) {
            const topic = `/${data.payload.schemeId}/${data.payload.step}`;
            AwsIotSingleton.publishPayloadWithinSocket(topic, { assignUser: data.payload.assignedUser });
        }

        if (result && result.data && result.data.content && result.data.content.workflow) {
            // const newObjct = {
            //   data: result.data.content
            // };
            //yield put(getWorkFlowPositionSuccess(newObjct));
        }
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while update Assign User');
        yield NotificationHelper.getInstance().error(errorObj.message);
    }
}

export default function* userAssignSaga() {
    yield* [takeEvery(GET_ASSIGN_USER_LIST, getAssignUserList)];
    yield* [takeEvery(UPDATE_ASSIGN_USER, updateAssignUser)];
}
