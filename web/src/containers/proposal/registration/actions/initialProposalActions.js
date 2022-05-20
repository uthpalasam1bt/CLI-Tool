import {
    DO_SAVE_PROPOSAL_FORM,
    DO_SAVE_PROPOSAL_FORM_PROGRESS,
    DO_SAVE_PROPOSAL_FORM_SUCCESS,
    DO_SAVE_PROPOSAL_FORM_FAILED,
    DO_GET_PROPOSAL_FORM,
    DO_GET_PROPOSAL_FORM_PROGRESS,
    DO_GET_PROPOSAL_FORM_SUCCESS,
    DO_GET_PROPOSAL_FORM_FAILED,
    DO_GET_PROPOSAL_NAMES,
    DO_GET_PROPOSAL_NAMES_PROGRESS,
    DO_GET_PROPOSAL_NAMES_SUCCESS,
    DO_GET_PROPOSAL_NAMES_FAILED
} from '../constants';

const doSaveProposalForm = payload => ({
    type: DO_SAVE_PROPOSAL_FORM,
    payload
});
const doSaveProposalFormProgress = () => ({
    type: DO_SAVE_PROPOSAL_FORM_PROGRESS
});
const doSaveProposalFormSuccess = result => ({
    type: DO_SAVE_PROPOSAL_FORM_SUCCESS,
    result
});
const doSaveProposalFormFailed = error => ({
    type: DO_SAVE_PROPOSAL_FORM_FAILED,
    error
});

const doGetProposalForm = payload => ({
    type: DO_GET_PROPOSAL_FORM,
    payload
});
const doGetProposalFormProgress = () => ({
    type: DO_GET_PROPOSAL_FORM_PROGRESS
});
const doGetProposalFormSuccess = result => ({
    type: DO_GET_PROPOSAL_FORM_SUCCESS,
    result
});
const doGetProposalFormFailed = error => ({
    type: DO_GET_PROPOSAL_FORM_FAILED,
    error
});

const doGetProposalNames = payload => ({
    type: DO_GET_PROPOSAL_NAMES,
    payload
});
const doGetProposalNamesProgress = () => ({
    type: DO_GET_PROPOSAL_NAMES_PROGRESS
});
const doGetProposalNamesSuccess = result => ({
    type: DO_GET_PROPOSAL_NAMES_SUCCESS,
    result
});
const doGetProposalNamesFailed = error => ({
    type: DO_GET_PROPOSAL_NAMES_FAILED,
    error
});

export {
    doSaveProposalForm,
    doSaveProposalFormProgress,
    doSaveProposalFormSuccess,
    doSaveProposalFormFailed,
    doGetProposalForm,
    doGetProposalFormProgress,
    doGetProposalFormSuccess,
    doGetProposalFormFailed,
    doGetProposalNames,
    doGetProposalNamesProgress,
    doGetProposalNamesSuccess,
    doGetProposalNamesFailed
};
