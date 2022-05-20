import { DO_LOGOUT_REQUEST, DO_LOGOUT_IN_PROGRESS, DO_LOGOUT_SUCCESS, DO_LOGOUT_FAILED } from '../constants';
import { history } from '../../../redux/store';

const doLogout = payload => ({
    type: DO_LOGOUT_REQUEST,
    payload
});
const doLogoutInProgress = () => ({
    type: DO_LOGOUT_IN_PROGRESS
});
const doLogoutSuccess = () => {
    history.push('/');
    return { type: DO_LOGOUT_SUCCESS };
};
const doLogoutFailed = error => ({
    type: DO_LOGOUT_FAILED,
    error
});

export { doLogout, doLogoutInProgress, doLogoutSuccess, doLogoutFailed };
