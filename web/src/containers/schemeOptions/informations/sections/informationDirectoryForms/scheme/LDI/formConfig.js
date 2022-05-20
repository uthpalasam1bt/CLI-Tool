import React from 'react';
import moment from 'moment';
import constants from '../../../../../../../UILibrary/constants';
import { SCHEMES_FORM_SECTION, SCHEMES_FORM_LABELS_SECTION, SCHEMES_FORM_TITLES_SECTION } from './constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { DATE_PICKER, INPUT_FIELD, NUMBER_FIELD } = FORM_FIELDS;
const { FULL_CONTAINER, ROW } = FORM_TEMPLATES;

const {
    LDI_SCHEME_NAME,
    LDI_TRUSTEE_TYPE,
    DATE_TRUST_DEED,
    SCHEME_MEMBER,
    PRIMARY_TRUSTEE_NAME,
    PRIMARY_TRUSTEE_EMAIL,
    PRIMARY_TRUSTEE_CONTACT
} = SCHEMES_FORM_SECTION.FIELD_KEYS;
const {
    LDI_SCHEME_NAME_LABEL,
    LDI_TRUSTEE_TYPE_LABEL,
    DATE_TRUST_DEED_LABEL,
    SCHEME_MEMBER_LABEL,
    PRIMARY_TRUSTEE_LABEL,
    PRIMARY_TRUSTEE_EMAIL_LABEL,
    PRIMARY_TRUSTEE_CONTACT_LABEL
} = SCHEMES_FORM_LABELS_SECTION.FIELD_LABELS;
const { LDI_PRIMARY_TRUSTEE_DETAILS_TITLE } = SCHEMES_FORM_TITLES_SECTION.FIELD_TITLES;

export const formFields = (dirtyFormValues = {}) => {
    return [
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
    ];
};
