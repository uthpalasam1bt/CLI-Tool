import React from 'react';
import constants from '../../../../../UILibrary/constants';
import BaseTemplate from '../../../../../UILibrary/components/forms/formBase/FormBase';
import { FIELD_NAME } from './constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { INPUT_FIELD, BUTTON_GROUP } = FORM_FIELDS;
const { FULL_CONTAINER, ADD_MORE_CONTAINER } = FORM_TEMPLATES;
const YESNOBUTTONOPTION = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

const repeatingFields = (namePrefix, index) => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: index === 0 ? 'Policy subsection' : '',
            field: {
                name: `${namePrefix}.policySubsections`,
                className: 'form-control',
                component: INPUT_FIELD,
                options: {
                    decimalScale: 0,
                    allowNegative: false,
                    allowLeadingZeros: true,
                    maxLength: 20
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        }
    ];
};

export const formFields = props => {
    return [
        {
            type: FULL_CONTAINER, //  form template type
            bool: true, // use to make the component visible or invisible
            label: FIELD_NAME.POLICY_NO, // field label text
            field: {
                //  Use to pass options to redux form field
                name: FIELD_NAME.POLICY_NO_FIELD_NAME, //name of the field
                className: 'form-control',
                component: INPUT_FIELD
            }
        },
        {
            type: FULL_CONTAINER,
            label: FIELD_NAME.HAS_POLICY_SUBSECTION,
            bool: true,
            field: {
                // __order: 'f',
                name: FIELD_NAME.HAS_POLICY_SUBSECTION_FIELD_NAME,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,
                defaultValue: 'no',
                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },
        {
            when: [
                {
                    bool: props['hasPolicySubsection'] === 'yes', // When this condition become true functional configurations in side of the childComponent array will be display
                    childComponents: [
                        {
                            type: ADD_MORE_CONTAINER,
                            bool: props['hasPolicySubsection'] === 'yes',
                            title: '',
                            // titleClass: 'pb-4',
                            name: FIELD_NAME.POLICY_SUBSECTION,
                            border: false,
                            maxLimit: 20,
                            repeatTimes: ((props || {}).policySubsections || []).length || 1,
                            divider: false,
                            showRemoveButton: true, //!props.step.completed,
                            addMoreButtonVisible: true, //!props.step.completed,
                            addMoreButtonText: '+ Add more',
                            repeatingComponent: (namePrefix, index) => (
                                <BaseTemplate data={repeatingFields(namePrefix, index)} disabled={false} />
                            )
                        }
                    ]
                }
            ]
        }
        // {
        //     type: FULL_CONTAINER,
        //     label: 'Do you wish to upload historical asset information?',
        //     bool: true,
        //     field: {
        //         // __order: 'f',
        //         name: 'wishToUplordHAI',
        //         className: 'form-control',
        //         component: BUTTON_GROUP,
        //         options: YESNOBUTTONOPTION,
        //         validationModules: [{ moduleName: 'RequiredValidate' }]
        //     }
        // },
        // {
        //     type: FULL_CONTAINER,
        //     label: 'Does the scheme hold asserts with managers other than LGIM?',
        //     bool: true,
        //     field: {
        //         // __order: 'f',
        //         name: 'holdAssertsWithManagers',
        //         className: 'form-control',
        //         component: BUTTON_GROUP,
        //         options: YESNOBUTTONOPTION,
        //         validationModules: [{ moduleName: 'RequiredValidate' }]
        //     },
        //     when: [
        //         {
        //             bool: props['holdAssertsWithManagers'] === 'no', // When this comdition become true functional configurations in side of the childComponent array will be display
        //             childComponents: [
        //                 {
        //                     type: FULL_CONTAINER,
        //                     label: 'Do you wish to set up funding level tracking?',
        //                     field: {
        //                         // __order: 'g',
        //                         name: 'wishToSetFlTrack',
        //                         className: 'form-control',
        //                         component: BUTTON_GROUP,
        //                         options: YESNOBUTTONOPTION,
        //                         validationModules: [{ moduleName: 'RequiredValidate' }]
        //                     }
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     type: FULL_CONTAINER,
        //     label: 'Do you have scheme liability information',
        //     bool: true,
        //     field: {
        //         // __order: 'f',
        //         name: 'haveLiabilityInformation',
        //         className: 'form-control',
        //         component: BUTTON_GROUP,
        //         options: YESNOBUTTONOPTION,
        //         validationModules: [{ moduleName: 'RequiredValidate' }]
        //     }
        // }
    ];
};
