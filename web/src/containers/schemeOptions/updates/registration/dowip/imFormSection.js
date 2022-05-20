import { IM_FEE_FORM_SECTION } from './constants';
import constants from '../../../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { BUTTON_GROUP, CURRENCY_FIELD, NUMBER_FIELD } = FORM_FIELDS;
const { FULL_CONTAINER } = FORM_TEMPLATES;

const { OVERRIDE_STANDARD_FEES, INVESTMENT_MANAGEMENT, INVESTMENT_MANAGEMENT_PA } = IM_FEE_FORM_SECTION.FIELD_KEYS;

const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

export const ImFormSection = props => {
    const { imFee } = props;

    return [
        {
            type: FULL_CONTAINER,
            label: 'Override standard fees?',
            bool: true,
            field: {
                __order: 'a',
                name: OVERRIDE_STANDARD_FEES,
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
                    bool: imFee && imFee[OVERRIDE_STANDARD_FEES] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool: imFee && imFee[OVERRIDE_STANDARD_FEES] === 'yes',
                            label: '$invmgf$ for scheme (£ element)',
                            field: {
                                __order: 'b',
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
                                title: props[INVESTMENT_MANAGEMENT] || '',
                                validationModules: [
                                    {
                                        moduleName: 'RequiredValidate',
                                        options: { message: 'Required' }
                                    },
                                    {
                                        moduleName: 'NumericalValidate',
                                        options: {
                                            int: true,
                                            '>=': 1,
                                            message: 'Invalid entry'
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            bool: imFee && imFee[OVERRIDE_STANDARD_FEES] === 'yes',
                            label: '$invmgf$ for scheme (% element)',
                            field: {
                                __order: 'c',
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
