/* 
This is a functional configuration for creating a form which contains upload generate fields.
Developers can pass this configuration to the tabs configuration  as a formFieldFunction property 

*/
import { required } from 'redux-form-validators'; // required validator
import _ from 'lodash';
import { UPLOAD_FILE_TYPES } from '../../../../../UILibrary/constants/fileUploaderConstants';
import { DOC_NAMES } from './constants';
import { documentGenConstant } from '../../../../../config/constants';

const { PDF, DOC } = UPLOAD_FILE_TYPES; // document types allowed to upload

export const formFields = props => {
    let adversoryStatus = _.get(props, 'dataset.documents.AdvisoryReport.documentStatus')
    let fmaStatus = _.get(props, 'dataset.documents.FMA.documentStatus')
    let sipStatus = _.get(props, 'dataset.documents.SIP.documentStatus')
    let letterStatus = _.get(props, 'dataset.documents.ConsultationSponsor.documentStatus')

    return [
        {
            label: 'Upload/Generate advisory report', //label to display in the form
            field: {
                name: DOC_NAMES.AdvisoryReport, // a name to the  field
                options: {
                    accept: [PDF], // can specify what are the types of document  that the  user allowed to upload
                    isPublic: false // specifyingto upload the document to the public bucket or the private bucket
                },
                // validate: [required({ message: 'Required' })], // validate the field to be required
                disabled: adversoryStatus === 'UPLOAD_PROCESSED' || adversoryStatus === 'PUBLISHED',
                //props.step.completed
                // disabled: false, // boolean value to disable the field and not allowing to upload a document
                generate: true, // boolean value to enable the generate option
                isMultiple: false, // to determine whether the user can upload a single document or multiple documents
                generateoptions: {
                    // ***at the moment file generation not working***
                    // contains the configuration for generate document
                    step: _.get(props, 'stepKey', null),
                    flowKey: props.workflowKey,
                    tenant: documentGenConstant.TENENT,
                    schemeId: _.get(props, 'entityId', null),
                    docName: documentGenConstant.ADVISORY,
                    disabled: false,  //TODO FIX THIS
                    templateKey: documentGenConstant.ADVISORY,
                    userId: _.get(props, `loggedUser.${'custom:userId'}`, null),
                    signatories: _.get(props, 'dataset.signatories', {})
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            label: 'Upload/Generate IMA', //a label to display in the form
            field: {
                name: DOC_NAMES.FMA, // a name to the  field
                options: {
                    accept: [PDF], // can specify what are the types of document  that the  user allowed to upload
                    isPublic: false // specifyingto upload the document to the public bucket or the private bucket
                },
                // validate: [required({ message: 'Required' })], // validate the field to be required
                disabled: fmaStatus === 'UPLOAD_PROCESSED' || fmaStatus === 'PUBLISHED',
                // disabled: false, // boolean value to disable the field and not allowing to upload a document
                generate: true, // boolean value to enable the generate option
                isMultiple: false, // to determine whether the user can upload a single document or multiple documents
                generateoptions: {
                    // ***at the moment file generation not working***
                    // contains the configuration for generate document
                    step: _.get(props, 'dataset.stepId', null),
                    flowKey: props.workflowKey,
                    tenant: documentGenConstant.TENENT,
                    schemeId: _.get(props, 'entityId', null),
                    docName: documentGenConstant.IMA,
                    disabled: false,  //TODO FIX THIS
                    templateKey: documentGenConstant.FMA,
                    userId: _.get(props, `loggedUser.${'custom:userId'}`, null),
                    signatories: _.get(props, 'dataset.signatories', {})
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }]
            }
        },
        {
            label: 'Upload/Generate SIP', //a label to display in the form
            field: {
                name: DOC_NAMES.SIP, // a name to the  field
                options: {
                    accept: [PDF], // can specify what are the types of document  that the  user allowed to upload
                    isPublic: false // specifyingto upload the document to the public bucket or the private bucket
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }],
                disabled: sipStatus === 'UPLOAD_PROCESSED' || sipStatus === 'PUBLISHED',
                // disabled: false, // boolean value to disable the field and not allowing to upload a document
                generate: true, // boolean value to enable the generate option
                isMultiple: false, // to determine whether the user can upload a single document or multiple documents
            }
        },
        {
            label: 'Upload/Generate sponsor consultation letter', //a label to display in the form
            field: {
                name: DOC_NAMES.ConsultationSponsor, // a name to the  field
                options: {
                    accept: [PDF, DOC], // can specify what are the types of document  that the  user allowed to upload
                    isPublic: false // specifyingto upload the document to the public bucket or the private bucket
                },
                validationModules: [{ moduleName: 'RequiredValidate', options: { message: 'Required' } }],
                // validate: [required({ message: 'Required' })], // validate the field to be required
                // disabled: false, // boolean value to disable the field and not allowing to upload a document
                disabled: letterStatus === 'UPLOAD_PROCESSED' || letterStatus === 'PUBLISHED',
                generate: true, // boolean value to enable the generate option
                isMultiple: false, // to determine whether the user can upload a single document or multiple documents
            }    
        }
    ];
};
