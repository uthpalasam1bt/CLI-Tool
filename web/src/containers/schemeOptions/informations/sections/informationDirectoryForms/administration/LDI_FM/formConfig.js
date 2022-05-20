import React from 'react';
import moment from 'moment';
import { Row as AntRow, Divider } from 'antd';
import constants from '../../../../../../../UILibrary/constants';
import { FormField } from '../../../../../../../UILibrary/components/forms/fields';
import {
    ADMIN_FORM_FIELD_LABELS,
    ADMIN_FORM_FIELD_NAMES,
    LDI_ADMIN_FORM_FIELD_LABELS,
    LDI_ADMIN_FORM_FIELD_NAMES
} from './constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { SELECT_OPTION, INPUT_FIELD, NUMBER_FIELD, MONTH_DATE_PICKER, BUTTON_GROUP, TEXTAREA } = FORM_FIELDS;
const { FULL_CONTAINER, ROW } = FORM_TEMPLATES;
const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];
export const formFields = (dirtyFormValues = {}) => {
    return [
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.FEE_PAYMENT_METHOD],
            field: {
                name: ADMIN_FORM_FIELD_NAMES.FEE_PAYMENT_METHOD,
                className: 'form-control',
                component: SELECT_OPTION,
                options: {
                    defaultValue: 'Select',
                    name: ADMIN_FORM_FIELD_NAMES.FEE_PAYMENT_METHOD,
                    dataList: [
                        { key: 'directEnchashmentOfUnits', value: 'Encashment of units' },
                        { key: 'invoiceWithSeperateCashSettlement', value: 'Separate Invoice' }
                    ]
                }
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_NAME],
            field: {
                name: ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_NAME,
                className: 'form-control',
                component: INPUT_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_NUMBER],
            field: {
                name: ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_NUMBER,
                className: 'form-control',
                component: NUMBER_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_SORT_CODE],
            field: {
                name: ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_ACCOUNT_SORT_CODE,
                className: 'form-control',
                component: NUMBER_FIELD,
                options: {
                    decimalScale: 0,
                    min: 0,
                    placeholder: '__-__-__',
                    format: '##-##-##',
                    mask: '__'
                }
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_NAME],
            field: {
                name: ADMIN_FORM_FIELD_NAMES.TRUSTEE_BANK_NAME,
                className: 'form-control',
                component: INPUT_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.SCHEME_YEAR_END_DATE_ANUAL_REPORT],
            field: {
                name: ADMIN_FORM_FIELD_NAMES.SCHEME_YEAR_END_DATE_ANUAL_REPORT,
                className: 'form-control',
                component: MONTH_DATE_PICKER, //Before today
                options: {
                    disabledDate: current => current && current > moment().startOf('day'),
                    format: 'MM/DD',
                    orderReverse: true
                },
                validate: []
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.SCHEME_HAVE_AVCS],
            field: {
                __order: 'a',
                name: ADMIN_FORM_FIELD_NAMES.SCHEME_HAVE_AVCS,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
                validate: []
            },
            when: [
                {
                    bool: true,

                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.NAME_OF_AVC_PROVIDER],
                            field: {
                                name: ADMIN_FORM_FIELD_NAMES.NAME_OF_AVC_PROVIDER,
                                className: 'form-control',
                                component: INPUT_FIELD
                            }
                        },
                        {
                            type: ROW,
                            className: 'input-row',
                            name: ADMIN_FORM_FIELD_NAMES.DESCRIBE_AVC_FUNDS_HELD,
                            rawComponents: (
                                <div className="input-row">
                                    <AntRow className="label-wrapper">
                                        <p className="input-title">
                                            {ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.DESCRIBE_AVC_FUNDS_HELD]}
                                        </p>
                                    </AntRow>
                                    <AntRow>
                                        <FormField
                                            component={TEXTAREA}
                                            name={ADMIN_FORM_FIELD_NAMES.DESCRIBE_AVC_FUNDS_HELD}
                                            className="form-control w-100"
                                            maxlength="1500"
                                            disabled={true}
                                        />
                                    </AntRow>
                                </div>
                            )
                        }
                    ]
                }
            ]
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.ACTURAY_COMPANY],
            field: {
                name: ADMIN_FORM_FIELD_NAMES.ACTURAY_COMPANY,
                className: 'form-control',
                component: INPUT_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.ACTUARY_NAME],
            field: {
                name: ADMIN_FORM_FIELD_NAMES.ACTUARY_NAME,
                className: 'form-control',
                component: INPUT_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.ACTUARY_EMAIL],
            field: {
                name: ADMIN_FORM_FIELD_NAMES.ACTUARY_EMAIL,
                className: 'form-control',
                component: INPUT_FIELD,
                isEmail: true,
                validate: []
            }
        },
        {
            type: FULL_CONTAINER,
            label: ADMIN_FORM_FIELD_LABELS[ADMIN_FORM_FIELD_NAMES.ACTUARY_PHONE],
            field: {
                name: ADMIN_FORM_FIELD_NAMES.ACTUARY_PHONE,
                className: 'form-control',
                component: NUMBER_FIELD,
                options: { maxlength: 15 }
            }
        },
        {
            type: ROW,
            rawComponents: <Divider type="horizontal" />
        },
        {
            type: 'NOTHING',
            when: [
                {
                    bool: true,
                    childComponents: [
                        {
                            type: ROW,
                            rawComponents: (
                                <div className="input-row">
                                    <div className="label-wrapper">
                                        <label className="input-title active-heading font-weight-bold text-dark">
                                            LDI Administration details
                                        </label>
                                    </div>
                                </div>
                            )
                        },
                        {
                            type: FULL_CONTAINER,
                            label: LDI_ADMIN_FORM_FIELD_LABELS[LDI_ADMIN_FORM_FIELD_NAMES.FEE_PAYMENT_METHOD],
                            field: {
                                name: LDI_ADMIN_FORM_FIELD_NAMES.FEE_PAYMENT_METHOD,
                                className: 'form-control',
                                component: SELECT_OPTION,
                                options: {
                                    defaultValue: 'Select',
                                    name: LDI_ADMIN_FORM_FIELD_NAMES.FEE_PAYMENT_METHOD,
                                    dataList: [
                                        { key: 'directEnchashmentOfUnits', value: 'Encashment of units' },
                                        { key: 'invoiceWithSeperateCashSettlement', value: 'Separate Invoice' }
                                    ]
                                }
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label:
                                LDI_ADMIN_FORM_FIELD_LABELS[
                                    LDI_ADMIN_FORM_FIELD_NAMES.SCHEME_YEAR_END_DATE_ANUAL_REPORT
                                ],
                            field: {
                                name: LDI_ADMIN_FORM_FIELD_NAMES.SCHEME_YEAR_END_DATE_ANUAL_REPORT,
                                className: 'form-control',
                                component: MONTH_DATE_PICKER, //Before today
                                options: {
                                    disabledDate: current => current && current > moment().startOf('day'),
                                    format: 'MM/DD',
                                    orderReverse: true
                                },
                                validate: []
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: LDI_ADMIN_FORM_FIELD_LABELS[LDI_ADMIN_FORM_FIELD_NAMES.SCHEME_HAVE_AVCS],
                            field: {
                                __order: 'a',
                                name: LDI_ADMIN_FORM_FIELD_NAMES.SCHEME_HAVE_AVCS,
                                className: 'form-control',
                                component: BUTTON_GROUP,
                                options: yesNoOption,
                                validate: []
                            },
                            when: [
                                {
                                    bool: true,
                                    childComponents: [
                                        {
                                            type: FULL_CONTAINER,
                                            label:
                                                LDI_ADMIN_FORM_FIELD_LABELS[
                                                    LDI_ADMIN_FORM_FIELD_NAMES.NAME_OF_AVC_PROVIDER
                                                ],
                                            field: {
                                                name: LDI_ADMIN_FORM_FIELD_NAMES.NAME_OF_AVC_PROVIDER,
                                                className: 'form-control',
                                                component: INPUT_FIELD
                                            }
                                        },
                                        {
                                            type: ROW,
                                            className: 'input-row',
                                            name: LDI_ADMIN_FORM_FIELD_NAMES.DESCRIBE_AVC_FUNDS_HELD,
                                            rawComponents: (
                                                <div className="input-row">
                                                    <AntRow className="label-wrapper">
                                                        <p className="input-title">
                                                            {
                                                                LDI_ADMIN_FORM_FIELD_LABELS[
                                                                    LDI_ADMIN_FORM_FIELD_NAMES.DESCRIBE_AVC_FUNDS_HELD
                                                                ]
                                                            }
                                                        </p>
                                                    </AntRow>
                                                    <AntRow>
                                                        <FormField
                                                            component={TEXTAREA}
                                                            name={LDI_ADMIN_FORM_FIELD_NAMES.DESCRIBE_AVC_FUNDS_HELD}
                                                            className="form-control w-100"
                                                            maxlength="1500"
                                                            disabled={true}
                                                        />
                                                    </AntRow>
                                                </div>
                                            )
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: FULL_CONTAINER,
                            label: LDI_ADMIN_FORM_FIELD_LABELS[LDI_ADMIN_FORM_FIELD_NAMES.ACTURAY_COMPANY],
                            field: {
                                name: LDI_ADMIN_FORM_FIELD_NAMES.ACTURAY_COMPANY,
                                className: 'form-control',
                                component: INPUT_FIELD
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: LDI_ADMIN_FORM_FIELD_LABELS[LDI_ADMIN_FORM_FIELD_NAMES.ACTUARY_NAME],
                            field: {
                                name: LDI_ADMIN_FORM_FIELD_NAMES.ACTUARY_NAME,
                                className: 'form-control',
                                component: INPUT_FIELD
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: LDI_ADMIN_FORM_FIELD_LABELS[LDI_ADMIN_FORM_FIELD_NAMES.ACTUARY_EMAIL],
                            field: {
                                name: LDI_ADMIN_FORM_FIELD_NAMES.ACTUARY_EMAIL,
                                className: 'form-control',
                                component: INPUT_FIELD,
                                isEmail: true,
                                validate: []
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: LDI_ADMIN_FORM_FIELD_LABELS[LDI_ADMIN_FORM_FIELD_NAMES.ACTUARY_PHONE],
                            field: {
                                name: LDI_ADMIN_FORM_FIELD_NAMES.ACTUARY_PHONE,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                options: { maxlength: 15 }
                            }
                        }
                    ]
                }
            ]
        }
    ];
};
