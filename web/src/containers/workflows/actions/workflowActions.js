import constants from '../constants';
const {
    GET_SCHEME_WORKFLOWS_REQUEST,
    GET_SCHEME_WORKFLOWS_SUCCESS,
    GET_SCHEME_WORKFLOWS_FAILED,
    GET_SCHEME_WORKFLOWS_INPROGRESS,
    REQUEST_ABORT_WORKFLOWS,
    REQUEST_ABORT_WORKFLOWS_IN_PROGRESS,
    REQUEST_ABORT_WORKFLOWS_SUCCESS,
    REQUEST_ABORT_WORKFLOWS_ERROR
} = constants;
const getWorkFlows = data => ({
    type: GET_SCHEME_WORKFLOWS_REQUEST,
    data
});

const getWorkflowsInprogress = () => ({
    type: GET_SCHEME_WORKFLOWS_INPROGRESS
});

const getWorkflowsSuccess = data => ({
    type: GET_SCHEME_WORKFLOWS_SUCCESS,
    data
});

const getWorkflowsFailed = () => ({
    type: GET_SCHEME_WORKFLOWS_FAILED
});

const abortWorkFlows = (data, callback) => ({
    type: REQUEST_ABORT_WORKFLOWS,
    data,
    callback
});
const abortWorkFlowsInprogress = () => ({
    type: REQUEST_ABORT_WORKFLOWS_IN_PROGRESS
});
const abortWorkFlowsSuccess = () => ({
    type: REQUEST_ABORT_WORKFLOWS_SUCCESS
});
const abortWorkFlowsFailed = data => ({
    type: REQUEST_ABORT_WORKFLOWS_ERROR,
    data
});

export {
    getWorkFlows,
    getWorkflowsSuccess,
    getWorkflowsInprogress,
    getWorkflowsFailed,
    abortWorkFlows,
    abortWorkFlowsInprogress,
    abortWorkFlowsSuccess,
    abortWorkFlowsFailed
};
