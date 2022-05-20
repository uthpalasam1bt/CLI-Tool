import _ from 'lodash';
import { pickerValidator } from '../../../../../workflows/templates/stepTemplates/pickUsers/pickerValidations';
import { TABS } from '../constants';

const { tab1, tab2, tab3 } = TABS;

export const OnSubmitHook = {
    whenSubmitValidation: (documents, dataset, asyncErrors, onchangeTab) => {
        let errors = {};
        const clientTeamPickerError = pickerValidator(dataset, 'signatories', 'IAA', [
            {
                alias: 'clientTeam',
                errorMessage: 'Please select the list of signatories from the Client Team.'
            }
        ]);
        const adminPickerError = pickerValidator(dataset, 'signatories', 'IAA', [
            {
                alias: 'admin',
                errorMessage: 'Please select the list of signatories from the LGIM Directors.'
            }
        ]);

        if (_.has(clientTeamPickerError, 'message')) {
            errors = clientTeamPickerError;
            onchangeTab(tab1.tabKey);
        } else if (_.has(adminPickerError, 'message')) {
            errors = adminPickerError;
            onchangeTab(tab2.tabKey);
        }

        return errors;
    },
    whenSubmitDataFormat: data => data
};
