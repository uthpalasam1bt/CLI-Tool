import { call, put, takeLatest } from '@redux-saga/core/effects';
import apiHandler from '../../../middlewares/connectApi';
import constants from '../constants';

import { getError } from '../../../helpers/apiHelper';
import NotificationHelper from '../../../helpers/NotificationHelper';
import { history } from '../../../redux/store';

import {
    getWorkflowStep_inProgress,
    getWorkflowStep_success,
    getWorkflowStep_error,
    updateWorkflowStep_inProgress,
    updateWorkflowStep_success,
    updateWorkflowStep_error,
    getAssignUserList_inProgress,
    getAssignUserList_success,
    getAssignUserList_error,
    updateAssignUser_inProgress,
    updateAssignUser_error,
    getAssignedUser_inProgress,
    getAssignedUser_success,
    getAssignedUser_error,
    abort_inProgress,
    abort_success,
    abort_error
} from '../actions/stepDataActions';
import { getScheme } from '../../scheme/actions/schemeActions';

import { ACTION_FAILED } from '../../../config/constants';
import { getWorkFlows } from '../actions/workflowActions';

// uncomment this to use stepTemplates step datasets
// import { sampleTemplatesStepDataMap } from '../../schemeOptions/stepTemplates/sampleDataset/stepDataMapper';

// uncomment this to use registration workflow step datasets
// import { stepTemplatesDatasetMap } from '../../schemeOptions/sampleWorkflows/registration/sampleDataset/stepDataMapper';

// uncomment this to use scheme name change step datasets
// import { schemeNameChangeDataMap } from '../../schemeOptions/updates/schName/sampleDataset/stepDataMapper';

// uncomment this to use multiClient step datasets
// import { multiClientDataMap } from '../../multiClient/sampleDataset/stepDataMapper';

const {
    UPDATE_WORKFLOW_STEP_REQUEST,
    GET_WORKFLOW_STEP_REQUEST,
    GET_ASSIGN_USER_LIST,
    UPDATE_ASSIGN_USER_REQUEST,
    GET_ASSIGNED_USER_REQUEST,
    REQUEST_ABORT
} = constants;

export function* getWorkflowStep(data) {
    // uncomment this when using sample datasets
    // const { workflow, step } = data.payload;
    try {
        yield put(getWorkflowStep_inProgress());

        // api call - get step data from BE
        const { data: result = {} } = yield call(apiHandler.getWorkflowStep, data);

        /**
         * to use stepTemplates sample step data
         * comment above api call and
         * uncomment below
         */
        // const result = sampleTemplatesStepDataMap[workflow][step]();

        /**
         * to use sample workflows (registration & scheme name change) step data
         * comment above api call and
         * uncomment below
         */
        // const result = stepTemplatesDatasetMap[workflow][step]();

        /**
         * to use scheme name change step data
         * comment above api call and
         * uncomment below
         */
        // const result = schemeNameChangeDataMap[workflow][step]();

        /**
         * to use multiclient step data
         * comment above api call and
         * uncomment below
         */
        // const result = multiClientDataMap[workflow][step]();

        yield put(getWorkflowStep_success(result.content));
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while getting  data.');
        yield put(getWorkflowStep_error(error));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* updateWorkflowStep(data) {
    const { rest, entityId, loggedUser, isMultiClient } = data.payload;
    try {
        yield put(updateWorkflowStep_inProgress());
        const { data: result = {} } = yield call(apiHandler.updateWorkflowStep, data);
        yield put(updateWorkflowStep_success(result.content));
        if (data.callback) {
            try {
                data.callback(result.content);
            } catch (e) {
                console.log('callback err', e);
            }
        }
        if (rest && rest.message) NotificationHelper.getInstance().success(rest.message);
        if (rest && rest.fetchEntityDataAfterSubmit) yield put(getScheme({ entityId }));
        if (rest && rest.fetchWorkflowAfterSubmit) yield put(getWorkFlows({ doFilter: true, entityId, loggedUser, isMultiClient }));
        if (rest && rest.navigateAfterSubmit) history.push(`/${rest.navigateAfterSubmit}`); // if need to navigate navigateAfterSubmit should be route ex: home
    } catch (error) {
        if (data.callback) {
            try {
                data.callback({});
            } catch (e) {}
        }
        const errorObj = getError(error, ACTION_FAILED);
        yield put(updateWorkflowStep_error(errorObj.message));
        if (errorObj.message !== 'Your dataset is outdated. Please re-try with the latest dataset.')
            NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* updateAssignUser(data) {
    try {
        yield put(updateAssignUser_inProgress());
        yield call(apiHandler.updateAssignUserReg, data);
    } catch (error) {
        const errorObj = getError(error, 'An unexpected error occurred while update Assign User.');
        yield put(updateAssignUser_error(errorObj.message));
        yield NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* getAssignUserList(data) {
    try {
        yield put(getAssignUserList_inProgress());
        const result = yield call(apiHandler.getUsersForSpecificClaim, data);
        yield put(getAssignUserList_success(result));
    } catch (error) {
        const errorObj = getError(error, `Something went wrong.`);
        yield put(getAssignUserList_error(error));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* getAssignedUser(data) {
    try {
        yield put(getAssignedUser_inProgress());
        const result = yield call(apiHandler.getAssignUser, data);
        yield put(getAssignedUser_success(result));
    } catch (error) {
        yield put(getAssignedUser_error(error));
    }
}

export function* abortRegistration(data) {
    // const { schemeId } = data.payload;
    try {
        yield put(abort_inProgress());
        yield call(apiHandler.abort, data);
        yield put(abort_success());
        // yield put(getWorkflow_request({ schemeId }));
        NotificationHelper.getInstance().success('Successfully aborted.');
    } catch (error) {
        yield put(abort_error(error));
    }
}

export default function* workflowStepDataSagas() {
    yield* [
        takeLatest(GET_WORKFLOW_STEP_REQUEST, getWorkflowStep),
        takeLatest(UPDATE_WORKFLOW_STEP_REQUEST, updateWorkflowStep),
        takeLatest(GET_ASSIGN_USER_LIST, getAssignUserList),
        takeLatest(UPDATE_ASSIGN_USER_REQUEST, updateAssignUser),
        takeLatest(GET_ASSIGNED_USER_REQUEST, getAssignedUser),
        takeLatest(REQUEST_ABORT, abortRegistration)
    ];
}
