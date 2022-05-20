import React from 'react';
import { connect } from 'react-redux';

import CreateWokFlowSteps from '../../workflows/templates/workflowTemplates';
import StepConfig from './stepConfig';
import constants from '../../workflows/constants';
const { GENERATE_WORKFLOW_STEPS_TYPE_MULTIPLE_WORKFLOWS } = constants;
const Sample = props => {
    return (
        <CreateWokFlowSteps
            workflowType={GENERATE_WORKFLOW_STEPS_TYPE_MULTIPLE_WORKFLOWS}
            StepConfig={StepConfig}
            entityId={props.schemeId}
            isMultiClient={false}
            {...props}
        />
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
    null,
    null
)(Sample);
