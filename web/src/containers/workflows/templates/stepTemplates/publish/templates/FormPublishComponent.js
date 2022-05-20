import React, { useEffect } from 'react';
import { getFormValues, initialize, getFormSyncErrors } from 'redux-form';
import { connect, useSelector, useDispatch } from 'react-redux';

import FormHeaderComponent from '../../../../../../UILibrary/components/forms/formHeader';
import FormGenerator from '../../../../../../UILibrary/components/forms/formBase';
import uiLibConstants from '../../../../../../UILibrary/constants';

import ClaimHelper from '../../../../../../helpers/claimHelper';
import constants from '../../../../constants';

const { ON_PUBLISH_MESSAGE, GENERATE_FORMS_TYPE_SIMPLE, STEP_ACTION_PUBLISH } = constants;
const { FORM_ACTION_TYPES } = uiLibConstants;

const FormPublishComponent = props => {
    const {
        formName,
        dataset,
        // document,
        formFieldData,
        formFieldFunction,
        // simpleFormData,
        disabled,
        artifacts,
        options: {
            title,
            titleIicon = null,
            fetchEntityDataAfterSubmit = false,
            navigateAfterSubmit = false,
            onSubmitMessage = ON_PUBLISH_MESSAGE
        },
        updateWorkflowStepData,
        updateWorkflowStep_inProgress,
        step,
        getLoggedUserClaims_data
        // asyncErrors
    } = props;

    const dispatch = useDispatch();
    const dirtyFormValues = useSelector(getFormValues(formName));

    useEffect(() => {
        if (dataset.formData) {
            dispatch(initialize(formName, dataset.formData));
        }
    }, [dataset.formData]);

    const publish = submissionType => {
        const message = onSubmitMessage;

        updateWorkflowStepData(submissionType, {}, () => {}, {
            message,
            fetchEntityDataAfterSubmit,
            navigateAfterSubmit
        });
    };

    const formHeaderProps = {
        title: title,
        iIconText: titleIicon,
        actions: [
            {
                type: FORM_ACTION_TYPES.PUBLISH,
                state: { inProgress: updateWorkflowStep_inProgress },
                onClick: () => {
                    publish(STEP_ACTION_PUBLISH);
                },
                bool:
                    !step.completed &&
                    !step.rejected &&
                    ClaimHelper.getPermission(getLoggedUserClaims_data, step, STEP_ACTION_PUBLISH)
            }
        ],
        artifacts: artifacts
    };
    return (
        <>
            <FormHeaderComponent {...formHeaderProps} />
            <FormGenerator
                className="generate-iaa-manager-letters-form"
                name={formName}
                formType={GENERATE_FORMS_TYPE_SIMPLE}
                formFieldData={
                    formFieldData
                        ? formFieldData
                        : formFieldFunction
                        ? formFieldFunction({ ...dirtyFormValues, ...props })
                        : null
                }
                artifacts={artifacts}
                disabled={disabled}
            />
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    simpleFormData: getFormValues(ownProps.formName)(state),
    asyncErrors: getFormSyncErrors(ownProps.formName)(state)
});

export default connect(
    mapStateToProps,
    null
)(FormPublishComponent);
