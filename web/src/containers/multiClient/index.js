import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';

import CreateWokFlowSteps from '../workflows/templates/workflowTemplates';
import StepConfig from './stepConfig';
import constants from '../workflows/constants';

import { commonUserClaims } from '../dashboard/UserManagement/selector';
import { requestGetCommonClaims } from '../dashboard/UserManagement/actions';

const { GENERATE_WORKFLOW_STEPS_TYPE_MULTIPLE_WORKFLOWS } = constants;
const MultiClient = props => {
    const { loggedUser } = props;

    const commonUserClaims_data = useSelector(state => commonUserClaims(state));

    useEffect(() => {
        props.requestGetCommonClaims({ email: loggedUser.email, userType: loggedUser.userType });
    }, []);

    return (
        <div className="content clearfix">
            <div className="container">
                <CreateWokFlowSteps
                    workflowType={GENERATE_WORKFLOW_STEPS_TYPE_MULTIPLE_WORKFLOWS}
                    StepConfig={StepConfig}
                    // entityId={'cngfmfees'}
                    workflowCreatorTitle={"Multiclient Updates"}
                    isMultiClient={true}
                    commonUserClaims={commonUserClaims_data}
                    {...props}
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    requestGetCommonClaims: (payload) => dispatch(requestGetCommonClaims(payload))
});

export default connect(
    null,
    mapDispatchToProps
)(MultiClient);
