import React from 'react';
import CreateDownloadUis from '../../../../../UILibrary/components/downloadUIs';
import uiLibConstants from '../../../../../UILibrary/constants';
import constants from '../../../constants';
import claimHelper from '../../../../../helpers/claimHelper';
import config from 'appConfig';

const { STEP_ACTION_PROCEED } = constants;
const { SUBMIT_ACTION } = uiLibConstants;
const { bucket: privateBucketName, publicBucket: publicBucketName } = config;

const DownloadsTemplate = props => {
    const {
        options: { fetchEntityDataAfterSubmit = false, navigateAfterSubmit = false, fetchWorkflowAfterSubmit = false },
        updateWorkflowStepData,
        updateWorkflowStep_inProgress,
        step,
        getLoggedUserClaims_data,
        downloadOptions: { isPublicBucket = false }
    } = props;

    const formSubmit = (action, data, cb, message, fectWorkflows = false) => {
        let submissionType;
        if (action == SUBMIT_ACTION) submissionType = STEP_ACTION_PROCEED;
        updateWorkflowStepData(submissionType, data, cb, {
            message,
            fetchEntityDataAfterSubmit,
            navigateAfterSubmit,
            fetchWorkflowAfterSubmit: fetchWorkflowAfterSubmit || fectWorkflows
        });
    };

    return (
        <CreateDownloadUis
            {...props}
            handleFormSubmit={formSubmit}
            action_inProgress={updateWorkflowStep_inProgress}
            disabled={step.completed || step.rejected || props.disabled}
            options={{
                ...props.options,
                submitButton: props.options.submitButton
                    ? {
                          ...props.options.submitButton,
                          showButton:
                              !step.completed &&
                              !step.rejected &&
                              claimHelper.getPermission(getLoggedUserClaims_data, step, STEP_ACTION_PROCEED)
                      }
                    : false
            }}
            downloadOptions={{
                ...props.downloadOptions,
                bucketName: isPublicBucket ? publicBucketName : privateBucketName
            }}
        />
    );
};

export default DownloadsTemplate;
