/* This is functional configuration for creating a simple forms
   
    Functional Configuration accept an array of javaScript Objects. In functional configuration we can use constants and functions
    directly.Furthermore programatically easy to configure.

*/
import uiLibConstants from '../../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS } = uiLibConstants;
const { FULL_CONTAINER } = FORM_TEMPLATES;
const { INPUT_FIELD } = FORM_FIELDS;

/* Form Templates

   FULL_CONTAINER - Include one label and one field

*/

export const formFields2 = (props = {}) => {
    return [
        {
            type: FULL_CONTAINER, //form template type
            bool: true, //use to make the component visible or invisible
            label: 'Activation code Three', //field label text
            field: {
                //redux form field options
                name: 'activationCode3', //name of the field
                className: 'form-control', //styles to the fields
                component: INPUT_FIELD, //component that use in the field
                //use to validate the field
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Activation code Four',
            field: {
                name: 'activationCode4',
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    }
                ]
            }
        }
    ];
};
