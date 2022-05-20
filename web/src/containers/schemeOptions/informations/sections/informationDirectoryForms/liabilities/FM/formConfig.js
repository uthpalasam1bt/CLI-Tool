import moment from 'moment';
import constants from '../../../../../../../UILibrary/constants';
import config from 'appConfig';

import {
    LIABILITIES_FORM_SECTION,
    LIABILITY_VALUE_AND_DETAILS_OF_THE_VALUATION_BASIS,
    LIABILITIES_FORM_LABELS_SECTION
} from './constants';
import connectApi from "../../../../../../../middlewares/connectApi";
const { bucket: privateBucket, publicBucket, generateBucket } = config;
const { cashflowOverall, cashflowFnR } = config.templates;
const { rip } = config.uploads;
const {
    LIABILITY_DURATION,
    PROPORTION_OF_LLTF,
    HAVE_PAST_SLC_TO_UPLOAD,
    KNOW_LIABILITY_VALUE_MDT,
    LIABILITY_VALUE,
    AVG_MARGIN_LDR_AND_GY,
    DATE_VALUE_PROVIDED,
    BASIS_VALUE_PROVIDED,
    CASHFLOW_TYPE_TO_UPLOAD,
    CASHFLOW_ATTACHMENT_OVERALL,
    PROPOSAL_NAME,
    DATE_CASHFLOWS_PRODUCED,
    CASHFLOW_ATTACHMENT_FNR
} = LIABILITIES_FORM_SECTION.FIELD_KEYS;
const {
    LIABILITY_DURATION_LABEL,
    PROPORTION_OF_LLTF_LABEL,
    HAVE_PAST_SLC_TO_UPLOAD_LABEL,
    KNOW_LIABILITY_VALUE_MDT_LABEL,
    LIABILITY_VALUE_LABEL,
    AVG_MARGIN_LDR_AND_GY_LABEL,
    DATE_VALUE_PROVIDED_LABEL,
    BASIS_VALUE_PROVIDED_LABEL
} = LIABILITIES_FORM_LABELS_SECTION.FIELD_LABELS;

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { DATE_PICKER, BUTTON_GROUP, SELECT_OPTION, NUMBER_FIELD, CURRENCY_FIELD, FILE_DOWNLOADER, FILE_UPLOADER } = FORM_FIELDS;
const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];
const { FULL_CONTAINER } = FORM_TEMPLATES;

const conditionTrue = true;

const selectCashFLowType = (dirtyFormValues, isBool) => {
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
                    disabled:
                        (dirtyFormValues && dirtyFormValues[CASHFLOW_TYPE_TO_UPLOAD] === undefined) ||
                        (dirtyFormValues && dirtyFormValues[CASHFLOW_TYPE_TO_UPLOAD] === ''),
                    url:
                        dirtyFormValues && dirtyFormValues[CASHFLOW_TYPE_TO_UPLOAD] === 'overall'
                            ? cashflowOverall
                            : cashflowFnR,
                    api: connectApi,
                    bucketNameProp: privateBucket,
                    fileName:
                        dirtyFormValues && dirtyFormValues[CASHFLOW_TYPE_TO_UPLOAD] === 'overall'
                            ? 'cashflow-overall-template.xlsx'
                            : 'cashflow-fixed-&-real-template.xlsx',
                    editable:
                        (dirtyFormValues && dirtyFormValues[CASHFLOW_TYPE_TO_UPLOAD] === 'overall') ||
                        (dirtyFormValues && dirtyFormValues[CASHFLOW_TYPE_TO_UPLOAD] === 'fixedAndReal')
                }
            ],
            when: [
                {
                    bool:
                        isBool &&
                        dirtyFormValues &&
                        dirtyFormValues[CASHFLOW_TYPE_TO_UPLOAD] !== undefined &&
                        dirtyFormValues[CASHFLOW_TYPE_TO_UPLOAD] !== '',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool:
                                isBool && dirtyFormValues && dirtyFormValues[CASHFLOW_TYPE_TO_UPLOAD] === 'overall',
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
                                       // dirtyFormValues.screen === 'reqip' &&
                                        !dirtyFormValues &
                                        dirtyFormValues[PROPOSAL_NAME],
                                    params: [dirtyFormValues.entityId, dirtyFormValues && dirtyFormValues[PROPOSAL_NAME]],
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
                                dirtyFormValues &&
                                dirtyFormValues[CASHFLOW_TYPE_TO_UPLOAD] === 'fixedAndReal',
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
                                       // dirtyFormValues.screen === 'reqip' &&
                                        !dirtyFormValues &&
                                        dirtyFormValues[PROPOSAL_NAME],
                                    params: [dirtyFormValues.entityId, dirtyFormValues && dirtyFormValues[PROPOSAL_NAME]],
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

        ...(dirtyFormValues && dirtyFormValues[CASHFLOW_TYPE_TO_UPLOAD] === 'overall'
            ? [
                {
                    type: FULL_CONTAINER,
                    bool: dirtyFormValues && dirtyFormValues[CASHFLOW_TYPE_TO_UPLOAD] === 'overall',
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


export const formFields = (props = {}) => {
    const {formData} = props;
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: HAVE_PAST_SLC_TO_UPLOAD_LABEL,
            field: {
                __order: 'a',
                name: HAVE_PAST_SLC_TO_UPLOAD,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption,
                validate: []
            },
            when: [
                {
                    bool: formData && formData[HAVE_PAST_SLC_TO_UPLOAD] === 'no',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: 'Liability duration',
                            bool: formData && formData[HAVE_PAST_SLC_TO_UPLOAD] === 'no',

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
                        {
                            type: FULL_CONTAINER,
                            label: 'Proportion of liabilities linked to inflation',
                            bool: formData && formData[HAVE_PAST_SLC_TO_UPLOAD] === 'no',
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
                },

                {
                    bool: formData && formData[HAVE_PAST_SLC_TO_UPLOAD] === 'yes',
                    childComponents: selectCashFLowType(
                        formData,
                        formData && formData[HAVE_PAST_SLC_TO_UPLOAD] === 'yes'
                    )
                }
            ]
        },
        {
            type: FULL_CONTAINER,
            iIcon: LIABILITY_VALUE_AND_DETAILS_OF_THE_VALUATION_BASIS,
            label: KNOW_LIABILITY_VALUE_MDT_LABEL,
            bool: true,
            field: {
                __order: 'f',
                name: KNOW_LIABILITY_VALUE_MDT,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption
            },
            when: [
                {
                    bool: formData && formData[KNOW_LIABILITY_VALUE_MDT] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool:  formData && formData[KNOW_LIABILITY_VALUE_MDT] === 'yes',
                            label: LIABILITY_VALUE_LABEL,
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
                                        placeholder: '10,000,000'
                                    }
                                },
                                title: ''
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool:  formData && formData[KNOW_LIABILITY_VALUE_MDT] === 'yes',
                            iIcon:
                                "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                            label: AVG_MARGIN_LDR_AND_GY_LABEL,
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
                                    max: 5
                                },
                                validate: []
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: DATE_VALUE_PROVIDED_LABEL,
                            bool:  formData && formData[KNOW_LIABILITY_VALUE_MDT] === 'yes',
                            field: {
                                __order: 'i',
                                name: DATE_VALUE_PROVIDED,
                                className: 'form-control',
                                component: DATE_PICKER,
                                options: {
                                    disabledDate: current => current && current > moment().startOf('day')
                                }
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: BASIS_VALUE_PROVIDED_LABEL,
                            bool:  formData && formData[KNOW_LIABILITY_VALUE_MDT] === 'yes',
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
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ];
};
