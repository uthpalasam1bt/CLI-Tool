import _ from 'lodash';
import moment from 'moment';
export const OnSubmitHook = {
    whenSubmitValidation: (dataset, asyncErrors) => {
        let errors = {};

        if (dataset.hasSponsorBeenConsulted === 'no'||!dataset.hasSponsorBeenConsulted) {
            errors = {
                message: `Please confirm sponsor consultation to continue.`
            };
        }

        return errors;
    },
    whenSubmitDataFormat: (data, props) => {
        let formData;
        formData = {
            ...data,
            respondedBy: _.get(props, 'loggedUser.name'),
            respondedDate: moment().format('DD/MM/YYYY')
        };
        return formData;
    }
};
