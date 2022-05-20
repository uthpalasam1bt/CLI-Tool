/* 
This is a functional configuration for creating a form which contains upload generate fields.
Developers can pass configuration to the upload generate component as a formFieldFunction property.

*/

import constants from '../../../../../UILibrary/constants';
import { FUNDING_FORM_SECTION, FORM_LABELS } from './constants';
const { FORM_TEMPLATES, FORM_FIELDS } = constants;

const { SELECT_OPTION } = FORM_FIELDS;
const { FULL_CONTAINER } = FORM_TEMPLATES;

const { WANT_US_TO_UPLOAD_DCES } = FUNDING_FORM_SECTION.FIELD_KEYS;

export const formFields = props => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: FORM_LABELS.UPLOAD_LABEL,
            iIcon: FORM_LABELS.UPLOAD_LABEL_IICON,
            field: [
                {
                    __order: 'f',
                    name: WANT_US_TO_UPLOAD_DCES,
                    className: 'form-control',
                    component: SELECT_OPTION,
                    options: {
                        defaultValue: 'Select',
                        name: FORM_LABELS.DEFICIT_DROPDOWN,
                        dataList: [{ value: 'Upload File', key: 'uploadFile' }]
                    },
                    validationModules: [{ moduleName: 'RequiredValidate' }]
                }
            ]
        }
    ];
};
