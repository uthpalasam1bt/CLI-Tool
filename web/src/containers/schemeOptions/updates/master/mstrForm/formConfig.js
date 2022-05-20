/* 
     This is the functional configuration for creating simple forms
     In this approach developers can pass javaScript Objects as configuration parameters.
     Inside this configuration we can specify the form labels and respective form fields to display in the form

 */
import React from 'react';
import { Divider } from 'antd';

import { TOGGLEBUTTONGROUP, ENTERVALUE } from './constants';
import constants from '../../../../../UILibrary/constants';
import config from 'appConfig';
import connectApi from '../../../../../middlewares/connectApi';

const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const { PDF } = UPLOAD_FILE_TYPES; // document types allowed to upload
const {
    INPUT_FIELD,
    DATE_PICKER,
    CURRENCY_FIELD,
    FILE_UPLOADER,
    NUMBER_FIELD,
    MULTIPLE_FILE_UPLOADER,
    BUTTON_GROUP,
    SELECT_OPTION
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
            type: FULL_CONTAINER,
            label: 'Select your scheme type',
            field: {
                name: 'schemeType',
                className: 'form-control',
                component: SELECT_OPTION,
                options: {
                    defaultValue: 'Select',
                    name: 'schemeType',
                    dataList: [
                        { key: 'LDI_FM', value: 'Pool Fund' },
                        { key: 'BUYOUT', value: 'Buy Out' },
                        { key: 'LDI', value: 'Nav Guide' },
                        { key: 'FM', value: 'Fiduciary Management' }
                    ]
                },
                validationModules: [
                    {
                        moduleName: 'RequiredValidate'
                    }
                ]
            }
        }
    ];
};
