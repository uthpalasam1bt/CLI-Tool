import { pickerValidator } from '../../../../../workflows/templates/stepTemplates/pickUsers/pickerValidations';

export const OnSubmitHook = {
    whenSubmitValidation: (formdata, errors, dataset) =>
        pickerValidator(dataset, 'signotories', 'FMA', ['clientTeam'], 'Please select the list of signatories from the Client Team.'),
    whenSubmitDataFormat: data => data
};
