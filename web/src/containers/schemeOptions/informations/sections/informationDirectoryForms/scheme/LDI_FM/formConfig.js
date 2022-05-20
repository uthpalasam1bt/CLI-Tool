import React from 'react';
import moment from 'moment';
import { Divider } from 'antd';
import constants from '../../../../../../../UILibrary/constants';
import { SCHEMES_FORM_SECTION, SCHEMES_FORM_LABELS_SECTION, SCHEMES_FORM_TITLES_SECTION } from './constants';

const {
    SCHEME_NAME,
    TRUSTEE_TYPE,
    DATE_TRUST_DEED,
    SCHEME_MEMBER,
    ADDRESS_FIELD_NAME,
    NUMBER_OF_TRUSTEES,
    NUMBER_OF_TRUSTEES_APPROVE,
    NUMBER_OF_TRUSTEES_SIGN,
    PRIMARY_TRUSTEE_NAME,
    PRIMARY_TRUSTEE_EMAIL,
    PRIMARY_TRUSTEE_CONTACT,
    LDI_TRUSTEE_TYPE,
    LDI_SCHEME_NAME
} = SCHEMES_FORM_SECTION.FIELD_KEYS;
const {
    SCHEME_NAME_LABEL,
    TRUSTEE_TYPE_LABEL,
    DATE_TRUST_DEED_LABEL,
    SCHEME_MEMBER_LABEL,
    NUMBER_OF_TRUSTEES_LABEL,
    NUMBER_OF_TRUSTEES_APPROVE_LABEL,
    NUMBER_OF_TRUSTEES_SIGN_LABEL,
    PRIMARY_TRUSTEE_LABEL,
    PRIMARY_TRUSTEE_EMAIL_LABEL,
    PRIMARY_TRUSTEE_CONTACT_LABEL,
    LDI_TRUSTEE_TYPE_LABEL,
    LDI_SCHEME_NAME_LABEL
} = SCHEMES_FORM_LABELS_SECTION.FIELD_LABELS;
const {
    ADDRESS_FIELD_TITLE,
    PRIMARY_TRUSTEE_DETAILS_TITLE,
    LDI_SCHEME_DETAILS_TITLE,
    LDI_PRIMARY_TRUSTEE_DETAILS_TITLE
} = SCHEMES_FORM_TITLES_SECTION.FIELD_TITLES;
const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { DATE_PICKER, INPUT_FIELD, ADDRESS_FIELD, NUMBER_FIELD } = FORM_FIELDS;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER, ROW } = FORM_TEMPLATES;

