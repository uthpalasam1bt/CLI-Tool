import moment from 'moment';

import BrowserStorage from '../../../../../../middlewares/storage';
const loggedUser = BrowserStorage.getInstance().getLoggedUser();

export const OnSubmitHook = {
    whenSubmitValidation: (formData, asyncErr, dataset) => {
        let { hasSponsorBeenConsulted } = formData;
        if (!hasSponsorBeenConsulted || (hasSponsorBeenConsulted && hasSponsorBeenConsulted == 'no')) {
            return {
                message: `Please confirm sponsor consultation to continue.`
            };
        }
        return {};
    },
    whenSubmitDataFormat: data => {
        let { hasSponsorBeenConsulted } = data;
        let submitData = {
            userName: loggedUser.name,
            date: moment().format('DD/MM/YYYY'),
            hasSponsorBeenConsulted
        };
        return submitData;
    }
};
