import constants from '../../../../../../../UILibrary/constants';
import { ASSETS_FORM_SECTION, ASSETS_FORM_LABELS_SECTION } from './constants';

const {
    KNOW_TARGET_RETURN,
    TARGET_RETURN,
    HOLD_LESS_LIQUID_ASSETS,
    FULLY_ESG_PORTFOLIO,
    FM_FEE,
    FM_FEE_PERCENTAGE
} = ASSETS_FORM_SECTION.FIELD_KEYS;
const {
    KNOW_TARGET_RETURN_LABEL,
    TARGET_RETURN_LABEL,
    HOLD_LESS_LIQUID_ASSETS_LABEL,
    FULLY_ESG_PORTFOLIO_LABEL,
    TARGET_RETURN_ELEMENT_M_LABEL,
    TARGET_RETURN_ELEMENT_P_LABEL
} = ASSETS_FORM_LABELS_SECTION.FIELD_LABELS;

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { BUTTON_GROUP, NUMBER_FIELD } = FORM_FIELDS;
const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];
const { FULL_CONTAINER } = FORM_TEMPLATES;

export const formFields = (dirtyFormValues = {}) => {
    console.log("return values Asset------------------------->", dirtyFormValues);
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: KNOW_TARGET_RETURN_LABEL,
            field: {
                __order: 'a',
                name: KNOW_TARGET_RETURN,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption
            },
            when: [
                {
                    bool: dirtyFormValues && dirtyFormValues.formData && dirtyFormValues.formData[KNOW_TARGET_RETURN] === 'yes',
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            iIcon:
                                "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                            label: TARGET_RETURN_LABEL,
                            bool: dirtyFormValues && dirtyFormValues.formData && dirtyFormValues.formData[KNOW_TARGET_RETURN] === 'yes',
                            field: {
                                __order: 'b',
                                name: TARGET_RETURN,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: '%',
                                options: {
                                    decimalScale: 3,
                                    placeholder: '-1.000 - 5.000',
                                    allowNegative: true,
                                    min: -1,
                                    max: 5.0
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: HOLD_LESS_LIQUID_ASSETS_LABEL,
            className: '',
            field: {
                name: HOLD_LESS_LIQUID_ASSETS,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: yesNoOption
            }
        },
        {
            type: FULL_CONTAINER,
            label: FULLY_ESG_PORTFOLIO_LABEL,
            bool: true,
            className: '',
            field: {
                name: FULLY_ESG_PORTFOLIO,
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
                            label: TARGET_RETURN_ELEMENT_M_LABEL,
                            bool: true,
                            field: {
                                __order: 'c',
                                name: FM_FEE,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: '£',
                                options: {
                                    placeholder: '0',
                                    allowNegative: false
                                }
                            }
                        },
                        {
                            type: FULL_CONTAINER,
                            label: TARGET_RETURN_ELEMENT_P_LABEL,
                            bool: true,
                            field: {
                                __order: 'd',
                                name: FM_FEE_PERCENTAGE,
                                className: 'form-control',
                                component: NUMBER_FIELD,
                                suffix: '%',
                                options: {}
                            }
                        }
                    ]
                }
            ]
        }
    ];
};
