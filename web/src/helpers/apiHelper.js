import store from '../redux/store';
import { doLogout } from '../containers/user/actions/logoutActions';
import BrowserStorage from '../middlewares/storage';

const getError = (error, defaultMessage) => {
    if (error.response && error.response.data) {
        if (
            error.response.data &&
            error.response.data.message &&
            error.response.data.message === 'The incoming token has expired'
        ) {
            let loggedUser = BrowserStorage.getInstance().getLoggedUser();
            const { email } = loggedUser;
            store.dispatch(doLogout({ email }));

            return { message: 'User session has expired. Please login again to proceed.' };
        }

        return error.response.data;
    }

    return { message: defaultMessage };
};

export { getError };
