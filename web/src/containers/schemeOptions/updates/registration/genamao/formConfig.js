import _ from 'lodash';
import config from 'appConfig';
import { UPLOAD_FILE_TYPES } from '../../../../../UILibrary/constants/fileUploaderConstants';
import { STATUS_DOCUMENT_UPLOAD_PROCESSED } from '../../../../workflows/constants/workflowConstant';
import { DOC_NAMES } from './constants';
import { documentGenConstant } from '../../../../../config/constants';
const { amao } = config.uploads;
const { PDF, DOC, DOCX } = UPLOAD_FILE_TYPES;

export const formFields = props => {
    const { step } = props;

    const AdvisoryReportDocumentStatus = _.get(props, 'data.documents.AdvisoryReport.documentStatus', null);
    const FMAdocumentStatus = _.get(props, 'data.documents.FMA.documentStatus', null);
    const PMCdocumentStatus = _.get(props, 'data.documents.PMCProposal.documentStatus', null);

    return [
        {
            label: '$advrpt$',
            field: {
                name: DOC_NAMES.ADVISORY_REPORT,
                options: {
                    accept: [PDF]
                },
                disabled: AdvisoryReportDocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                generate: true,
                isMultiple: false,
                generateoptions: {
                    step: _.get(props, 'dataset.stepId', null),
                    flowKey: documentGenConstant.REGISTRATION,
                    tenant: documentGenConstant.TENENT,
                    schemeId: _.get(props, 'entityId', null),
                    docName: documentGenConstant.ADVISORY,
                    disabled: AdvisoryReportDocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                    templateKey: documentGenConstant.ADVISORY,
                    userId: _.get(props, `loggedUser.${'custom:userId'}`, null),
                    signatories: _.get(props, 'dataset.signatories', {})
                }
            }
        },
        {
            label: '$ima$',
            field: {
                name: DOC_NAMES.FMA,
                options: {
                    accept: [PDF]
                },
                disabled: FMAdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                generate: true,
                isMultiple: false,
                generateoptions: {
                    step: _.get(props, 'dataset.stepId', null),
                    flowKey: documentGenConstant.REGISTRATION,
                    tenant: documentGenConstant.TENENT,
                    schemeId: _.get(props, 'entityId', null),
                    docName: documentGenConstant.IMA,
                    disabled: FMAdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                    templateKey: documentGenConstant.FMA,
                    time: 12,
                    userId: _.get(props, `loggedUser.${'custom:userId'}`, null),
                    signatories: _.get(props, 'dataset.signatories', {})
                }
            }
        },
        {
            label: '$pmcprsl$',
            field: {
                name: DOC_NAMES.PMCPROPOSAL,
                options: {
                    accept: [PDF]
                },
                disabled: PMCdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                generate: true,
                isMultiple: false,
                generateoptions: {
                    step: _.get(props, 'dataset.stepId', null),
                    flowKey: documentGenConstant.REGISTRATION,
                    tenant: documentGenConstant.TENENT,
                    schemeId: _.get(props, 'entityId', null),
                    docName: documentGenConstant.PMC,
                    disabled: PMCdocumentStatus === STATUS_DOCUMENT_UPLOAD_PROCESSED,
                    templateKey: documentGenConstant.PMC,
                    time: 12,
                    userId: _.get(props, `loggedUser.${'custom:userId'}`, null),
                    signatories: _.get(props, 'dataset.signatories', {})
                }
            }
        },
        {
            label: '$spsrcl$',
            field: {
                name: DOC_NAMES.CONSULTATION_SPONSOR,
                options: {
                    accept: [PDF, DOC, DOCX]
                },
                disabled: step && step.completed,
                generate: true,
                isMultiple: true
            }
        },
        {
            label: 'Letter to actuary',
            field: {
                name: DOC_NAMES.CONSULTATION_ACTUARY,
                options: {
                    accept: [PDF, DOC, DOCX]
                },
                disabled: step && step.completed,
                generate: true,
                isMultiple: true
            }
        }
    ];
};
