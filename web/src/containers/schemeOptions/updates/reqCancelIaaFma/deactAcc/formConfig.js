/* 
     This is the functional configuration for creating scheme activation simple forms
     In this approach developers can pass javaScript Objects as configuration parameters.
     Inside this configuration we can specify the form labels and respective form fields to display in the form

 */
import uiLibConstants from '../../../../../UILibrary/constants';
const { FORM_TEMPLATES, FORM_FIELDS } = uiLibConstants;
const { DATE_PICKER } = FORM_FIELDS;
const { FULL_CONTAINER } = FORM_TEMPLATES;

export const formFields = props => {
    console.log("Deactivation--------------------------------------------->", props);
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Effective date',
            field: {
                name: 'deactivateDate',
                className: 'form-control',
                component: DATE_PICKER,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        }
    ];
};
