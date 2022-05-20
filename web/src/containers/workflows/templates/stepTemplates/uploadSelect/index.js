import React from 'react';

import SimpleUploadSelect from './templates/simpleUploadSelect';

import constants from '../../../constants';

const { UPLOAD_SELECT_TYPE_SINGLE_PAGE, STEP_ACTION_PROCEED } = constants;

const CreateUploadSelect = props => {
    const {
        formType,
        fetchEntityDataAfterSubmit,
        navigateAfterSubmit,
        fetchWorkflowAfterSubmit,
        updateWorkflowStepData
    } = props;

    const formSubmit = (action, formData, cb, message, fetchWorkflows = false) => {
        const submissionType = action ? action : STEP_ACTION_PROCEED;

        updateWorkflowStepData(submissionType, formData, cb, {
            message,
            fetchEntityDataAfterSubmit,
            navigateAfterSubmit,
            fetchWorkflowAfterSubmit: fetchWorkflows || fetchWorkflowAfterSubmit
        });
    };

    return (
        <>
            {formType === UPLOAD_SELECT_TYPE_SINGLE_PAGE ? (
                <SimpleUploadSelect {...props} handleFormSubmit={formSubmit} />
            ) : null}
        </>
    );
};

export default CreateUploadSelect;
