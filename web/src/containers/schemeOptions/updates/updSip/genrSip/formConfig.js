/* 
This is a functional configuration for creating a form which contains upload generate fields.
Developers can pass configuration to the upload generate component as a formFieldFunction property.

*/
import _ from 'lodash';

import { UPLOAD_FILE_TYPES } from '../../../../../UILibrary/constants/fileUploaderConstants';
import { DOC_NAMES, LABEL } from './constants';

const { PDF, DOC, DOCX } = UPLOAD_FILE_TYPES; // document types allowed to upload
export const formFields = props => {
    let sipStatus = _.get(props, 'dataset.documents.SIP.documentStatus');
    let letterStatus = _.get(props, 'dataset.documents.ConsultationSponsor.documentStatus');
    return [
        {
            label: LABEL.UPLOAD_GENERATE, //a label to display in the form
            field: {
                __order: 'o',
                name: DOC_NAMES.SIP, // a name to the form field
                options: {
                    accept: [PDF], // can specify what are the types of document  that the  user allowed to upload
                    isPublic: false // specifying to upload the document to the public bucket or the private bucket
                },
                // validate: [required({ message: 'Required' })], // validate the field to be required
                disabled: props.step.completed || sipStatus === 'UPLOAD_PROCESSED', // boolean value to disable the field and not allowing to upload a document
                generate: true, // boolean value to enable the generate option
                isMultiple: false, // to determine whether the user can upload a single document or multiple documents
                generateoptions: {
                    // ***at the moment file generation not working***
                    // contains the configuration for generate document
                    step: 'step1',
                    flowKey: 'uploadGenerateWF',
                    tenant: 'TENENT',
                    schemeId: '1234',
                    docName: 'fmaDocument',
                    disabled: true,
                    templateKey: 'fmaDocument'
                },
                onChange: e => {
                    //developer can pass an onChange function
                },
                onClick: e => {
                    // developer can pass an onClick function
                }
            }
        },
        {
            label: LABEL.CONSULTATION_SPONSOR, //a label to display in the form
            field: {
                __order: 'o',
                name: DOC_NAMES.ConsultationSponsor, // a name to the form field
                options: {
                    accept: [PDF, DOC, DOCX], // can specify what are the types of document  that the  user allowed to upload
                    isPublic: false // specifying to upload the document to the public bucket or the private bucket
                },
                // validate: [required({ message: 'Required' })], // validate the field to be required
                disabled: props.step.completed || letterStatus === 'UPLOAD_PROCESSED', // boolean value to disable the field and not allowing to upload a document
                generate: true, // boolean value to enable the generate option
                isMultiple: false, // to determine whether the user can upload a single document or multiple documents
                generateoptions: {
                    // ***at the moment file generation not working***
                    // contains the configuration for generate document
                    step: 'step1',
                    flowKey: 'uploadGenerateWF',
                    tenant: 'TENENT',
                    schemeId: '1234',
                    docName: 'fmaDocument',
                    disabled: true,
                    templateKey: 'fmaDocument'
                },
                onChange: e => {
                    //developer can pass an onChange function
                },
                onClick: e => {
                    // developer can pass an onClick function
                }
            }
        }
    ];
};
//ConsultationSponsor
