/* 
     This is the functional configuration for creating scheme activation Tab forms
     In this approach developers can pass javaScript Objects as configuration parameters.
     Inside this configuration we can specify the form labels and respective form fields to display in the form

      Here we can create functional configuation for each tab.
     In this file contains functional configuration for Tab02

 */
import uiLibConstants from '../../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS } = uiLibConstants;
const { INPUT_FIELD, NUMBER_FIELD } = FORM_FIELDS;
const { FULL_CONTAINER } = FORM_TEMPLATES;

export const formFieldTwo = props => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Input field 03',
            field: {
                name: 'inputField',
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },

        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Input Field 04',
            field: {
                name: 'NumberField',
                className: 'form-control',
                component: NUMBER_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate' }],
                options: {
                    decimalScale: 0,
                    allowNegative: false,
                    allowLeadingZeros: true,
                    maxLength: 20
                }
            }
        }
    ];
};
