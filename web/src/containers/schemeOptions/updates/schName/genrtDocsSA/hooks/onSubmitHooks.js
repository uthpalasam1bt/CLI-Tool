import { pickerValidator } from '../../../../../workflows/templates/stepTemplates/pickUsers/pickerValidations';
import _ from 'lodash';
import { GENERATE_DOC_FORM_SECTION, ACCEPTANCE_FORM_SECTION, IAA_SIGNATORIES_FORM_SECTION, IMA_PMC_SIGNATORIES_FORM_SECTION} from '../constants';

export const OnSubmitHook = {
    whenSubmitValidation: (documents, dataset, asyncErrors, onchangeTab) => {
        let errors = {};
        const clientTeamPickerError = pickerValidator(dataset, 'signatories', 'FMA', [
            {
                alias: 'clientTeam',
                errorMessage: 'Please select the list of signatories from the Client Team.'
            }
        ]);
        const adminPickerError = pickerValidator(dataset, 'signatories', 'FMA', [
            {
                alias: 'admin',
                errorMessage: 'Please select the list of signatories from the PMC Directors.'
            }
        ]);

        if (
            _.isNil(_.get(dataset, 'documents.FMA.url', null)) &&
            _.isNil(_.get(dataset, 'documents.SIP.url', null)) &&
            _.isNil(_.get(dataset, 'documents.PMCProposal.url', null))
        ) {
            errors = {
                message: `Please upload IMA,PMC or SIP to proceed to document approval.`
            };
            onchangeTab(GENERATE_DOC_FORM_SECTION.KEY);
        } else if (!_.isNil(_.get(dataset, 'documents.FMA.url', null)) && _.has(clientTeamPickerError, 'message')) {
            errors = clientTeamPickerError;
            onchangeTab(ACCEPTANCE_FORM_SECTION.KEY);
        } else if (
            (!_.isNil(_.get(dataset, 'documents.PMCProposal.url', null)) ||
                !_.isNil(_.get(dataset, 'documents.FMA.url', null))) &&
            _.has(adminPickerError, 'message')
        ) {
            errors = adminPickerError;
            onchangeTab(IMA_PMC_SIGNATORIES_FORM_SECTION.KEY);
        }
        return errors;
    },
    whenSubmitDataFormat: data => data
};
