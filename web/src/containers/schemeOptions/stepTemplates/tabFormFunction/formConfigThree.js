/* 
     This is the functional configuration for creating simple forms
     In this approach developers can pass javaScript Objects as configuration parameters.
     Inside this configuration we can specify the form labels and respective form fields to display in the form

      Here we can create functional configuation for each tab.
      In this file contains functional configuration for Tab03
 */
import React from 'react';

import constants from '../../../../UILibrary/constants';
import BaseTemplate from '../../../../UILibrary/components/forms/formBase/FormBase';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { INPUT_FIELD, NUMBER_FIELD, PHONE_NUMBER_FIELD } = FORM_FIELDS;
const { ADD_MORE_CONTAINER, FULL_CONTAINER } = FORM_TEMPLATES;

/* This form object contains the repeating component */
const incumbentManagerForm = namePrefix => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Name of external invesment manager',
            field: {
                name: `${namePrefix}.invesmentManagerName`,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Manager account number',
            field: {
                name: `${namePrefix}.invesmentManagerAccountNumber`,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Primary contact',
            field: {
                name: `${namePrefix}.invesmentManagerPimaryContact`,
                className: 'form-control',
                component: PHONE_NUMBER_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },

        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Contact email address',
            field: {
                name: `${namePrefix}.invesmentManagerEmail`,
                className: 'form-control',
                component: INPUT_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },

        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Contact phone number',
            field: {
                name: `${namePrefix}.invesmentManagerContactNumber`,
                className: 'form-control',
                component: PHONE_NUMBER_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        }
    ];
};
export const formFieldsThree = props => {
    return [
        {
            type: ADD_MORE_CONTAINER, // form template type
            bool: true, // use to make the component visible or invisible
            title: 'Add Details', // Title of the component
            titleClass: 'pb-4',
            name: 'incumbentManagerForm', // Name of the component
            border: true, // Use to have a border around the repeating component
            maxLimit: 100, // Use to specify maximum ccomponent that can add using this component
            repeatTimes: 1, // Use to tell how many repeating components display when page load
            divider: true, // Use to have a divider between repeating components (You can use divider or border to separate identify repeating components)
            showRemoveButton: true, // Use to make remove button visible or invisible
            addMoreButtonVisible: true, // Use to make add more button visible or invisible
            completed: false,
            addMoreButtonText: '+ Add more', // Add more button text,
            downloadFieldConfig: incumbentManagerForm('incumbentManagerForm'),
            repeatingComponent: namePrefix => <BaseTemplate data={incumbentManagerForm(namePrefix)} />
        }
    ];
};
