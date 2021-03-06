import constants from '../../../../../UILibrary/constants';
import config from 'appConfig';
import React from 'react';
import moment from 'moment';
import { Divider } from 'antd';
import { FORM_FIELD_NAMES, FORM_FIELD_LABELS, LABEL_NAMES } from './constants';
import connectApi from '../../../../../middlewares/connectApi';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
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
        iIcon: LABEL_NAMES.iIcon,
        field: [
            {
                __order: 'ea',
                name: FORM_FIELD_NAMES.UPLOAD_CASHFLOW_REAL_FIXED,
                className: 'form-control',
                component: SELECT_OPTION,
                options: {
                    defaultValue: 'Select',
                    name: FORM_FIELD_NAMES.LIABILITY_DROPDOWN,
                    dataList:
                        formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_DURATION] === 'no' &&
                        formValues[FORM_FIELD_NAMES.KNOW_LIABILITY_INFLATION_PERCENTAGE] === 'no'
                            ? [{ value: 'Fixed & Real', key: 'fixedAndReal' }]
                            : [{ value: 'Overall', key: 'overall' }, { value: 'Fixed & Real', key: 'fixedAndReal' }]
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            },
            {
                className: 'form-control',
                name: FORM_FIELD_NAMES.TEMPLATE_DOWNLOAD,
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
                        : 'cashflow-fixed-&-real-template.xlsx',
                bucketNameProp: privateBucket,
                api: connectApi
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
                                    ? FORM_FIELD_NAMES.UPLOAD_OVERALL_CASHFLOWS
                                    : FORM_FIELD_NAMES.UPLOAD_FIXED_AND_REAL_CASHFLOW,
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
                            validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
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
            name: FORM_FIELD_NAMES.CASHFLOW_PRODUCE_DATE,
            className: 'form-control',
            component: DATE_PICKER, //Before today
            options: {
                disabledDate: current => current && current > moment().startOf('day')
            },
            validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
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
                      name: FORM_FIELD_NAMES.PERCENTAGE_LINKED_INFLATION,
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
                      validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
                  }
              }
          ]
        : [])
];

