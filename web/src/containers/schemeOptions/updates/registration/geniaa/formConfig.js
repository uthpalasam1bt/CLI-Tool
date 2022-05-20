import _ from 'lodash';
import { UPLOAD_FILE_TYPES } from '../../../../../UILibrary/constants/fileUploaderConstants';
import {
    STATUS_DOCUMENT_UPLOAD_PROCESSED,
    STEP_ACTION_DOC_UPLOAD
} from '../../../../workflows/constants/workflowConstant';
import { DOC_NAMES } from './constants';
import { documentGenConstant } from '../../../../../config/constants';
import ClaimHelper from '../../../../../helpers/claimHelper';

const { PDF, DOC, DOCX } = UPLOAD_FILE_TYPES;

export const formFields = props => {
    const IAAdocumentStatus = _.get(props, 'data.documents.IAA.documentStatus', null);
    const AuthorisingManagersdocumentStatus = _.get(props, 'data.documents.AuthorisingManagers.documentStatus', null);
    const { step, getLoggedUserClaims_data } = props;

    return [
        {
            label: '$iaa$',
            field: {
                name: DOC_NAMES.IAA,
                options: {
                    accept: [PDF],
                    isPublic: false
                },
                validationModules: [
                    {
                        moduleName: 'RequiredValidate',
                        options: { message: 'Required' }
                    }
                ],
                disabled:
                    _.get(step, 'completed', false) ||
                    IAAdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED ||
                    !ClaimHelper.getPermission(getLoggedUserClaims_data, step, STEP_ACTION_DOC_UPLOAD),
                generate: true,
                isMultiple: false,
                generateoptions: {
                    step: _.get(props, 'step.stepKey', null),
                    flowKey: documentGenConstant.REGISTRATION,
                    tenant: documentGenConstant.TENENT,
                    schemeId: _.get(props, 'entityId', null),
                    docName: documentGenConstant.IAA,
                    disabled:
                        _.get(step, 'completed', false) ||
                        IAAdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED ||
                        !ClaimHelper.getPermission(getLoggedUserClaims_data, step, STEP_ACTION_DOC_UPLOAD),
                    templateKey: documentGenConstant.IAA,
                    userId: _.get(props, `loggedUser.${'custom:userId'}`, null),
                    signatories: _.get(props, 'dataset.signatories', {})
                }
            }
        },
        {
            label: 'Manager letters (Multiple files may be added)',
            field: {
                name: DOC_NAMES.AuthorisingManagers,
                options: {
                    accept: [PDF, DOC, DOCX],
                    isPublic: false
                },
                disabled: _.get(step, 'completed', false) || AuthorisingManagersdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                generate: true,
                isMultiple: true
            }
        }
    ];
};
