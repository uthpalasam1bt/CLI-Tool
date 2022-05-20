import {
    DO_GET_INITIAL_VALUES,
    DO_GET_INITIAL_VALUES_INPROGRESS,
    DO_GET_INITIAL_VALUES_SUCCESS,
    DO_GET_INITIAL_VALUES_FAIL,
    DO_REJECT_INITIAL_PROPOSAL,
    DO_REJECT_INITIAL_PROPOSAL_INPROGRESS,
    DO_REJECT_INITIAL_PROPOSAL_SUCCESS,
    DO_REJECT_INITIAL_PROPOSAL_FAIL,
    PA_ANALYZE_REQUEST,
    PA_ANALYZE_IN_PROGRESS,
    PA_ANALYZE_SUCCESS,
    PA_ANALYZE_ERROR,
    PA_ANALYZE_REQUEST_ABORT,
    PA_ANALYZE_ERROR_ABORT,
    SET_INITIAL_VALUES
} from '../constants';

const getInitialValues = data => ({
    type: DO_GET_INITIAL_VALUES,
    data
});

const getInitialValuesInprogress = data => ({
    type: DO_GET_INITIAL_VALUES_INPROGRESS,
    data
});

const getInitialValuesSuccess = data => ({
    type: DO_GET_INITIAL_VALUES_SUCCESS,
    data
});

const getInitialValuesFail = data => ({
    type: DO_GET_INITIAL_VALUES_FAIL,
    data
});

const setInitialValues = data => ({
    type: SET_INITIAL_VALUES,
    data
});

const rejectInitialProposal = data => ({
    type: DO_REJECT_INITIAL_PROPOSAL,
    data
});

const rejectInitialProposalInprogress = data => ({
    type: DO_REJECT_INITIAL_PROPOSAL_INPROGRESS,
    data
});

const rejectInitialProposalSuccess = data => ({
    type: DO_REJECT_INITIAL_PROPOSAL_SUCCESS,
    data
});

const rejectInitialProposalFail = data => ({
    type: DO_REJECT_INITIAL_PROPOSAL_FAIL,
    data
});

const paAnalyzeRequest = payload => ({
    type: PA_ANALYZE_REQUEST,
    payload
});

const paAnalyzeInProgress = () => ({
    type: PA_ANALYZE_IN_PROGRESS
});

const paAnalyzeSuccess = result => ({
    type: PA_ANALYZE_SUCCESS,
    result
});

const paAnalyzeError = error => ({
    type: PA_ANALYZE_ERROR,
    error
});

const paAnalyzeRequestAbort = payload => ({
    type: PA_ANALYZE_REQUEST_ABORT,
    payload
});

const paAnalyzeErrorAbort = error => ({
    type: PA_ANALYZE_ERROR_ABORT,
    error
});

export {
    getInitialValues,
    getInitialValuesInprogress,
    getInitialValuesSuccess,
    getInitialValuesFail,
    setInitialValues,
    rejectInitialProposal,
    rejectInitialProposalInprogress,
    rejectInitialProposalSuccess,
    rejectInitialProposalFail,
    paAnalyzeRequest,
    paAnalyzeInProgress,
    paAnalyzeSuccess,
    paAnalyzeError,
    paAnalyzeRequestAbort,
    paAnalyzeErrorAbort
};
