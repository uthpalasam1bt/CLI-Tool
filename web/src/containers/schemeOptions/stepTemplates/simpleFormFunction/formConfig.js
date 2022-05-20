/* 
     This is the functional configuration for creating simple forms
     In this approach developers can pass javaScript Objects as configuration parameters.
     Inside this configuration we can specify the form labels and respective form fields to display in the form

 */
import React from 'react';
import { Divider } from 'antd';

import { TOGGLEBUTTONGROUP, ENTERVALUE } from './constants';
import constants from '../../../../UILibrary/constants';
import config from 'appConfig';
import connectApi from '../../../../middlewares/connectApi';

const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const { PDF } = UPLOAD_FILE_TYPES; // document types allowed to upload
const {
    INPUT_FIELD,
    DATE_PICKER,
    CURRENCY_FIELD,
    FILE_UPLOADER,
    NUMBER_FIELD,
    MULTIPLE_FILE_UPLOADER,
    BUTTON_GROUP
} = FORM_FIELDS;
const { FULL_CONTAINER, HALF_CONTAINER, ROW } = FORM_TEMPLATES;
const { bucket: privateBucket } = config;
const YESNOBUTTONOPTION = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];
const { riaa } = config.uploads;
/* Form Templates

      FULL_CONTAINER - Include one label and one field
      HALF_CONTAINER - Divides a row into two columns, each column contains a label and a field
      FULL_VIEW_CONTAINER -  It gives full width to display a raw component
*/

export const formFields = props => {
    return [
        {
            type: FULL_CONTAINER, //  form template type
            bool: true, // use to make the component visible or invisible
            label: 'Input Field', // field label text
            field: {
                //  Use to pass options to redux form field
                name: 'activationCode', //name of the field
                className: 'form-control',
                component: INPUT_FIELD, //component that use in the field
                validationModules: [{ moduleName: 'RequiredValidate' }] //use to validate the field
            }
        },
        {
            type: ROW,
            rawComponents: <Divider type="horizontal" />
        },
        {
            type: HALF_CONTAINER,
            childComponents: [
                //An array of field configurations to be displayed in a row
                {
                    bool: true,
                    label: 'Input Field 2',
                    field: {
                        __order: 'a', //order of fields displaying in the form
                        name: 'activationCode1',
                        className: 'form-control',
                        component: INPUT_FIELD,
                        validationModules: [{ moduleName: 'RequiredValidate' }]
                    }
                },
                {
                    bool: true,
                    label: 'Input Field 3',
                    field: {
                        __order: 'a',
                        name: 'activationCode2',
                        className: 'form-control',
                        component: INPUT_FIELD,
                        validationModules: [{ moduleName: 'RequiredValidate' }]
                    }
                }
            ]
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Date Picker',
            field: {
                __order: 'a',
                name: 'activationCode5',
                className: 'form-control',
                component: DATE_PICKER,
                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Upload a file',
            field: {
                __order: 'a',
                name: 'hmrcDocument',
                className: 'form-control',
                component: FILE_UPLOADER,
                options: {
                    accept: [PDF], // use to disply what are the accepted file types
                    url: riaa.requestIAA, //s3 upload bucket folder to put uploaded document
                    bucketName: privateBucket, //s3 buckect (available buckets - privateBucket,publicBucket)
                    api: connectApi, //apis list
                    params: [props.entityId, 'iaa'] //parameters to create upload bucket folder path
                },
                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Currency Field',
            field: {
                __order: 'c',
                name: 'currencyField',
                className: 'form-control',
                component: CURRENCY_FIELD,
                options: {
                    props: {
                        precision: 0, //
                        className: 'form-control',
                        thousandSeparator: '.', //Use to separate thousand value using a symbol
                        decimalSeparator: '.', //Use to separate decimal value using a symbol
                        prefix: '',
                        suffix: ''
                    }
                },
                validationModules: [
                    { moduleName: 'RequiredValidate' },
                    {
                        moduleName: 'NumericalValidate',
                        options: {
                            message: 'Invalid input'
                        }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            label: 'Number Field',
            // bool: isBool,
            bool: true,
            field: {
                name: 'activationCode',
                className: 'form-control',
                component: NUMBER_FIELD,
                suffix: '%', //use to add string to at the end of the field
                prefix: '', //use to add string to at the begining of the field
                options: {
                    decimalScale: 0, //Use to separate the decimal part of the input value
                    placeholder: 0, //a value to display when there is no value
                    allowNegative: false, //Use to not allow to enter negative values
                    min: 0, //Use to demonstrates the minimun value can enter
                    max: 100, //Use to demonstrates the maximum value that can enter
                    allowLeadingZeros: true, //Use to specify can enter a number with leading zeros
                    maxLength: 20 //Use to specify maximum length of a number that can enter
                },
                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Upload multiple files',
            field: {
                __order: 'a',
                name: 'hmrcDocuments',
                className: 'form-control',
                component: MULTIPLE_FILE_UPLOADER,
                options: {
                    accept: [PDF], // use to disply what are the accepted file types
                    url: riaa.requestIAA, //s3 upload bucket folder to put uploaded document
                    bucketName: privateBucket, //s3 buckect (available buckets - privateBucket,publicBucket)
                    api: connectApi, //apis list
                    params: [props.entityId, 'iaa'] //parameters to create upload bucket folder path
                },
                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },

        /* When you want to use button groups , this is how it can be use*/

        {
            type: FULL_CONTAINER,
            label: 'Button Group',
            bool: true,
            field: {
                __order: 'f',
                name: TOGGLEBUTTONGROUP,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,

                validationModules: [{ moduleName: 'RequiredValidate' }]
            },
            when: [
                {
                    bool: props[TOGGLEBUTTONGROUP] === 'yes', // When this comdition become true functional configurations in side of the childComponent array will be display
                    childComponents: [
                        {
                            type: FULL_CONTAINER,
                            label: 'Enter value',
                            field: {
                                __order: 'g',
                                name: ENTERVALUE,
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
                                title: ENTERVALUE || '',
                                validationModules: [
                                    { moduleName: 'RequiredValidate' },
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
                        }
                    ]
                }
            ]
        }
    ];
};
