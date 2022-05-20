import AwsIotSingleton from './awsIot';
import BrowserStorage from '../middlewares/storage';

/* SOCKET METHODS FOR REALTIME SCENARIOS ARE DEFNINED IN HERE */

export const TYPES = {
    DRAFT_SAVE: 0,
    STEP_COMPLETE: 1,
    ABORT_WORKFLOW: 4,
    COLLAPSE_WORKFLOW: 5,
    USER_ASSIGN: 6
};

const generateTopicForStepChange = () => {
    return '/multiclient';
};

const notifyWorkflowStepStatusChange = (workflowId, stepId, type, message = '', silentMode = false) => {
    const channel = generateTopicForStepChange();
    if (!Object.values(TYPES).some(v => v === type)) throw new Error(`type should be one of predefined types ${TYPES}`);
    let userSession = BrowserStorage.getInstance().getUserSession();
    let email = userSession.loggedUser.email;
    let name = userSession.loggedUser.name;
    let sessionId = userSession.loggedUser.sessionId;
    const iotMessage = {
        type,
        workflowId,
        stepId, //change happened in this step
        email,
        name,
        message,
        sessionId,
        silentMode
    };
    AwsIotSingleton.publishPayloadWithinSocket(channel, iotMessage);
};

const listenToWorkflowSatusChange = callback => {
    AwsIotSingleton.getPayloadFromSocket(generateTopicForStepChange(), callback);
};

const unsubscribeWorkflowChangeListener = () => {
    AwsIotSingleton.unsubscribeSocket(generateTopicForStepChange());
};

const generateTopicForApppRejComment = (stepId, call) => {
    return `wf-multiClient-${stepId}-comment`;
};

const notififyApproveRejectComment = (stepId, schemeId) => {
    let topic = generateTopicForApppRejComment(stepId, schemeId);
    let userSession = BrowserStorage.getInstance().getUserSession();
    let email = userSession.loggedUser.email;
    let payload = {
        senderEmail: email
    };
    AwsIotSingleton.publishPayloadWithinSocket(topic, payload);
};

const listenToApproveRejectComment = (stepId, callback) => {
    AwsIotSingleton.getPayloadFromSocket(generateTopicForApppRejComment(stepId), callback);
};

const unsubscribeApproveRejCommentListener = (stepId, multiClient) => {
    AwsIotSingleton.unsubscribeSocket(generateTopicForApppRejComment(stepId));
};

const notifyAssignUserChange = (workflowId, stepId, assignedUserEmail) => {
    notifyWorkflowStepStatusChange(workflowId, stepId, TYPES.USER_ASSIGN, assignedUserEmail);
};

export {
    notifyWorkflowStepStatusChange,
    listenToWorkflowSatusChange,
    unsubscribeWorkflowChangeListener,
    notififyApproveRejectComment,
    listenToApproveRejectComment,
    unsubscribeApproveRejCommentListener,
    notifyAssignUserChange
};
