// import constants from '../../../../../UILibrary/constants';
// import config from 'appConfig';
// import { LIABILITY_UPDATE_FORM_SECTION, ENTERVALUE } from './constants';

// const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants;
// const { PDF } = UPLOAD_FILE_TYPES;
// const { NUMBER_FIELD, CURRENCY_FIELD, BUTTON_GROUP } = FORM_FIELDS;
// const { FULL_CONTAINER } = FORM_TEMPLATES;
// const { bucket: privateBucket } = config;
// const YESNOBUTTONOPTION = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];
// const {
//     KNOWLIABILITYMDT,
//     PERCENTAGELINKEDTOINFLATION,
//     LIABILITYDURATION,
//     HAVEPASSSLCTOUPLOAD
// } = LIABILITY_UPDATE_FORM_SECTION.FIELD_KEYS;
// const { riaa } = config.uploads;

// export const formFields = props => {
//     return [

//     ];
// };

/* 
     This is the functional configuration for creating simple forms
     In this approach developers can pass javaScript Objects as configuration parameters.
     Inside this configuration we can specify the form labels and respective form fields to display in the form

     Here we can create functional configuation for each tab.
     In this file contains functional configuration for Tab01

//  */
import React from 'react';
import { Divider } from 'antd';

// import constants from '../../../../UILibrary/constants';
import {FORM_FIELD_LABLES, FORM_FIELD_NAMES, TABONE} from './constants';

// const { FORM_TEMPLATES, FORM_FIELDS } = constants;
// const { ADDRESS_FIELD, ASSETS_VALUE_SEPARATOR, DEFICIT_CONTRIBUTION_SECTION } = FORM_FIELDS;
// const { FULL_VIEW_CONTAINER, ROW } = FORM_TEMPLATES;
import { required } from 'redux-form-validators'; // required validator
import constants from '../../../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS } = constants;
const { LABEL, FULL_VIEW_CONTAINER, FULL_CONTAINER, HALF_CONTAINER, ROW } = FORM_TEMPLATES;
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
const YESNOBUTTONOPTION = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];

export const formFields = props => {
    return [
        {
            type: FULL_CONTAINER, //  form template type
            bool: true, // use to make the component visible or invisible
            label: FORM_FIELD_LABLES.TARGET_RETURN, // field label text
            field: {
                //  Use to pass options to redux form field
                name: FORM_FIELD_NAMES.TARGET_RETURN, //name of the field
                className: 'form-control',
                placeholder: '-1.000-5.000',
                suffix: '%',
                component: NUMBER_FIELD, //component that use in the field
                options: {
                    placeholder: '-1.000-5.000',
                    decimalScale: 3, //Use to separate the decimal part of the input value
                    min: -1.0, //Use to demonstrates the minimun value can enter
                    max: 5.0 //Use to demonstrates the maximum value that can enter
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            type: FULL_CONTAINER,
            label: FORM_FIELD_LABLES.HOLD_LESS_LIQUUD_ASSETS,
            bool: true,
            field: {
                // __order: 'f',
                name: FORM_FIELD_NAMES.HOLD_LESS_LIQUUD_ASSETS,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,

                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        },
        {
            type: FULL_CONTAINER,
            label:  FORM_FIELD_LABLES.FULLY_ESG_PORTFOLIO,
            bool: true,
            field: {
                // __order: 'f',
                name: FORM_FIELD_NAMES.FULLY_ESG_PORTFOLIO,
                className: 'form-control',
                component: BUTTON_GROUP,
                options: YESNOBUTTONOPTION,

                validationModules: [{ moduleName: 'RequiredValidate' }]
            }
        }
    ];
};
