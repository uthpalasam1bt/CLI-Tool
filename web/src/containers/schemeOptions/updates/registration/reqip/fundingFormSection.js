import config from 'appConfig';
import moment from 'moment';
import {
    ASSETS_FORM_SECTION,
    FUNDING_FORM_SECTION,
    THE_SCHEME_OPEN_TO_FUTURE_ACCRUAL_OF_NEW_BENEFITS,
    THE_CURRENT_ANNUAL_COST_OF_NEW_BENEFIT_ACCRUAL
} from './constants';

import constants from '../../../../../UILibrary/constants';
import connectApi from '../../../../../middlewares/connectApi';

const { bucket: privateBucket, publicBucket, generateBucket } = config;

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const {
    BUTTON_GROUP,
    DATE_PICKER,
    CURRENCY_FIELD,
    FILE_UPLOADER,
    SELECT_OPTION,
    FILE_DOWNLOADER,
    DEFICIT_CONTRIBUTION_SECTION
} = FORM_FIELDS;
const { DIV, LABEL, ROW, COL, FIELD, FULL_CONTAINER, FULL_VIEW_CONTAINER } = FORM_TEMPLATES;

const { deficitContribution } = config.templates;
const { rip } = config.uploads;
const { PROPOSAL_NAME } = ASSETS_FORM_SECTION.FIELD_KEYS;
const {
    LIKE_TO_SEE_PROJECTION_OYFP,
    WANT_US_TO_MODEL_DC,
    WANT_US_TO_UPLOAD_DCES,
    DEFICIT_CONTRIBUTION_VALUE,
    DEFICIT_CONTRIBUTION_DATE,
    DCFS_ATTACHMENT,
    SCHEME_OPEN_TO_FUTURE_ACCRUAL,
    CURRENT_ANNUAL_CA,
    COMBINED_COMPANY_MC_RA,
    HAVE_TARGET_BUYOUT_VALUE,
    TARGET_BUYOUT_VALUE,
    DATE_VALUE_PROVIDED,
    LIKE_TO_INCLUDE_FLT
} = FUNDING_FORM_SECTION.FIELD_KEYS;

const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

