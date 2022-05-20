import {
    DO_GET_INITIAL_VALUES,
    DO_GET_INITIAL_VALUES_SUCCESS,
    DO_GET_INITIAL_VALUES_FAIL,
    PA_ANALYZE_SUCCESS,
    PA_ANALYZE_ERROR,
    PA_ANALYZE_IN_PROGRESS,
    DO_REJECT_INITIAL_PROPOSAL_INPROGRESS,
    DO_REJECT_INITIAL_PROPOSAL_SUCCESS,
    DO_REJECT_INITIAL_PROPOSAL_FAIL,
    SET_INITIAL_VALUES
} from '../constants';

const paAnalyzeState = {
    paAnalyzeState_inProgress: false,
    paAnalyzeState_error: null,
    paAnalyzeState_data: null,
    PaAbort_inprogress: false
};

const intialState = {
    data: null,
    isExecuting: false
};
const portfolioReducer = (state = intialState, action) => {
    switch (action.type) {
        case DO_GET_INITIAL_VALUES: {
            return {
                ...state,
                isExecuting: true,
                ...paAnalyzeState
            };
        }
        case DO_GET_INITIAL_VALUES_SUCCESS:
            return {
                ...state,
                data: action.data,
                isExecuting: false
            };
        case SET_INITIAL_VALUES:
            return {
                ...state,
                data: null,
                isExecuting: false
            };
        case DO_GET_INITIAL_VALUES_FAIL:
            return {
                isExecuting: true
            };

        case PA_ANALYZE_IN_PROGRESS:
            return { ...state, ...paAnalyzeState, paAnalyzeState_inProgress: true };
        case PA_ANALYZE_SUCCESS:
            return {
                ...state,
                ...paAnalyzeState,
                paAnalyzeState_inProgress: false,
                paAnalyzeState_data: action.data
            };
        case PA_ANALYZE_ERROR:
            return {
                ...state,
                ...paAnalyzeState,
                paAnalyzeState_inProgress: false,
                paAnalyzeState_error: action.data
            };
        case DO_REJECT_INITIAL_PROPOSAL_INPROGRESS:
        case DO_REJECT_INITIAL_PROPOSAL_FAIL:
            return {
                ...state,
                ...paAnalyzeState,
                PaAbort_inprogress: true
            };
        case DO_REJECT_INITIAL_PROPOSAL_SUCCESS:
            return {
                ...state,
                ...paAnalyzeState,
                PaAbort_inprogress: false
            };

        default:
            return state;
    }
};

export default portfolioReducer;
