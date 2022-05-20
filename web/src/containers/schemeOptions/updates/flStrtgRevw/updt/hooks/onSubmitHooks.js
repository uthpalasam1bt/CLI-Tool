import { pickerValidator } from '../../../../../workflows/templates/stepTemplates/pickUsers/pickerValidations';
import _ from "lodash";

export const OnSubmitHook = {
    whenSubmitValidation: (formdata, errors, dataset) =>
    {
        //get trustees
        const entities = _.get(dataset, 'signatories.FMA.client', []);

        // check if signatories is  empty or  if the  document  client is empty
        // (this is to first check if the individual trustee is empty)
        if (_.isEmpty(_.get(dataset, 'signatories', {})) || entities.length === 0) {
            const signatoriesEmptyChecker = pickerValidator(dataset, 'signatories', 'FMA', [
                {
                    alias: 'client',
                    errorMessage: 'Please select signatory to continue.'
                }
            ]);
            if (signatoriesEmptyChecker) {
                return signatoriesEmptyChecker;
            }
        }
        // get indivdual clients
        const indvTrusteesEntities = entities.filter(
            x => x.trusteeEntityType === 'INDIVIDUAL'
        );
        // get corporate clients
        const corpTrusteesEntities = entities.filter(
            x => x.trusteeEntityType === 'CORPORATE'
        );
        // get corp entities with 2 trustees
        const corpEntitiesWithTwoTrustees = entities.filter(
            x => x.trusteeEntityType === 'CORPORATE' && _.get(x, 'trustees', []).length > 0 &&
                _.get(x, 'trustees', []).length === 2
        );
        // validate corpTrusteesEntities
        if (corpTrusteesEntities.length > 0) {
            const entitiesWithLowTrustees = entities.find(
                entity => entity.trusteeEntityType === 'CORPORATE' && _.get(entity, 'trustees', []).length > 0 &&
                    _.get(entity, 'trustees', []).length < 2
            );
            if (entitiesWithLowTrustees)
                return {
                    message: `At least 2 trustees must be selected per corporate trustee entity in signatories.`
                };
        }

        if (indvTrusteesEntities.length === 0 && corpEntitiesWithTwoTrustees.length === 0) {
            return {
                message: 'Please select signatory to continue.'
            };
        }

        if (indvTrusteesEntities.length > 0 || corpEntitiesWithTwoTrustees.length > 0) {
            return {};
        }
    },    whenSubmitDataFormat: data => data
};

// pickerValidator(dataset, 'signatories', 'FMA', [{alias: 'client', errorMessage: 'Please select clients.'}]),
// pickerValidator(dataset, 'signatories', 'FMA', ['client'],'Please select signatories.'),
// pickerValidator(dataset, 'signatories', 'FMA', ['client']), 

// pickerValidator(dataset, 'approvers', 'FMA', null, 'Please select approvers'),