export const FundingFormSection = (props, dcCount = 0, updateDCCount, removeFromDCMap) => {
    const { funding } = props;

    return [
        {
            type: FULL_CONTAINER,
            label: 'Would you like to see a projection of your funding position?',
            bool: true,
            field: {
                __order: 'a',
                name: LIKE_TO_SEE_PROJECTION_OYFP,
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
                    bool: funding && funding[LIKE_TO_SEE_PROJECTION_OYFP] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: 'Do you want us to model any deficit contributions?',
                            bool: funding && funding[LIKE_TO_SEE_PROJECTION_OYFP] === 'yes',
                            field: {
                                __order: 'b',
                                name: WANT_US_TO_MODEL_DC,
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
                                    bool: funding && funding[WANT_US_TO_MODEL_DC] === 'yes',
                                    childComponents: [
                                        {
                                            type: FULL_CONTAINER,
                                            label:
                                                'Do you want to upload a file of deficit contributions or enter them on screen?',
                                            iIcon:
                                                "Please select to enter information 'On Screen' or 'Upload File'. Then proceed accordingly.",
                                            bool: funding && funding[WANT_US_TO_MODEL_DC] === 'yes',
                                            field: [
                                                {
                                                    __order: 'c',
                                                    name: WANT_US_TO_UPLOAD_DCES,
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
                                                    name: `download_${DCFS_ATTACHMENT}`,
                                                    className: 'form-control',
                                                    component: FILE_DOWNLOADER,
                                                    editable:
                                                        funding && funding[WANT_US_TO_UPLOAD_DCES] === 'uploadFile',
                                                    url: deficitContribution,
                                                    api: connectApi,
                                                    bucketNameProp: privateBucket,
                                                    fileName: 'deficit-contributions.xlsx'
                                                }
                                            ],
                                            when: [
                                                {
                                                    bool: funding && funding[WANT_US_TO_UPLOAD_DCES] === 'uploadFile',
                                                    childComponents: [
                                                        {
                                                            __order: 'd',
                                                            type: FULL_CONTAINER,
                                                            label: 'Upload deficit contribution file',
                                                            bool:
                                                                funding &&
                                                                funding[WANT_US_TO_UPLOAD_DCES] === 'uploadFile',
                                                            iIcon:
                                                                'Download the template file above, complete the required data and save as a csv file. Then upload the csv file.',
                                                            field: {
                                                                name: DCFS_ATTACHMENT,
                                                                className: 'form-control',
                                                                component: FILE_UPLOADER,
                                                                options: {
                                                                    accept: ['.xlsx'],
                                                                    manual: true,
                                                                    block:
                                                                        props.screen === 'reqip' &&
                                                                        !props[PROPOSAL_NAME],
                                                                    url: rip.deficitContribution,
                                                                    bucketName: privateBucket,
                                                                    api: connectApi,
                                                                    params: [props.entityId, props[PROPOSAL_NAME]]
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
                                                    bool: funding && funding[WANT_US_TO_UPLOAD_DCES] === 'onScreen',
                                                    childComponents: [
                                                        {
                                                            type: FULL_VIEW_CONTAINER,
                                                            props: { className: 'input-row' },
                                                            bool:
                                                                funding &&
                                                                funding[WANT_US_TO_UPLOAD_DCES] === 'onScreen',
                                                            field: {
                                                                name: 'deficit',
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
                            iIcon: THE_SCHEME_OPEN_TO_FUTURE_ACCRUAL_OF_NEW_BENEFITS,
                            label: 'Is the scheme open to future accrual of new benefits?',
                            bool: funding && funding[LIKE_TO_SEE_PROJECTION_OYFP] === 'yes',
                            field: {
                                __order: 'e',
                                name: SCHEME_OPEN_TO_FUTURE_ACCRUAL,
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
                                    bool: funding && funding[SCHEME_OPEN_TO_FUTURE_ACCRUAL] === 'yes',
                                    childComponents: [
                                        {
                                            type: FULL_CONTAINER,
                                            iIcon: THE_CURRENT_ANNUAL_COST_OF_NEW_BENEFIT_ACCRUAL,
                                            label: 'What is the current annual cost of new benefit accrual?',
                                            bool: funding && funding[SCHEME_OPEN_TO_FUTURE_ACCRUAL] === 'yes',
                                            field: {
                                                __order: 'f',
                                                name: CURRENT_ANNUAL_CA,
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
                                                        options: { '>=': 1, message: 'Invalid entry.' }
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            type: FULL_CONTAINER,
                                            bool: funding && funding[SCHEME_OPEN_TO_FUTURE_ACCRUAL] === 'yes',
                                            label:
                                                'What are the combined sponsor and member contributions in respect of future accrual of new benefits?',
                                            field: {
                                                __order: 'g',
                                                name: COMBINED_COMPANY_MC_RA,
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
                                                        options: { '>=': 1, message: 'Invalid entry.' }
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
                            bool: funding && funding[LIKE_TO_SEE_PROJECTION_OYFP] === 'yes',
                            field: {
                                __order: 'h',
                                name: HAVE_TARGET_BUYOUT_VALUE,
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
                                    bool: funding && funding[HAVE_TARGET_BUYOUT_VALUE] === 'yes',
                                    childComponents: [
                                        {
                                            type: FULL_CONTAINER,
                                            bool: funding && funding[HAVE_TARGET_BUYOUT_VALUE] === 'yes',
                                            label: 'Target buy-out price',
                                            field: {
                                                __order: 'i',
                                                name: TARGET_BUYOUT_VALUE,
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
                                                            message: 'Invalid entry. Value must be greater than £1.'
                                                        }
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            type: FULL_CONTAINER,
                                            label: 'At what date has the buy-out price been provided?',
                                            bool: funding && funding[HAVE_TARGET_BUYOUT_VALUE] === 'yes',
                                            field: {
                                                __order: 'j',
                                                name: DATE_VALUE_PROVIDED,
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
                            bool: funding && funding[LIKE_TO_SEE_PROJECTION_OYFP] === 'yes',
                            field: {
                                __order: 'k',
                                name: LIKE_TO_INCLUDE_FLT,
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
    ];
};
