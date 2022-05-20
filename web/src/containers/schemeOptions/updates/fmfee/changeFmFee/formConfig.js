import { TABONE, FMFEE_FORM_DATA_FIELD_KEYS, FMFEE_FORM_FIELDS_LABLES } from './constants';
import constants from '../../../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const {
    CURRENCY_FIELD,
    NUMBER_FIELD,
    BUTTON_GROUP
} = FORM_FIELDS;
const { FULL_CONTAINER } = FORM_TEMPLATES;
const YESNOBUTTONOPTION = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

export const formFields = props => {
    const formValues = props[TABONE.KEY];
    return [
        {
            type: FULL_CONTAINER,
            label: FMFEE_FORM_FIELDS_LABLES[FMFEE_FORM_DATA_FIELD_KEYS.OVERRIDE_FEES],
            bool: true,
            field: {
                __order: 'f',
                name: FMFEE_FORM_DATA_FIELD_KEYS.OVERRIDE_FEES,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,

                validationModules: [{ moduleName: 'RequiredValidate' }]
            },
            when: [
                {
                    bool: formValues && formValues[FMFEE_FORM_DATA_FIELD_KEYS.OVERRIDE_FEES] && formValues[FMFEE_FORM_DATA_FIELD_KEYS.OVERRIDE_FEES] === 'yes', // When this comdition become true functional configurations in side of the childComponent array will be display
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: FMFEE_FORM_FIELDS_LABLES[FMFEE_FORM_DATA_FIELD_KEYS.FMFEE],
                            bool: formValues && formValues[FMFEE_FORM_DATA_FIELD_KEYS.OVERRIDE_FEES] && formValues[FMFEE_FORM_DATA_FIELD_KEYS.OVERRIDE_FEES] === 'yes',
                            field: {
                                __order: 'g',
                                name: FMFEE_FORM_DATA_FIELD_KEYS.FMFEE,
                                className: 'form-control',
                                component: CURRENCY_FIELD,
                                options: {
                                    prefix: '£',
                                    props: {
                                        precision: 0,
                                        className: 'form-control',
                                        placeholder: '10,000,000'
                                    }
                                },
                                validationModules: [
                                    { moduleName: 'RequiredValidate' },
                                    {
                                        moduleName: 'NumericalValidate',
                                        options: {
                                            int: true,
                                            '>=': 1,
                                            message: 'Invalid entry'
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: FMFEE_FORM_FIELDS_LABLES[FMFEE_FORM_DATA_FIELD_KEYS.FMFEE_P],
                            bool: formValues && formValues[FMFEE_FORM_DATA_FIELD_KEYS.OVERRIDE_FEES] && formValues[FMFEE_FORM_DATA_FIELD_KEYS.OVERRIDE_FEES] === 'yes',
                            field: {
                                __order: 'h',
                                name: FMFEE_FORM_DATA_FIELD_KEYS.FMFEE_P,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: '%',
                                options: {
                                    decimalScale: 4, //Use to separate the decimal part of the input value
                                    placeholder: '0-100', //a value to display when there is no value
                                    allowNegative: false, //Use to not allow to enter negative values
                                    min: 0, //Use to demonstrates the minimun value can enter
                                    max: 100, //Use to demonstrates the maximum value that can enter
                                    allowLeadingZeros: true //Use to specify can enter a number with leading zeros
                                    // maxLength: 20 //Use to specify maximum length of a number that can enter
                                },
                                validationModules: [{ moduleName: 'RequiredValidate' }]
                            }
                        }
                    ]
                }
            ]
        }
    ];
};
