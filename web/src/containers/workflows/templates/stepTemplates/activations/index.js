import React from 'react';
import CreateActiveMandate from '../../../../../UILibrary/components/activations';
import constants from '../../../constants';
import uiLibConstants from '../../../../../UILibrary/constants';
import claimHelper from '../../../../../helpers/claimHelper';

const {
    STEP_UPDATE_TYPE_ACTIVE,
    STEP_ACTION_DATA_CHANGE,
    STEP_ACTION_ACTIVATE,
    STEP_ACTION_TERMINATE_MANDATE
} = constants;
const { DATA_SAVE_ACTION, DEACTIVATE_ACTION, DEACTIVATE_ACCOUNT } = uiLibConstants;

const ActiveMandateTemplate = props => {
    const {
        activationType,
        options: { fetchEntityDataAfterSubmit = false, navigateAfterSubmit = false, fetchWorkflowAfterSubmit = false },
        updateWorkflowStepData,
        updateWorkflowStep_inProgress,
        step,
        getLoggedUserClaims_data,
        updateType = STEP_UPDATE_TYPE_ACTIVE
    } = props;

    const formSubmit = (action, data, cb, message, fetchWorkFlows = false) => {
        let submissionType = STEP_ACTION_ACTIVATE;
        if (action == DATA_SAVE_ACTION) submissionType = STEP_ACTION_DATA_CHANGE;
        else if (action == DEACTIVATE_ACTION) submissionType = STEP_ACTION_TERMINATE_MANDATE;
        updateWorkflowStepData(
            submissionType,
            data,
            cb,
            { message, fetchEntityDataAfterSubmit, navigateAfterSubmit, fetchWorkflowAfterSubmit: fetchWorkflowAfterSubmit || fetchWorkFlows },
            submissionType === STEP_ACTION_ACTIVATE && updateType
        );
    };

    return (
        <CreateActiveMandate
            {...props}
            handleFormSubmit={formSubmit}
            action_inProgress={updateWorkflowStep_inProgress}
            options={{
                ...props.options,
                saveButton: props.options.saveButton
                    ? {
                          ...props.options.saveButton,
                          showButton:
                              !step.completed &&
                              !step.rejected &&
                              claimHelper.getPermission(getLoggedUserClaims_data, step, STEP_ACTION_DATA_CHANGE)
                      }
                    : false,
                submitButton: props.options.submitButton
                    ? {
                          ...props.options.submitButton,
                          showButton:
                              !step.completed &&
                              !step.rejected &&
                              claimHelper.getPermission(
                                  getLoggedUserClaims_data,
                                  step,
                                  activationType === DEACTIVATE_ACCOUNT
                                      ? STEP_ACTION_TERMINATE_MANDATE
                                      : STEP_ACTION_ACTIVATE
                              )
                      }
                    : false
            }}
        />
    );
};

export default ActiveMandateTemplate;
