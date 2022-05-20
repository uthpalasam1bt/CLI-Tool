import _ from 'lodash';

export const OnSubmitHook = {
    whenSubmitValidation: (formdata, errors, dataset) =>{
        let reportStatus = _.get(formdata, 'TransitionReport.url')
        if (!reportStatus) {
            return {
                message: `Please upload bespoke report to proceed.`
            };
        }
        return {}
    },
    whenSubmitDataFormat: data => data
};
