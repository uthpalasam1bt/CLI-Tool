import { pickerValidator } from '../../../../workflows/templates/stepTemplates/pickUsers/pickerValidations';

export const OnSubmitHook = {
    whenSubmitValidation: (documents, dataset, asyncErrors) =>
        pickerValidator(dataset, 'signatories', 'IAA', ['admin', 'clientTeam']),
    whenSubmitDataFormat: data => data
};
