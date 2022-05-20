import { pickerValidator } from '../../../../../workflows/templates/stepTemplates/pickUsers/pickerValidations';
import _ from 'lodash';
import {
    GENERATE_DOC_FORM_SECTION,
    ACCEPTANCE_FORM_SECTION,
    IAA_SIGNATORIES_FORM_SECTION,
    IMA_PMC_SIGNATORIES_FORM_SECTION
} from '../constants';

export const OnSubmitHook = {
    whenSubmitValidation: (documents, dataset, asyncErrors, onchangeTab) => {
        // let errors = {};
        // if (
        //     _.has(dataset, 'documents.IAA.url') ||
        //     _.has(dataset, 'documents.FMA.url') ||
        //     _.has(dataset, 'documents.PMCProposal.url') ||
        //     _.has(dataset, 'documents.SIP.url')
        // ) {
        //     errors = pickerValidator(dataset, 'signatories', 'IAA', ['admin', 'clientTeam']);
        //     if (Object.entries(errors) && Object.entries(errors).length == 0)
        //         errors = pickerValidator(dataset, 'signatories', 'FMA', ['admin']);
        // } else {
        //     errors = {
        //         message: `Please upload IAA,IMA,PMC or SIP to proceed to document approval.`
        //     };
        // }
        //
        // return errors;

        let errors = {};
        const clientTeamPickerError = pickerValidator(dataset, 'signatories', 'FMA', [
            {
                alias: 'clientTeam',
                errorMessage: 'Please select the list of signatories from the Client Team.'
            }
        ]);
        const iaaclientTeamPickerError = pickerValidator(dataset, 'signatories', 'IAA', [
            {
                alias: 'clientTeam',
                errorMessage: 'Please select the list of signatories from the Client Team.'
            }
        ]);
        const lgimDirectorsPickerError = pickerValidator(dataset, 'signatories', 'IAA', [
            {
                alias: 'admin',
                errorMessage: 'Please select the list of signatories from the LGIM Directors.'
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
            _.isNil(_.get(dataset, 'documents.IAA.url', null)) &&
            _.isNil(_.get(dataset, 'documents.SIP.url', null)) &&
            _.isNil(_.get(dataset, 'documents.PMCProposal.url', null))
        ) {
            errors = {
                message: `Please upload IAA,IMA,PMC or SIP to proceed to document approval.`
            };
            onchangeTab(GENERATE_DOC_FORM_SECTION.KEY);
        } else if (!_.isNil(_.get(dataset, 'documents.FMA.url', null)) && _.has(clientTeamPickerError, 'message')) {
            errors = clientTeamPickerError;
            onchangeTab(ACCEPTANCE_FORM_SECTION.KEY);
        }else if (!_.isNil(_.get(dataset, 'documents.IAA.url', null)) && _.has(iaaclientTeamPickerError, 'message')) {
            errors = iaaclientTeamPickerError;
            onchangeTab(ACCEPTANCE_FORM_SECTION.KEY);
        } else if (!_.isNil(_.get(dataset, 'documents.IAA.url', null)) && _.has(lgimDirectorsPickerError, 'message') ) {
            errors = lgimDirectorsPickerError;
            onchangeTab(IAA_SIGNATORIES_FORM_SECTION.KEY);
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
