import AwsIotSingleton from './../../helpers/awsIot';

export const AFFECTED_USER_TYPES = {
    LGIM: 'lgim',
    CLIENT: 'client',
    ADVISARY: 'advisor',
    TRUSTEE: 'trustee',
    SPECIAL_ADVISARY: 'special_advisary',
    ALL: 'all'
};
export const TYPES = {
    DRAFT_SAVE: 0,
    STEP_COMPLETE: 1,
    USER_ASSIGN: 2,
    SCHEME_REFRESH: 3,
    ABORT_WORKFLOW: 4,
    COLLAPSE_WORKFLOW: 5
};

const generateTopicForReportWorkflow = tabId => {
    return `/notification/${tabId}/reportworkflow`;
};

const listenToReportWorkflowSatusChange = (tabId, callback) => {
    AwsIotSingleton.getPayloadFromSocket(generateTopicForReportWorkflow(tabId), callback);
};

const unsubscribeReportWorkflowChangeListener = tabId => {
    AwsIotSingleton.unsubscribeSocket(generateTopicForReportWorkflow(tabId));
};

export { generateTopicForReportWorkflow, listenToReportWorkflowSatusChange, unsubscribeReportWorkflowChangeListener };
