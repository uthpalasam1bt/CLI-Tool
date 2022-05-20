/* 
     This is the functional configuration for creating simple forms
     In this approach developers can pass javaScript Objects as configuration parameters.
     Inside this configuration we can specify the form labels and respective form fields to display in the form

     Here we can create functional configuation for each tab.
     In this file contains functional configuration for Tab01

 */
import React from 'react';
import { Divider } from 'antd';

import constants from '../../../../UILibrary/constants';
import { TAB_KEYS } from './constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { ADDRESS_FIELD, ASSETS_VALUE_SEPARATOR, DEFICIT_CONTRIBUTION_SECTION } = FORM_FIELDS;
const { FULL_VIEW_CONTAINER, ROW } = FORM_TEMPLATES;

export const formFields = props => {
    const formValues = props.dataset.formData && props.dataset.formData[TAB_KEYS.TAB_ONE_FORM];
    
    return [
        {
            type: FULL_VIEW_CONTAINER,
            bool: true,
            field: {
                __order: 'd',
                name: 'addressField',
                className: 'form-control',
                component: ADDRESS_FIELD,
                options: {
                    title: 'Address Field'
                }
                // validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },
        {
            type: ROW,
            rawComponents: <Divider type="horizontal" /> //Use to have ROW component as a divider
        },
        {
            type: FULL_VIEW_CONTAINER,
            bool: true,
            field: {
                name: 'assets',
                className: 'form-control',
                component: ASSETS_VALUE_SEPARATOR,
                options: {
                    tabKey: TAB_KEYS.TAB_ONE_FORM, //Relevent Tab key
                    formName: props.formName, // Redux form name
                    asyncFormData: formValues, // Form data that user has enter in the fields
                    currentAssetAT: 'simple', //  There are 2 types of ASSETS_VALUE_SEPARATOR.They are simple and detail. Here we have use simple type. To specify the type we can use this option
                    disabled: false //use to disable the field
                }
                // validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },
        {
            type: ROW,
            rawComponents: <Divider type="horizontal" />
        },
        {
            type: FULL_VIEW_CONTAINER,

            bool: true,
            field: {
                __order: 'a',
                name: 'deficit',
                className: 'form-control',
                component: DEFICIT_CONTRIBUTION_SECTION,
                options: {
                    formName: props.formName, // Redux form name
                    formData: props[TAB_KEYS.TAB_ONE_FORM] // Relevent form data
                },
                disabled: false // use to disable or enable the component
                // validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        }
    ];
};
