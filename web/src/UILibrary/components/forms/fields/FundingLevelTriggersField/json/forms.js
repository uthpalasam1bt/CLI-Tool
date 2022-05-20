import { required, numericality, exclusion } from 'redux-form-validators';
import uiLibConstants from '../../../../../constants';
import {
    JOURNEY_PLAN_FUNDING_LEVEL_KEY,
    JOURNEY_PLAN_DATE_KEY,
    UPPER_TRIGGER_1_FUNDING_LEVEL_KEY,
    UPPER_TRIGGER_2_FUNDING_LEVEL_KEY,
    LOWER_TRIGGER_FUNDING_LEVEL_KEY,
    DEFINE_JOURNEY_PLAN_FUNDING_LEVEL_KEY,
    DEFINE_UPPER_TRIGGER_1_FUNDING_LEVEL_KEY,
    DEFINE_UPPER_TRIGGER_2_FUNDING_LEVEL_KEY,
    DEFINE_LOWER_TRIGGER_FUNDING_LEVEL_KEY
} from '../constants';

const { FORM_TEMPLATES, FORM_FIELDS } = uiLibConstants;
const { FULL_CONTAINER } = FORM_TEMPLATES;
const { DATE_PICKER, NUMBER_FIELD, BUTTON_GROUP } = FORM_FIELDS;

export const formFields = defineTriggersData => [
    {
        type: FULL_CONTAINER,
        label: 'Journey plan date',
        field: {
            //__order: 'f',
            name: JOURNEY_PLAN_DATE_KEY,
            component: DATE_PICKER,
            className: 'form-control',
            // options: { disabledDate: current => current && current < moment().startOf('day') },
            validate: [required({ message: 'Required' })]
        }
    },
    {
        type: FULL_CONTAINER,
        label: 'Journey plan',
        field: {
            //__order: 'f',
            name: JOURNEY_PLAN_FUNDING_LEVEL_KEY,
            className: 'form-control',
            component: NUMBER_FIELD,
            suffix: '%',
            disabled: defineTriggersData && defineTriggersData[DEFINE_JOURNEY_PLAN_FUNDING_LEVEL_KEY] === 'no',
            options: {
                decimalScale: 2,
                placeholder: '0 - 150',
                allowNegative: false,
                min: 0,
                max: 150
            },
            validate: [
                // required({ message: 'Required' }),
                numericality({
                    '>=': 0,
                    '<=': 150,
                    allowBlank: true
                }),
                exclusion({ in: ['-0'], message: 'Wrong format' })
            ]
        }
        //rawComponents: <renderField addonAfter="%" type="number" validate={[minValue(1)]} />
    },
    {
        type: FULL_CONTAINER,
        label: 'Upside trigger 1',
        field: {
            //__order: 'f',
            name: UPPER_TRIGGER_1_FUNDING_LEVEL_KEY,
            className: 'form-control',
            component: NUMBER_FIELD,
            suffix: '%',
            disabled: defineTriggersData && defineTriggersData[DEFINE_UPPER_TRIGGER_1_FUNDING_LEVEL_KEY] === 'no',
            options: {
                decimalScale: 2,
                placeholder: '0 - 150',
                allowNegative: false,
                min: 0,
                max: 150
            },
            validate: [
                // required({ message: 'Required' }),
                numericality({
                    '>=': 0,
                    '<=': 150,
                    allowBlank: true
                }),
                exclusion({ in: ['-0'], message: 'Wrong format' })
            ]
        }
    },
    {
        type: FULL_CONTAINER,
        label: 'Upside trigger 2',
        field: {
            //__order: 'f',
            name: UPPER_TRIGGER_2_FUNDING_LEVEL_KEY,
            className: 'form-control',
            component: NUMBER_FIELD,
            suffix: '%',
            disabled: defineTriggersData && defineTriggersData[DEFINE_UPPER_TRIGGER_2_FUNDING_LEVEL_KEY] === 'no',
            options: {
                decimalScale: 2,
                placeholder: '0 - 150',
                allowNegative: false,
                min: 0,
                max: 150
            },
            validate: [
                // required({ message: 'Required' }),
                numericality({
                    '>=': 0,
                    '<=': 150,
                    allowBlank: true
                }),
                exclusion({ in: ['-0'], message: 'Wrong format' })
            ]
        }
    },
    {
        type: FULL_CONTAINER,
        label: 'Downside trigger',
        field: {
            //__order: 'f',
            name: LOWER_TRIGGER_FUNDING_LEVEL_KEY,
            className: 'form-control',
            component: NUMBER_FIELD,
            suffix: '%',
            disabled: defineTriggersData && defineTriggersData[DEFINE_LOWER_TRIGGER_FUNDING_LEVEL_KEY] === 'no',
            options: {
                decimalScale: 2,
                placeholder: '0 - 150',
                allowNegative: false,
                min: 0,
                max: 150
            },
            validate: [
                // required({ message: 'Required' }),
                numericality({
                    '>=': 0,
                    '<=': 150,
                    allowBlank: true
                }),
                exclusion({ in: ['-0'], message: 'Wrong format' })
            ]
        }
    }
];

export const defineTriggersFormFields = () => [
    {
        type: FULL_CONTAINER,
        label: 'Journey plan',
        field: {
            name: DEFINE_JOURNEY_PLAN_FUNDING_LEVEL_KEY,
            className: 'form-control',
            component: BUTTON_GROUP,
            options: [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }],
            validate: [required({ message: 'Required' })]
        }
    },
    {
        type: FULL_CONTAINER,
        label: 'Upside trigger 1',
        field: {
            //__order: 'f',
            name: DEFINE_UPPER_TRIGGER_1_FUNDING_LEVEL_KEY,
            className: 'form-control',
            component: BUTTON_GROUP,
            options: [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }],
            validate: [required({ message: 'Required' })]
        }
    },
    {
        type: FULL_CONTAINER,
        label: 'Upside trigger 2',
        field: {
            name: DEFINE_UPPER_TRIGGER_2_FUNDING_LEVEL_KEY,
            className: 'form-control',
            component: BUTTON_GROUP,
            options: [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }],
            validate: [required({ message: 'Required' })]
        }
    },
    {
        type: FULL_CONTAINER,
        label: 'Downside trigger',
        field: {
            name: DEFINE_LOWER_TRIGGER_FUNDING_LEVEL_KEY,
            className: 'form-control',
            component: BUTTON_GROUP,
            options: [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }],
            validate: [required({ message: 'Required' })]
        }
    }
];
