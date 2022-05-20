import constants from '../../../../../UILibrary/constants';
import {AVC_DETAILS_FORM_DATA_FIELD_KEYS, AVC_DETAILS_FORM_FIELDS_LABLES} from './constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const {
    INPUT_FIELD,
    TEXTAREA,
    BUTTON_GROUP
} = FORM_FIELDS;
const { FULL_VIEW_CONTAINER, FULL_CONTAINER } = FORM_TEMPLATES;
const YESNOBUTTONOPTION = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

export const formFields = props => {
    return [
        {
            type: FULL_CONTAINER,
            label: AVC_DETAILS_FORM_FIELDS_LABLES[AVC_DETAILS_FORM_DATA_FIELD_KEYS.SCHEME_HAVE_AVC],
            bool: true,
            field: {
                __order: 'a',
                name: AVC_DETAILS_FORM_DATA_FIELD_KEYS.SCHEME_HAVE_AVC,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,
                validationModules: [{ moduleName: 'RequiredValidate' }]
            },
            when: [
                {
                    bool: props && props[AVC_DETAILS_FORM_DATA_FIELD_KEYS.SCHEME_HAVE_AVC] && props[AVC_DETAILS_FORM_DATA_FIELD_KEYS.SCHEME_HAVE_AVC] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER, //  form template type
                            label: AVC_DETAILS_FORM_FIELDS_LABLES[AVC_DETAILS_FORM_DATA_FIELD_KEYS.PROVIDER_NAME], // field label text
                            bool: props && props[AVC_DETAILS_FORM_DATA_FIELD_KEYS.SCHEME_HAVE_AVC] && props[AVC_DETAILS_FORM_DATA_FIELD_KEYS.SCHEME_HAVE_AVC] === 'yes',
                            field: {
                                //  Use to pass options to redux form field
                                __order: 'b',
                                name: AVC_DETAILS_FORM_DATA_FIELD_KEYS.PROVIDER_NAME, //name of the field
                                className: 'form-control',
                                component: INPUT_FIELD, //component that use in the field
                                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }] //use to validate the field
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: props && props[AVC_DETAILS_FORM_DATA_FIELD_KEYS.SCHEME_HAVE_AVC] && props[AVC_DETAILS_FORM_DATA_FIELD_KEYS.SCHEME_HAVE_AVC] === 'yes',
                            label: AVC_DETAILS_FORM_FIELDS_LABLES[AVC_DETAILS_FORM_DATA_FIELD_KEYS.TYPE_OF_AVC_FUNDS]
                        },
                        {
                            type: FULL_VIEW_CONTAINER, //  form template type
                            label: AVC_DETAILS_FORM_FIELDS_LABLES[AVC_DETAILS_FORM_DATA_FIELD_KEYS.TYPE_OF_AVC_FUNDS], // field label text
                            bool: props && props[AVC_DETAILS_FORM_DATA_FIELD_KEYS.SCHEME_HAVE_AVC] && props[AVC_DETAILS_FORM_DATA_FIELD_KEYS.SCHEME_HAVE_AVC] === 'yes',
                            field: {
                                //  Use to pass options to redux form field
                                __order: 'c',
                                name: AVC_DETAILS_FORM_DATA_FIELD_KEYS.TYPE_OF_AVC_FUNDS, //name of the field
                                className: 'form-control',
                                component: TEXTAREA, //component that use in the field
                                maxLength: 1500,
                                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }] //use to validate the field
                            }
                        }
                    ]
                }
            ]
        }
    ];
};
