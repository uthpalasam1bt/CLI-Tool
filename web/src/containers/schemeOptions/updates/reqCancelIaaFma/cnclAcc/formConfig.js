/* 
     This is the functional configuration for creating simple forms
     In this approach developers can pass javaScript Objects as configuration parameters.
     Inside this configuration we can specify the form labels and respective form fields to display in the form

 */
import React from 'react';
import { Divider } from 'antd';

import { FORM_FIELD_LABELS, FORM_FIELD_NAMES } from './constants';
import constants from '../../../../../UILibrary/constants';
import config from 'appConfig';
// import connectApi from '../../../../middlewares/connectApi';

const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
const { PDF } = UPLOAD_FILE_TYPES; // document types allowed to upload
const {
    INPUT_FIELD,
    TEXTAREA,
    DATE_PICKER,
    CURRENCY_FIELD,
    FILE_UPLOADER,
    NUMBER_FIELD,
    MULTIPLE_FILE_UPLOADER,
    BUTTON_GROUP
} = FORM_FIELDS;
const { LABEL, FULL_VIEW_CONTAINER, FULL_CONTAINER, HALF_CONTAINER, ROW } = FORM_TEMPLATES;
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
            label:  FORM_FIELD_LABELS[FORM_FIELD_NAMES.CANCEL_REASON],
        },
        {
            type: FULL_VIEW_CONTAINER, //  form template type
            bool: true, // use to make the component visible or invisible
            label: FORM_FIELD_LABELS[FORM_FIELD_NAMES.CANCEL_REASON], // field label text
            field: {
                //  Use to pass options to redux form field
                name: FORM_FIELD_NAMES.CANCEL_REASON, //name of the field
                className: 'form-control',
                component: TEXTAREA, //component that use in the field
                maxLength: 775,
                validationModules: [{ moduleName: 'RequiredValidate',  options: { message: 'Required' } }] //use to validate the field
            }
        }
    ];
};
