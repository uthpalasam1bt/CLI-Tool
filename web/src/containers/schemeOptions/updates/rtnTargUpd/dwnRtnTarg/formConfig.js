/* 
 this file contains the JSON configuration used to create the form fields in the template 
 */

import moment from 'moment';
import config from 'appConfig'; // contains the paths to upload the documents

import { GREATER_THAN_ZERO_MESSAGE } from '../../../constants/schemeOptionConstants';
import connectApi from '../../../../../middlewares/connectApi';
import constants from '../../../../../UILibrary/constants';
import {FORM_FIELD_LABLES, FORM_FIELD_NAMES} from "./constants";

const { bucket: privateBucket } = config;
const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants; //  constants that are commonly used in all the components
const { DATE_PICKER, FILE_UPLOADER, NUMBER_FIELD, CURRENCY_FIELD, BUTTON_GROUP, INPUT_FIELD } = FORM_FIELDS; // form field types
const { FULL_CONTAINER } = FORM_TEMPLATES;
const { PDF } = UPLOAD_FILE_TYPES;
const YESNOBUTTONOPTION = [{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }];
const { riaa } = config.uploads; // url path to upload the file

export const formFields = props => {
    console.log('Hi meeting ==>', props);
    return [
        {
            type: FULL_CONTAINER, //  form template type
            bool: true, // use to make the component visible or invisible
            label: FORM_FIELD_LABLES.TARGET_RETURN, // field label text
            field: {
                //  Use to pass options to redux form field
                name: FORM_FIELD_NAMES.TARGET_RETURN, //name of the field
                className: 'form-control',
                suffix: '%',
                component: INPUT_FIELD, //component that use in the field
                validationModules: [{ moduleName: 'RequiredValidate' }] //use to validate the field
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
            label: FORM_FIELD_LABLES.FULLY_ESG_PORTFOLIO,
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
