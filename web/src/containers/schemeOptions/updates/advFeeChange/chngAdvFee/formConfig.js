/* 
     This is the functional configuration for creating simple forms
     In this approach developers can pass javaScript Objects as configuration parameters.
     Inside this configuration we can specify the form labels and respective form fields to display in the form

 */

import constants from '../../../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { INPUT_FIELD } = FORM_FIELDS;
const { FULL_CONTAINER } = FORM_TEMPLATES;
export const formFields = props => {
    return [
        {
            type: FULL_CONTAINER, //  form template type
            bool: true, // use to make the component visible or invisible
            label: 'Advisory fee for scheme', // field label text
            field: {
                //  Use to pass options to redux form field
                name: 'activationCode', //name of the field
                className: 'form-control',
                prefix: 'Є',
                component: INPUT_FIELD, //component that use in the field
                validationModules: [{ moduleName: 'RequiredValidate' }] //use to validate the field
            }
        }
    ];
};
