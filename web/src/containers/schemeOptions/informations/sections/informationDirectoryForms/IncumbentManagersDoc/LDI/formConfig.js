import constants from '../../../../../../../UILibrary/constants';
import {
    NAME_OF_EIM,
    MANAGER_ACCOUNT_NUMBER,
    PRIMARY_CONTACT,
    PRIMARY_CONTACT_EMAIL,
    PRIMARY_CONTACT_PHONE_NUMBER,
    NAME_OF_EIM_LDI_LABEL,
    MANAGER_ACCOUNT_NUMBER_LDI_LABEL,
    PRIMARY_CONTACT_LDI_LABEL,
    PRIMARY_CONTACT_EMAIL_LDI_LABEL,
    PRIMARY_CONTACT_PHONE_NUMBER_LDI_LABEL
} from './constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { INPUT_FIELD, NUMBER_FIELD, PHONE_NUMBER_FIELD } = FORM_FIELDS;
const { FULL_CONTAINER } = FORM_TEMPLATES;

export const formFields = (dirtyFormValues = {}) => {
    return [
        {
            type: FULL_CONTAINER,
            label: NAME_OF_EIM_LDI_LABEL,
            field: {
                name: NAME_OF_EIM,
                className: 'form-control',
                component: INPUT_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            label: MANAGER_ACCOUNT_NUMBER_LDI_LABEL,
            field: {
                name: MANAGER_ACCOUNT_NUMBER,
                className: 'form-control',
                component: INPUT_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            label: PRIMARY_CONTACT_LDI_LABEL,
            field: {
                name: PRIMARY_CONTACT,
                className: 'form-control',
                component: PHONE_NUMBER_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            label: PRIMARY_CONTACT_EMAIL_LDI_LABEL,
            field: {
                name: PRIMARY_CONTACT_EMAIL,
                className: 'form-control',
                component: INPUT_FIELD,
                isEmail: true
            }
        },
        {
            type: FULL_CONTAINER,
            label: PRIMARY_CONTACT_PHONE_NUMBER_LDI_LABEL,
            field: {
                name: PRIMARY_CONTACT_PHONE_NUMBER,
                className: 'form-control',
                component: PHONE_NUMBER_FIELD
            }
        }
    ];
};
