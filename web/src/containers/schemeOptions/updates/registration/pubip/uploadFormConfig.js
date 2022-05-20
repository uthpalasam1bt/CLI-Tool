import _ from 'lodash';
import { UPLOAD_FILE_TYPES } from '../../../../../UILibrary/constants/fileUploaderConstants';
import { FIELD_LABEL, PUBLISH_DOC_NAME } from './constants';
import { documentGenConstant } from '../../../../../config/constants';
import connectApi from '../../../../../middlewares/connectApi';

const { PDF } = UPLOAD_FILE_TYPES;

export const uploadField = props => {
    return [
        {
            label: FIELD_LABEL, //label of the upload-generate field
            field: {
                name: PUBLISH_DOC_NAME, // form field name
                options: {
                    accept: PDF, //specifying  what are the types of document  that the  user allowed to upload
                    isPublic: false // specifyingto upload the document to the public bucket or the private bucket
                },
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ], // validate the field to be required

                generate: true,
                // contains the configuration for generate document
                generateoptions: {
                    step: _.get(props, 'step.stepKey', null),
                    flowKey: documentGenConstant.REGISTRATION,
                    tenant: documentGenConstant.TENENT,
                    schemeId: _.get(props, 'entityId', null),
                    docName: documentGenConstant.FORMAL_PROPOSAL,
                    templateKey: documentGenConstant.INITIAL_PROPOSAL,
                    userId: _.get(props, `loggedUser.${'custom:userId'}`, null),
                    signatories: _.get(props, 'dataset.signatories', {})
                }
            }
        }
    ];
};
