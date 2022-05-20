import _ from 'lodash';
import { documentGenConstant } from '../../../../../config/constants';
import { STATUS_DOCUMENT_UPLOAD_PROCESSED } from '../../../../workflows/constants/workflowConstant';
export const formFields = props => {
    const ADVISORYdocumentStatus = _.get(props, 'data.documents.AdvisoryReport.documentStatus', null);
    const IMAdocumentStatus = _.get(props, 'data.documents.FMA.documentStatus', null);
    return [
        {
            label: 'Upload/Generate advisory report',
            field: {
                name: 'AdvisoryReport',
                options: {
                    accept: ['.pdf'],
                    isPublic: false
                },
                validationModules: [{ moduleName: 'RequiredValidate' }],
                disabled: ADVISORYdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                generate: true,
                isMultiple: false,
                generateoptions: {
                    step: _.get(props, 'stepKey', null),
                    flowKey: props.workflowKey,
                    tenant: documentGenConstant.TENENT,
                    schemeId: _.get(props, 'entityId', null),
                    docName: documentGenConstant.ADVISORY,
                    disabled: ADVISORYdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                    templateKey: documentGenConstant.ADVISORY,
                    userId: _.get(props, `loggedUser.${'custom:userId'}`, null),
                    signatories: _.get(props, 'dataset.signatories', {})
                }
            }
        },
        {
            label: 'Upload/Generate IMA attachment',
            field: {
                name: 'FMA',
                options: {
                    accept: ['.pdf'],
                    isPublic: false
                },
                validationModules: [{ moduleName: 'RequiredValidate' }],
                disabled: IMAdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                generate: true,
                isMultiple: false,
                generateoptions: {
                    step: _.get(props, 'stepKey', null),
                    flowKey: props.workflowKey,
                    tenant: documentGenConstant.TENENT,
                    schemeId: _.get(props, 'entityId', null),
                    docName: documentGenConstant.IMA,
                    disabled: IMAdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                    templateKey: documentGenConstant.FMA,
                    userId: _.get(props, `loggedUser.${'custom:userId'}`, null),
                    signatories: _.get(props, 'dataset.signatories', {})
                }
            }
        }
    ];
};
