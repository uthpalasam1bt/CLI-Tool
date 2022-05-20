import constants from '../constants';

const {
    GET_SCHEME_WORKFLOWS_SUCCESS,
    GET_SCHEME_WORKFLOWS_FAILED,
    GET_SCHEME_WORKFLOWS_INPROGRESS,
    REQUEST_ABORT_WORKFLOWS_ERROR,
    REQUEST_ABORT_WORKFLOWS_IN_PROGRESS,
    REQUEST_ABORT_WORKFLOWS_SUCCESS
} = constants;

const initialState = {
    workflows_data: null,
    get_workflows_inprogress: false,
    abort_status_inProgress: false
};

export default function workflowsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_SCHEME_WORKFLOWS_INPROGRESS:
            return { ...state, get_workflows_inprogress: true };

        case GET_SCHEME_WORKFLOWS_SUCCESS:
            return { ...state, workflows_data: action.data, get_workflows_inprogress: false };

        case GET_SCHEME_WORKFLOWS_FAILED:
            return { ...state, get_workflows_inprogress: false };

        case REQUEST_ABORT_WORKFLOWS_IN_PROGRESS:
            return { ...state, abort_status_inProgress: true };
        case REQUEST_ABORT_WORKFLOWS_SUCCESS:
            return { ...state, abort_status_inProgress: false };
        case REQUEST_ABORT_WORKFLOWS_ERROR:
            return { ...state, abort_status_inProgress: false };

        default:
            return state;
    }
}
