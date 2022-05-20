import constants from '../constants';
const {
    REQUEST_GET_OUTPUT_FILES,
    REQUEST_GET_OUTPUT_FILES_IN_PROGRESS,
    REQUEST_GET_OUTPUT_FILES_SUCCESS,
    REQUEST_GET_OUTPUT_FILES_ERROR
} = constants;
const getOutputFiles_dataInitialState = {
    getOutputFiles_data_inProgress: false,
    getOutputFiles_data: null,
    getOutputFiles_data_error: null
};

export default function commonActionReducer(state = getOutputFiles_dataInitialState, action) {
    switch (action.type) {
        case REQUEST_GET_OUTPUT_FILES:
            return { ...state, getOutputFiles_data_inProgress: true };
        case REQUEST_GET_OUTPUT_FILES_IN_PROGRESS:
            return { ...state, getOutputFiles_data_inProgress: true };
        case REQUEST_GET_OUTPUT_FILES_SUCCESS:
            return { ...state, getOutputFiles_data: { ...action.result } };
        case REQUEST_GET_OUTPUT_FILES_ERROR:
            return { ...state, getOutputFiles_data_inProgress: false };
        default:
            return state;
    }
}
