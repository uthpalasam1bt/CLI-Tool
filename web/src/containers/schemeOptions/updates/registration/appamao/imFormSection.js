import React from 'react';
import { IM_FEE_FORM_SECTION } from './constants';
import constants from '../../../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER } = FORM_TEMPLATES;
const {
    BUTTON_GROUP,
    DATE_PICKER,
    CURRENCY_FIELD,
    NUMBER_FIELD,
    ASSETS_VALUE_SEPARATOR,
    SELECT_OPTION,
    FILE_UPLOADER,
    FILE_DOWNLOADER
} = FORM_FIELDS;
const { OVERRIDE_STANDARD_FEES, INVESTMENT_MANAGEMENT, INVESTMENT_MANAGEMENT_PA } = IM_FEE_FORM_SECTION.FIELD_KEYS;

const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

export const ImFormSection = props => {
    return [
        {
            type: FULL_CONTAINER,
            label: 'Override standard fees?',
            bool: true,
            field: {
                __order: 'f',
                name: OVERRIDE_STANDARD_FEES,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption
            },

            when: [
                {
                    bool: props && props.imFee && props.imFee[OVERRIDE_STANDARD_FEES] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool: props && props.imFee && props.imFee[OVERRIDE_STANDARD_FEES] === 'yes',
                            label: '$invmgf$ for scheme (£ element)',
                            field: {
                                __order: 'g',
                                name: INVESTMENT_MANAGEMENT,
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
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate'
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: props && props.imFee && props.imFee[OVERRIDE_STANDARD_FEES] === 'yes',
                            label: '$invmgf$ for scheme (% element)',
                            field: {
                                __order: 'h',
                                name: INVESTMENT_MANAGEMENT_PA,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: '%',
                                options: {
                                    decimalScale: 4,
                                    allowNegative: false,
                                    placeholder: '0 - 100',
                                    min: 0,
                                    max: 100
                                },
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate'
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
