import _ from 'lodash';
import { UPLOAD_FILE_TYPES } from '../../../../../UILibrary/constants/fileUploaderConstants';
import {
    STATUS_DOCUMENT_UPLOAD_PROCESSED,
    STATUS_DOCUMENT_PUBLISHED
} from '../../../../workflows/constants/workflowConstant';
import { FORM_FIELDS } from './constants';
import { documentGenConstant } from '../../../../../config/constants';
const { PDF, DOC } = UPLOAD_FILE_TYPES;

export const formFields = props => {
    const IAAdocumentStatus = _.get(props, 'data.documents.IAA.documentStatus', null);
    const FMAdocumentStatus = _.get(props, 'data.documents.FMA.documentStatus', null);
    const PMCdocumentStatus = _.get(props, 'data.documents.PMCProposal.documentStatus', null);
    const SIPdocumentStatus = _.get(props, 'data.documents.SIP.documentStatus', null);
    const ConsultationSponsorDocumentStatus = _.get(props, 'data.documents.ConsultationSponsor.documentStatus', null);

    return [
        {
            label: 'Generate $iaa$',
            field: {
                name: FORM_FIELDS.GENERATE_IAA,
                options: {
                    accept: [PDF]
                },
                generate: true,
                isMultiple: false,
                disabled: IAAdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                generateoptions: {
                    step: _.get(props, 'stepKey', null),
                    flowKey: props.workflowKey,
                    tenant: documentGenConstant.TENENT,
                    schemeId: _.get(props, 'entityId', null),
                    docName: documentGenConstant.IAA,
                    disabled: IAAdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                    templateKey: documentGenConstant.IAA,
                    userId: _.get(props, `loggedUser.${'custom:userId'}`, null),
                    signatories: _.get(props, 'dataset.signatories', {})
                }
            }
        },
        {
            label: 'Generate $ima$',
            field: {
                name: FORM_FIELDS.GENERATE_FMA,
                options: {
                    accept: [PDF]
                },
                disabled: FMAdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                generate: true,
                isMultiple: false,
                generateoptions: {
                    step: _.get(props, 'stepKey', null),
                    flowKey: props.workflowKey,
                    tenant: documentGenConstant.TENENT,
                    schemeId: _.get(props, 'entityId', null),
                    docName: documentGenConstant.IMA,
                    disabled: FMAdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                    templateKey: documentGenConstant.FMA,
                    userId: _.get(props, `loggedUser.${'custom:userId'}`, null),
                    signatories: _.get(props, 'dataset.signatories', {})
                }
            }
        },
        {
            label: 'Generate $pmc$',
            field: {
                name: FORM_FIELDS.GENERATE_PMC,
                options: {
                    accept: [PDF]
                },
                disabled: PMCdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                generate: true,
                isMultiple: false,
                generateoptions: {
                    step: _.get(props, 'stepKey', null),
                    flowKey: props.workflowKey,
                    tenant: documentGenConstant.TENENT,
                    schemeId: _.get(props, 'entityId', null),
                    docName: documentGenConstant.PMC,
                    disabled: PMCdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                    templateKey: documentGenConstant.PMC,
                    userId: _.get(props, `loggedUser.${'custom:userId'}`, null),
                    signatories: _.get(props, 'dataset.signatories', {})
                }
            }
        },
        {
            label: 'Generate $sip$',
            field: {
                name: FORM_FIELDS.GENERATE_SIP,
                options: {
                    accept: [PDF]
                },
                disabled: SIPdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                generate: true,
                isMultiple: false
            }
        },
        {
            label: '$spsrcl$',
            field: {
                name: FORM_FIELDS.SPONSOR_CONSULTATION_LETTER,
                options: {
                    accept: [PDF, DOC]
                },
                disabled:
                    ConsultationSponsorDocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED ||
                    ConsultationSponsorDocumentStatus === STATUS_DOCUMENT_PUBLISHED,
                generate: true,
                isMultiple: false
            }
        }
    ];
};
