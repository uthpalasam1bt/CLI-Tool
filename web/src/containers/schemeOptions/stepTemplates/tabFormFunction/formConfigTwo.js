/* 
     This is the functional configuration for creating simple forms
     In this approach developers can pass javaScript Objects as configuration parameters.
     Inside this configuration we can specify the form labels and respective form fields to display in the form

     Here we can create functional configuation for each tab.
     In this file contains functional configuration for Tab02

 */
import React from 'react';
import { Divider } from 'antd';

import constants from '../../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { PHONE_NUMBER_FIELD, SELECT_OPTION, TEXTAREA } = FORM_FIELDS;
const { FULL_CONTAINER, FULL_VIEW_CONTAINER, ROW, LABEL } = FORM_TEMPLATES;

export const formFieldTwo = props => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Phone Number Field',
            field: {
                __order: 'a',
                name: 'activationCode',
                className: 'form-control',
                component: PHONE_NUMBER_FIELD,
                validationModules: [
                    { moduleName: 'RequiredValidate' },
                    {
                        moduleName: 'LengthValidate',
                        options: {
                            min: 9
                        }
                    }
                ]
            }
        },
        {
            type: ROW,
            rawComponents: <Divider type="horizontal" />
        },
        {
            type: FULL_CONTAINER,
            label: 'Choose Option',
            bool: true,
            field: {
                __order: 'j',
                name: 'selectOption',
                className: 'form-control',
                component: SELECT_OPTION,
                options: {
                    defaultValue: 'Select',
                    dataList: [
                        //Data list that display ,options in the select option
                        { key: '1', value: 'Technical Provisions' },
                        { key: '2', value: 'Gilts Basis' },
                        { key: '3', value: 'Accounting Basis' },
                        { key: '4', value: 'Solvency Basis' }
                    ]
                },

                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },
        {
            type: ROW,
            rawComponents: <Divider type="horizontal" />
        },
        {
            type: LABEL,
            value: 'Text Area'
        },
        {
            type: FULL_VIEW_CONTAINER,
            bool: true,
            field: {
                name: 'textArea',
                __order: 'd',
                className: 'form-control',
                component: TEXTAREA,
                maxlength: 1500, //Use to specify the length of the content that can type in the text area
                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        }
    ];
};
