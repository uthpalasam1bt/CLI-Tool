/* 
     This is the functional configuration for creating scheme activation simple forms
     In this approach developers can pass javaScript Objects as configuration parameters.
     Inside this configuration we can specify the form labels and respective form fields to display in the form

 */
import uiLibConstants from '../../../../UILibrary/constants';
const { FORM_TEMPLATES, FORM_FIELDS } = uiLibConstants;
const { INPUT_FIELD, NUMBER_FIELD } = FORM_FIELDS;
const { FULL_CONTAINER } = FORM_TEMPLATES;

export const formFields = props => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Input field 01',
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
            label: 'Number Field',
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
