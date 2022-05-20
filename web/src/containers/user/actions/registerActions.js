import { DO_REGISTER_REQUEST, DO_REGISTER_IN_PROGRESS, DO_REGISTER_SUCCESS, DO_REGISTER_FAILED } from '../constants';

const doRegister = payload => ({
    type: DO_REGISTER_REQUEST,
    payload
});
const doRegisterInProgress = () => ({
    type: DO_REGISTER_IN_PROGRESS
});
const doRegisterSuccess = () => ({
    type: DO_REGISTER_SUCCESS
});
const doRegisterFailed = error => ({
    type: DO_REGISTER_FAILED,
    error
});

export { doRegister, doRegisterInProgress, doRegisterSuccess, doRegisterFailed };
