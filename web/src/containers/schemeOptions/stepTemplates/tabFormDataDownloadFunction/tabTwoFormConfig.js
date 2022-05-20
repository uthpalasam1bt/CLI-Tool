/* 
this file contains the functional configuration used to create the fields in the second tab
*/

import moment from 'moment';

import { TAB_TWO_FORM_FIELD_NAMES, TAB_TWO_FORM_LABELS } from './constants';
import { SIX_DIGITS_MESSAGE } from '../../constants/schemeOptionConstants';
import constants from '../../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants; // commonly used constants in all the components
const { INPUT_FIELD, NUMBER_FIELD, MONTH_DATE_PICKER } = FORM_FIELDS;
const { FULL_CONTAINER } = FORM_TEMPLATES;

export const tabTwoConfig = (props = {}) => {
    return [
        {
            type: FULL_CONTAINER, //type of the container to be created
            label: TAB_TWO_FORM_LABELS.TRUSTEE_BANK_ACCOUNT_NAME, // label to the field
            field: {
                name: TAB_TWO_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_NAME,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },

        {
            type: FULL_CONTAINER,
            label: TAB_TWO_FORM_LABELS.TRUSTEE_BANK_ACCOUNT_SORT_CODE,
            field: {
                name: TAB_TWO_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_SORT_CODE,
                className: 'form-control',
                component: NUMBER_FIELD,
                options: {
                    //contains the options for scaling ,placeholder and the minimum value that can be given
                    decimalScale: 0, //(not required here)
                    min: 0, //(not required here)
                    placeholder: '__-__-__',
                    format: '##-##-##',
                    mask: '__'
                },
                validationModules: [
                    { moduleName: 'RequiredValidate' },
                    { moduleName: 'LengthValidate', options: { is: 6, message: SIX_DIGITS_MESSAGE } }
                ] // validate the field to be required && the length to be equal to 6 numbers
            }
        },

        {
            type: FULL_CONTAINER,
            label: TAB_TWO_FORM_LABELS.SCHEME_YEAR_END_DATE_ANUAL_REPORT,
            field: {
                name: TAB_TWO_FORM_FIELD_NAMES.SCHEME_YEAR_END_DATE_ANUAL_REPORT,
                className: 'form-control',
                component: MONTH_DATE_PICKER, //Before today
                options: {
                    // disabling  the date before today
                    disabledDate: current => current && current > moment().startOf('day'), //(not required here)
                    format: 'MM/DD', //(not required here)
                    orderReverse: true //(not required here)
                },
                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },

        {
            type: FULL_CONTAINER,
            label: TAB_TWO_FORM_LABELS.ACTURAY_COMPANY,
            field: {
                name: TAB_TWO_FORM_FIELD_NAMES.ACTURAY_COMPANY,
                className: 'form-control',
                component: INPUT_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            label: TAB_TWO_FORM_LABELS.ACTUARY_NAME,
            field: {
                name: TAB_TWO_FORM_FIELD_NAMES.ACTUARY_NAME,
                className: 'form-control',
                component: INPUT_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            label: TAB_TWO_FORM_LABELS.ACTUARY_EMAIL,
            field: {
                name: TAB_TWO_FORM_FIELD_NAMES.ACTUARY_EMAIL,
                className: 'form-control',
                component: INPUT_FIELD,
                isEmail: true,
                validationModules: [
                    { moduleName: 'EmailValidate', options: { allowBlank: true, message: 'Invalid email' } }
                ] // validates the email
            }
        },
        {
            type: FULL_CONTAINER,
            label: TAB_TWO_FORM_LABELS.ACTUARY_PHONE,
            field: {
                name: TAB_TWO_FORM_FIELD_NAMES.ACTUARY_PHONE,
                className: 'form-control',
                component: NUMBER_FIELD,
                // options: { maxlength: 15 }, // can use the validation module also to validate the max length
                validationModules: [{ moduleName: 'LengthValidate', options: { max: 6 } }] // validate the field to be required && the length to be equal to 6 numbers
            }
        }
    ];
};
