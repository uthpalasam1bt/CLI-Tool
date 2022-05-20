import constants from '../../../../../UILibrary/constants';
import config from 'appConfig';
import React from 'react';
import moment from 'moment';
import { Divider } from 'antd';
import { TABONE, ENTERVALUE, FORM_FIELD_NAMES, FORM_FIELD_LABELS, FORM_FIELD_WITH_TAB } from './constants';
import connectApi from '../../../../../middlewares/connectApi';

const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const { PDF } = UPLOAD_FILE_TYPES;
const {
    NUMBER_FIELD,
    CURRENCY_FIELD,
    BUTTON_GROUP,
    SELECT_OPTION,
    FILE_DOWNLOADER,
    DATE_PICKER,
    FILE_UPLOADER
} = FORM_FIELDS;
const { FULL_CONTAINER, ROW } = FORM_TEMPLATES;
const { bucket: privateBucket } = config;
const YESNOBUTTONOPTION = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];
const { activeWorkFlow } = config.uploads;
const { cashflowOverall, cashflowFnR } = config.templates;

const selectCashFLowType = (formValues = {}, schemeId) => [
    {
        type: FULL_CONTAINER,
        label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.UPLOAD_CASHFLOW_REAL_FIXED],
        iIcon:
            'Please click Download to retrieve the template to include the cashflow data. Once complete, save as a csv file and click Upload to add the data to the system.',
        field: [
            {
                __order: 'ea',
                name: FORM_FIELD_WITH_TAB.UPLOAD_CASHFLOW_REAL_FIXED,
                className: 'form-control',
                component: SELECT_OPTION,
                options: {
                    defaultValue: 'Select',
                    name: 'liability-dropdown',
                    dataList:
                        formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_DURATION] === 'no' &&
                        formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_INFLATION_PERCENTAGE] === 'no'
                            ? [{ value: 'Fixed & Real', key: 'fixedAndReal' }]
                            : [{ value: 'Overall', key: 'overall' }, { value: 'Fixed & Real', key: 'fixedAndReal' }]
                },
                validationModules: [{ moduleName: 'RequiredValidate' }]
            },
            {
                className: 'form-control',
                name: FORM_FIELD_WITH_TAB.TEMPLATE_DOWNLOAD,
                component: FILE_DOWNLOADER,
                disabled:
                    formValues[FORM_FIELD_NAMES.UPLOAD_CASHFLOW_REAL_FIXED] === undefined ||
                    formValues[FORM_FIELD_NAMES.UPLOAD_CASHFLOW_REAL_FIXED] === '',
                url:
                    formValues[FORM_FIELD_NAMES.UPLOAD_CASHFLOW_REAL_FIXED] === 'overall'
                        ? cashflowOverall
                        : cashflowFnR,
                fileName:
                    formValues[FORM_FIELD_NAMES.UPLOAD_CASHFLOW_REAL_FIXED] === 'overall'
                        ? 'cashflow-overall-template.xlsx'
                        : 'cashflow-fixed-&-real-template.xlsx'
            }
        ],
        when: [
            {
                bool:
                    formValues[FORM_FIELD_NAMES.UPLOAD_CASHFLOW_REAL_FIXED] !== undefined &&
                    formValues[FORM_FIELD_NAMES.UPLOAD_CASHFLOW_REAL_FIXED] !== '',
                childComponents: [
                    {
                        type: FULL_CONTAINER,
                        label: `Upload the completed ${
                            formValues[FORM_FIELD_NAMES.UPLOAD_CASHFLOW_REAL_FIXED] === 'overall'
                                ? 'overall'
                                : 'fixed & real'
                            } cashflow`,
                        field: {
                            __order: 'eb',
                            name:
                                formValues[FORM_FIELD_NAMES.UPLOAD_CASHFLOW_REAL_FIXED] === 'overall'
                                    ? FORM_FIELD_WITH_TAB.UPLOAD_OVERALL_CASHFLOWS
                                    : FORM_FIELD_WITH_TAB.UPLOAD_FIXED_AND_REAL_CASHFLOW,
                            className: 'form-control',
                            component: FILE_UPLOADER,
                            options: {
                                accept: ['.xlsx'],
                                manual: true,
                                params: [schemeId],
                                url: activeWorkFlow.cashflow,
                                bucketName: privateBucket,
                                api: connectApi
                            },
                            validationModules: [{ moduleName: 'RequiredValidate' }]
                        }
                    }
                ]
            }
        ]
    },
    {
        type: FULL_CONTAINER,
        label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.CASHFLOW_PRODUCE_DATE],
        field: {
            __order: 'ec',
            name: FORM_FIELD_WITH_TAB.CASHFLOW_PRODUCE_DATE,
            className: 'form-control',
            component: DATE_PICKER, //Before today
            options: {
                disabledDate: current => current && current > moment().startOf('day')
            },
            validationModules: [{ moduleName: 'RequiredValidate' }]
        }
    },
    ...(formValues[FORM_FIELD_NAMES.UPLOAD_CASHFLOW_REAL_FIXED] === 'overall'
        ? [
              {
                  type: FULL_CONTAINER,
                  bool: formValues[FORM_FIELD_NAMES.UPLOAD_CASHFLOW_REAL_FIXED] === 'overall',
                  label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.PERCENTAGE_LINKED_INFLATION],
                  field: {
                      __order: 'ed',
                      name: FORM_FIELD_WITH_TAB.PERCENTAGE_LINKED_INFLATION,
                      className: 'form-control',
                      component: NUMBER_FIELD,
                      suffix: '%',
                      options: {
                          decimalScale: 2,
                          placeholder: '0 - 100',
                          min: 0,
                          max: 100,
                          allowNegative: false
                      },
                      validationModules: [{ moduleName: 'RequiredValidate' }]
                  }
              }
          ]
        : [])
];