export const formFields = props => {
    return [
        {
            type: FULL_CONTAINER,
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES],
            // defaultValue: 'yes',
            bool: true,
            field: {
                __order: 'a',
                name: FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,
                defaultValue: 'yes',
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            },
            when: [
                {
                    bool:
                        props &&
                        props[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES] &&
                        props[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES] === 'yes',
                    childComponents: selectCashFLowType(props, props.entityId)
                },
                {
                    bool:
                        props &&
                        props[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES] &&
                        props[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES] === 'no',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.LIABILITY_DURATION],
                            field: {
                                __order: 'b',
                                name: FORM_FIELD_NAMES.LIABILITY_DURATION,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: 'Years',
                                options: {
                                    placeholder: '1 - 50',
                                    decimalScale: 0, //Use to separate the decimal part of the input value
                                    min: 1, //Use to demonstrates the minimun value can enter
                                    max: 50 //Use to demonstrates the maximum value that can enter
                                },
                                validationModules: [
                                    { moduleName: 'RequiredValidate', options: { message: 'Required' } }
                                    // {
                                    //     moduleName: 'NumericalValidate',
                                    //     options: { '>=': 1, '<=': 50 }
                                    // },
                                    // { moduleName: 'DecimalValidate',
                                    //     options: {
                                    //         precision: 0
                                    //     }
                                    // }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool:
                                props &&
                                props[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES] &&
                                props[FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES] === 'no',
                            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.PERCENTAGE_LINKED_INFLATION],
                            field: {
                                __order: 'd',
                                name: FORM_FIELD_NAMES.PERCENTAGE_LINKED_INFLATION,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: '%',
                                options: {
                                    placeholder: '0 - 100',
                                    decimalScale: 2, //Use to separate the decimal part of the input value
                                    min: 1, //Use to demonstrates the minimun value can enter
                                    max: 100 //Use to demonstrates the maximum value that can enter
                                },
                                validationModules: [
                                    { moduleName: 'RequiredValidate', options: { message: 'Required' } }
                                    // {
                                    //     moduleName: 'NumericalValidate',
                                    //     options: { '>=': 1, '<=': 100 }
                                    // },
                                    // { moduleName: 'DecimalValidate',
                                    //     options: {
                                    //         precision: 2
                                    //     }
                                    // }
                                ]
                            }
                        }
                    ]
                }
            ]
        },
        // {
        //     type: FULL_CONTAINER,
        //     iIcon: LABEL_NAMES.KNOW_LIABILITY_VALUE_DATE_IICON,
        //     label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE],
        //     defaultValue: 'yes',
        //     bool: true,
        //     field: {
        //         //   __order: 'f',
        //         name: FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE,
        //         className: 'form-control',
        //         component: BUTTON_GROUP,
        //         options: YESNOBUTTONOPTION,
        //         defaultValue: 'yes',
        //         validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
        //     },
        //     when: [
        //         {
        //             bool:
        //                 props &&
        //                 props[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] &&
        //                 props[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
        //             childComponents: [
        //                 {
        //                     type: FULL_CONTAINER,
        //                     // bool: props[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
        //                     label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.LIABILITY_VALUE],
        //                     field: {
        //                         //   __order: 'g',
        //                         name: FORM_FIELD_NAMES.LIABILITY_VALUE,
        //                         className: 'form-control',
        //                         component: CURRENCY_FIELD,
        //                         options: {
        //                             prefix: '??',
        //                             props: {
        //                                 precision: 0,
        //                                 className: 'form-control',
        //                                 placeholder: '10,000,000'
        //                             }
        //                         },
        //                         validationModules: [
        //                             { moduleName: 'RequiredValidate', options: { message: 'Required' } },
        //                             {
        //                                 moduleName: 'NumericalValidate',
        //                                 options: { '>=': 1 }
        //                             }
        //                         ]
        //                     }
        //                 },
        //                 {
        //                     type: FULL_CONTAINER,
        //                     // bool: props[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
        //                     label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.AVERAGE_MARGIN_LIABILITY_DISCOUNT],
        //                     field: {
        //                         //   __order: 'h',
        //                         iIcon: LABEL_NAMES.AVERAGE_MARGIN_LIABILITY_DISCOUNT_IICON,
        //                         name: FORM_FIELD_NAMES.AVERAGE_MARGIN_LIABILITY_DISCOUNT,
        //                         className: 'form-control',
        //                         component: NUMBER_FIELD,
        //                         suffix: '%',
        //                         options: {
        //                             decimalScale: 2,
        //                             placeholder: '0 - 5',
        //                             min: 0,
        //                             max: 5
        //                         },
        //                         validationModules: [
        //                             { moduleName: 'RequiredValidate', options: { message: 'Required' } },
        //                             {
        //                                 moduleName: 'NumericalValidate',
        //                                 options: { '>': -1, message: 'Invalid entry' }
        //                             }
        //                         ]
        //                     }
        //                 },
        //                 {
        //                     type: FULL_CONTAINER,
        //                     // bool: props[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
        //                     label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.PROVIDED_DATE],
        //                     field: {
        //                         //   __order: 'i',
        //                         name: FORM_FIELD_NAMES.PROVIDED_DATE,
        //                         className: 'form-control',
        //                         component: DATE_PICKER,
        //                         options: {
        //                             disabledDate: current => current && current > moment().startOf('day')
        //                         },
        //                         validationModules: [
        //                             { moduleName: 'RequiredValidate', options: { message: 'Required' } }
        //                         ]
        //                     }
        //                 },
        //                 {
        //                     type: FULL_CONTAINER,
        //                     // bool: props[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
        //                     label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.BASIS],
        //                     field: {
        //                         //   __order: 'j',
        //                         name: FORM_FIELD_NAMES.BASIS,
        //                         className: 'form-control',
        //                         component: SELECT_OPTION,
        //                         options: {
        //                             defaultValue: 'Select',
        //                             dataList: [
        //                                 { key: 'technicalProvisions', value: 'Technical Provisions' },
        //                                 { key: 'giltBasis', value: 'Gilts Basis' },
        //                                 { key: 'accountingBasis', value: 'Accounting Basis' },
        //                                 { key: 'solvency', value: 'Solvency Basis' }
        //                             ]
        //                         },
        //                         validationModules: [
        //                             { moduleName: 'RequiredValidate', options: { message: 'Required' } }
        //                         ]
        //                     }
        //                 }
        //             ]
        //         }
        //     ]
        // },
        {
            type: FULL_CONTAINER,
            // bool: props[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.LIABILITY_VALUE],
            field: {
                __order: 'g',
                name: FORM_FIELD_NAMES.LIABILITY_VALUE,
                className: 'form-control',
                component: CURRENCY_FIELD,
                options: {
                    prefix: '??',
                    props: {
                        precision: 0,
                        className: 'form-control',
                        placeholder: '10,000,000'
                    }
                },
                validationModules: [
                    { moduleName: 'RequiredValidate', options: { message: 'Required' } },
                    {
                        moduleName: 'NumericalValidate',
                        options: { '>=': 1 }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            // bool: props[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.AVERAGE_MARGIN_LIABILITY_DISCOUNT],
            field: {
                __order: 'h',
                iIcon: LABEL_NAMES.AVERAGE_MARGIN_LIABILITY_DISCOUNT_IICON,
                name: FORM_FIELD_NAMES.AVERAGE_MARGIN_LIABILITY_DISCOUNT,
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
                    { moduleName: 'RequiredValidate', options: { message: 'Required' } },
                    {
                        moduleName: 'NumericalValidate',
                        options: { '>': -1, message: 'Invalid entry' }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            // bool: props[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.PROVIDED_DATE],
            field: {
                __order: 'i',
                name: FORM_FIELD_NAMES.PROVIDED_DATE,
                className: 'form-control',
                component: DATE_PICKER,
                options: {
                    disabledDate: current => current && current > moment().startOf('day')
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            // bool: props[FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE] === 'yes',
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.BASIS],
            field: {
                __order: 'j',
                name: FORM_FIELD_NAMES.BASIS,
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
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.PROXY_ADOPTION_DATE_INPUT],
            field: {
                __order: 'j',
                name: FORM_FIELD_NAMES.PROXY_ADOPTION_DATE_INPUT,
                className: 'form-control',
                component: DATE_PICKER,
                options: {
                    // disabledDate: current => current && current > moment().startOf('day')
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },

        {
            type: ROW,
            rawComponents: <Divider />
        },

        {
            type: FULL_CONTAINER,
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.OPEN_TO_FUTURE_ACCRUAL],
            field: {
                __order: 'n',
                name: FORM_FIELD_NAMES.OPEN_TO_FUTURE_ACCRUAL,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            },
            when: [
                {
                    bool:
                        props &&
                        props[FORM_FIELD_NAMES.OPEN_TO_FUTURE_ACCRUAL] &&
                        props[FORM_FIELD_NAMES.OPEN_TO_FUTURE_ACCRUAL] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.CURRENT_ANNUAL_COST_ACCRUAL],
                            field: {
                                __order: 'o',
                                name: FORM_FIELD_NAMES.CURRENT_ANNUAL_COST_ACCRUAL,
                                component: CURRENCY_FIELD,
                                options: {
                                    prefix: '??',
                                    props: {
                                        precision: 0,
                                        className: 'form-control',
                                        placeholder: '10,000,000'
                                    }
                                },
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    },
                                    {
                                        moduleName: 'NumericalValidate',
                                        options: { '>': -1, message: 'Invalid entry' }
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.COMBINED_COMPANY_MEMBER_CONTRIBUTIONS],
                            field: {
                                __order: 'p',
                                name: FORM_FIELD_NAMES.COMBINED_COMPANY_MEMBER_CONTRIBUTIONS,
                                component: CURRENCY_FIELD,
                                options: {
                                    prefix: '??',
                                    props: {
                                        precision: 0,
                                        className: 'form-control',
                                        placeholder: '10,000,000'
                                    }
                                },
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    },
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
            field: {
                __order: 'h',
                name: FORM_FIELD_NAMES.HAVE_TARGET_BUY_OUT_VALUE,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            },
            when: [
                {
                    bool:
                        props &&
                        props[FORM_FIELD_NAMES.HAVE_TARGET_BUY_OUT_VALUE] &&
                        props[FORM_FIELD_NAMES.HAVE_TARGET_BUY_OUT_VALUE] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: LABEL_NAMES.HAVE_TARGET_BUY_OUT_VALUE_LABEL,
                            field: {
                                __order: 'i',
                                name: FORM_FIELD_NAMES.TARGET_BUYOUT_VALUE,
                                className: 'form-control',
                                component: CURRENCY_FIELD,
                                options: {
                                    prefix: '??',
                                    props: {
                                        precision: 0,
                                        className: 'form-control',
                                        placeholder: '10,000,000'
                                    }
                                },
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    },
                                    {
                                        moduleName: 'NumericalValidate',
                                        options: {
                                            '>': 1,
                                            message:
                                                'Please re-enter Target Buyout Value.  Value must be greater than ??1.'
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.TARGET_BUYOUT_PROVIDED_DATE],
                            field: {
                                __order: 'j',
                                name: FORM_FIELD_NAMES.TARGET_BUYOUT_PROVIDED_DATE,
                                className: 'form-control',
                                component: DATE_PICKER, //-Before-today
                                options: {
                                    disabledDate: current => current && current > moment().startOf('day')
                                },
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ];
};
