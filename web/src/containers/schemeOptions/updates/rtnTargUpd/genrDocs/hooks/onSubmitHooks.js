import { pickerValidator } from '../../../../../workflows/templates/stepTemplates/pickUsers/pickerValidations';

export const OnSubmitHook = {
    whenSubmitValidation: (documents, dataset, asyncErrors) =>
        pickerValidator(dataset, 'signatories', 'FMA', ['clientTeam']),
    whenSubmitDataFormat: data => data
};