export const formFields = props => {
    const formValues = props[TABONE.KEY];
    return [
        {
            type: FULL_CONTAINER,
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES],
            bool: true,
            field: {
                __order: 'a',
                name: FORM_FIELD_WITH_TAB.HAVE_SET_OF_PAST_SERVICES,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,
                validationModules: [{ moduleName: 'RequiredValidate' }]
            },
            when: [
                {
                    bool:
                        formValues &&
                        formValues[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES] &&
                        formValues[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES] === 'yes',
                    childComponents: selectCashFLowType(formValues, props.entityId)
                },
                {
                    bool:
                        formValues &&
                        formValues[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES] &&
                        formValues[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES] === 'no',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.LIABILITY_DURATION],
                            bool:
                                formValues &&
                                formValues[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES] &&
                                formValues[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES] === 'no',
                            field: {
                                __order: 'b',
                                name: FORM_FIELD_WITH_TAB.LIABILITY_DURATION,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: 'Years',
                                options: {
                                    placeholder: '1 - 50',
                                    decimalScale: 0, //Use to separate the decimal part of the input value
                                    min: 1, //Use to demonstrates the minimun value can enter
                                    max: 50 //Use to demonstrates the maximum value that can enter
                                },
                                validationModules: [{ moduleName: 'RequiredValidate' }]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.PERCENTAGE_LINKED_INFLATION],
                            bool:
                                formValues &&
                                formValues[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES] &&
                                formValues[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES] === 'no',
                            field: {
                                __order: 'd',
                                name: FORM_FIELD_WITH_TAB.PERCENTAGE_LINKED_INFLATION,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: '%',
                                options: {
                                    placeholder: '0 - 100',
                                    decimalScale: 2, //Use to separate the decimal part of the input value
                                    min: 1, //Use to demonstrates the minimun value can enter
                                    max: 100 //Use to demonstrates the maximum value that can enter
                                },
                                validationModules: [{ moduleName: 'RequiredValidate' }]
                            }
                        }
                    ]
                }
            ]
        },
        {
            type: FULL_CONTAINER,
            iIcon: 'Explanatory Wording.',
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE],
            bool: true,
            field: {
                __order: 'f',
                name: FORM_FIELD_WITH_TAB.KNOW_LIABILITY_VALUE_DATE,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,
                validationModules: [{ moduleName: 'RequiredValidate' }]
            },
            when: [
                {
                    bool:
                        formValues &&
                        formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] &&
                        formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool:
                                formValues &&
                                formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] &&
                                formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
                            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.LIABILITY_VALUE],
                            field: {
                                __order: 'g',
                                name: FORM_FIELD_WITH_TAB.LIABILITY_VALUE,
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
                                        options: { '>=': 1 }
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool:
                                formValues &&
                                formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] &&
                                formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
                            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.AVERAGE_MARGIN_LIABILITY_DISCOUNT],
                            field: {
                                __order: 'h',
                                iIcon:
                                    "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                                name: FORM_FIELD_WITH_TAB.AVERAGE_MARGIN_LIABILITY_DISCOUNT,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: '%',
                                options: {
                                    decimalScale: 2,
                                    placeholder: '0 - 5',
                                    min: 0,
                                    max: 5
                                },
                                validationModules: [
                                    { moduleName: 'RequiredValidate' },
                                    {
                                        moduleName: 'NumericalValidate',
                                        options: { '>': -1, message: 'Invalid entry' }
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool:
                                formValues &&
                                formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] &&
                                formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
                            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.PROVIDED_DATE],
                            field: {
                                __order: 'i',
                                name: FORM_FIELD_WITH_TAB.PROVIDED_DATE,
                                className: 'form-control',
                                component: DATE_PICKER,
                                options: {
                                    disabledDate: current => current && current > moment().startOf('day')
                                },
                                validationModules: [{ moduleName: 'RequiredValidate' }]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool:
                                formValues &&
                                formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] &&
                                formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
                            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.BASIS],
                            field: {
                                __order: 'j',
                                name: FORM_FIELD_WITH_TAB.BASIS,
                                className: 'form-control',
                                component: SELECT_OPTION,
                                options: {
                                    defaultValue: 'Select',
                                    dataList: [
                                        { key: 'technicalProvisions', value: 'Technical Provisions' },
                                        { key: 'giltBasis', value: 'Gilts Basis' },
                                        { key: 'accountingBasis', value: 'Accounting Basis' },
                                        { key: 'solvency', value: 'Solvency Basis' }
                                    ]
                                },
                                validationModules: [{ moduleName: 'RequiredValidate' }]
                            }
                        },
                        {
                            type: ROW,
                            rawComponents: <Divider />
                        },
                        {
                            type: FULL_CONTAINER,
                            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.LIKE_TO_SEE_PROJECTION_OYFP],
                            bool:
                                formValues &&
                                formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] &&
                                formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
                            field: {
                                __order: 'a',
                                name: FORM_FIELD_WITH_TAB.LIKE_TO_SEE_PROJECTION_OYFP,
                                className: 'form-control',
                                component: BUTTON_GROUP,
                                options: YESNOBUTTONOPTION,
                                validationModules: [{ moduleName: 'RequiredValidate' }]
                            },
                            when: [
                                {
                                    bool:
                                        formValues &&
                                        formValues[FORM_FIELD_NAMES.LIKE_TO_SEE_PROJECTION_OYFP] &&
                                        formValues[FORM_FIELD_NAMES.LIKE_TO_SEE_PROJECTION_OYFP] === 'yes',
                                    childComponents: [
                                        {
                                            type: FULL_CONTAINER,
                                            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.OPEN_TO_FUTURE_ACCRUAL],
                                            bool:
                                                formValues &&
                                                formValues[FORM_FIELD_NAMES.LIKE_TO_SEE_PROJECTION_OYFP] &&
                                                formValues[FORM_FIELD_NAMES.LIKE_TO_SEE_PROJECTION_OYFP] === 'yes',
                                            field: {
                                                __order: 'e',
                                                name: FORM_FIELD_WITH_TAB.OPEN_TO_FUTURE_ACCRUAL,
                                                className: 'form-control',
                                                component: BUTTON_GROUP,
                                                options: YESNOBUTTONOPTION,
                                                validationModules: [{ moduleName: 'RequiredValidate' }]
                                            },
                                            when: [
                                                {
                                                    bool:
                                                        formValues &&
                                                        formValues[FORM_FIELD_NAMES.OPEN_TO_FUTURE_ACCRUAL] &&
                                                        formValues[FORM_FIELD_NAMES.OPEN_TO_FUTURE_ACCRUAL] === 'yes',
                                                    childComponents: [
                                                        {
                                                            type: FULL_CONTAINER,
                                                            bool:
                                                                formValues &&
                                                                formValues[FORM_FIELD_NAMES.OPEN_TO_FUTURE_ACCRUAL] &&
                                                                formValues[FORM_FIELD_NAMES.OPEN_TO_FUTURE_ACCRUAL] === 'yes',
                                                            label:
                                                                FORM_FIELD_LABELS[
                                                                    FORM_FIELD_NAMES.CURRENT_ANNUAL_COST_ACCRUAL
                                                                ],
                                                            field: {
                                                                __order: 'f',
                                                                name: FORM_FIELD_WITH_TAB.CURRENT_ANNUAL_COST_ACCRUAL,
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
                                                                        options: { '>': -1, message: 'Invalid entry' }
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            type: FULL_CONTAINER,
                                                            label:
                                                                FORM_FIELD_LABELS[
                                                                    FORM_FIELD_NAMES
                                                                        .COMBINED_COMPANY_MEMBER_CONTRIBUTIONS
                                                                ],
                                                            bool:
                                                                formValues &&
                                                                formValues[FORM_FIELD_NAMES.OPEN_TO_FUTURE_ACCRUAL] &&
                                                                formValues[FORM_FIELD_NAMES.OPEN_TO_FUTURE_ACCRUAL] === 'yes',
                                                            field: {
                                                                __order: 'g',
                                                                name:
                                                                    FORM_FIELD_WITH_TAB.COMBINED_COMPANY_MEMBER_CONTRIBUTIONS,
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
                                                                        options: { '>': -1, message: 'Invalid entry' }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            type: FULL_CONTAINER,
                                            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.HAVE_TARGET_BUY_OUT_VALUE],
                                            bool:
                                                formValues &&
                                                formValues[FORM_FIELD_NAMES.LIKE_TO_SEE_PROJECTION_OYFP] &&
                                                formValues[FORM_FIELD_NAMES.LIKE_TO_SEE_PROJECTION_OYFP] === 'yes',
                                            field: {
                                                __order: 'h',
                                                name: FORM_FIELD_WITH_TAB.HAVE_TARGET_BUY_OUT_VALUE,
                                                className: 'form-control',
                                                component: BUTTON_GROUP,
                                                options: YESNOBUTTONOPTION,
                                                validationModules: [{ moduleName: 'RequiredValidate' }]
                                            },
                                            when: [
                                                {
                                                    bool:
                                                        formValues &&
                                                        formValues[FORM_FIELD_NAMES.HAVE_TARGET_BUY_OUT_VALUE] &&
                                                        formValues[FORM_FIELD_NAMES.HAVE_TARGET_BUY_OUT_VALUE] ===
                                                            'yes',
                                                    childComponents: [
                                                        {
                                                            type: FULL_CONTAINER,
                                                            label: 'Target buy-out price',
                                                            bool:
                                                                formValues &&
                                                                formValues[FORM_FIELD_NAMES.HAVE_TARGET_BUY_OUT_VALUE] &&
                                                                formValues[FORM_FIELD_NAMES.HAVE_TARGET_BUY_OUT_VALUE] ===
                                                                'yes',
                                                            field: {
                                                                __order: 'i',
                                                                name: FORM_FIELD_WITH_TAB.TARGET_BUYOUT_VALUE,
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
                                                                            '>': 1,
                                                                            message:
                                                                                'Please re-enter Target Buyout Value.  Value must be greater than £1.'
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        },
                                                        {
                                                            type: FULL_CONTAINER,
                                                            bool:
                                                                formValues &&
                                                                formValues[FORM_FIELD_NAMES.HAVE_TARGET_BUY_OUT_VALUE] &&
                                                                formValues[FORM_FIELD_NAMES.HAVE_TARGET_BUY_OUT_VALUE] ===
                                                                'yes',
                                                            label:
                                                                FORM_FIELD_LABELS[
                                                                    FORM_FIELD_NAMES.TARGET_BUYOUT_PROVIDED_DATE
                                                                ],
                                                            field: {
                                                                __order: 'j',
                                                                name: FORM_FIELD_WITH_TAB.TARGET_BUYOUT_PROVIDED_DATE,
                                                                className: 'form-control',
                                                                component: DATE_PICKER, //-Before-today
                                                                options: {
                                                                    disabledDate: current =>
                                                                        current && current > moment().startOf('day')
                                                                },
                                                                validationModules: [{ moduleName: 'RequiredValidate' }]
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
};
