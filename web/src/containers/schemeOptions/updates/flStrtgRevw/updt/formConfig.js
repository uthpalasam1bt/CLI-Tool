import React from 'react';
import { Divider } from 'antd';
import _ from 'lodash';
import {FORM_FIELD_LABLES, FORM_FIELD_NAMES, TABONE} from './constants';
import { required } from 'redux-form-validators'; // required validator
import constants from '../../../../../UILibrary/constants';
import config from 'appConfig';
import connectApi from '../../../../../middlewares/connectApi';
import moment from 'moment';

import {
    STRETOGY_UPDATE_FORM_SECTION,
    LIABILITYCASHVALUE,
    WANTUSUPLOADFILE,
    MARGINEDATEANDTYPE,
    FUNDINPOSITION,
    TEMPLATE_DOWNLOAD,
    WANTUSTOMODLEDC,
    SCHEMEOPTIONFUTURE,
    HAVETARGETBUYOUT,
    WANT_US_TO_UPLOAD
} from './constants';
const { bucket: privateBucket } = config;
const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { LABEL, FULL_VIEW_CONTAINER, FULL_CONTAINER, HALF_CONTAINER, ROW } = FORM_TEMPLATES;
const { activeWorkFlow} = config.uploads;
const { cashflowOverall, cashflowFnR, deficitContribution } = config.templates;
const {
    INPUT_FIELD,
    TEXTAREA,
    DATE_PICKER,
    CURRENCY_FIELD,
    FILE_UPLOADER,
    NUMBER_FIELD,
    MULTIPLE_FILE_UPLOADER,
    BUTTON_GROUP,
    DEFICIT_CONTRIBUTION_SECTION,
    SELECT_OPTION,
    FILE_DOWNLOADER
} = FORM_FIELDS;
const YESNOBUTTONOPTION = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

