import AwsIotSingleton from './awsIot';
import BrowserStorage from '../middlewares/storage';

/* SOCKET METHODS FOR REALTIME SCENARIOS ARE DEFNINED IN HERE */

export const TYPES = {
    DRAFT_SAVE: 0,
    STEP_COMPLETE: 1,
    USER_ASSIGN: 2,
    SCHEME_REFRESH: 3,
    ABORT_WORKFLOW: 4,
    COLLAPSE_WORKFLOW: 5
};

export const AFFECTED_USER_TYPES = {
    LGIM: 'lgim',
    CLIENT: 'client',
    ADVISARY: 'advisor',
    TRUSTEE: 'trustee',
    SPECIAL_ADVISARY: 'special_advisary',
    ALL: 'all'
};

const generateTopicForStepChange = schemeId => {
    return `/notification/${schemeId}/activeWorkflow`;
};

const notifyWorkflowStepStatusChange = (
    schemeId,
    workflowId,
    stepId,
    type,
    affectedUserTypes = [AFFECTED_USER_TYPES.ALL],
    message = '',
    ignoreSessionId,
    silentMode,
    StepToComponentMap // pass workflowId-steps map
) => {
    const channel = generateTopicForStepChange(schemeId);
    // if (!(type === TYPES.DRAFT_SAVE || type === TYPES.STEP_COMPLETE)) {
    //   throw new Error(`type should be one of predefined types ${TYPES}`);
    // }
    if (!Object.values(TYPES).some(v => v === type)) throw new Error(`type should be one of predefined types ${TYPES}`);
    let userSession = BrowserStorage.getInstance().getUserSession();
    let email = userSession.loggedUser.email;
    let name = userSession.loggedUser.name;
    let userRole = userSession.loggedUser.primaryRole;
    let sessionId = ignoreSessionId ? null : userSession.loggedUser.sessionId;
    const iotMessage = {
        type,
        schemeId,
        workflowId,
        stepId, //change happened in this step
        email,
        name,
        userRole,
        affectedSteps: retriveStepsAffected(stepId, workflowId, type, StepToComponentMap), //orginal step change affects these steps
        affectedUserTypes: retrieveAffectedUserTypes(stepId, workflowId, type, StepToComponentMap)
            ? retrieveAffectedUserTypes(stepId, workflowId, type, StepToComponentMap)
            : affectedUserTypes
            ? affectedUserTypes
            : null,
        message,
        sessionId,
        silentMode
    };
    AwsIotSingleton.publishPayloadWithinSocket(channel, iotMessage);
};

const retriveStepsAffected = (orginatedStep, workflowId, notifyType, StepToComponentMap) => {
    const StepComponent = StepToComponentMap[workflowId]
        ? StepToComponentMap[workflowId][orginatedStep]
            ? StepToComponentMap[workflowId][orginatedStep]._result
            : null
        : null;
    if (!StepComponent) {
        return;
    }

    return StepComponent.concurrecyAffects
        ? notifyType === TYPES.STEP_COMPLETE
            ? StepComponent.concurrecyAffects.whenStepComplete
            : null // if need more types put here
        : null;
};

const retrieveAffectedUserTypes = (orginatedStep, workflowId, notifyType, StepToComponentMap) => {
    const StepComponent = StepToComponentMap[workflowId]
        ? StepToComponentMap[workflowId][orginatedStep]
            ? StepToComponentMap[workflowId][orginatedStep]._result
            : null
        : null;
    if (!StepComponent) {
        return;
    }

    return StepComponent.concurrecyAffects
        ? notifyType === TYPES.STEP_COMPLETE
            ? StepComponent.concurrecyAffects.affectedUserTypes
            : null // if need more types put here
        : null;
};

const listenToWorkflowSatusChange = (schemeId, callback) => {
    AwsIotSingleton.getPayloadFromSocket(generateTopicForStepChange(schemeId), callback);
};

const unsubscribeWorkflowChangeListener = schemeId => {
    AwsIotSingleton.unsubscribeSocket(generateTopicForStepChange(schemeId));
};

const generateTopicForUserAssign = schemeId => {
    return `wf-${schemeId}-user-assign`;
};

const notifyAssignUserChange = (schemeId, workflowId, stepId, assignedUserEmail) => {
    const topic = generateTopicForUserAssign(schemeId);
    const message = {
        type: TYPES.USER_ASSIGN,
        workflowId,
        stepId,
        assignedUserEmail: assignedUserEmail
    };
    AwsIotSingleton.publishPayloadWithinSocket(topic, message);
};

const listenToAssignUserChange = (schemeId, callback) => {
    const topic = generateTopicForUserAssign(schemeId);
    AwsIotSingleton.getPayloadFromSocket(topic, callback);
};

const unsubscribeListenToUserAssign = schemeId => {
    AwsIotSingleton.unsubscribeSocket(generateTopicForUserAssign(schemeId));
};

const generateTopicForApppRejComment = (schemeId, stepId) => {
    return `wf-${schemeId}-${stepId}-comment`;
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

const listenToApproveRejectComment = (stepId, schemeId, callback) => {
    AwsIotSingleton.getPayloadFromSocket(generateTopicForApppRejComment(stepId, schemeId), callback);
};

const unsubscribeApproveRejCommentListener = (stepId, schemeId) => {
    AwsIotSingleton.unsubscribeSocket(generateTopicForApppRejComment(stepId, schemeId));
};

export {
    notifyWorkflowStepStatusChange,
    listenToWorkflowSatusChange,
    unsubscribeWorkflowChangeListener,
    notifyAssignUserChange,
    listenToAssignUserChange,
    unsubscribeListenToUserAssign,
    notififyApproveRejectComment,
    listenToApproveRejectComment,
    unsubscribeApproveRejCommentListener
};
