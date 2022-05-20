import React from 'react';
import { Divider } from 'antd';
import config from 'appConfig';
import moment from 'moment';

import { INVESTMENT_FORM_SECTION } from './constants';
import constants from '../../../../../UILibrary/constants';
import connectApi from '../../../../../middlewares/connectApi';
import { UPLOAD_FILE_TYPES } from '../../../../../UILibrary/constants/fileUploaderConstants';
import { LIABILITY_VALUE_AND_DETAILS_OF_THE_VALUATION_BASIS } from './constants';

const { bucket: privateBucket, publicBucket, generateBucket } = config;
const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const {
    BUTTON_GROUP,
    DATE_PICKER,
    CURRENCY_FIELD,
    NUMBER_FIELD,
    ASSETS_VALUE_SEPARATOR,
    SELECT_OPTION,
    FILE_UPLOADER,
    FILE_DOWNLOADER,
    DEFICIT_CONTRIBUTION_SECTION
} = FORM_FIELDS;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER, ROW, LABEL } = FORM_TEMPLATES;
const {
    ASSET_VALUE,
    ASSET_VAL_DATE,
    KNOW_TARGET_RETURN,
    TARGET_RETURN,
    KNOW_CURRENT_ASSET_ALLOCATION,
    CURRENT_ASSET_ALLOCATION_TYPE,
    KNOW_LIABILITY_HEDGE_RATIO,
    INTEREST_RATE_HEDGE_RATIO,
    INFLATION_HEDGE_RATIO,
    KNOW_TOTAL_AM_ICF,
    AM_AND_CF,
    HOLD_LESS_LIQUUD_ASSETS,
    FULLY_ESG_PORTFOLIO,
    CASHFLOW_TYPE_TO_UPLOAD,
    CASHFLOW_ATTACHMENT_OVERALL,
    PROPOSAL_NAME,
    CASHFLOW_ATTACHMENT_FNR,
    DATE_CASHFLOWS_PRODUCED,
    PROPORTION_OF_LLTF,
    HAVE_PAST_SLC_TO_UPLOAD,
    LIABILITY_DURATION,
    KNOW_LIABILITY_VALUE_MDT,
    LIABILITY_VALUE,
    AVG_MARGIN_LDR_AND_GY,
    DATE_VALUE_PROVIDED,
    BASIS_VALUE_PROVIDED,
    LIKE_TO_SEE_PROJECTION_OYFP,
    WANT_US_TO_MODEL_DC,
    WANT_US_TO_UPLOAD_DCES,
    DCFS_ATTACHMENT,
    SCHEME_OPEN_TO_FUTURE_ACCRUAL,
    CURRENT_ANNUAL_CA,
    COMBINED_COMPANY_MC_RA,
    HAVE_TARGET_BUYOUT_VALUE,
    LIKE_TO_INCLUDE_FLT,

    THE_SCHEME_OPEN_TO_FUTURE_ACCRUAL_OF_NEW_BENEFITS,
    THE_CURRENT_ANNUAL_COST_OF_NEW_BENEFIT_ACCRUAL,
    TARGET_BUYOUT_VALUE
} = INVESTMENT_FORM_SECTION.FIELD_KEYS;
const { EXCEL } = UPLOAD_FILE_TYPES;
const { rip } = config.uploads;
const { deficitContribution } = config.templates;
const { cashflowOverall, cashflowFnR } = config.templates;
const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

const onYesKnowLiabilityHedgeRatio = (isBool, order, disabled) => [
    {
        type: FULL_CONTAINER,
        label: 'Interest rate hedge ratio (as a % of assets)',
        bool: isBool,
        field: {
            __order: `${order}a`,
            name: `assets.${INTEREST_RATE_HEDGE_RATIO}`,
            className: 'form-control',
            component: NUMBER_FIELD,
            suffix: '%',
            options: {
                decimalScale: 0,
                placeholder: 0,
                allowNegative: false,
                min: 0,
                max: 100
            },
            validationModules: [
                {
                    moduleName: 'RequiredValidate',
                    options: { message: 'Required' }
                }
            ]
        }
    },
    {
        type: FULL_CONTAINER,
        label: 'Inflation hedge ratio (as a % of assets)',
        bool: isBool,
        field: {
            __order: `${order}b`,
            name: `assets.${INFLATION_HEDGE_RATIO}`,
            className: 'form-control',
            component: NUMBER_FIELD,
            suffix: '%',
            options: {
                decimalScale: 0,
                placeholder: 0,
                allowNegative: false,
                min: 0,
                max: 100
            },
            validationModules: [
                {
                    moduleName: 'RequiredValidate',
                    options: { message: 'Required' }
                }
            ]
        }
    }
];

