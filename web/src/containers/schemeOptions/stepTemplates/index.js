import React from 'react';
import { connect } from 'react-redux';
import StepConfig from './stepConfig';
import CreateWokFlowSteps from '../../workflows/templates/workflowTemplates';
import { GENERATE_WORKFLOW_STEPS_TYPE_MULTIPLE_WORKFLOWS } from '../../workflows/constants/workflowConstant';
const Sample = props => {
    return (
        <CreateWokFlowSteps
            workflowType={GENERATE_WORKFLOW_STEPS_TYPE_MULTIPLE_WORKFLOWS}
            StepConfig={StepConfig}
            isMultiClient={false}
            entityId={props.schemeId}
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
