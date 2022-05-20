import moment from 'moment';

import BrowserStorage from '../../../../../../middlewares/storage';
const loggedUser = BrowserStorage.getInstance().getLoggedUser();

export const OnSubmitHook = {
    whenSubmitValidation: (formData, asyncErr, dataset) => {
        let { hasSponcerConsulted } = formData;
        if (!hasSponcerConsulted || (hasSponcerConsulted && hasSponcerConsulted == 'no')) {
            return {
                message: `Please confirm sponsor consultation to continue.`
            };
        }
        return {};
    },
    whenSubmitDataFormat: data => {
        let { hasSponcerConsulted } = data;
        let submitData = {
            userName: loggedUser.name,
            date: moment().format('DD/MM/YYYY'),
            hasSponcerConsulted
        };
        return submitData;
    }
};