export const formFields = (dirtyFormValues = {}) => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: SCHEME_NAME_LABEL,
            field: {
                __order: 'a',
                name: SCHEME_NAME,
                className: 'form-control',
                component: INPUT_FIELD,
                validate: []
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: TRUSTEE_TYPE_LABEL,
            field: {
                __order: 'b',
                name: TRUSTEE_TYPE,
                className: 'form-control',
                component: INPUT_FIELD,
                validate: []
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: DATE_TRUST_DEED_LABEL,
            field: {
                __order: 'c',
                name: DATE_TRUST_DEED,
                className: 'form-control',
                component: DATE_PICKER,
                options: {
                    disabledDate: current => current && current > moment().startOf('day')
                },
                validate: []
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: SCHEME_MEMBER_LABEL,
            field: {
                __order: 'd',
                name: SCHEME_MEMBER,
                className: 'form-control',
                component: NUMBER_FIELD,
                validate: []
            }
        },
        {
            type: FULL_VIEW_CONTAINER,
            bool: true,
            field: {
                name: ADDRESS_FIELD_NAME,
                __order: 'e',
                className: 'form-control',
                component: ADDRESS_FIELD,
                options: {
                    title: ADDRESS_FIELD_TITLE
                }
            }
        },
        {
            type: ROW,
            rawComponents: <Divider type="horizontal" />
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: NUMBER_OF_TRUSTEES_LABEL,
            field: {
                __order: 'g',
                name: NUMBER_OF_TRUSTEES,
                className: 'form-control',
                component: NUMBER_FIELD,
                validate: []
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: NUMBER_OF_TRUSTEES_APPROVE_LABEL,
            field: {
                __order: 'h',
                name: NUMBER_OF_TRUSTEES_APPROVE,
                className: 'form-control',
                component: NUMBER_FIELD,
                validate: []
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: NUMBER_OF_TRUSTEES_SIGN_LABEL,
            field: {
                __order: 'i',
                name: NUMBER_OF_TRUSTEES_SIGN,
                className: 'form-control',
                component: NUMBER_FIELD,
                validate: []
            }
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
                                            {PRIMARY_TRUSTEE_DETAILS_TITLE}
                                        </label>
                                    </div>
                                </div>
                            )
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label: PRIMARY_TRUSTEE_LABEL,

                            field: {
                                __order: 'j',
                                name: PRIMARY_TRUSTEE_NAME,
                                className: 'form-control',
                                component: INPUT_FIELD,
                                validate: [],
                                placeholder: ''
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label: PRIMARY_TRUSTEE_EMAIL_LABEL,
                            field: {
                                __order: 'k',
                                name: PRIMARY_TRUSTEE_EMAIL,
                                className: 'form-control',
                                component: INPUT_FIELD,
                                validate: []
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label: PRIMARY_TRUSTEE_CONTACT_LABEL,
                            field: {
                                __order: 'l',
                                name: PRIMARY_TRUSTEE_CONTACT,
                                className: 'form-control',
                                component: INPUT_FIELD,
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
                                            {LDI_SCHEME_DETAILS_TITLE}
                                        </label>
                                    </div>
                                </div>
                            )
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label: LDI_SCHEME_NAME_LABEL,
                            field: {
                                __order: 'a',
                                name: LDI_SCHEME_NAME,
                                className: 'form-control',
                                component: INPUT_FIELD,
                                validate: []
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label: LDI_TRUSTEE_TYPE_LABEL,
                            field: {
                                __order: 'b',
                                name: LDI_TRUSTEE_TYPE,
                                className: 'form-control',
                                component: INPUT_FIELD,
                                validate: []
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label: DATE_TRUST_DEED_LABEL,
                            field: {
                                __order: 'c',
                                name: DATE_TRUST_DEED,
                                className: 'form-control',
                                component: DATE_PICKER,
                                options: {
                                    disabledDate: current => current && current > moment().startOf('day')
                                },
                                validate: []
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label: SCHEME_MEMBER_LABEL,
                            field: {
                                __order: 'd',
                                name: SCHEME_MEMBER,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                validate: []
                            }
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
                                                            {LDI_PRIMARY_TRUSTEE_DETAILS_TITLE}
                                                        </label>
                                                    </div>
                                                </div>
                                            )
                                        },
                                        {
                                            type: FULL_CONTAINER,
                                            bool: true,
                                            label: PRIMARY_TRUSTEE_LABEL,
                                            field: {
                                                __order: 'j',
                                                name: PRIMARY_TRUSTEE_NAME,
                                                className: 'form-control',
                                                component: INPUT_FIELD,
                                                validate: [],
                                                placeholder: ''
                                            }
                                        },
                                        {
                                            type: FULL_CONTAINER,
                                            bool: true,
                                            label: PRIMARY_TRUSTEE_EMAIL_LABEL,
                                            field: {
                                                __order: 'k',
                                                name: PRIMARY_TRUSTEE_EMAIL,
                                                className: 'form-control',
                                                component: INPUT_FIELD,
                                                validate: []
                                            }
                                        },
                                        {
                                            type: FULL_CONTAINER,
                                            bool: true,
                                            label: PRIMARY_TRUSTEE_CONTACT_LABEL,
                                            field: {
                                                __order: 'l',
                                                name: PRIMARY_TRUSTEE_CONTACT,
                                                className: 'form-control',
                                                component: INPUT_FIELD,
                                                validate: []
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
