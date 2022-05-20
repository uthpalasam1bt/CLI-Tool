import config from 'appConfig';
import connectApi from '../../../../../middlewares/connectApi';
import uiLibConstants from '../../../../../UILibrary/constants';

const { FORM_TEMPLATES, FORM_FIELDS, UPLOAD_FILE_TYPES } = uiLibConstants;
const { PDF } = UPLOAD_FILE_TYPES;
const { NUMBER_FIELD, DATE_PICKER, FILE_UPLOADER } = FORM_FIELDS;
const { FULL_CONTAINER } = FORM_TEMPLATES;
const { bucket: privateBucket, publicBucket, generateBucket } = config;
const { ias } = config.uploads;

export const formFields = props => {
    return [
        {
            type: FULL_CONTAINER,
            bool: true,
            label: '$pmcplc$ document',
            className: 'pull-right',
            field: {
                generate: true,
                name: 'pmcPolicyDocument',
                className: 'form-control',
                component: FILE_UPLOADER,
                options: {
                    accept: [PDF],
                    params: [props.entityId],
                    url: ias.pmcPolicy,
                    bucketName: privateBucket,
                    api: connectApi
                },
                generateoptions: {
                    disabled: true
                },
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ]
            }
        },

        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Inception date',
            className: 'input-generate-wrapper',
            field: {
                name: 'inceptionDate',
                className: 'form-control',
                component: DATE_PICKER,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: 'Proxy adoption date',
            className: 'input-generate-wrapper',
            field: {
                name: 'proxyAdoptionDate',
                className: 'form-control',
                component: DATE_PICKER,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ]
            }
        },
        {
            type: FULL_CONTAINER,
            bool: true,
            label: '$pmcplc$ number',
            className: 'input-generate-wrapper',
            field: {
                name: 'activationCode',
                className: 'form-control',
                component: NUMBER_FIELD,
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ],
                options: {
                    decimalScale: 0,
                    allowNegative: false,
                    allowLeadingZeros: true,
                    maxLength: 20
                }
            }
        }
    ];
};
