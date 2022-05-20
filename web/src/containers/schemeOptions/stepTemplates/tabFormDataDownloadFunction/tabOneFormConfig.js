/* 
this file contains the functional configuration used to create the fields in the first tab
*/

import React from 'react';
import config from 'appConfig';
import { CheckCircleOutlined } from '@ant-design/icons';

import constants from '../../../../UILibrary/constants';
import connectApi from '../../../../middlewares/connectApi'; // contains the path to download the file
import { TAB_ONE_FORM_LABELS, TAB_ONE_FORM_FIELD_NAMES, IICON_TEXT, TAB_KEYS } from './constants';
import { CHARACTER_LIMIT_2_20_MESSAGE, GREATER_THAN_ZERO_MESSAGE } from '../../constants/schemeOptionConstants';

const { bucket: privateBucket } = config; // contains the bucket details for downloading

const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants; // commonly used constants in all the components
const { FILE_UPLOADER, NUMBER_FIELD, ANT_INPUT_FIELD } = FORM_FIELDS;
const { FULL_CONTAINER } = FORM_TEMPLATES;
const { activeWorkFlow } = config.uploads; //the url path to download the file
const { PDF } = UPLOAD_FILE_TYPES; // file types that can be upload

export const tabOneConfig = props => {
    const formValues = props[TAB_KEYS.TAB_ONE_FORM]; // developer can get the form data for the tab by passing the tab Key

    return [
        {
            type: FULL_CONTAINER, // type of the container to be created
            label: TAB_ONE_FORM_LABELS.SCHEME_NAME, // label to the field
            field: {
                name: TAB_ONE_FORM_FIELD_NAMES.SCHEME_NAME, // name to the field
                className: 'default-font-size', // css style class name
                component: ANT_INPUT_FIELD, // component to be used in the field

                addonAfter: <CheckCircleOutlined />, // icon to append after the field

                validationModules: [
                    { moduleName: 'RequiredValidate' },

                    { moduleName: 'LengthValidate', options: { in: [2, 200], message: CHARACTER_LIMIT_2_20_MESSAGE } },
                    {
                        moduleName: 'SpecialCharacterValidate'
                    }
                ] // validate the field to be required
            }
        },

        {
            type: FULL_CONTAINER,
            label: TAB_ONE_FORM_LABELS.UPLOAD_HMRC_REGISTERATION,
            field: {
                name: TAB_ONE_FORM_FIELD_NAMES.UPLOAD_HMRC_REGISTERATION,
                className: 'form-control',
                component: FILE_UPLOADER,
                options: {
                    //(not required here)
                    accept: PDF, // specifying the file type that the user allowed to upload (not required)
                    manual: true, //(not required)
                    params: [formValues && formValues.entityId], //(not required)
                    url: activeWorkFlow.hmrcDoc, // url path to download
                    bucketName: privateBucket, //(not required)
                    api: connectApi //(not required)
                },
                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: TAB_ONE_FORM_LABELS.UPLOAD_LATEST_SCHEME_ACCOUNTS,
            field: {
                name: TAB_ONE_FORM_FIELD_NAMES.UPLOAD_LATEST_SCHEME_ACCOUNTS,
                className: 'form-control',
                component: FILE_UPLOADER,
                options: {
                    //(not required here)
                    accept: PDF, //(not required)
                    manual: true, //(not required)
                    params: [formValues && formValues.entityId], //(not required)
                    url: activeWorkFlow.schemeAccounts, //(not required)
                    bucketName: privateBucket, //(not required)
                    api: connectApi //(not required)
                },
                validationModules: [{ moduleName: 'RequiredValidate' }] //(not required)
            }
        },

        {
            type: FULL_CONTAINER,
            label: TAB_ONE_FORM_LABELS.NUMBER_OF_MEMBERS,
            iIcon: IICON_TEXT,
            field: {
                name: TAB_ONE_FORM_FIELD_NAMES.NUMBER_OF_MEMBERS,
                className: 'form-control',
                component: NUMBER_FIELD,
                validationModules: [
                    { moduleName: 'RequiredValidate' },
                    { moduleName: 'NumericalValidate', options: { '>': 0, message: GREATER_THAN_ZERO_MESSAGE } }
                ] // validate the field to be required && validates the value to be greater than zero
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: TAB_ONE_FORM_LABELS.NUMBER_OF_TRUSTEES,
            field: {
                name: TAB_ONE_FORM_FIELD_NAMES.NUMBER_OF_TRUSTEES,
                className: 'form-control',
                component: NUMBER_FIELD,
                validationModules: [{ moduleName: 'RequiredValidate' }], //(not required)

                disabled: true
            }
        }
    ];
};
