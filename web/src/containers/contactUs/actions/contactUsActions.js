import {
    DO_CONTACT_US_REQUEST,
    DO_CONTACT_US_IN_PROGRESS,
    DO_CONTACT_US_SUCCESS,
    DO_CONTACT_US_FAILED
} from '../constants';

const doContactUs = payload => ({
    type: DO_CONTACT_US_REQUEST,
    payload
});
const doContactUsInProgress = () => ({
    type: DO_CONTACT_US_IN_PROGRESS
});
const doContactUsSuccess = () => ({
    type: DO_CONTACT_US_SUCCESS
});
const doContactUsFailed = error => ({
    type: DO_CONTACT_US_FAILED,
    error
});

export { doContactUs, doContactUsInProgress, doContactUsSuccess, doContactUsFailed };