export const formFields = props => {
    const formValues = props[STRETOGY_UPDATE_FORM_SECTION.KEY];

    const fsrUpdatesFormSection_assets = _.get(formValues, 'fsrUpdatesFormSection_assets');
    const fsrUpdatesFormSection_liab = _.get(formValues, 'fsrUpdatesFormSection_liab');
    const fsrUpdatesFormSection_fund = _.get(formValues, 'fsrUpdatesFormSection_fund');

    return [
        {
            type: FULL_CONTAINER, //  form template type
            bool: true, // use to make the component visible or invisible
            label: FORM_FIELD_LABLES.RETURN_TARGET, // field label text
            field: {
                //  Use to pass options to redux form field
                name: FORM_FIELD_NAMES.RETURN_TARGET, //name of the field
                className: 'form-control',
                suffix: '%',
                placeholder: '-1.000-5.000',
                component: NUMBER_FIELD, //component that use in the field
                options: {
                    placeholder: '-1.000-5.000',
                    decimalScale: 3, //Use to separate the decimal part of the input value
                    min: -1.0, //Use to demonstrates the minimun value can enter
                    max: 5.0 //Use to demonstrates the maximum value that can enter
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: FORM_FIELD_LABLES.HOLD_LESS_LIQUID_ASSETS,
            bool: true,
            field: {
                // __order: 'f',
                name: FORM_FIELD_NAMES.HOLD_LESS_LIQUID_ASSETS,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,

                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: FORM_FIELD_LABLES.FULLY_ESG_PORTFOLIO,
            bool: true,
            field: {
                // __order: 'f',
                name: FORM_FIELD_NAMES.FULLY_ESG_PORTFOLIO,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,

                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },
        {
            type: ROW,
            rawComponents: <Divider />
        },
        {
            type: FULL_CONTAINER,
            label: FORM_FIELD_LABLES.HAVE_PAST_SLC_TO_UPLOAD,
            bool: true,
            field: {
                __order: 'a',
                name: FORM_FIELD_NAMES.HAVE_PAST_SLC_TO_UPLOAD,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,

                validationModules: [{ moduleName: 'RequiredValidate' }]
            },
            when: [
                {
                    bool:
                        fsrUpdatesFormSection_liab &&
                        fsrUpdatesFormSection_liab[LIABILITYCASHVALUE] &&
                        fsrUpdatesFormSection_liab[LIABILITYCASHVALUE] === 'no', // When this comdition become true functional configurations in side of the childComponent array will be display

                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: FORM_FIELD_LABLES.LIABILITY_DURATION,
                            bool:
                                fsrUpdatesFormSection_liab &&
                                fsrUpdatesFormSection_liab[LIABILITYCASHVALUE] &&
                                fsrUpdatesFormSection_liab[LIABILITYCASHVALUE] === 'no',
                            field: {
                                __order: 'b',
                                name: FORM_FIELD_NAMES.LIABILITY_DURATION,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                placeholder: '1-50',
                                suffix: 'Years',
                                options: {
                                    placeholder: '1-50',
                                    // decimalScale: 0, //Use to separate the decimal part of the input value
                                    min: 1, //Use to demonstrates the minimun value can enter
                                    max: 50 //Use to demonstrates the maximum value that can enter
                                },
                                validationModules: [
                                    { moduleName: 'RequiredValidate', options: { message: 'Required' } }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool:
                                fsrUpdatesFormSection_liab &&
                                fsrUpdatesFormSection_liab[LIABILITYCASHVALUE] &&
                                fsrUpdatesFormSection_liab[LIABILITYCASHVALUE] === 'no',
                            label: FORM_FIELD_LABLES.PROPORTION_OF_LLTF,
                            field: {
                                __order: 'd',
                                name: FORM_FIELD_NAMES.PROPORTION_OF_LLTF,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: '%',
                                placeholder: '1-100',
                                options: {
                                    placeholder: '1-100',
                                    decimalScale: 0, //Use to separate the decimal part of the input value
                                    min: 1, //Use to demonstrates the minimun value can enter
                                    max: 100 //Use to demonstrates the maximum value that can enter
                                },
                                validationModules: [
                                    { moduleName: 'RequiredValidate', options: { message: 'Required' } }
                                ]
                            }
                        }
                    ]
                },
                {
                    bool:
                        fsrUpdatesFormSection_liab &&
                        fsrUpdatesFormSection_liab[LIABILITYCASHVALUE] &&
                        fsrUpdatesFormSection_liab[LIABILITYCASHVALUE] === 'yes', // When this comdition become true functional configurations in side of the childComponent array will be display

                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool:
                                fsrUpdatesFormSection_liab &&
                                fsrUpdatesFormSection_liab[LIABILITYCASHVALUE] &&
                                fsrUpdatesFormSection_liab[LIABILITYCASHVALUE] === 'yes',
                            label: FORM_FIELD_LABLES.CASHFLOW_TYPE_TO_UPLOAD,
                            field: [
                                {
                                    name: WANT_US_TO_UPLOAD,
                                    className: 'form-control',
                                    __order: 'ea',
                                    bool:
                                        fsrUpdatesFormSection_liab &&
                                        fsrUpdatesFormSection_liab[LIABILITYCASHVALUE] &&
                                        fsrUpdatesFormSection_liab[LIABILITYCASHVALUE] === 'yes',
                                    component: SELECT_OPTION,
                                    options: {
                                        defaultValue: 'Select',
                                        // name:'',
                                        dataList: [
                                            { key: 'overall', value: 'Overall' },
                                            { key: 'fixedAndReal', value: 'Fixed & Real' }
                                        ]
                                    },
                                    validationModules: [{ moduleName: 'RequiredValidate' }]
                                },
                                {
                                    className: 'form-control',
                                    name: TEMPLATE_DOWNLOAD,
                                    component: FILE_DOWNLOADER,
                                    disabled: [WANT_US_TO_UPLOAD] === undefined || [WANT_US_TO_UPLOAD] === '',

                                    url:
                                        fsrUpdatesFormSection_liab &&
                                        fsrUpdatesFormSection_liab['cashflowTypeToUpload'] &&
                                        fsrUpdatesFormSection_liab['cashflowTypeToUpload'] === 'overall'
                                            ? cashflowOverall
                                            : cashflowFnR,
                                    fileName:
                                        fsrUpdatesFormSection_liab &&
                                        fsrUpdatesFormSection_liab['cashflowTypeToUpload'] &&
                                        fsrUpdatesFormSection_liab['cashflowTypeToUpload'] === 'overall'
                                            ? 'cashflow-overall-template.xlsx'
                                            : 'cashflow-fixed-&-real-template.xlsx',
                                    bucketNameProp: privateBucket,
                                    api: connectApi
                                }
                            ],
                            when: [
                                {
                                    bool:
                                        fsrUpdatesFormSection_liab &&
                                        fsrUpdatesFormSection_liab['cashflowTypeToUpload'] &&
                                        fsrUpdatesFormSection_liab['cashflowTypeToUpload'] === 'overall',
                                    childComponents: [
                                        {
                                            type: FULL_CONTAINER,
                                            label: FORM_FIELD_LABLES.CASHFLOW_ATTACHMENT_FNR,
                                            bool:
                                                fsrUpdatesFormSection_liab &&
                                                fsrUpdatesFormSection_liab['cashflowTypeToUpload'] &&
                                                fsrUpdatesFormSection_liab['cashflowTypeToUpload'] === 'overall',
                                            field: {
                                                name: FORM_FIELD_NAMES.CASHFLOW_ATTACHMENT_OVERALL,
                                                className: 'form-control',
                                                component: FILE_UPLOADER,
                                                options: {
                                                    accept: ['.xlsx'],
                                                    url: activeWorkFlow.generateCashflow_overall_FSR,
                                                    bucketName: privateBucket,
                                                    api: connectApi,
                                                    params: [props.schemeId]
                                                },
                                                validationModules: [
                                                    { moduleName: 'RequiredValidate', options: { message: 'Required' } }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    bool:
                                        fsrUpdatesFormSection_liab &&
                                        fsrUpdatesFormSection_liab['cashflowTypeToUpload'] &&
                                        fsrUpdatesFormSection_liab['cashflowTypeToUpload'] === 'fixedAndReal',
                                    childComponents: [
                                        {
                                            type: FULL_CONTAINER,
                                            label: FORM_FIELD_LABLES.CASHFLOW_ATTACHMENT_FNR,
                                            bool:
                                                fsrUpdatesFormSection_liab &&
                                                fsrUpdatesFormSection_liab['cashflowTypeToUpload'] &&
                                                fsrUpdatesFormSection_liab['cashflowTypeToUpload'] === 'fixedAndReal',
                                            field: {
                                                name: FORM_FIELD_NAMES.CASHFLOW_ATTACHMENT_FNR,
                                                className: 'form-control',
                                                component: FILE_UPLOADER,
                                                options: {
                                                    accept: ['.xlsx'],
                                                    manual: true,
                                                    url: activeWorkFlow.generateCashflow_fNr_FSR,

                                                    bucketName: privateBucket,
                                                    api: connectApi,
                                                    params: [props.schemeId]
                                                },
                                                validationModules: [
                                                    { moduleName: 'RequiredValidate', options: { message: 'Required' } }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label: FORM_FIELD_LABLES.DATE_CASHFLOWS_PRODUCED,
                            field: {
                                __order: 'eb',
                                name: FORM_FIELD_NAMES.DATE_CASHFLOWS_PRODUCED,
                                className: 'form-control',
                                component: DATE_PICKER,
                                options: {
                                    disabledDate: current => current && current > moment().startOf('day')
                                },
                                validationModules: [{ moduleName: 'RequiredValidate' }]
                            }
                        },
                        ...(fsrUpdatesFormSection_liab &&
                            fsrUpdatesFormSection_liab['cashflowTypeToUpload'] &&
                            fsrUpdatesFormSection_liab['cashflowTypeToUpload'] === 'overall'
                        ? [
                            {
                                type: FULL_CONTAINER,
                                label: FORM_FIELD_LABLES.PROPORTION_OF_LLTF,
                                field: {
                                    __order: 'ed',
                                    name: FORM_FIELD_NAMES.PROPORTION_OF_LLTF,
                                    className: 'form-control',
                                    component: NUMBER_FIELD,
                                    suffix: '%',
                                    placeholder: '1-100',
                                    options: {
                                        placeholder: '1-100',
                                        decimalScale: 0, //Use to separate the decimal part of the input value
                                        min: 1, //Use to demonstrates the minimun value can enter
                                        max: 100 //Use to demonstrates the maximum value that can enter
                                    },
                                    validationModules: [
                                        { moduleName: 'RequiredValidate', options: { message: 'Required' } }
                                    ]
                                }
                            }
                          ]
                        : [])
                    ]
                }
            ]
        },
        {
            type: FULL_CONTAINER,
            label: FORM_FIELD_LABLES.KNOW_LIABILITY_VALUE_MDT,
            bool: true,
            field: {
                __order: 'f',
                name: FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_MDT,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,

                validationModules: [{ moduleName: 'RequiredValidate' }]
            },
            when: [
                {
                    bool:
                        fsrUpdatesFormSection_liab &&
                        fsrUpdatesFormSection_liab[MARGINEDATEANDTYPE] &&
                        fsrUpdatesFormSection_liab[MARGINEDATEANDTYPE] === 'yes', // When this comdition become true functional configurations in side of the childComponent array will be display

                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: FORM_FIELD_LABLES.LIABILITY_VALUE,
                            bool:
                                fsrUpdatesFormSection_liab &&
                                fsrUpdatesFormSection_liab[MARGINEDATEANDTYPE] &&
                                fsrUpdatesFormSection_liab[MARGINEDATEANDTYPE] === 'yes',
                            field: {
                                __order: 'g',
                                name: FORM_FIELD_NAMES.LIABILITY_VALUE,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                prefix: '£',
                                placeholder: '10,000,000',
                                validationModules: [{ moduleName: 'RequiredValidate' }]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: FORM_FIELD_LABLES.AVG_MARGIN_LDR_AND_GY,
                            bool:
                                fsrUpdatesFormSection_liab &&
                                fsrUpdatesFormSection_liab[MARGINEDATEANDTYPE] &&
                                fsrUpdatesFormSection_liab[MARGINEDATEANDTYPE] === 'yes',
                            field: {
                                __order: 'h',
                                name: FORM_FIELD_NAMES.AVG_MARGIN_LDR_AND_GY,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: '%',
                                placeholder: '1-5',
                                options: {
                                    placeholder: '1-5',
                                    decimalScale: 0, //Use to separate the decimal part of the input value
                                    min: 1, //Use to demonstrates the minimun value can enter
                                    max: 5 //Use to demonstrates the maximum value that can enter
                                },
                                validationModules: [
                                    { moduleName: 'RequiredValidate', options: { message: 'Required' } }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool:
                                fsrUpdatesFormSection_liab &&
                                fsrUpdatesFormSection_liab[MARGINEDATEANDTYPE] &&
                                fsrUpdatesFormSection_liab[MARGINEDATEANDTYPE] === 'yes',
                            label: FORM_FIELD_LABLES.DATE_VALUE_PROVIDED,
                            field: {
                                __order: 'i',
                                name: FORM_FIELD_NAMES.DATE_VALUE_PROVIDED,
                                className: 'form-control',
                                component: DATE_PICKER,
                                validationModules: [{ moduleName: 'RequiredValidate' }]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool:
                                fsrUpdatesFormSection_liab &&
                                fsrUpdatesFormSection_liab[MARGINEDATEANDTYPE] &&
                                fsrUpdatesFormSection_liab[MARGINEDATEANDTYPE] === 'yes',
                            label: FORM_FIELD_LABLES.BASIS_VALUE_PROVIDED,
                            field: {
                                __order: 'j',
                                name: FORM_FIELD_NAMES.BASIS_VALUE_PROVIDED,
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
                                validationModules: [
                                    { moduleName: 'RequiredValidate', options: { message: 'Required' } }
                                ]
                            }
                        },
                        {
                            type: ROW,
                            rawComponents: <Divider />
                        },
                        {
                            type: FULL_CONTAINER,
                            label: FORM_FIELD_LABLES.LIKE_TO_SEE_PROJECTION_OYFP,
                            bool:
                                fsrUpdatesFormSection_liab &&
                                fsrUpdatesFormSection_liab[MARGINEDATEANDTYPE] &&
                                fsrUpdatesFormSection_liab[MARGINEDATEANDTYPE] === 'yes',
                            field: {
                                __order: 'a',
                                name: FORM_FIELD_NAMES.LIKE_TO_SEE_PROJECTION_OYFP,
                                //    name: 'fsrUpdatesFormSection_fund.deficitContributions.likeToSeeProjectionOYFP',
                                className: 'form-control',
                                component: BUTTON_GROUP,
                                options: YESNOBUTTONOPTION,

                                validationModules: [{ moduleName: 'RequiredValidate' }]
                            },
                            when: [
                                {
                                    bool:
                                        fsrUpdatesFormSection_fund &&
                                        fsrUpdatesFormSection_fund[FUNDINPOSITION] &&
                                        fsrUpdatesFormSection_fund[FUNDINPOSITION] === 'yes', // When this comdition become true functional configurations in side of the childComponent array will be display
                                    childComponents: [
                                        {
                                            type: FULL_CONTAINER,
                                            label: FORM_FIELD_LABLES.WANT_US_TO_MODEL_DC,
                                            bool:
                                                fsrUpdatesFormSection_fund &&
                                                fsrUpdatesFormSection_fund[FUNDINPOSITION] &&
                                                fsrUpdatesFormSection_fund[FUNDINPOSITION] === 'yes',
                                            field: {
                                                __order: 'b',
                                                name: FORM_FIELD_NAMES.WANT_US_TO_MODEL_DC,
                                                className: 'form-control',
                                                component: BUTTON_GROUP,
                                                options: YESNOBUTTONOPTION,

                                                validationModules: [{ moduleName: 'RequiredValidate' }]
                                            },
                                            when: [
                                                {
                                                    bool:
                                                        fsrUpdatesFormSection_fund &&
                                                        fsrUpdatesFormSection_fund[WANTUSTOMODLEDC] &&
                                                        fsrUpdatesFormSection_fund[WANTUSTOMODLEDC] === 'yes', // When this comdition become true functional configurations in side of the childComponent array will be display
                                                    childComponents: [
                                                        {
                                                            type: FULL_CONTAINER,
                                                            label: FORM_FIELD_LABLES.WANT_US_TO_UPLOAD_DCES,

                                                            field: [
                                                                {
                                                                    __order: 'c',
                                                                    name: WANTUSUPLOADFILE,
                                                                    className: 'form-control',
                                                                    bool:
                                                                        fsrUpdatesFormSection_fund &&
                                                                        fsrUpdatesFormSection_fund[WANTUSTOMODLEDC] &&
                                                                        fsrUpdatesFormSection_fund[WANTUSTOMODLEDC] === 'yes',
                                                                    component: SELECT_OPTION,
                                                                    options: {
                                                                        defaultValue: 'Select',
                                                                        dataList: [
                                                                            { key: 'onScreen', value: 'On Screen' },
                                                                            { key: 'uploadFile', value: 'Upload File' }
                                                                        ]
                                                                    },
                                                                    validationModules: [
                                                                        { moduleName: 'RequiredValidate' }
                                                                    ]
                                                                },
                                                                {
                                                                    className: 'form-control',
                                                                    name: TEMPLATE_DOWNLOAD,
                                                                    component: FILE_DOWNLOADER,
                                                                    disabled:
                                                                        [WANTUSUPLOADFILE] === undefined ||
                                                                        [WANTUSUPLOADFILE] === 'onScreen',
                                                                    url: deficitContribution,
                                                                    // url: activeWorkFlow.generateDeficitContribution_FSR,
                                                                    params: [props.schemeId],
                                                                    fileName: 'deficit-contributions.xlsx',
                                                                    bucketNameProp: privateBucket,
                                                                    api: connectApi
                                                                }
                                                            ],
                                                            when: [
                                                                {
                                                                    bool:
                                                                        fsrUpdatesFormSection_fund &&
                                                                        fsrUpdatesFormSection_fund[
                                                                            'wantUsToUploadDCES'
                                                                        ] &&
                                                                        fsrUpdatesFormSection_fund[
                                                                            'wantUsToUploadDCES'
                                                                        ] === 'uploadFile',
                                                                    childComponents: [
                                                                        {
                                                                            type: FULL_CONTAINER,
                                                                            bool:
                                                                                fsrUpdatesFormSection_fund &&
                                                                                fsrUpdatesFormSection_fund[
                                                                                'wantUsToUploadDCES'
                                                                                ] &&
                                                                                fsrUpdatesFormSection_fund[
                                                                                'wantUsToUploadDCES'
                                                                                ] === 'uploadFile',
                                                                            label: FORM_FIELD_LABLES.DCFS_ATTACHMENT,
                                                                            field: {
                                                                                __order: 'd',
                                                                                name: FORM_FIELD_NAMES.DCFS_ATTACHMENT,
                                                                                className: 'form-control',
                                                                                component: FILE_UPLOADER,
                                                                                options: {
                                                                                    accept: ['.xlsx'],
                                                                                    manual: true,
                                                                                    params: [props.schemeId],
                                                                                    // url: deficitContribution,
                                                                                    url: activeWorkFlow.generateDeficitContribution_FSR,
                                                                                    fileName:
                                                                                        'deficit-contributions.xlsx',
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
                                                                },
                                                                {
                                                                    bool:
                                                                        fsrUpdatesFormSection_fund &&
                                                                        fsrUpdatesFormSection_fund[
                                                                            'wantUsToUploadDCES'
                                                                        ] &&
                                                                        fsrUpdatesFormSection_fund[
                                                                            'wantUsToUploadDCES'
                                                                        ] === 'onScreen',
                                                                    childComponents: [
                                                                        {
                                                                            type: FULL_VIEW_CONTAINER,
                                                                            label: '',
                                                                            bool:
                                                                                fsrUpdatesFormSection_fund &&
                                                                                fsrUpdatesFormSection_fund[
                                                                                'wantUsToUploadDCES'
                                                                                ] &&
                                                                                fsrUpdatesFormSection_fund[
                                                                                'wantUsToUploadDCES'
                                                                                ] === 'onScreen',
                                                                            field: {
                                                                                options:{
                                                                                    prefix: 'fsrUpdatesFormSection_fund'
                                                                                },
                                                                                className: 'form-control',
                                                                                component: DEFICIT_CONTRIBUTION_SECTION
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
                                            label: FORM_FIELD_LABLES.SCHEME_OPEN_TO_FUTURE_ACCRUAL,
                                            bool:
                                                fsrUpdatesFormSection_fund &&
                                                fsrUpdatesFormSection_fund[FUNDINPOSITION] &&
                                                fsrUpdatesFormSection_fund[FUNDINPOSITION] === 'yes',
                                            field: {
                                                __order: 'f',
                                                name: FORM_FIELD_NAMES.SCHEME_OPEN_TO_FUTURE_ACCRUAL,
                                                className: 'form-control',
                                                component: BUTTON_GROUP,
                                                options: YESNOBUTTONOPTION,

                                                validationModules: [{ moduleName: 'RequiredValidate' }]
                                            },
                                            when: [
                                                {
                                                    bool:
                                                        fsrUpdatesFormSection_fund &&
                                                        fsrUpdatesFormSection_fund[SCHEMEOPTIONFUTURE] &&
                                                        fsrUpdatesFormSection_fund[SCHEMEOPTIONFUTURE] === 'yes', // When this comdition become true functional configurations in side of the childComponent array will be display
                                                    childComponents: [
                                                        {
                                                            type: FULL_CONTAINER,
                                                            label: FORM_FIELD_LABLES.CURRENT_ANNUAL_CA,
                                                            bool:
                                                                fsrUpdatesFormSection_fund &&
                                                                fsrUpdatesFormSection_fund[SCHEMEOPTIONFUTURE] &&
                                                                fsrUpdatesFormSection_fund[SCHEMEOPTIONFUTURE] === 'yes',
                                                            field: {
                                                                __order: 'g',
                                                                name: FORM_FIELD_NAMES.CURRENT_ANNUAL_CA,
                                                                className: 'form-control',
                                                                component: NUMBER_FIELD,
                                                                prefix: '£',
                                                                placeholder: '0',
                                                                validationModules: [{ moduleName: 'RequiredValidate' }]
                                                            }
                                                        },
                                                        {
                                                            type: FULL_CONTAINER,
                                                            bool:
                                                                fsrUpdatesFormSection_fund &&
                                                                fsrUpdatesFormSection_fund[SCHEMEOPTIONFUTURE] &&
                                                                fsrUpdatesFormSection_fund[SCHEMEOPTIONFUTURE] === 'yes',
                                                            label: FORM_FIELD_LABLES.COMBINED_COMPANY_MC_RA,
                                                            field: {
                                                                __order: 'h',
                                                                name: FORM_FIELD_NAMES.COMBINED_COMPANY_MC_RA,
                                                                className: 'form-control',
                                                                component: NUMBER_FIELD,
                                                                prefix: '£',
                                                                placeholder: '0',
                                                                validationModules: [{ moduleName: 'RequiredValidate' }]
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            type: FULL_CONTAINER,
                                            label: FORM_FIELD_LABLES.HAVE_TARGET_BUYOUT_VALUE,
                                            bool:
                                                fsrUpdatesFormSection_fund &&
                                                fsrUpdatesFormSection_fund[FUNDINPOSITION] &&
                                                fsrUpdatesFormSection_fund[FUNDINPOSITION] === 'yes',
                                            field: {
                                                __order: 'i',
                                                name: FORM_FIELD_NAMES.HAVE_TARGET_BUYOUT_VALUE,
                                                className: 'form-control',
                                                component: BUTTON_GROUP,
                                                options: YESNOBUTTONOPTION,

                                                validationModules: [{ moduleName: 'RequiredValidate' }]
                                            },
                                            when: [
                                                {
                                                    bool:
                                                        fsrUpdatesFormSection_fund &&
                                                        fsrUpdatesFormSection_fund[HAVETARGETBUYOUT] &&
                                                        fsrUpdatesFormSection_fund[HAVETARGETBUYOUT] === 'yes', // When this comdition become true functional configurations in side of the childComponent array will be display
                                                    childComponents: [
                                                        {
                                                            type: FULL_CONTAINER,
                                                            label: FORM_FIELD_LABLES.TARGET_BUYOUT_VALUE,
                                                            bool:
                                                                fsrUpdatesFormSection_fund &&
                                                                fsrUpdatesFormSection_fund[HAVETARGETBUYOUT] &&
                                                                fsrUpdatesFormSection_fund[HAVETARGETBUYOUT] === 'yes',
                                                            field: {
                                                                __order: 'j',
                                                                name: FORM_FIELD_NAMES.TARGET_BUYOUT_VALUE,
                                                                className: 'form-control',
                                                                component: NUMBER_FIELD,
                                                                prefix: '£',
                                                                placeholder: '0',
                                                                validationModules: [{ moduleName: 'RequiredValidate' }]
                                                            }
                                                        },
                                                        {
                                                            type: FULL_CONTAINER,
                                                            bool:
                                                                fsrUpdatesFormSection_fund &&
                                                                fsrUpdatesFormSection_fund[HAVETARGETBUYOUT] &&
                                                                fsrUpdatesFormSection_fund[HAVETARGETBUYOUT] === 'yes',
                                                            label: FORM_FIELD_LABLES.DATE_BUYOUT_VALUE_PROVIDED,
                                                            field: {
                                                                __order: 'k',
                                                                name: FORM_FIELD_NAMES.DATE_BUYOUT_VALUE_PROVIDED,
                                                                className: 'form-control',
                                                                component: DATE_PICKER,
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
                                        },
                                        {
                                            type: FULL_CONTAINER,
                                            label: FORM_FIELD_LABLES.LIKE_TO_INCLUDE_FLT,
                                            bool:
                                                fsrUpdatesFormSection_fund &&
                                                fsrUpdatesFormSection_fund[FUNDINPOSITION] &&
                                                fsrUpdatesFormSection_fund[FUNDINPOSITION] === 'yes',
                                            field: {
                                                __order: 'l',
                                                name: FORM_FIELD_NAMES.LIKE_TO_INCLUDE_FLT,
                                                className: 'form-control',
                                                component: BUTTON_GROUP,
                                                options: YESNOBUTTONOPTION,

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
    ];
};
