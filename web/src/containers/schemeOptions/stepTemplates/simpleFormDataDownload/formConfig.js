/* 
 this file contains the JSON configuration used to create the form fields in the template 
 */

import moment from 'moment';
import config from 'appConfig'; // contains the paths to upload the documents

import { GREATER_THAN_ZERO_MESSAGE } from '../../constants/schemeOptionConstants';
import connectApi from '../../../../middlewares/connectApi';
import constants from '../../../../UILibrary/constants';

const { bucket: privateBucket } = config;
const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = constants; //  constants that are commonly used in all the components
const { DATE_PICKER, FILE_UPLOADER, NUMBER_FIELD, CURRENCY_FIELD } = FORM_FIELDS; // form field types
const { FULL_CONTAINER } = FORM_TEMPLATES;
const { PDF } = UPLOAD_FILE_TYPES;

const { riaa } = config.uploads; // url path to upload the file

export const formFields = props => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true, // to make visible the field in the form
            label: 'Please upload the HMRC registration confirmation', // label to the field
            field: {
                __order: 'a', // used to order the form data when downloading
                name: 'hmrcDocument', // form field name
                className: 'form-control', // css style clas name to the field
                component: FILE_UPLOADER, // component to use in the field
                options: {
                    // contains the configuration to upload the file
                    accept: PDF, //specifying  what are the types of document  that the  user allowed to upload
                    url: riaa.requestIAA, // url path to upload the file
                    bucketName: privateBucket, // specifying to upload the document to private bucket
                    api: connectApi, //list of apis to handle file upload to s3 bucket
                    params: [props.entityId, 'iaa'] // name to the file to append in the url
                },
                validationModules: [{ moduleName: 'RequiredValidate' }] // validate the field to be required
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Please upload the latest scheme accounts',
            field: {
                __order: 'b',
                name: 'schemeAccount',
                className: 'form-control',
                component: FILE_UPLOADER,
                options: {
                    accept: PDF,
                    url: riaa.requestIAA,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId, 'iaa']
                },
                validationModules: [{ moduleName: 'RequiredValidate' }] // validate the field to be required
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Approximate number of members in the scheme',
            field: {
                __order: 'c',
                name: 'numberOfMembers',
                className: 'form-control',
                component: CURRENCY_FIELD,
                options: {
                    props: {
                        precision: 0,
                        className: 'form-control'
                    }
                },
                validationModules: [
                    { moduleName: 'RequiredValidate' },
                    { moduleName: 'NumericalValidate', options: { '>': 0, message: GREATER_THAN_ZERO_MESSAGE } }
                ] // validate the field to be required && validates the value to be greater than zero
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Upload latest deed of trustee appointment and removal',
            field: {
                __order: 'e',
                name: 'trustDeed',
                className: 'form-control',
                component: FILE_UPLOADER,
                options: {
                    accept: PDF,
                    url: riaa.requestIAA,
                    bucketName: privateBucket,
                    api: connectApi,
                    params: [props.entityId, 'iaa']
                },
                validationModules: [{ moduleName: 'RequiredValidate' }] // validate the field to be required
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Number of trustees',
            field: {
                __order: 'f',
                name: 'numberOfTrustees',
                className: 'form-control',
                component: NUMBER_FIELD
            },
            validationModules: [
                { moduleName: 'RequiredValidate' },
                { moduleName: 'NumericalValidate', options: { '>': 0, message: GREATER_THAN_ZERO_MESSAGE } }
            ] // validate the field to be required && validates the value to be greater than zero
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Number of trustees required to approve a strategy change',
            field: {
                __order: 'g',
                name: 'numberOfTrusteeAppCh',
                className: 'form-control',
                component: NUMBER_FIELD
            },
            validationModules: [
                { moduleName: 'RequiredValidate' },
                { moduleName: 'NumericalValidate', options: { '>': 0, message: GREATER_THAN_ZERO_MESSAGE } }
            ] // validate the field to be required && validates the value to be greater than zero
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Number of trustees required to sign a legal document',
            field: {
                __order: 'h',
                name: 'dynamicSignatoryCount',
                className: 'form-control',
                component: NUMBER_FIELD
            },
            validationModules: [
                { moduleName: 'RequiredValidate' },
                { moduleName: 'NumericalValidate', options: { '>': 0, message: GREATER_THAN_ZERO_MESSAGE } }
            ] // validate the field to be required && validates the value to be greater than zero
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Date of trust deed',
            field: {
                __order: 'i',
                name: 'dateTrustDeed',
                className: 'form-control',
                component: DATE_PICKER,
                options: {
                    disabledDate: current => current && current > moment().startOf('day')
                },
                validationModules: [{ moduleName: 'RequiredValidate' }] // validate the field to be required
            }
        }
    ];
};
