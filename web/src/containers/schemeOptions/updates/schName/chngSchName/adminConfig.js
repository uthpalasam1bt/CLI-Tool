import React from 'react';
import config from 'appConfig';
import moment from 'moment';

import constants from '../../../../../UILibrary/constants';

import { ADMIN_FORM_FIELD_NAMES, TAB_KEYS, ADMIN_FORM_FIELD_LABELS } from './constants';
import _ from 'lodash';

const { bucket: privateBucket, publicBucket, generateBucket } = config;
const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const { INPUT_FIELD, NUMBER_FIELD, SELECT_OPTION, MONTH_DATE_PICKER, TEXTAREA, BUTTON_GROUP } = FORM_FIELDS;
const { FULL_CONTAINER, ROW, FULL_VIEW_CONTAINER, LABEL } = FORM_TEMPLATES;
const { riaa } = config.uploads;
const { PDF } = UPLOAD_FILE_TYPES;

const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

export const adminFormFields = props => {
    const formValues = _.get(props, `${TAB_KEYS.ADMIN_FORM}`, {});
    let stepCompleted = props.step && props.step.completed;
    return [
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.FEE_PAYMENT_METHOD],
            field: {
                name: `${ADMIN_FORM_FIELD_NAMES.FEE_PAYMENT_METHOD}`,
                className: 'form-control',
                component: SELECT_OPTION,
                options: {
                    defaultValue: 'Select',
                    name: ADMIN_FORM_FIELD_NAMES.FEE_PAYMENT_METHOD,
                    dataList: [
                        { key: 'directEnchashmentOfUnits', value: 'Encashment of units' },
                        { key: 'invoiceWithSeperateCashSettlement', value: 'Separate Invoice' }
                    ]
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_NAME],
            field: {
                name: `${ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_NAME}`,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_NUMBER],
            field: {
                name: `${ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_NUMBER}`,
                className: 'form-control',
                component: NUMBER_FIELD,
                validationModules: [
                    { moduleName: 'RequiredValidate', options: { message: 'Required' } },
                    {
                        moduleName: 'GreaterThanZeroValidate'
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_SORT_CODE],
            field: {
                name: `${ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_SORT_CODE}`,
                className: 'form-control',
                component: NUMBER_FIELD,
                options: {
                    decimalScale: 0,
                    min: 0,
                    placeholder: '__-__-__',
                    format: '##-##-##',
                    mask: '__'
                },
                validationModules: [
                    { moduleName: 'RequiredValidate', options: { message: 'Required' } },
                    {
                        moduleName: 'LengthValidate',
                        options: {
                            max: [6]
                        }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_NAME],
            field: {
                name: `${ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_NAME}`,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.SCHEME_YEAR_END_DATE_ANUAL_REPORT],
            field: {
                name: `${ADMIN_FORM_FIELD_NAMES.SCHEME_YEAR_END_DATE_ANUAL_REPORT}`,
                className: 'form-control',
                component: MONTH_DATE_PICKER, //Before today
                options: {
                    disabledDate: current => current && current > moment().startOf('day'),
                    format: 'MM/DD',
                    orderReverse: true
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },

        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.SCHEME_HAVE_AVCS],
            field: {
                __order: 'a',
                name: `${ADMIN_FORM_FIELD_NAMES.SCHEME_HAVE_AVCS}`,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            },
            when: [
                {
                    bool: formValues && formValues[ADMIN_FORM_FIELD_NAMES.SCHEME_HAVE_AVCS] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.NAME_OF_AVC_PROVIDER],
                            bool: formValues && formValues[ADMIN_FORM_FIELD_NAMES.SCHEME_HAVE_AVCS] === 'yes',
                            field: {
                                name: `${ADMIN_FORM_FIELD_NAMES.NAME_OF_AVC_PROVIDER}`,
                                className: 'form-control',
                                component: INPUT_FIELD,
                                validationModules: [
                                    { moduleName: 'RequiredValidate', options: { message: 'Required' } }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: formValues && formValues[ADMIN_FORM_FIELD_NAMES.SCHEME_HAVE_AVCS] === 'yes',
                            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.DESCRIBE_AVC_FUNDS_HELD],
                            field: {
                                __order: 'i',
                                name: `${ADMIN_FORM_FIELD_NAMES.DESCRIBE_AVC_FUNDS_HELD}`,
                                className: 'form-control',
                                component: TEXTAREA,
                                props: {
                                    maxLength: 1500
                                },
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    },
                                    {
                                        moduleName: 'LengthValidate',
                                        options: {
                                            max: 1500
                                        }
                                    }
                                ]
                            },
                            blockComponent: true
                        }
                    ]
                }
            ]
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.ACTURAY_COMPANY],
            field: {
                name: `${ADMIN_FORM_FIELD_NAMES.ACTURAY_COMPANY}`,
                className: 'form-control',
                component: INPUT_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.ACTUARY_NAME],
            field: {
                name: `${ADMIN_FORM_FIELD_NAMES.ACTUARY_NAME}`,
                className: 'form-control',
                component: INPUT_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.ACTUARY_EMAIL],
            field: {
                name: `${ADMIN_FORM_FIELD_NAMES.ACTUARY_EMAIL}`,
                className: 'form-control',
                component: INPUT_FIELD,
                isEmail: true,
                validationModules: [{ moduleName: 'EmailValidate' }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.ACTUARY_PHONE],
            field: {
                name: `${ADMIN_FORM_FIELD_NAMES.ACTUARY_PHONE}`,
                className: 'form-control',
                component: NUMBER_FIELD,
                options: { maxlength: 15 }
            }
        }
    ];
};
