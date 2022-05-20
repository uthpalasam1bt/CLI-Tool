import moment from 'moment';
import constants from '../../../../../../../UILibrary/constants';

import {
    LIABILITIES_FORM_SECTION,
    LIABILITY_VALUE_AND_DETAILS_OF_THE_VALUATION_BASIS,
    LIABILITIES_FORM_LABELS_SECTION
} from './constants';
const {
    LIABILITY_DURATION,
    HAVE_PAST_SLC_TO_UPLOAD,
    KNOW_LIABILITY_VALUE_MDT,
    LIABILITY_VALUE,
    AVG_MARGIN_LDR_AND_GY,
    DATE_VALUE_PROVIDED
} = LIABILITIES_FORM_SECTION.FIELD_KEYS;
const {
    LIABILITY_DURATION_LDI_LABEL,
    HAVE_PAST_SLC_TO_UPLOAD_LABEL,
    KNOW_LIABILITY_VALUE_MDT_LDI_LABEL,
    LIABILITY_VALUE_LDI_LABEL,
    AVG_MARGIN_LDR_AND_GY_LABEL,
    DATE_VALUE_PROVIDED_LABEL
} = LIABILITIES_FORM_LABELS_SECTION.FIELD_LABELS;
const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { DATE_PICKER, BUTTON_GROUP, NUMBER_FIELD, CURRENCY_FIELD } = FORM_FIELDS;
const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];
const { FULL_CONTAINER } = FORM_TEMPLATES;

export const formFields = (dirtyFormValues = {}) => {
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
                    bool: true,
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: LIABILITY_DURATION_LDI_LABEL,
                            bool: true,
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
                                validate: []
                            }
                        }
                    ]
                }
            ]
        },
        {
            type: FULL_CONTAINER,
            iIcon: LIABILITY_VALUE_AND_DETAILS_OF_THE_VALUATION_BASIS,
            label: KNOW_LIABILITY_VALUE_MDT_LDI_LABEL,
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
                    bool: true,
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            bool: true,
                            label: LIABILITY_VALUE_LDI_LABEL,
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
                            bool: true,
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
                            bool: true,
                            field: {
                                __order: 'i',
                                name: DATE_VALUE_PROVIDED,
                                className: 'form-control',
                                component: DATE_PICKER,
                                options: {
                                    disabledDate: current => current && current > moment().startOf('day')
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ];
};
