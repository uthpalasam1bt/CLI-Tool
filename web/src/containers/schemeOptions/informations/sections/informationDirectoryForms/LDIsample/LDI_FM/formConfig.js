import React from 'react';
import { Divider } from 'antd';
import constants from '../../../../../../../UILibrary/constants';
import {
    LDI_S_NAME_OF_EIM,
    LDI_S_MANAGER_ACCOUNT_NUMBER,
    LDI_S_PRIMARY_CONTACT,
    LDI_S_PRIMARY_CONTACT_EMAIL,
    LDI_S_PRIMARY_CONTACT_PHONE_NUMBER,
    NAME_OF_EIM_LABEL,
    MANAGER_ACCOUNT_NUMBER_LABEL,
    PRIMARY_CONTACT_LABEL,
    PRIMARY_CONTACT_EMAIL_LABEL,
    PRIMARY_CONTACT_PHONE_NUMBER_LABEL,
    LDI_SAMPLE_DETAILS_TITLE,
    LDI_FM_SAMPLE_DETAILS_TITLE
} from './constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { INPUT_FIELD, NUMBER_FIELD } = FORM_FIELDS;
const { FULL_CONTAINER, ROW } = FORM_TEMPLATES;

export const formFields = (dirtyFormValues = {}) => {
    return [
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
                                            {LDI_SAMPLE_DETAILS_TITLE}
                                        </label>
                                    </div>
                                </div>
                            )
                        },
                        {
                            type: FULL_CONTAINER,
                            label: NAME_OF_EIM_LABEL,
                            field: {
                                name: LDI_S_NAME_OF_EIM,
                                className: 'form-control',
                                component: INPUT_FIELD
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: MANAGER_ACCOUNT_NUMBER_LABEL,
                            field: {
                                name: LDI_S_MANAGER_ACCOUNT_NUMBER,
                                className: 'form-control',
                                component: NUMBER_FIELD
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: PRIMARY_CONTACT_LABEL,
                            field: {
                                name: LDI_S_PRIMARY_CONTACT,
                                className: 'form-control',
                                component: INPUT_FIELD
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: PRIMARY_CONTACT_EMAIL_LABEL,
                            field: {
                                name: LDI_S_PRIMARY_CONTACT_EMAIL,
                                className: 'form-control',
                                component: INPUT_FIELD,
                                isEmail: true
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: PRIMARY_CONTACT_PHONE_NUMBER_LABEL,
                            field: {
                                name: LDI_S_PRIMARY_CONTACT_PHONE_NUMBER,
                                className: 'form-control',
                                component: NUMBER_FIELD
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
                                            {LDI_FM_SAMPLE_DETAILS_TITLE}
                                        </label>
                                    </div>
                                </div>
                            )
                        },
                        {
                            type: FULL_CONTAINER,
                            label: NAME_OF_EIM_LABEL,
                            field: {
                                name: LDI_S_NAME_OF_EIM,
                                className: 'form-control',
                                component: INPUT_FIELD
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: MANAGER_ACCOUNT_NUMBER_LABEL,
                            field: {
                                name: LDI_S_MANAGER_ACCOUNT_NUMBER,
                                className: 'form-control',
                                component: NUMBER_FIELD
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: PRIMARY_CONTACT_LABEL,
                            field: {
                                name: LDI_S_PRIMARY_CONTACT,
                                className: 'form-control',
                                component: INPUT_FIELD
                            }
                        }
                    ]
                }
            ]
        }
    ];
};
