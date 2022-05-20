import _ from 'lodash';

export const OnSubmitHook = {
    whenSubmitValidation: (formdata, errors, dataset) =>{
        let sipStatus = _.get(formdata, 'SIP.url')
        if (!sipStatus) {
            return {
                message: `Please upload SIP to proceed to document generation.`
            };
        }
        return {}
    },
    whenSubmitDataFormat: data => data
};
