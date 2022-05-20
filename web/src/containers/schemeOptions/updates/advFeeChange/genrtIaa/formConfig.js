/* 
This is a functional configuration for creating a form which contains upload generate fields.
Developers can pass this configuration to the tabs configuration  as a formFieldFunction property 

*/
import { required } from 'redux-form-validators'; // required validator

import { UPLOAD_FILE_TYPES } from '../../../../../UILibrary/constants/fileUploaderConstants';
import { DOC_NAMES } from './constants';

const { PDF, DOC } = UPLOAD_FILE_TYPES; // document types allowed to upload

export const formFields = props => {
    return [
        {
            label: 'IAA Document', //a label to display in the form
            field: {
                name: DOC_NAMES.IAA, // a name to the  field
                options: {
                    accept: [PDF], // can specify what are the types of document  that the  user allowed to upload
                    isPublic: false // specifyingto upload the document to the public bucket or the private bucket
                },
                validate: [required({ message: 'Required' })], // validate the field to be required
                disabled: false, // boolean value to disable the field and not allowing to upload a document
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
