import React from 'react';
import constants from '../../../../../../../UILibrary/constants';
import { Divider } from 'antd';
import {
    FUNDING_FORM_SECTION,
    DEFICIT_CONTRIBUTION_SECTION,
    THE_SCHEME_OPEN_TO_FUTURE_ACCRUAL_OF_NEW_BENEFITS,
    THE_CURRENT_ANNUAL_COST_OF_NEW_BENEFIT_ACCRUAL,
    FUNDING_FORM_LABELS_SECTION,
    LDI_FM_FUNDING_DETAILS_TITLE
} from './constants';

const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];
const {
    LIKE_TO_SEE_PROJECTION_OYFP,
    WANT_US_TO_MODEL_DC,
    WANT_US_TO_UPLOAD_DCES,
    DCFS_ATTACHMENT,
    SCHEME_OPEN_TO_FUTURE_ACCRUAL,
    CURRENT_ANNUAL_CA,
    COMBINED_COMPANY_MC_RA,
    HAVE_TARGET_BUYOUT_VALUE,
    TARGET_BUYOUT_VALUE,
    DATE_VALUE_PROVIDED,
    LIKE_TO_INCLUDE_FLT,
    DEFICIT
} = FUNDING_FORM_SECTION.FIELD_KEYS;
const {
    LIKE_TO_SEE_PROJECTION_OYFP_LABEL,
    WANT_US_TO_MODEL_DC_LABEL,
    WANT_US_TO_UPLOAD_DCES_LABEL,
    SCHEME_OPEN_TO_FUTURE_ACCRUAL_LABEL,
    CURRENT_ANNUAL_CA_LABEL,
    COMBINED_COMPANY_MC_RA_LABEL,
    HAVE_TARGET_BUYOUT_VALUE_LABEL,
    TARGET_BUYOUT_VALUE_LABEL,
    DATE_VALUE_PROVIDED_LABEL,
    LIKE_TO_INCLUDE_FLT_LABEL
} = FUNDING_FORM_LABELS_SECTION.FIELD_LABELS;

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { DATE_PICKER, BUTTON_GROUP, SELECT_OPTION, FILE_DOWNLOADER, CURRENCY_FIELD } = FORM_FIELDS;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER, ROW } = FORM_TEMPLATES;

