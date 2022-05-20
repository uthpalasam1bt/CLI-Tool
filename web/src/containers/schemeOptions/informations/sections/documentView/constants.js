// import { Notices } from '../../constants';

export const SELECT_DOCUMENT_TYPE = 'Select document type';
export const SELECT_DOCUMENT_NAME = 'Select document name';
export const NO_DATA = '-- No documents available --';
export const MANAGER_TERMINATION_LETTER = 'ManagerTerminationLetter';
export const SIP = 'SIP';
export const TRANSITION_REPORT = 'TransitionReport';
export const AUTHORISING_DELEGATES = 'AuthorisingDelegates';
export const ADMINISTRATOR_CONFIRMING = 'AdministratorConfirming';
export const CERTIFICATE_OF_INCORPORATION = 'CertificateOfIncorporation';

export const GET_DOCUMENT_DATA_REQUEST = 'GET_DOCUMENT_DATA_REQUEST';
export const GET_DOCUMENT_DATA_INPROGRESS = 'GET_DOCUMENT_DATA_INPROGRESS';
export const GET_DOCUMENT_DATA_SUCCESS = 'GET_DOCUMENT_DATA_SUCCESS';
export const GET_DOCUMENT_DATA_FAILED = 'GET_DOCUMENT_DATA_FAILED';

export const GET_SELECTED_DOCUMENT_DATA_REQUEST = 'GET_SELECTED_DOCUMENT_DATA_REQUEST';
export const GET_SELECTED_DOCUMENT_DATA_INPROGRESS = 'GET_SELECTED_DOCUMENT_DATA_INPROGRESS';
export const GET_SELECTED_DOCUMENT_DATA_SUCCESS = 'GET_SELECTED_DOCUMENT_DATA_SUCCESS';
export const GET_SELECTED_DOCUMENT_DATA_FAILED = 'GET_SELECTED_DOCUMENT_DATA_FAILED';

//WARNING : NEVER CHANGE THIS VALUES !!!!!!!!!....

// export const dataMap = {
//   Investment: [
//     {
//       value: 'Formal Proposal',
//       key: 'Investment'
//     },
//     {
//       value: 'Advisory Report',
//       key: 'AdvisoryReport'
//     },
//     {
//       value: 'SIP',
//       key: 'SIP'
//     },
//     {
//       value: 'Transition Report',
//       key: 'TransitionReport'
//     }
//   ],
//   SchemeDocument: [
//     {
//       value: 'Trust Deed',
//       key: 'TrustDeed'
//     },
//     {
//       value: 'HMRC Registration',
//       key: 'HmrcRegistration'
//     },
//     {
//       value: 'Certificate of Incorporation',
//       key: 'CertificateOfIncorporation'
//     },
//     {
//       value: 'Scheme Accounts',
//       key: 'SchemeAccounts'
//     },
//     {
//       value: 'Disinvestment Authorisation Letter',
//       key: 'AuthorisingDelegates'
//     },
//     {
//       value: 'Administrator authorised individuals Letter',
//       key: 'AdministratorConfirming'
//     }
//   ],
//   Legal: [
//     {
//       value: 'Advisory Agreement',
//       key: 'IAA'
//     },
//     {
//       value: 'Investment Mgmt Agreement',
//       key: 'FMA'
//     },
//     {
//       value: 'Fund Policy Terms',
//       key: 'PMCProposal'
//     }
//   ],
//   Letters: [
//     {
//       value: 'Manager authorisation',
//       key: 'AuthorisingManagers'
//     },
//     {
//       value: 'Sponsor consultation',
//       key: 'ConsultationSponsor'
//     },
//     {
//       value: 'Actuary consultation',
//       key: 'ConsultationActuary'
//     },
//     {
//       value: 'Manager termination',
//       key: 'ManagerTerminationLetter'
//     }
//   ],
//   Notices: [
//     {
//       value: 'Notices',
//       key: 'Notices'
//     }
//   ],
//   AdditionalReports: [
//     { value: 'Scheme Annual Report', key: 'SchemeAnnualReport' },
//     { value: 'Company Annual Report', key: 'CompanyAnnualReport' },
//     { value: 'tPR Scheme Return', key: 'TPRSchemeReturn' }
//   ],
//   PerformanceReports: [
//     { value: 'Summary Quarterly Report', key: 'Quarterly' },
//     { value: 'Long Form Quarterly Report', key: 'Long form' },
//     { value: 'Ad hoc Report', key: 'Ad hoc' }
//   ]
// };

export const documentStatus = {
    P: '|  Pending',
    A: '|  Approved',
    R: '|  Rejected',
    S: '|  Signed',
    D: '|  Draft'
};

export const DocTypes = {
    MLC_DOC_FMA_FUND_FEE: 'FMA_FUND_FEE',
    MLC_DOC_IAA_ATTACHMENT: 'IAA_ATTACHMENT',
    MLC_DOC_FMA_ATTACHMENT: 'FMA_ATTACHMENT',
    MLC_DOC_DISTRI: 'DISTRI',
    RPT_DOC_AD_HOC: 'Ad hoc',
    RPT_DOC_QUARTERLY: 'Quarterly',
    RPT_DOC_LONG_FORM: 'Long form'
};

export const AttachmentType = {
    iaaAttachment1: 'IAA Attachment 1',
    iaaAttachment2: 'IAA Attachment 2',
    iaaAttachment3: 'IAA Attachment 3',
    iaaAttachment4: 'IAA Attachment 4',
    fmaAttachment4: 'FMA Attachment 4',
    fmaAttachment5: 'FMA Attachment 5',
    fmaAttachment6: 'FMA Attachment 6',
    fmaRiskDisClosuers: 'FMA Risk Disclosures'
};
