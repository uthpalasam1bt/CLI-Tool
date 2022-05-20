import config from 'appConfig';
import moment from 'moment';
import {
    ASSETS_FORM_SECTION,
    LIABILITIES_FORM_SECTION,
    LIABILITY_VALUE_AND_DETAILS_OF_THE_VALUATION_BASIS
} from './constants';
import constants from '../../../../../UILibrary/constants';
import connectApi from '../../../../../middlewares/connectApi';

const { bucket: privateBucket, publicBucket, generateBucket } = config;

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const {
    BUTTON_GROUP,
    DATE_PICKER,
    NUMBER_FIELD,
    CURRENCY_FIELD,
    FILE_UPLOADER,
    SELECT_OPTION,
    FILE_DOWNLOADER
} = FORM_FIELDS;

const { cashflowOverall, cashflowFnR } = config.templates;
const { rip } = config.uploads;
const { FULL_CONTAINER } = FORM_TEMPLATES;
const { PROPOSAL_NAME } = ASSETS_FORM_SECTION.FIELD_KEYS;
const {
    KNOW_LIABILITY_DURATION,
    LIABILITY_DURATION,
    KNOW_PERCENT_LLTF,
    PROPORTION_OF_LLTF,
    HAVE_PAST_SLC_TO_UPLOAD,
    CASHFLOW_TYPE_TO_UPLOAD,
    CASHFLOW_ATTACHMENT_OVERALL,
    CASHFLOW_ATTACHMENT_FNR,
    DATE_CASHFLOWS_PRODUCED,
    KNOW_LIABILITY_VALUE_MDT,
    LIABILITY_VALUE,
    AVG_MARGIN_LDR_AND_GY,
    DATE_VALUE_PROVIDED,
    BASIS_VALUE_PROVIDED,
    PROXY_ADOPTION_DATE_INPUT
} = LIABILITIES_FORM_SECTION.FIELD_KEYS;
const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

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
                    name: CASHFLOW_TYPE_TO_UPLOAD,
                    label: 'Choose and download a template to upload your cashflows',
                    className: 'form-control',
                    component: SELECT_OPTION,
                    bool: isBool,
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
                    name: `download_${CASHFLOW_TYPE_TO_UPLOAD}`,
                    component: FILE_DOWNLOADER,
                    bool: isBool,
                    disabled:
                        (props.liabilities && props.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === undefined) ||
                        (props.liabilities && props.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === ''),
                    url:
                        props.liabilities && props.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'overall'
                            ? cashflowOverall
                            : cashflowFnR,
                    api: connectApi,
                    bucketNameProp: privateBucket,
                    fileName:
                        props.liabilities && props.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'overall'
                            ? 'cashflow-overall-template.xlsx'
                            : 'cashflow-fixed-&-real-template.xlsx',
                    editable:
                        (props.liabilities && props.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'overall') ||
                        (props.liabilities && props.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'fixedAndReal')
                }
            ],
            when: [
                {
                    bool:
                        isBool &&
                        props.liabilities &&
                        props.liabilities[CASHFLOW_TYPE_TO_UPLOAD] !== undefined &&
                        props.liabilities[CASHFLOW_TYPE_TO_UPLOAD] !== '',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool:
                                isBool && props.liabilities && props.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'overall',
                            label: `Upload the completed overall cashflow`,
                            field: {
                                __order: 'eb',
                                name: CASHFLOW_ATTACHMENT_OVERALL,
                                className: 'form-control',
                                component: FILE_UPLOADER,
                                options: {
                                    accept: ['.xlsx'],
                                    manual: true,
                                    block:
                                        props.screen === 'reqip' &&
                                        !props.liabilities &&
                                        props.liabilities[PROPOSAL_NAME],
                                    params: [props.entityId, props.liabilities && props.liabilities[PROPOSAL_NAME]],
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
                                props.liabilities &&
                                props.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'fixedAndReal',
                            label: `Upload the completed fixed & real cashflow`,
                            field: {
                                __order: 'eba',
                                name: CASHFLOW_ATTACHMENT_FNR,
                                className: 'form-control',
                                component: FILE_UPLOADER,
                                options: {
                                    accept: ['.xlsx'],
                                    manual: true,
                                    block:
                                        props.screen === 'reqip' &&
                                        !props.liabilities &&
                                        props.liabilities[PROPOSAL_NAME],
                                    params: [props.entityId, props.liabilities && props.liabilities[PROPOSAL_NAME]],
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
                name: DATE_CASHFLOWS_PRODUCED,
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

        ...(props.liabilities && props.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'overall'
            ? [
                  {
                      type: FULL_CONTAINER,
                      bool: props.liabilities && props.liabilities[CASHFLOW_TYPE_TO_UPLOAD] === 'overall',
                      label: 'Proportion of liabilities linked to inflation',
                      field: {
                          __order: 'ed',
                          name: PROPORTION_OF_LLTF,
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

export const LiabilitiesFormSection = (props, trackLiabilityFields = () => {}) => {
    const { liabilities } = props;
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Do you have a set of liability cashflows to upload?',
            field: {
                __order: 'a',
                name: HAVE_PAST_SLC_TO_UPLOAD,
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
                    bool: liabilities && liabilities[HAVE_PAST_SLC_TO_UPLOAD] === 'no',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: 'Liability duration',
                            bool: liabilities && liabilities[HAVE_PAST_SLC_TO_UPLOAD] === 'no',

                            field: {
                                __order: 'b',
                                name: LIABILITY_DURATION,
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
                        ...(liabilities && liabilities[HAVE_PAST_SLC_TO_UPLOAD] === 'no'
                            ? [
                                  {
                                      type: FULL_CONTAINER,
                                      label: 'Proportion of liabilities linked to inflation',
                                      bool: liabilities && liabilities[HAVE_PAST_SLC_TO_UPLOAD] === 'no',
                                      field: {
                                          __order: 'd',
                                          name: PROPORTION_OF_LLTF,
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
                    bool: liabilities && liabilities[HAVE_PAST_SLC_TO_UPLOAD] === 'yes',
                    childComponents: selectCashFLowType(
                        props,
                        liabilities && liabilities[HAVE_PAST_SLC_TO_UPLOAD] === 'yes'
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
                name: KNOW_LIABILITY_VALUE_MDT,
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
                    bool: liabilities && liabilities[KNOW_LIABILITY_VALUE_MDT] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool: liabilities && liabilities[KNOW_LIABILITY_VALUE_MDT] === 'yes',
                            label: 'Liability value',
                            field: {
                                __order: 'g',
                                name: LIABILITY_VALUE,
                                className: 'form-control',
                                component: CURRENCY_FIELD,
                                options: {
                                    prefix: '£',
                                    props: {
                                        precision: 0,
                                        className: 'form-control',
                                        placeholder: '10,000,000',
                                        thousandSeparator: ',',
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
                                        options: { '>=': 1, message: 'Invalid entry.' }
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: liabilities && liabilities[KNOW_LIABILITY_VALUE_MDT] === 'yes',
                            iIcon:
                                "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                            label:
                                'What is the average margin between the liability discount rate and an appropriate reference gilt yield?',
                            field: {
                                __order: 'h',
                                name: AVG_MARGIN_LDR_AND_GY,
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
                            bool: liabilities && liabilities[KNOW_LIABILITY_VALUE_MDT] === 'yes',
                            field: {
                                __order: 'i',
                                name: DATE_VALUE_PROVIDED,
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
                            bool: liabilities && liabilities[KNOW_LIABILITY_VALUE_MDT] === 'yes',
                            field: {
                                __order: 'j',
                                name: BASIS_VALUE_PROVIDED,
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
        }
    ];
};
