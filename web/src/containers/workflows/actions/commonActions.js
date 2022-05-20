import constants from '../constants';
const {
    REQUEST_GET_OUTPUT_FILES,
    REQUEST_GET_OUTPUT_FILES_IN_PROGRESS,
    REQUEST_GET_OUTPUT_FILES_SUCCESS,
    REQUEST_GET_OUTPUT_FILES_ERROR
} = constants;

export const getOutputFiles_request = payload => ({
    type: REQUEST_GET_OUTPUT_FILES,
    payload
});

export const getOutputFiles_inProgress = () => ({
    type: REQUEST_GET_OUTPUT_FILES_IN_PROGRESS
});

export const getOutputFiles_success = result => ({
    type: REQUEST_GET_OUTPUT_FILES_SUCCESS,
    result
});

export const getOutputFiles_error = error => ({
    type: REQUEST_GET_OUTPUT_FILES_ERROR,
    error
});
