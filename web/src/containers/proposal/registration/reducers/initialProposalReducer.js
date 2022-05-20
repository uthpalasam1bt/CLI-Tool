import {
    DO_SAVE_PROPOSAL_FORM_PROGRESS,
    DO_SAVE_PROPOSAL_FORM_SUCCESS,
    DO_SAVE_PROPOSAL_FORM_FAILED,
    DO_GET_PROPOSAL_FORM_PROGRESS,
    DO_GET_PROPOSAL_FORM_SUCCESS,
    DO_GET_PROPOSAL_FORM_FAILED,
    DO_GET_PROPOSAL_NAMES_PROGRESS,
    DO_GET_PROPOSAL_NAMES_SUCCESS,
    DO_GET_PROPOSAL_NAMES_FAILED
} from '../constants';
import { FORM_SET_SUBMIT_SUCCEEDED } from '../../../../constants/formConstants';

const initialState = {
    saveInProgress: false,
    saveStatus: false,
    saveError: null,

    getInProgress: false,
    proposalData: null,
    getError: null,

    getNamesInProgress: false,
    proposalNames: null,
    getNamesError: null
};

export default function initialProposalFormReducer(state = initialState, action) {
    switch (action.type) {
        case DO_SAVE_PROPOSAL_FORM_PROGRESS:
            return { ...initialState, saveInProgress: true };
        case DO_SAVE_PROPOSAL_FORM_SUCCESS:
            return { ...initialState, saveStatus: true };
        case DO_SAVE_PROPOSAL_FORM_FAILED:
            return { ...initialState, saveError: action.error };

        case DO_GET_PROPOSAL_FORM_PROGRESS:
            return { ...initialState, getInProgress: true };
        case DO_GET_PROPOSAL_FORM_SUCCESS:
            return { ...initialState, proposalData: action.result.data };
        case DO_GET_PROPOSAL_FORM_FAILED:
            return { ...initialState, getError: action.error };

        case DO_GET_PROPOSAL_NAMES_PROGRESS:
            return { ...initialState, getNamesInProgress: true };
        case DO_GET_PROPOSAL_NAMES_SUCCESS:
            return { ...initialState, proposalNames: action.result.data };
        case DO_GET_PROPOSAL_NAMES_FAILED:
            return { ...initialState, getNamesError: action.error };

        case FORM_SET_SUBMIT_SUCCEEDED:
            return { ...state };

        default:
            return initialState;
    }
}
