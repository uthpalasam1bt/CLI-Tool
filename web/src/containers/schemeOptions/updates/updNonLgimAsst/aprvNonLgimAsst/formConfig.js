/* This is functional configuration for creating a simple forms
   
    Functional Configuration accept an array of javaScript Objects. In functional configuration we can use constants and functions
    directly.Furthermore programatically easy to configure.

*/
import uiLibConstants from '../../../../../UILibrary/constants';
import { FORM_NAME, FIELD_NAME } from './constants';

const { FORM_TEMPLATES, FORM_FIELDS } = uiLibConstants;
const { FULL_VIEW_CONTAINER } = FORM_TEMPLATES;
const { NON_ASSETS_SECTION } = FORM_FIELDS;

/* Form Templates

   FULL_CONTAINER - Include one label and one field

*/

export const formFields = (props = {}) => {
    return [
        {
            type: FULL_VIEW_CONTAINER, //  form template type
            bool: true, // use to make the component visible or invisible
            label: '', // field label text
            field: {
                //  Use to pass options to redux form field
                name: FIELD_NAME, //name of the field
                className: 'form-control',
                component: NON_ASSETS_SECTION, //component that use in the field
                options: {
                    disabled: true,
                    formData: props,
                    formName: FORM_NAME
                }
            }
        }
    ];
};
