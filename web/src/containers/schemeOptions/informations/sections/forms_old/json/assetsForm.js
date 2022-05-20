import { numericality, required } from 'redux-form-validators';
import { ASSETS_FORM_SECTION } from '../../../../registration/Steps/reqip/constants';
import uiLibConstants from '../../../../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS } = uiLibConstants;
const { FULL_CONTAINER } = FORM_TEMPLATES;
const { BUTTON_GROUP, NUMBER_FIELD } = FORM_FIELDS;

const { FIELD_KEYS } = ASSETS_FORM_SECTION;
const { KNOW_TARGET_RETURN, TARGET_RETURN } = FIELD_KEYS;

const yesNoOption = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

const formFields = (props, total) => [
    {
        type: FULL_CONTAINER,
        bool: true,
        label: 'Do you know your target investment return above gilts?',
        field: {
            __order: 'd',
            name: KNOW_TARGET_RETURN,
            className: 'form-control',
            component: BUTTON_GROUP,
            options: yesNoOption
        },
        validations: [required({ message: 'Required' })],
        when: [
            {
                bool: props[KNOW_TARGET_RETURN] === 'yes',
                childComponents: [
                    {
                        type: FULL_CONTAINER,
                        iIcon:
                            "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
                        label: 'Target return above gilts (net of fees)',
                        bool: props[KNOW_TARGET_RETURN] === 'yes',
                        field: {
                            __order: 'e',
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
                        },
                        validations: [
                            required({ message: 'Required' }),
                            numericality({
                                int: false,
                                '>=': -1,
                                '<=': 5.0,
                                message: 'Invalid entry.'
                            })
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: FULL_CONTAINER,
        bool: true,
        label: 'Do you want to avoid holding less liquid assets, such as property?',
        className: '',
        field: {
            name: 'avoidLessLiquidAssets',
            className: 'form-control',
            component: BUTTON_GROUP,
            options: yesNoOption,
            validate: [required({ message: 'Required' })]
        }
    },
    {
        type: FULL_CONTAINER,
        label:
            'Do you want to fully integrate Environmental, Social and Governance (ESG) themes within your portfolio allocation?',
        bool: true,
        className: '',
        field: {
            name: 'fullyEsgPortfolio',
            className: 'form-control',
            component: BUTTON_GROUP,
            options: yesNoOption,
            validate: [required({ message: 'Required' })]
        }
    }
];

export default formFields;
