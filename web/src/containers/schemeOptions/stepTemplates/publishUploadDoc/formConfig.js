/* 
This is a functional configuration for creating a form which contains a single upload generate field.
Developers can pass configuration to the CreatePublish component as a formFieldFunction property.
*/

import { UPLOAD_FILE_TYPES } from '../../../../UILibrary/constants/fileUploaderConstants';
import { FIELD_LABEL, PUBLISH_DOC_NAME } from './constants';

const { PDF } = UPLOAD_FILE_TYPES;

export const formFields = props => {
    return [
        {
            label: FIELD_LABEL, //label of the upload-generate field
            field: {
                name: PUBLISH_DOC_NAME, // form field name
                // contains the configuration to upload the file
                options: {
                    accept: PDF, //specifying  what are the types of document  that the  user allowed to upload
                    isPublic: false // specifyingto upload the document to the public bucket or the private bucket
                },
                validationModules: [{ moduleName: 'RequiredValidate' }], // validate the field to be required
                disabled: false, // boolean value to disable the field and not allowing to upload a document
                generate: true, // boolean value to enable the generate option
                // contains the configuration for generate document
                generateoptions: {
                    step: 'step1',
                    flowKey: 'uploadGenerateWF',
                    tenant: 'TENENT',
                    schemeId: '1234',
                    docName: 'fmaDocument',
                    disabled: false,
                    templateKey: 'fmaDocument'
                }
            }
        }
    ];
};
