import _ from 'lodash';

export const OnSubmitHook = {
    whenSubmitValidation: (formData, asyncErr, dataset) => {
        // check triggers

        if (_.get(formData, 'fLvlTriggers', []).length < 1) {
            return {
                message: 'Add at least one trigger.'
            };
        }

        return {};
    }
};
