import React from 'react';
import SingleWorkflowCreator from './singleWorkflowCreater';
import MultipleWorkflowCreator from './multipleWorkflowCreater';

import constants from '../../constants';
const { GENERATE_WORKFLOW_STEPS_TYPE_SINGLE, GENERATE_WORKFLOW_STEPS_TYPE_MULTIPLE_WORKFLOWS } = constants;
const CreateWokFlowSteps = props => {
    const { workflowType } = props;

    return workflowType === GENERATE_WORKFLOW_STEPS_TYPE_SINGLE ? (
        <SingleWorkflowCreator {...props} />
    ) : workflowType === GENERATE_WORKFLOW_STEPS_TYPE_MULTIPLE_WORKFLOWS ? (
        <MultipleWorkflowCreator {...props} />
    ) : null;
};

export default CreateWokFlowSteps;
