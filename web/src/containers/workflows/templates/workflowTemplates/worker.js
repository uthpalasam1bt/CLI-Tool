import _ from 'lodash';
import React from 'react';

import { getPrimaryRole } from '../../../../helpers/validateUser';

// import completeIcon_svg from '../../../../assets/images/scheme/task-completed.svg';
// import progressIcon_svg from '../../../../assets/images/scheme/task-inprogress.svg';
// import pendingIcon_svg from '../../../../assets/images/scheme/task-pending.svg';
// import rejectedIcon_svg from '../../../../assets/images/scheme/task-rejected.svg';

import completeIcon from '../../../../assets/images/scheme/task-completed.png';
import progressIcon from '../../../../assets/images/scheme/task-inprogress.png';
import pendingIcon from '../../../../assets/images/scheme/task-pending.png';
import rejectedIcon from '../../../../assets/images/scheme/task-rejected.png';
import ClaimHelper from '../../../../helpers/claimHelper';

export const generateStepMap = ({ doSort, workflow = [], currentPosition, loggedUser }) => {
    if (_.isEmpty(workflow)) return {};

    workflow = workflow.filter(wf => {
        return wf[getPrimaryRole(loggedUser)];
    });

    if (doSort) workflow = _.orderBy(workflow, ['sortKey', 'asc']);
    const currentStepIndex = workflow.findIndex(wf => wf.stepKey === currentPosition);
    const currentStep = workflow.find(step => step.stepKey === currentPosition);

    // if (!currentStep.enabled) return null;
    return { workflow, activeStep: { index: currentStepIndex, step: currentStep } };
};

export const singleWorkflowInitialStepMap = ({ doSort, workflows = [], currentPosition, loggedUser }) => {
    if (workflows && !workflows.length) return {};

    let currentKey = currentPosition ? currentPosition : workflows[0].currentPosition;

    let steps = workflows[0].steps.filter(wf => {
        return wf[getPrimaryRole(loggedUser)];
    });

    if (doSort) steps = _.orderBy(steps, ['sortKey', 'asc']);

    const currentStepIndex = steps.findIndex(wf => wf.stepKey === currentKey);
    const currentStep = steps.find(step => step.stepKey === currentKey);

    return { steps, activeStep: { index: currentStepIndex, step: currentStep } };
};

export const stepMap = ({ doSort, steps = [], currentPosition, loggedUser }) => {
    if (steps && !steps.length) return {};

    let formattedSteps = steps.filter(wf => {
        return wf[getPrimaryRole(loggedUser)];
    });

    if (doSort) formattedSteps = _.orderBy(formattedSteps, ['sortKey', 'asc']);

    const currentStepIndex = formattedSteps.findIndex(wf => wf.stepKey === currentPosition);
    const currentStep = steps.find(step => step.stepKey === currentPosition);

    return { steps, activeStep: { index: currentStepIndex, step: currentStep } };
};

export const multipleWorkflowMap = ({ doSort, workflows = [], currentWorkFlows = [], loggedUser }) => {
    return {};
};

export const multipleWorkflowStepMap = ({ workflow = [], positionStep }) => {
    let currentStepIndex = -1;
    if (!workflow.steps) return -1;

    if (workflow.steps && positionStep)
        currentStepIndex = workflow.steps.filter(step => step.visible).findIndex(step => step.stepKey === positionStep);

    if (workflow.steps && workflow.currentPosition && !positionStep)
        currentStepIndex = workflow.steps
            .filter(step => step.visible)
            .findIndex(step => step.stepKey === workflow.currentPosition);

    return currentStepIndex;
};

export const sortAndFilterMultiWF = props => {
    const { workflows = [], doFilter, primaryRole } = props;

    let sortWorkflows = [];
    let nonSortWorkflows = [];
    let tempWorkflows = [];
    if (workflows.length) {
        workflows.map(flow => {
            if (flow.sort) {
                sortWorkflows.push(flow);
            } else {
                nonSortWorkflows.push(flow);
            }
        });
        sortWorkflows = _.orderBy(sortWorkflows, ['sort', 'asc']);

        nonSortWorkflows = _.orderBy(nonSortWorkflows, [flow => flow.workflowKey.toLowerCase()], ['asc']);

        tempWorkflows = [...sortWorkflows, ...nonSortWorkflows];
        if (doFilter && primaryRole) {
            tempWorkflows = tempWorkflows.filter(flow => flow.enabledRoles && flow.enabledRoles.includes(primaryRole));
        }
    }

    if (tempWorkflows.length) {
        for (let flow of tempWorkflows) {
            let steps = flow.steps && flow.steps.length ? _.orderBy(flow.steps, ['sort', 'asc']) : [];
            if (doFilter && primaryRole) {
                steps = steps.filter(step => step.enabledRoles && step.enabledRoles.includes(primaryRole));
            }
            let currentPosition = flow.currentPosition;
            let currentStepIsAvailable = currentPosition ? steps.find(step => step.stepKey === currentPosition) : true;
            if (!currentStepIsAvailable) {
                const descOrder = _.orderBy(steps, ['sort', 'desc']);
                for (let or of descOrder) {
                    if (or.enabled) {
                        currentPosition = or.stepKey;
                        break;
                    }
                }
            }
            const workflowIndex = tempWorkflows.findIndex(a => a.workflowKey === flow.workflowKey);
            tempWorkflows[workflowIndex].steps = steps;
            tempWorkflows[workflowIndex].currentPosition = currentPosition;
        }
    }
    return tempWorkflows;
};

export const stepIcon = (workflowStep, currentPosition) =>
    workflowStep.completed
        ? completeIcon
        : workflowStep.rejected
        ? rejectedIcon
        : workflowStep.stepKey === currentPosition || workflowStep.enabled
        ? progressIcon
        : pendingIcon;

// Expiremental func to figure out if user has access to a particular step
export const isUserHasClaimForStep = step => {
    // console.log('step before', step);
    if (!step) return;
    let { claims: _claims = {} } = step;
    let claims = { ..._claims };
    const filterValues = ['changeAssignUser', 'toBeAssignee', 'viewAssignUser'];
    filterValues.forEach(v => {
        delete claims[v];
    });
    return Object.values(claims).some(claim => ClaimHelper.checkIfUserHasClaim(claim));
};
