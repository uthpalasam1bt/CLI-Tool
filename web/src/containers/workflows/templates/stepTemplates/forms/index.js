import React from 'react';
import CreateForm from '../../../../../UILibrary/components/forms';
import uiLibConstants from '../../../../../UILibrary/constants';
import constants from '../../../constants';
import claimHelper from '../../../../../helpers/claimHelper';

const { STEP_UPDATE_TYPE_ACTIVE, STEP_ACTION_PROCEED, STEP_ACTION_DATA_CHANGE } = constants;
const { DATA_SAVE_ACTION } = uiLibConstants;

let FormTemplate = props => {
    const {
        options: { fetchEntityDataAfterSubmit = false, navigateAfterSubmit = false, fetchWorkflowAfterSubmit = false },
        step,
        updateWorkflowStep_inProgress,
        updateWorkflowStepData,
        getLoggedUserClaims_data,
        commonUserClaims,
        updateType = STEP_UPDATE_TYPE_ACTIVE
    } = props;

    const formSubmit = (action, formData, cb, message, fetchWorkflows = false) => {
        let submissionType = STEP_ACTION_PROCEED;
        if (action == DATA_SAVE_ACTION) submissionType = STEP_ACTION_DATA_CHANGE;
        updateWorkflowStepData(
            submissionType,
            formData,
            cb,
            { message, fetchEntityDataAfterSubmit, navigateAfterSubmit, fetchWorkflowAfterSubmit: fetchWorkflows || fetchWorkflowAfterSubmit },
            submissionType === STEP_ACTION_PROCEED && updateType
        );
    };

    return (
        <>
            <CreateForm
                {...props}
                handleFormSubmit={formSubmit}
                action_inProgress={updateWorkflowStep_inProgress}
                disabled={step.completed || step.rejected || props.disabled}
                options={{
                    ...props.options,
                    saveButton: props.options.saveButton
                        ? {
                              ...props.options.saveButton,
                              showButton:
                                  !step.completed &&
                                  !step.rejected &&
                                  claimHelper.getPermission(
                                      props.isMultiClient ? commonUserClaims : getLoggedUserClaims_data,
                                      step,
                                      STEP_ACTION_DATA_CHANGE
                                  )
                          }
                        : false,
                    submitButton: props.options.submitButton
                        ? {
                              ...props.options.submitButton,
                              showButton:
                                  !step.completed &&
                                  !step.rejected &&
                                  claimHelper.getPermission(
                                      props.isMultiClient ? commonUserClaims : getLoggedUserClaims_data,
                                      step,
                                      STEP_ACTION_PROCEED
                                  )
                          }
                        : false
                }}
            />
        </>
    );
};

export default FormTemplate;
