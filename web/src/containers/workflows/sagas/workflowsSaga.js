import { call, put, takeLatest } from '@redux-saga/core/effects';
import _ from 'lodash';

import apiHandler from '../../../middlewares/connectApi';
import constants from '../constants';

import { getError } from '../../../helpers/apiHelper';
import NotificationHelper from '../../../helpers/NotificationHelper';
import { getPrimaryRole } from '../../../helpers/validateUser';

// uncomment this to use stepTemplates sample workflow
// import stepTemplatesWorkflow from '../../schemeOptions/stepTemplates/sampleDataset/multipleWorkflows.json';

// uncomment this to use registration workflow
// import sampleWorkflows from '../../schemeOptions/updates/registration/sampleDataset/sampleWorkflows.json';

// uncomment this to use scheme name change workflow
// import schemeNameChange from '../../schemeOptions/updates/schName/sampleDataset/schemeNameChange.json';

// uncomment this to use multiClient
// import multiClient from '../../multiClient/multiClient.json';

import {
    getWorkflowsSuccess,
    getWorkflowsInprogress,
    getWorkflowsFailed,
    abortWorkFlowsInprogress,
    abortWorkFlowsSuccess,
    abortWorkFlowsFailed
} from '../actions/workflowActions';
import { sortAndFilterMultiWF } from '../templates/workflowTemplates/worker';

const { GET_SCHEME_WORKFLOWS_REQUEST, REQUEST_ABORT_WORKFLOWS } = constants;

export function* getSchemeWorkflows(request) {
    const { doFilter = true, loggedUser } = request.data;
    const primaryRole = getPrimaryRole(loggedUser);

    try {
        yield put(getWorkflowsInprogress());

        // api for get workflows from BE
        const { data } = yield call(apiHandler.getWorkflow, request.data);
        const result = _.cloneDeep(data);

        /**
         * to use stepTemplates workflow
         * comment above api call and const result = _.cloneDeep(data);
         * then uncomment below const result = _.cloneDeep(stepTemplatesWorkflow);
         */
        // const result = _.cloneDeep(stepTemplatesWorkflow);

        /**
         * to use sample workflows (registration & scheme name change)
         * comment above api call and const result = _.cloneDeep(data);
         * then uncomment below const result = _.cloneDeep(sampleWorkflows);
         */
        // const result = _.cloneDeep(sampleWorkflows);

        // const result = _.cloneDeep(schemeNameChange);
        // console.log('result', result);

        /**
         * to use multiClient workflows
         * comment above api call and const result = _.cloneDeep(data);
         * then uncomment below const result = _.cloneDeep(multiClient);
         */
        // const result = _.cloneDeep(multiClient);

        const responseWorkflowData = _.get(result, 'content.workflows', []);
        const responseData = _.get(result, 'content', {});
        responseData.workflows = sortAndFilterMultiWF({
            workflows: responseWorkflowData,
            primaryRole,
            doFilter
        });
        yield put(getWorkflowsSuccess(responseData));
    } catch (error) {
        const errorObj = getError(error, 'error_getting_workflow');
        yield put(getWorkflowsFailed(error));
        NotificationHelper.getInstance().error(errorObj.message);
    }
}

export function* abortWorkflows(request) {
    try {
        yield put(abortWorkFlowsInprogress());
        yield call(apiHandler.abortWorkflows, request.data);
        yield put(abortWorkFlowsSuccess());
        NotificationHelper.getInstance().success(
            _.get(request, 'data.isMultiClient', false) ? 'Aborted workflows.' : 'Successfully aborted.'
        );
        if (request.callback) {
            try {
                request.callback();
            } catch (e) {
                console.log('callback err', e);
            }
        }
    } catch (error) {
        yield put(abortWorkFlowsFailed(error));
    }
}

export default function* workflowsSagas() {
    yield* [
        takeLatest(GET_SCHEME_WORKFLOWS_REQUEST, getSchemeWorkflows),
        takeLatest(REQUEST_ABORT_WORKFLOWS, abortWorkflows)
    ];
}