export const formFields = (dirtyFormValues = {}) => {
    return [
        {
            type: FULL_CONTAINER,
            label: LIKE_TO_SEE_PROJECTION_OYFP_LABEL,
            bool: true,
            field: {
                __order: 'a',
                name: LIKE_TO_SEE_PROJECTION_OYFP,
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
                            label: WANT_US_TO_MODEL_DC_LABEL,
                            bool: true,
                            field: {
                                __order: 'b',
                                name: WANT_US_TO_MODEL_DC,
                                className: 'form-control',
                                component: BUTTON_GROUP,
                                options: yesNoOption
                            },

                            when: [
                                {
                                    bool: true,
                                    childComponents: [
                                        {
                                            type: FULL_CONTAINER,
                                            label: WANT_US_TO_UPLOAD_DCES_LABEL,
                                            iIcon:
                                                "Please select to enter information 'On Screen' or 'Upload File'. Then proceed accordingly.",
                                            bool: true,
                                            field: [
                                                {
                                                    __order: 'c',
                                                    name: WANT_US_TO_UPLOAD_DCES,
                                                    className: 'form-control',
                                                    component: SELECT_OPTION,
                                                    options: {
                                                        defaultValue: 'Select',
                                                        dataList: [
                                                            { value: 'Upload File', key: 'uploadFile' },
                                                            { value: 'On Screen', key: 'onScreen' }
                                                        ]
                                                    },
                                                    validate: []
                                                },
                                                {
                                                    name: `download_${DCFS_ATTACHMENT}`,
                                                    component: FILE_DOWNLOADER,
                                                    url: '',
                                                    fileName: 'deficit-contributions.xlsx'
                                                }
                                            ],
                                            when: [
                                                {
                                                    bool: true,
                                                    childComponents: [
                                                        {
                                                            type: ROW,
                                                            props: { className: 'input-row' },
                                                            bool: true,
                                                            childComponents: [
                                                                {
                                                                    type: FULL_VIEW_CONTAINER,
                                                                    bool: true,
                                                                    field: {
                                                                        __order: 'a',
                                                                        name: DEFICIT,
                                                                        className: 'form-control',
                                                                        component: DEFICIT_CONTRIBUTION_SECTION,
                                                                        options: {
                                                                            // formName: props.formName, // Redux form name
                                                                            // formData: props[TABONE.KEY], // Relevent form data
                                                                            disabled: true // use to disable or enable the component
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
                                }
                            ]
                        },
                        {
                            type: FULL_CONTAINER,
                            iIcon: THE_SCHEME_OPEN_TO_FUTURE_ACCRUAL_OF_NEW_BENEFITS,
                            label: SCHEME_OPEN_TO_FUTURE_ACCRUAL_LABEL,
                            bool: true,
                            field: {
                                __order: 'e',
                                name: SCHEME_OPEN_TO_FUTURE_ACCRUAL,
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
                                            iIcon: THE_CURRENT_ANNUAL_COST_OF_NEW_BENEFIT_ACCRUAL,
                                            label: CURRENT_ANNUAL_CA_LABEL,
                                            bool: true,
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
                                                title: ''
                                            }
                                        },
                                        {
                                            type: FULL_CONTAINER,
                                            bool: true,
                                            label: COMBINED_COMPANY_MC_RA_LABEL,
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
                                                title: ''
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: FULL_CONTAINER,
                            label: HAVE_TARGET_BUYOUT_VALUE_LABEL,
                            bool: true,
                            field: {
                                __order: 'h',
                                name: HAVE_TARGET_BUYOUT_VALUE,
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
                                            bool: true,
                                            label: TARGET_BUYOUT_VALUE_LABEL,
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
                                                title: ''
                                            }
                                        },
                                        {
                                            type: FULL_CONTAINER,
                                            label: DATE_VALUE_PROVIDED_LABEL,
                                            bool: true,
                                            field: {
                                                __order: 'j',
                                                name: DATE_VALUE_PROVIDED,
                                                className: 'form-control',
                                                component: DATE_PICKER, //-Before-today
                                                options: {}
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: FULL_CONTAINER,
                            label: LIKE_TO_INCLUDE_FLT_LABEL,
                            bool: true,
                            field: {
                                __order: 'k',
                                name: LIKE_TO_INCLUDE_FLT,
                                className: 'form-control',
                                component: BUTTON_GROUP,
                                options: yesNoOption,
                                validate: []
                            }
                        }
                    ]
                }
            ]
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
                                            {LDI_FM_FUNDING_DETAILS_TITLE}
                                        </label>
                                    </div>
                                </div>
                            )
                        },
                        {
                            type: FULL_CONTAINER,
                            label: LIKE_TO_SEE_PROJECTION_OYFP_LABEL,
                            bool: true,
                            field: {
                                __order: 'a',
                                name: LIKE_TO_SEE_PROJECTION_OYFP,
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
                                            iIcon: THE_SCHEME_OPEN_TO_FUTURE_ACCRUAL_OF_NEW_BENEFITS,
                                            label: SCHEME_OPEN_TO_FUTURE_ACCRUAL_LABEL,
                                            bool: true,
                                            field: {
                                                __order: 'e',
                                                name: SCHEME_OPEN_TO_FUTURE_ACCRUAL,
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
                                                            iIcon: THE_CURRENT_ANNUAL_COST_OF_NEW_BENEFIT_ACCRUAL,
                                                            label: CURRENT_ANNUAL_CA_LABEL,
                                                            bool: true,
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
                                                                title: ''
                                                            }
                                                        },
                                                        {
                                                            type: FULL_CONTAINER,
                                                            bool: true,
                                                            label: COMBINED_COMPANY_MC_RA_LABEL,
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
                                                                title: ''
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
