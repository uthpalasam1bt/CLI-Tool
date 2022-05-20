import {
    GET_CONTRIBUTORS_FAILED,
    GET_CONTRIBUTORS_IN_PROGRESS,
    GET_CONTRIBUTORS_REQUEST,
    GET_CONTRIBUTORS_SUCCESS
} from './constants';

const getContributors = payload => ({
    type: GET_CONTRIBUTORS_REQUEST,
    payload
});
const getContributorsInProgress = () => ({
    type: GET_CONTRIBUTORS_IN_PROGRESS
});
const getContributorsSuccess = result => ({
    type: GET_CONTRIBUTORS_SUCCESS,
    result
});
const getContributorsFailed = error => ({
    type: GET_CONTRIBUTORS_FAILED,
    error
});

export { getContributors, getContributorsInProgress, getContributorsSuccess, getContributorsFailed };
