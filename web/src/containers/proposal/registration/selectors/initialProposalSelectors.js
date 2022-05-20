import { createSelector } from 'reselect';
const initialProposalReducer = state => state.initialProposalReducer;

const saveInitialProposal_inProgress = () =>
    createSelector(
        initialProposalReducer,
        currentState => currentState.saveInProgress
    );
const saveInitialProposal_status = () =>
    createSelector(
        initialProposalReducer,
        currentState => currentState.saveStatus
    );
const saveInitialProposal_error = () =>
    createSelector(
        initialProposalReducer,
        currentState => currentState.saveError
    );

const getInitialProposal_inProgress = () =>
    createSelector(
        initialProposalReducer,
        currentState => currentState.getInProgress
    );
const getInitialProposal_data = () =>
    createSelector(
        initialProposalReducer,
        currentState => currentState.proposalData
    );
const getInitialProposal_error = () =>
    createSelector(
        initialProposalReducer,
        currentState => currentState.getError
    );

const getInitialProposal_Names_inProgress = () =>
    createSelector(
        initialProposalReducer,
        currentState => currentState.getNamesInProgress
    );
const getInitialProposal__Names_data = () =>
    createSelector(
        initialProposalReducer,
        currentState => currentState.proposalNames
    );
const getInitialProposal__Names_error = () =>
    createSelector(
        initialProposalReducer,
        currentState => currentState.getNamesError
    );

export {
    saveInitialProposal_inProgress,
    saveInitialProposal_status,
    saveInitialProposal_error,
    getInitialProposal_inProgress,
    getInitialProposal_data,
    getInitialProposal_error,
    getInitialProposal_Names_inProgress,
    getInitialProposal__Names_data,
    getInitialProposal__Names_error
};