const selectCashFLowType = (props, isBool) => {
    return [
        {
            type: FULL_CONTAINER,
            bool: isBool,
            label: 'Choose and download a template to upload your cashflows',
            iIcon:
                'Please click Download to retrieve the template to include the cashflow data. Once complete, save as a csv file and click Upload to add the data to the system.',
            field: [
                {
                    __order: 'ea',
                    name: `liabilities.${CASHFLOW_TYPE_TO_UPLOAD}`,
                    label: 'Choose and download a template to upload your cashflows',
                    className: 'form-control',
                    bool: isBool,
                    component: SELECT_OPTION,
                    options: {
                        defaultValue: 'Select',
                        name: 'liability-dropdown',
                        dataList: [{ value: 'Overall', key: 'overall' }, { value: 'Fixed & Real', key: 'fixedAndReal' }]
                    },
                    validationModules: [
                        {
                            moduleName: 'RequiredValidate',
                            options: { message: 'Required' }
                        }
                    ]
                },
                {
                    className: 'form-control',
                    name: `download_liabilities.${CASHFLOW_TYPE_TO_UPLOAD}`,
                    component: FILE_DOWNLOADER,
                    disabled:
                        (props.investment &&
                            props.investment.liabilities &&
                            props.investment.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === undefined) ||
                        (props.investment &&
                            props.investment.liabilities &&
                            props.investment.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === ''),
                    url:
                        props.investment &&
                        props.investment.liabilities &&
                        props.investment.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'overall'
                            ? cashflowOverall
                            : cashflowFnR,
                    api: connectApi,
                    bucketNameProp: privateBucket,
                    fileName:
                        props.investment &&
                        props.investment.liabilities &&
                        props.investment.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'overall'
                            ? 'cashflow-overall-template.xlsx'
                            : 'cashflow-fixed-&-real-template.xlsx',
                    editable:
                        (props.investment &&
                            props.investment.liabilities &&
                            props.investment.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'overall') ||
                        (props.investment &&
                            props.investment.liabilities &&
                            props.investment.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'fixedAndReal')
                }
            ],
            when: [
                {
                    bool:
                        isBool &&
                        props.investment &&
                        props.investment.liabilities &&
                        props.investment.liabilities[CASHFLOW_TYPE_TO_UPLOAD] !== undefined &&
                        props.investment.liabilities[CASHFLOW_TYPE_TO_UPLOAD] !== '',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool:
                                isBool &&
                                props.investment &&
                                props.investment.liabilities &&
                                props.investment.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'overall',
                            label: `Upload the completed overall cashflow`,
                            field: {
                                __order: 'eb',
                                name: `liabilities.${CASHFLOW_ATTACHMENT_OVERALL}`,
                                className: 'form-control',
                                component: FILE_UPLOADER,
                                options: {
                                    accept: ['.xlsx'],
                                    manual: true,
                                    block:
                                        props.screen === 'reqamao' &&
                                        !props.investment &&
                                        props.investment.liabilities &&
                                        props.investment.liabilities[PROPOSAL_NAME],
                                    params: [
                                        props.entityId,
                                        props.investment &&
                                            props.investment.liabilities &&
                                            props.investment.liabilities[PROPOSAL_NAME]
                                    ],
                                    url: rip.cashflow,
                                    bucketName: privateBucket,
                                    api: connectApi
                                },
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool:
                                isBool &&
                                props.investment &&
                                props.investment.liabilities &&
                                props.investment.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'fixedAndReal',
                            label: `Upload the completed fixed & real cashflow`,
                            field: {
                                __order: 'eba',
                                name: `liabilities.${CASHFLOW_ATTACHMENT_FNR}`,
                                className: 'form-control',
                                component: FILE_UPLOADER,
                                options: {
                                    accept: [EXCEL],
                                    manual: true,
                                    block:
                                        props.screen === 'reqip' &&
                                        !props.investment &&
                                        props.investment[PROPOSAL_NAME],
                                    params: [props.entityId, props.investment && props.investment[PROPOSAL_NAME]],
                                    url: rip.cashflow,
                                    bucketName: privateBucket,
                                    api: connectApi
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
        },
        {
            type: FULL_CONTAINER,
            label: 'What is the effective start date of these cashflows?',
            bool: isBool,
            field: {
                __order: 'ec',
                name: `liabilities.${DATE_CASHFLOWS_PRODUCED}`,
                className: 'form-control',
                component: DATE_PICKER,
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
        },

        ...(props.investment &&
        props.investment.liabilities &&
        props.investment.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'overall'
            ? [
                  {
                      type: FULL_CONTAINER,
                      bool:
                          props.investment &&
                          props.investment.liabilities &&
                          props.investment.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'overall',
                      label: 'Proportion of liabilities linked to inflation',
                      field: {
                          __order: 'ed',
                          name: `liabilities.${PROPORTION_OF_LLTF}`,
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
                          validationModules: [
                              {
                                  moduleName: 'RequiredValidate',
                                  options: { message: 'Required' }
                              }
                          ]
                      }
                  }
              ]
            : [])
    ];
};

export const InvestmentFormSection = (props, trackLiabilityFields = () => {}) => {
    const { investment } = props;

    return [
        {
            type: ROW,
            rawComponents: (
                <div className="input-row">
                    <div className="label-wrapper">
                        <label className="input-title deficit-title font-weight-bold">Assets</label>
                        <hr className="form-title-seperator" />
                    </div>
                </div>
            )
        },
        {
            type: FULL_CONTAINER,
            label: 'Asset value',
            field: {
                __order: 'a',
                name: `assets.${ASSET_VALUE}`,
                component: CURRENCY_FIELD,
                options: {
                    prefix: '£',
                    props: { precision: 0, className: 'form-control', placeholder: '10,000,000' }
                },
                title: (investment && investment[ASSET_VALUE]) || '',
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    },
                    {
                        moduleName: 'NumericalValidate',
                        options: {
                            '>=': 1,
                            message: 'Invalid Entry'
                        }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Asset value date',
            field: {
                __order: 'b',
                name: `assets.${ASSET_VAL_DATE}`,
                className: 'form-control',
                component: DATE_PICKER,
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
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Do you know your target investment return above gilts?',
            hide: ['reqamao', 'appamao'].includes(props.step && props.step.stepKey),
            field: {
                __order: 'c',
                name: `assets.${KNOW_TARGET_RETURN}`,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
                validationModules: ['reqamao', 'appamao'].includes(props.step && props.step.stepKey)
                    ? []
                    : [
                          {
                              moduleName: 'RequiredValidate',
                              options: { message: 'Required' }
                          }
                      ]
            },

            when: [
                {
                    bool:
                        props.investment &&
                        props.investment.assets &&
                        props.investment.assets[KNOW_TARGET_RETURN] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            iIcon:
                                "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                            label: 'Target return above gilts (net of fees)',
                            bool:
                                props.investment &&
                                props.investment.assets &&
                                props.investment.assets[KNOW_TARGET_RETURN] === 'yes',
                            field: {
                                __order: 'd',
                                name: `assets.${TARGET_RETURN}`,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: '%',
                                options: {
                                    decimalScale: 3,
                                    placeholder: '-1.000 - 5.000',
                                    allowNegative: true,
                                    min: -1,
                                    max: 5.0
                                },
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    },
                                    {
                                        moduleName: 'NumericalValidate',
                                        options: {
                                            '>=': -1,
                                            '<=': 5.0,
                                            message: 'Invalid Entry'
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool:
                                props.investment &&
                                props.investment.assets &&
                                props.investment.assets[KNOW_TARGET_RETURN] === 'yes',
                            label: 'Do you know your current asset allocation?',
                            field: {
                                __order: 'e',
                                name: `assets.${KNOW_CURRENT_ASSET_ALLOCATION}`,
                                className: 'form-control',
                                component: BUTTON_GROUP,
                                options: yesNoOption,
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    }
                                ]
                            },

                            ...((props.investment &&
                                props.investment.assets &&
                                props.investment.assets[KNOW_CURRENT_ASSET_ALLOCATION] === 'yes') ||
                            (props.investment &&
                                props.investment.assets &&
                                props.investment.assets[KNOW_TARGET_RETURN] !== 'no')
                                ? {
                                      when: [
                                          {
                                              bool:
                                                  props.investment &&
                                                  props.investment.assets &&
                                                  props.investment.assets[KNOW_CURRENT_ASSET_ALLOCATION] === 'yes',
                                              childComponents: [
                                                  {
                                                      type: FULL_CONTAINER,
                                                      bool:
                                                          props.investment &&
                                                          props.investment.assets &&
                                                          props.investment.assets[KNOW_CURRENT_ASSET_ALLOCATION] ===
                                                              'yes',
                                                      label: 'How do you want to enter your current asset allocation?',
                                                      field: {
                                                          __order: 'f',
                                                          name: `assets.${CURRENT_ASSET_ALLOCATION_TYPE}`,
                                                          className: 'form-control',
                                                          component: BUTTON_GROUP,
                                                          options: [
                                                              { title: 'Simple', value: 'simple' },
                                                              { title: 'Detail', value: 'detail' }
                                                          ],
                                                          validationModules: [
                                                              {
                                                                  moduleName: 'RequiredValidate',
                                                                  options: { message: 'Required' }
                                                              }
                                                          ]
                                                      },

                                                      when: [
                                                          {
                                                              bool:
                                                                  props.investment &&
                                                                  props.investment.assets &&
                                                                  props.investment.assets[
                                                                      CURRENT_ASSET_ALLOCATION_TYPE
                                                                  ] === 'simple',
                                                              childComponents: [
                                                                  {
                                                                      type: FULL_VIEW_CONTAINER,
                                                                      bool: true,
                                                                      field: {
                                                                          __order: 'a',
                                                                          name: 'assets',
                                                                          className: 'form-control',
                                                                          component: ASSETS_VALUE_SEPARATOR,
                                                                          options: {
                                                                              tabKey: INVESTMENT_FORM_SECTION.KEY,
                                                                              formName: props.formName,
                                                                              currentAssetAT: 'simple',
                                                                              prefix: 'assets'
                                                                          }
                                                                      }
                                                                  }
                                                              ]
                                                          },
                                                          {
                                                              bool:
                                                                  props.investment &&
                                                                  props.investment.assets &&
                                                                  props.investment.assets[
                                                                      CURRENT_ASSET_ALLOCATION_TYPE
                                                                  ] === 'detail',
                                                              childComponents: [
                                                                  {
                                                                      type: FULL_VIEW_CONTAINER,
                                                                      bool: true,
                                                                      field: {
                                                                          __order: 'a',
                                                                          name: 'assets',
                                                                          className: 'form-control',
                                                                          component: ASSETS_VALUE_SEPARATOR,
                                                                          options: {
                                                                              tabKey: INVESTMENT_FORM_SECTION.KEY,
                                                                              formName: props.formName,
                                                                              currentAssetAT: 'detail',
                                                                              prefix: 'assets'
                                                                          }
                                                                      }
                                                                  }
                                                              ]
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      type: FULL_CONTAINER,
                                                      label: 'Do you know your liability hedge ratio?',
                                                      bool:
                                                          props.investment &&
                                                          props.investment.assets &&
                                                          props.investment.assets[KNOW_CURRENT_ASSET_ALLOCATION] ===
                                                              'yes',
                                                      field: {
                                                          __order: 'g',
                                                          name: `assets.${KNOW_LIABILITY_HEDGE_RATIO}`,
                                                          className: 'form-control',
                                                          component: BUTTON_GROUP,
                                                          options: yesNoOption,
                                                          validationModules: [
                                                              {
                                                                  moduleName: 'RequiredValidate',
                                                                  options: { message: 'Required' }
                                                              }
                                                          ]
                                                      },

                                                      when: [
                                                          {
                                                              bool:
                                                                  props.investment &&
                                                                  props.investment.assets &&
                                                                  props.investment.assets[
                                                                      KNOW_LIABILITY_HEDGE_RATIO
                                                                  ] === 'yes',
                                                              childComponents: onYesKnowLiabilityHedgeRatio(
                                                                  props.investment &&
                                                                      props.investment.assets &&
                                                                      props.investment.assets[
                                                                          KNOW_LIABILITY_HEDGE_RATIO
                                                                      ] === 'yes',
                                                                  'g'
                                                              )
                                                          }
                                                      ]
                                                  },
                                                  {
                                                      type: FULL_CONTAINER,
                                                      bool:
                                                          props.investment &&
                                                          props.investment.assets &&
                                                          props.investment.assets[KNOW_CURRENT_ASSET_ALLOCATION] ===
                                                              'yes',
                                                      label:
                                                          'Do you know the impact of your current asset management and investment consulting fees?',
                                                      field: {
                                                          __order: 'h',
                                                          name: `assets.${KNOW_TOTAL_AM_ICF}`,
                                                          className: 'form-control',
                                                          component: BUTTON_GROUP,
                                                          options: yesNoOption,
                                                          validationModules: [
                                                              {
                                                                  moduleName: 'RequiredValidate',
                                                                  options: { message: 'Required' }
                                                              }
                                                          ]
                                                      },

                                                      when: [
                                                          {
                                                              bool:
                                                                  props.investment &&
                                                                  props.investment.assets &&
                                                                  props.investment.assets[KNOW_TOTAL_AM_ICF] === 'yes',
                                                              childComponents: [
                                                                  {
                                                                      type: FULL_CONTAINER,
                                                                      iIcon:
                                                                          "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                                                                      label:
                                                                          'Asset management and investment advisory fees (as a % of assets)',
                                                                      bool:
                                                                          props.investment &&
                                                                          props.investment.assets &&
                                                                          props.investment.assets[KNOW_TOTAL_AM_ICF] ===
                                                                              'yes',
                                                                      field: {
                                                                          __order: 'i',
                                                                          name: `assets.${AM_AND_CF}`,
                                                                          className: 'form-control',
                                                                          component: NUMBER_FIELD,
                                                                          suffix: '%',
                                                                          options: {
                                                                              decimalScale: 2,
                                                                              placeholder: '0.00 - 5.00',
                                                                              min: 0,
                                                                              max: 5.0,
                                                                              allowNegative: false
                                                                          },
                                                                          validationModules: [
                                                                              {
                                                                                  moduleName: 'RequiredValidate',
                                                                                  options: { message: 'Required' }
                                                                              },
                                                                              {
                                                                                  moduleName: 'NumericalValidate',
                                                                                  options: {
                                                                                      '>=': 0.0,
                                                                                      '<=': 5.0,
                                                                                      message: 'Invalid Entry'
                                                                                  }
                                                                              }
                                                                          ]
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
                                : {})
                        }
                    ]
                },
                ...((props.investment &&
                    props.investment.assets &&
                    props.investment.assets[KNOW_TARGET_RETURN] === 'no') ||
                (props.investment &&
                    props.investment.assets &&
                    props.investment.assets[KNOW_CURRENT_ASSET_ALLOCATION] !== 'yes')
                    ? [
                          {
                              bool:
                                  props.investment &&
                                  props.investment.assets &&
                                  props.investment.assets[KNOW_TARGET_RETURN] === 'no',
                              childComponents: [
                                  {
                                      type: FULL_CONTAINER,
                                      label: 'How do you want to enter your current asset allocation?',
                                      bool:
                                          props.investment &&
                                          props.investment.assets &&
                                          props.investment.assets[KNOW_TARGET_RETURN] === 'no',
                                      field: {
                                          __order: 'j',
                                          name: `assets.${CURRENT_ASSET_ALLOCATION_TYPE}`,
                                          className: 'form-control',
                                          component: BUTTON_GROUP,
                                          options: [
                                              { title: 'Simple', value: 'simple' },
                                              { title: 'Detail', value: 'detail' }
                                          ],
                                          validationModules: [
                                              {
                                                  moduleName: 'RequiredValidate',
                                                  options: { message: 'Required' }
                                              }
                                          ]
                                      },

                                      when: [
                                          {
                                              bool:
                                                  props.investment &&
                                                  props.investment.assets &&
                                                  props.investment.assets[CURRENT_ASSET_ALLOCATION_TYPE] === 'simple',
                                              childComponents: [
                                                  {
                                                      type: FULL_VIEW_CONTAINER,
                                                      bool: true,
                                                      field: {
                                                          __order: 'a',
                                                          name: 'assets',
                                                          className: 'form-control',
                                                          component: ASSETS_VALUE_SEPARATOR,
                                                          options: {
                                                              tabKey: INVESTMENT_FORM_SECTION.KEY,
                                                              formName: props.formName,
                                                              currentAssetAT: 'simple',
                                                              prefix: 'assets'
                                                          }
                                                      }
                                                  }
                                              ]
                                          },
                                          {
                                              bool:
                                                  props.investment &&
                                                  props.investment.assets &&
                                                  props.investment.assets[CURRENT_ASSET_ALLOCATION_TYPE] === 'detail',
                                              childComponents: [
                                                  {
                                                      type: FULL_VIEW_CONTAINER,
                                                      bool: true,
                                                      field: {
                                                          __order: 'a',
                                                          name: 'assets',
                                                          className: 'form-control',
                                                          component: ASSETS_VALUE_SEPARATOR,
                                                          options: {
                                                              tabKey: INVESTMENT_FORM_SECTION.KEY,
                                                              formName: props.formName,
                                                              currentAssetAT: 'detail',
                                                              prefix: 'assets'
                                                          }
                                                      }
                                                  }
                                              ]
                                          }
                                      ]
                                  },
                                  {
                                      type: FULL_CONTAINER,
                                      bool:
                                          props.investment &&
                                          props.investment.assets &&
                                          props.investment.assets[KNOW_TARGET_RETURN] === 'no',
                                      label: 'Do you know your liability hedge ratio?',
                                      field: {
                                          __order: 'k',
                                          name: `assets.${KNOW_LIABILITY_HEDGE_RATIO}`,
                                          className: 'form-control',
                                          component: BUTTON_GROUP,
                                          options: yesNoOption,
                                          validationModules: [
                                              {
                                                  moduleName: 'RequiredValidate',
                                                  options: { message: 'Required' }
                                              }
                                          ]
                                      },

                                      when: [
                                          {
                                              bool:
                                                  props.investment &&
                                                  props.investment.assets &&
                                                  props.investment.assets[KNOW_LIABILITY_HEDGE_RATIO] === 'yes',
                                              childComponents: onYesKnowLiabilityHedgeRatio(
                                                  props.investment &&
                                                      props.investment.assets &&
                                                      props.investment.assets[KNOW_LIABILITY_HEDGE_RATIO] === 'yes',
                                                  'k'
                                              )
                                          }
                                      ]
                                  },
                                  {
                                      type: FULL_CONTAINER,
                                      bool:
                                          props.investment &&
                                          props.investment.assets &&
                                          props.investment.assets[KNOW_TARGET_RETURN] === 'no',
                                      label:
                                          'Do you know the impact of your current asset management and investment consulting fees?',
                                      field: {
                                          __order: 'l',
                                          name: `assets.${KNOW_TOTAL_AM_ICF}`,
                                          className: 'form-control',
                                          component: BUTTON_GROUP,
                                          options: yesNoOption,
                                          validationModules: [
                                              {
                                                  moduleName: 'RequiredValidate',
                                                  options: { message: 'Required' }
                                              }
                                          ]
                                      },

                                      when: [
                                          {
                                              bool:
                                                  props.investment &&
                                                  props.investment.assets &&
                                                  props.investment.assets[KNOW_TOTAL_AM_ICF] === 'yes',
                                              childComponents: [
                                                  {
                                                      type: FULL_CONTAINER,
                                                      iIcon:
                                                          "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                                                      label:
                                                          'Asset management and investment advisory fees (as a % of assets)',
                                                      bool:
                                                          props.investment &&
                                                          props.investment.assets &&
                                                          props.investment.assets[KNOW_TOTAL_AM_ICF] === 'yes',
                                                      field: {
                                                          __order: 'm',
                                                          name: `assets.${AM_AND_CF}`,
                                                          className: 'form-control',
                                                          component: NUMBER_FIELD,
                                                          suffix: '%',
                                                          options: {
                                                              decimalScale: 2,
                                                              placeholder: '0.00 - 5.00',
                                                              min: 0,
                                                              max: 5.0,
                                                              allowNegative: false
                                                          },
                                                          validationModules: [
                                                              {
                                                                  moduleName: 'RequiredValidate',
                                                                  options: { message: 'Required' }
                                                              },
                                                              {
                                                                  moduleName: 'NumericalValidate',
                                                                  options: {
                                                                      '>=': 0.0,
                                                                      '<=': 5.0,
                                                                      message: 'Invalid Entry'
                                                                  }
                                                              }
                                                          ]
                                                      }
                                                  }
                                              ]
                                          }
                                      ]
                                  }
                              ]
                          }
                      ]
                    : [])
            ]
        },

        {
            type: FULL_CONTAINER,
            label: 'Do you want to avoid holding less liquid assets, such as property?',
            field: {
                __order: 'n',
                name: `assets.${HOLD_LESS_LIQUUD_ASSETS}`,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            label:
                'Do you want to fully integrate Environmental, Social and Governance (ESG) themes within your portfolio allocation?',

            field: {
                __order: 'o',
                name: `assets.${FULLY_ESG_PORTFOLIO}`,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ]
            }
        },
        {
            type: ROW,
            rawComponents: (
                <div className="input-row">
                    <div className="label-wrapper">
                        <label className="input-title deficit-title font-weight-bold">Liabilities</label>
                        <hr className="form-title-seperator" />
                    </div>
                </div>
            )
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Do you have a set of liability cashflows to upload?',
            field: {
                __order: 'a',
                name: `liabilities.${HAVE_PAST_SLC_TO_UPLOAD}`,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ]
            },
            when: [
                {
                    bool:
                        props.investment &&
                        props.investment.liabilities &&
                        props.investment.liabilities[HAVE_PAST_SLC_TO_UPLOAD] === 'no',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: 'Liability duration',
                            bool:
                                props.investment &&
                                props.investment.liabilities &&
                                props.investment.liabilities[HAVE_PAST_SLC_TO_UPLOAD] === 'no',

                            field: {
                                __order: 'b',
                                name: `liabilities.${LIABILITY_DURATION}`,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: 'Years',
                                options: {
                                    decimalScale: 0,
                                    placeholder: '1 - 50',
                                    min: 1,
                                    max: 50,
                                    allowNegative: false
                                },
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    }
                                ]
                            }
                        },
                        ...(props.investment &&
                        props.investment.liabilities &&
                        props.investment.liabilities[HAVE_PAST_SLC_TO_UPLOAD] === 'no'
                            ? [
                                  {
                                      type: FULL_CONTAINER,
                                      label: 'Proportion of liabilities linked to inflation',
                                      bool:
                                          props.investment &&
                                          props.investment.liabilities &&
                                          props.investment.liabilities[HAVE_PAST_SLC_TO_UPLOAD] === 'no',
                                      field: {
                                          __order: 'd',
                                          name: `liabilities.${PROPORTION_OF_LLTF}`,
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
                                          validationModules: [
                                              {
                                                  moduleName: 'RequiredValidate',
                                                  options: { message: 'Required' }
                                              }
                                          ]
                                      }
                                  }
                              ]
                            : [])
                    ]
                },

                {
                    bool:
                        props.investment &&
                        props.investment.liabilities &&
                        props.investment.liabilities[HAVE_PAST_SLC_TO_UPLOAD] === 'yes',
                    childComponents: selectCashFLowType(
                        props,
                        props.investment &&
                            props.investment.liabilities &&
                            props.investment.liabilities[HAVE_PAST_SLC_TO_UPLOAD] === 'yes'
                    )
                }
            ]
        },
        {
            type: FULL_CONTAINER,
            iIcon: LIABILITY_VALUE_AND_DETAILS_OF_THE_VALUATION_BASIS,
            label: 'Do you have a liability value and details of the valuation basis?',
            bool: true,
            field: {
                __order: 'f',
                name: `liabilities.${KNOW_LIABILITY_VALUE_MDT}`,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
                onChange: e => trackLiabilityFields(e.target.value, KNOW_LIABILITY_VALUE_MDT),
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ]
            },
            when: [
                {
                    bool:
                        props.investment &&
                        props.investment.liabilities &&
                        props.investment.liabilities[KNOW_LIABILITY_VALUE_MDT] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool:
                                props.investment &&
                                props.investment.liabilities &&
                                props.investment.liabilities[KNOW_LIABILITY_VALUE_MDT] === 'yes',
                            label: 'Liability value',
                            field: {
                                __order: 'g',
                                name: `liabilities.${LIABILITY_VALUE}`,
                                className: 'form-control',
                                component: CURRENCY_FIELD,
                                options: {
                                    prefix: '£',
                                    props: {
                                        precision: 0,
                                        className: 'form-control',
                                        placeholder: '10,000,000',
                                        thousandSeparator: '.',
                                        decimalSeparator: '.',
                                        onChange: value => trackLiabilityFields(value, LIABILITY_VALUE)
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
                                            '>=': 1,
                                            message: 'Invalid Entry'
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool:
                                props.investment &&
                                props.investment.liabilities &&
                                props.investment.liabilities[KNOW_LIABILITY_VALUE_MDT] === 'yes',
                            iIcon:
                                "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                            label:
                                'What is the average margin between the liability discount rate and an appropriate reference gilt yield?',
                            field: {
                                __order: 'h',
                                name: `liabilities.${AVG_MARGIN_LDR_AND_GY}`,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: '%',
                                options: {
                                    decimalScale: 2,
                                    placeholder: '-5 - 5',
                                    min: -5,
                                    max: 5,
                                    allowNegative: true,
                                    onChange: e => trackLiabilityFields(e.target.value, AVG_MARGIN_LDR_AND_GY)
                                },
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: 'At what date has this value been provided?',
                            bool:
                                props.investment &&
                                props.investment.liabilities &&
                                props.investment.liabilities[KNOW_LIABILITY_VALUE_MDT] === 'yes',
                            field: {
                                __order: 'i',
                                name: `liabilities.${DATE_VALUE_PROVIDED}`,
                                className: 'form-control',
                                component: DATE_PICKER,
                                options: {
                                    disabledDate: current => current && current > moment().startOf('day')
                                },
                                onChange: value => trackLiabilityFields(value, DATE_VALUE_PROVIDED),
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: 'What sort of liability valuation basis does this value represent?',
                            bool:
                                props.investment &&
                                props.investment.liabilities &&
                                props.investment.liabilities[KNOW_LIABILITY_VALUE_MDT] === 'yes',
                            field: {
                                __order: 'j',
                                name: `liabilities.${BASIS_VALUE_PROVIDED}`,
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
                                onChange: value => trackLiabilityFields(value, BASIS_VALUE_PROVIDED),
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
        },
        ...(investment && investment.funding
            ? [
                  {
                      type: ROW,
                      rawComponents: (
                          <div className="input-row">
                              <div className="label-wrapper">
                                  <label className="input-title deficit-title font-weight-bold">Funding</label>
                                  <hr className="form-title-seperator" />
                              </div>
                          </div>
                      )
                  },

                  {
                      type: FULL_CONTAINER,
                      label: 'Would you like to see a projection of your funding position?',
                      bool: true,
                      field: {
                          __order: 'a',
                          name: `funding.${LIKE_TO_SEE_PROJECTION_OYFP}`,
                          className: 'form-control',
                          component: BUTTON_GROUP,
                          options: yesNoOption,
                          validationModules: [
                              {
                                  moduleName: 'RequiredValidate',
                                  options: { message: 'Required' }
                              }
                          ]
                      },

                      when: [
                          {
                              bool:
                                  props.investment &&
                                  props.investment.funding &&
                                  props.investment.funding[LIKE_TO_SEE_PROJECTION_OYFP] === 'yes',
                              childComponents: [
                                  {
                                      type: FULL_CONTAINER,
                                      label: 'Do you want us to model any deficit contributions?',
                                      bool:
                                          props.investment &&
                                          props.investment.funding &&
                                          props.investment.funding[LIKE_TO_SEE_PROJECTION_OYFP] === 'yes',
                                      field: {
                                          __order: 'b',
                                          name: `funding.${WANT_US_TO_MODEL_DC}`,
                                          className: 'form-control',
                                          component: BUTTON_GROUP,
                                          options: yesNoOption,
                                          validationModules: [
                                              {
                                                  moduleName: 'RequiredValidate',
                                                  options: { message: 'Required' }
                                              }
                                          ]
                                      },

                                      when: [
                                          {
                                              bool:
                                                  props.investment &&
                                                  props.investment.funding &&
                                                  props.investment.funding[WANT_US_TO_MODEL_DC] === 'yes',
                                              childComponents: [
                                                  {
                                                      type: FULL_CONTAINER,
                                                      label:
                                                          'Do you want to upload a file of deficit contributions or enter them on screen?',
                                                      iIcon:
                                                          "Please select to enter information 'On Screen' or 'Upload File'. Then proceed accordingly.",
                                                      bool:
                                                          props.investment &&
                                                          props.investment.funding &&
                                                          props.investment.funding[WANT_US_TO_MODEL_DC] === 'yes',
                                                      field: [
                                                          {
                                                              __order: 'c',
                                                              name: `funding.${WANT_US_TO_UPLOAD_DCES}`,
                                                              label:
                                                                  'Do you want to upload file of deficit contributions or enter on screen?',
                                                              className: 'form-control',
                                                              component: SELECT_OPTION,
                                                              options: {
                                                                  defaultValue: 'Select',
                                                                  dataList: [
                                                                      { value: 'Upload File', key: 'uploadFile' },
                                                                      { value: 'On Screen', key: 'onScreen' }
                                                                  ]
                                                              },
                                                              validationModules: [
                                                                  {
                                                                      moduleName: 'RequiredValidate',
                                                                      options: { message: 'Required' }
                                                                  }
                                                              ]
                                                          },
                                                          {
                                                              name: `download_${'dcfsAttachment'}`,
                                                              component: FILE_DOWNLOADER,
                                                              editable:
                                                                  props.investment &&
                                                                  props.investment.funding &&
                                                                  props.investment.funding[WANT_US_TO_UPLOAD_DCES] ===
                                                                      'uploadFile',
                                                              url: deficitContribution,
                                                              api: connectApi,
                                                              bucketNameProp: privateBucket,
                                                              fileName: 'deficit-contributions.xlsx'
                                                          }
                                                      ],
                                                      when: [
                                                          {
                                                              bool:
                                                                  props.investment &&
                                                                  props.investment.funding &&
                                                                  props.investment.funding[WANT_US_TO_UPLOAD_DCES] ===
                                                                      'uploadFile',
                                                              childComponents: [
                                                                  {
                                                                      __order: 'd',
                                                                      type: FULL_CONTAINER,
                                                                      label: 'Upload deficit contribution file',
                                                                      bool:
                                                                          props.investment &&
                                                                          props.investment.funding &&
                                                                          props.investment.funding[
                                                                              WANT_US_TO_UPLOAD_DCES
                                                                          ] === 'uploadFile',
                                                                      iIcon:
                                                                          'Download the template file above, complete the required data and save as a csv file. Then upload the csv file.',
                                                                      field: {
                                                                          name: `funding.${DCFS_ATTACHMENT}`,
                                                                          className: 'form-control',
                                                                          component: FILE_UPLOADER,
                                                                          options: {
                                                                              accept: [EXCEL],
                                                                              manual: true,
                                                                              block:
                                                                                  props.screen === 'reqip' &&
                                                                                  !props[PROPOSAL_NAME],
                                                                              url: rip.deficitContribution,
                                                                              bucketName: privateBucket,
                                                                              api: connectApi,
                                                                              params: [
                                                                                  props.entityId,
                                                                                  props[PROPOSAL_NAME]
                                                                              ]
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
                                                          },
                                                          {
                                                              bool:
                                                                  props.investment &&
                                                                  props.investment.funding &&
                                                                  props.investment.funding[WANT_US_TO_UPLOAD_DCES] ===
                                                                      'onScreen',
                                                              childComponents: [
                                                                  {
                                                                      type: FULL_VIEW_CONTAINER,
                                                                      props: { className: 'input-row' },
                                                                      bool:
                                                                          props.investment &&
                                                                          props.investment.funding &&
                                                                          props.investment.funding[
                                                                              WANT_US_TO_UPLOAD_DCES
                                                                          ] === 'onScreen',
                                                                      field: {
                                                                          name: 'deficit',
                                                                          className: 'form-control',
                                                                          component: DEFICIT_CONTRIBUTION_SECTION,
                                                                          options: {
                                                                              prefix: 'funding'
                                                                          }
                                                                      }
                                                                  }
                                                              ]
                                                          }
                                                      ]
                                                  }
                                              ]
                                          }
                                      ]
                                  },
                                  {
                                      type: FULL_CONTAINER,
                                      iIcon: THE_SCHEME_OPEN_TO_FUTURE_ACCRUAL_OF_NEW_BENEFITS,
                                      label: 'Is the scheme open to future accrual of new benefits?',
                                      bool:
                                          props.investment &&
                                          props.investment.funding &&
                                          props.investment.funding[LIKE_TO_SEE_PROJECTION_OYFP] === 'yes',
                                      field: {
                                          __order: 'e',
                                          name: `funding.${SCHEME_OPEN_TO_FUTURE_ACCRUAL}`,
                                          className: 'form-control',
                                          component: BUTTON_GROUP,
                                          options: yesNoOption,
                                          validationModules: [
                                              {
                                                  moduleName: 'RequiredValidate',
                                                  options: { message: 'Required' }
                                              }
                                          ]
                                      },

                                      when: [
                                          {
                                              bool:
                                                  props.investment &&
                                                  props.investment.funding &&
                                                  props.investment.funding[SCHEME_OPEN_TO_FUTURE_ACCRUAL] === 'yes',
                                              childComponents: [
                                                  {
                                                      type: FULL_CONTAINER,
                                                      iIcon: THE_CURRENT_ANNUAL_COST_OF_NEW_BENEFIT_ACCRUAL,
                                                      label: 'What is the current annual cost of new benefit accrual?',
                                                      bool:
                                                          props.investment &&
                                                          props.investment.funding &&
                                                          props.investment.funding[SCHEME_OPEN_TO_FUTURE_ACCRUAL] ===
                                                              'yes',
                                                      field: {
                                                          __order: 'f',
                                                          name: `funding.${CURRENT_ANNUAL_CA}`,
                                                          component: CURRENCY_FIELD,
                                                          options: {
                                                              prefix: '£',
                                                              props: {
                                                                  precision: 0,
                                                                  className: 'form-control',
                                                                  placeholder: '10,000,000'
                                                              }
                                                          },
                                                          title: props[CURRENT_ANNUAL_CA] || '',
                                                          validationModules: [
                                                              {
                                                                  moduleName: 'RequiredValidate',
                                                                  options: { message: 'Required' }
                                                              },
                                                              {
                                                                  moduleName: 'NumericalValidate',
                                                                  options: {
                                                                      '>=': 1,
                                                                      message: 'Invalid Entry'
                                                                  }
                                                              }
                                                          ]
                                                      }
                                                  },
                                                  {
                                                      type: FULL_CONTAINER,
                                                      bool:
                                                          props.investment &&
                                                          props.investment.funding &&
                                                          props.investment.funding[SCHEME_OPEN_TO_FUTURE_ACCRUAL] ===
                                                              'yes',
                                                      label:
                                                          'What are the combined sponsor and member contributions in respect of future accrual of new benefits?',
                                                      field: {
                                                          __order: 'g',
                                                          name: `funding.${COMBINED_COMPANY_MC_RA}`,
                                                          component: CURRENCY_FIELD,
                                                          options: {
                                                              prefix: '£',
                                                              props: {
                                                                  precision: 0,
                                                                  className: 'form-control',
                                                                  placeholder: '10,000,000'
                                                              }
                                                          },
                                                          title: props[COMBINED_COMPANY_MC_RA] || '',
                                                          validationModules: [
                                                              {
                                                                  moduleName: 'RequiredValidate',
                                                                  options: { message: 'Required' }
                                                              },
                                                              {
                                                                  moduleName: 'NumericalValidate',
                                                                  options: {
                                                                      '>=': 1,
                                                                      message: 'Invalid Entry'
                                                                  }
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
                                      label: 'Do you have a target buy-out price?',
                                      bool:
                                          props.investment &&
                                          props.investment.funding &&
                                          props.investment.funding[LIKE_TO_SEE_PROJECTION_OYFP] === 'yes',
                                      field: {
                                          __order: 'h',
                                          name: `funding.${HAVE_TARGET_BUYOUT_VALUE}`,
                                          className: 'form-control',
                                          component: BUTTON_GROUP,
                                          options: yesNoOption,
                                          validationModules: [
                                              {
                                                  moduleName: 'RequiredValidate',
                                                  options: { message: 'Required' }
                                              }
                                          ]
                                      },

                                      when: [
                                          {
                                              bool:
                                                  props.investment &&
                                                  props.investment.funding &&
                                                  props.investment.funding[HAVE_TARGET_BUYOUT_VALUE] === 'yes',
                                              childComponents: [
                                                  {
                                                      type: FULL_CONTAINER,
                                                      bool:
                                                          props.investment &&
                                                          props.investment.funding &&
                                                          props.investment.funding[HAVE_TARGET_BUYOUT_VALUE] === 'yes',
                                                      label: 'Target buy-out price',
                                                      field: {
                                                          __order: 'i',
                                                          name: `funding.${TARGET_BUYOUT_VALUE}`,
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
                                                          title: props[TARGET_BUYOUT_VALUE] || '',
                                                          validationModules: [
                                                              {
                                                                  moduleName: 'RequiredValidate',
                                                                  options: { message: 'Required' }
                                                              },
                                                              {
                                                                  moduleName: 'NumericalValidate',
                                                                  options: {
                                                                      '>=': 1,
                                                                      message: 'Invalid Entry'
                                                                  }
                                                              }
                                                          ]
                                                      }
                                                  },
                                                  {
                                                      type: FULL_CONTAINER,
                                                      label: 'At what date has the buy-out price been provided?',
                                                      bool:
                                                          props.investment &&
                                                          props.investment.funding &&
                                                          props.investment.funding[HAVE_TARGET_BUYOUT_VALUE] === 'yes',
                                                      field: {
                                                          __order: 'j',
                                                          name: `funding.${DATE_VALUE_PROVIDED}`,
                                                          className: 'form-control',
                                                          component: DATE_PICKER,
                                                          options: {
                                                              disabledDate: current =>
                                                                  current && current > moment().startOf('day')
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
                                  },
                                  {
                                      type: FULL_CONTAINER,
                                      label: 'Would you like to include funding level triggers?',
                                      bool:
                                          props.investment &&
                                          props.investment.funding &&
                                          props.investment.funding[LIKE_TO_SEE_PROJECTION_OYFP] === 'yes',
                                      field: {
                                          __order: 'k',
                                          name: `funding.${LIKE_TO_INCLUDE_FLT}`,
                                          className: 'form-control',
                                          component: BUTTON_GROUP,
                                          options: yesNoOption,
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
              ]
            : [])
    ];
};
