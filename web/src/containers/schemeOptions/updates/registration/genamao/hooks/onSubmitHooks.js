import { pickerValidator } from '../../../../../workflows/templates/stepTemplates/pickUsers/pickerValidations';
import { GENERATE_DOC_FORM_SECTION, ACCEPTANCE_FORM_SECTION, SIGNATORIES_FORM_SECTION } from '../constants';
import _ from 'lodash';

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
            _.isNil(_.get(dataset, 'documents.AdvisoryReport.url', null)) &&
            _.isNil(_.get(dataset, 'documents.FMA.url', null)) &&
            _.isNil(_.get(dataset, 'documents.PMCProposal.url', null)) &&
            _.get(dataset, 'documents.ConsultationSponsor.urls', []).length < 1 &&
            _.get(dataset, 'documents.ConsultationActuary.urls', []).length < 1
        ) {
            errors = {
                message: `Please upload/generate documents to proceed.`
            };
            onchangeTab(GENERATE_DOC_FORM_SECTION.KEY);
        } else if (!_.isNil(_.get(dataset, 'documents.FMA.url', null)) && _.has(clientTeamPickerError, 'message')) {
            errors = clientTeamPickerError;
            onchangeTab(ACCEPTANCE_FORM_SECTION.KEY);
        } else if (
            (!_.isNil(_.get(dataset, 'documents.AdvisoryReport.url', null)) ||
                !_.isNil(_.get(dataset, 'documents.PMCProposal.url', null)) ||
                !_.isNil(_.get(dataset, 'documents.FMA.url', null))) &&
            _.has(adminPickerError, 'message')
        ) {
            errors = adminPickerError;
            onchangeTab(SIGNATORIES_FORM_SECTION.KEY);
        }
        return errors;
    },
    whenSubmitDataFormat: data => data
};
