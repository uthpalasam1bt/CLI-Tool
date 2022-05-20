import uiLiabraryConstants from '../../../../../UILibrary/constants';
import { FORM_NAME, FIELD_NAME } from './constants';

const { FORM_TEMPLATES, FORM_FIELDS } = uiLiabraryConstants;
const { NON_ASSETS_SECTION } = FORM_FIELDS;
const { FULL_VIEW_CONTAINER } = FORM_TEMPLATES;

export const formFields = props => {
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
                    disabled: false,
                    formData: props,
                    formName: FORM_NAME
                }
            }
        }
    ];
};
