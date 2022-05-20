/* 
this custom hooks can be used to check whether all the signatories has been selected to the documents 
*/
import _ from 'lodash';

export const OnSubmitHook = {
    whenSubmitValidation: (formdata, errors, dataset) => {
        let error = {};
        const isCorpEntity = _.get(dataset, 'userPool.signatories.FMA.client', []).find(
            entity =>
                entity &&
                entity.trusteeEntityType == 'CORPORATE' &&
                entity.entityName &&
                entity.entityName.length &&
                Array.isArray(entity.trustees) &&
                entity.trustees.length > 0
        );

        if (isCorpEntity) {
            let selectedTrustees = _.get(dataset, 'signatories.FMA.client', []);
            selectedTrustees.forEach(sltdTrustee => {
                if (!sltdTrustee.trustees || !sltdTrustee.trustees.length || sltdTrustee.trustees.length < 2) {
                    error = { message: `Please select at least two signatories to continue.` };
                }
            });
        }
        return error;
    },
    whenSubmitDataFormat: data => {
        return data;
    }
};
