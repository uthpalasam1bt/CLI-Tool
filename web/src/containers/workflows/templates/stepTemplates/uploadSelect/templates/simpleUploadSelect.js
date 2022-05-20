import React, { useState, useEffect, Suspense, useRef } from 'react';
import { compose } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getFormValues, getFormSyncErrors, submit, initialize } from 'redux-form';
import _ from 'lodash';

import FormHeaderComponent from '../../../../../../UILibrary/components/forms/formHeader';
import uiLibConstants from '../../../../../../UILibrary/constants';
import constants from '../../../../constants';
import claimHelper from '../../../../../../helpers/claimHelper';
import UploadSelectBase from '../components/UploadSelectBase';
import { STEP_ACTION_PROCEED } from '../../../../constants/workflowConstant';
import NotificationHelper from '../../../../../../UILibrary/helpers/NotificationHelper';

const {
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_REQUEST,
    BUTTON_TITLE_CONTINUE,
    ON_CONTINUE_UPLOAD_MESSAGE,
    ON_DOCUMENT_GENERATE_MESSAGE,
    STEP_ACTION_DATA_SAVE,
    STEP_ACTION_UPDATE_WORKFLOW,
    STEP_ACTION_DOC_UPLOAD,
    STEP_ACTION_UPDATE,
    STEP_ACTION_DATA_CHANGE,
    STATUS_DOCUMENT_UPLOAD,
    STATUS_DOCUMENT_GENERATE,
    ON_EMPTY_DOC_UPLOAD_MESSAGE,
    STEP_UPDATE_TYPE_UPLOAD,
    UPLOAD_SELECT_TYPE_SIMPLE
} = constants;
const { FORM_ACTION_TYPES } = uiLibConstants;

const SimpleUploadSelect = props => {
    const {
        formFieldFunction,
        formName,
        formHooks,
        options: {
            title,
            titleIicon,
            submitButton = true,
            onSubmitMessage = null,
            fetchEntityDataAfterSubmit = null,
            navigateAfterSubmit = null,
            fetchWorkflowAfterSubmit = false
        },
        defaultSelectedDocType = null,
        step,
        dataset,
        submitSimpleForm,
        asyncErrors,
        submitAction = STEP_ACTION_PROCEED,
        updateWorkflowStep_inProgress,
        updateWorkflowStepData,
        artifacts,
        getLoggedUserClaims_data,
        isMultiClient,
        commonUserClaims,
        handleFormSubmit,
        handleChangeDataset,
        loggedUser
    } = props;

    const dispatch = useDispatch();
    const dirtyFormValues = useSelector(getFormValues(formName));
    const [submissionType, setSubmissionType] = useState(null);

    const [selectedDocType, setSelectedDocType] = useState(defaultSelectedDocType);

    const prevDataset = usePrevious(dataset);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    useEffect(() => {
        if (dataset && dataset.formData) {
            if (!prevDataset || !_.isEqual(prevDataset.formData, dataset.formData))
                if (Object.entries(dataset.formData).length  && dataset.formData.radio) dispatch(initialize(formName, dataset.formData, false));
        }

    }, [dataset]);

    useEffect(() => {
        if (dirtyFormValues) {
            setSelectedDocType(_.get(dirtyFormValues, 'radio', defaultSelectedDocType));
        }
        if (formHooks && formHooks.whenFormDataChange && dirtyFormValues) {
            formHooks.whenFormDataChange(dirtyFormValues, dataset, handleChangeDataset, props);
        }
    }, [dirtyFormValues]);

    const handleSubmit = type => {
        setSubmissionType(type);
        if (type === submitAction) {
            formSubmit(dirtyFormValues);
        }
    };

    const formSubmit = formData => {
        let data = formData;
        let message = onSubmitMessage;
        let errors = {};

        if (formHooks && formHooks.whenSubmitDataFormat) data = formHooks.whenSubmitDataFormat(formData, props);
        if (formHooks && formHooks.whenSubmitValidation)
            errors = formHooks.whenSubmitValidation(formData, asyncErrors, dataset);

        if (errors.message) {
            handleSubmit(null);
            return NotificationHelper.getInstance().error(errors.message);
        }

        handleFormSubmit(
            submissionType,
            { formData: { ...data, loggedUser: loggedUser } },
            () => {
                handleSubmit(null);
            },
            message,
            true
        );
    };

    const formHeaderProps = {
        title: title,
        iIconText: titleIicon,
        actions: [
            ...(submitButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.SUBMIT,
                          title: submitButton.title || BUTTON_TITLE_CONTINUE,
                          state: {
                              inProgress: submissionType === submitAction && updateWorkflowStep_inProgress
                          },
                          onClick: () => {
                              handleSubmit(submitAction);
                          },
                          bool:
                              !step.completed &&
                              !step.rejected &&
                              claimHelper.getPermission(
                                  isMultiClient ? commonUserClaims : getLoggedUserClaims_data,
                                  step,
                                  submitAction
                              ),
                          disabled: _.get(submitButton, 'disabled', false)
                      }
                  ]
                : [])
        ],
        artifacts: artifacts
    };

    return (
        <>
            <FormHeaderComponent {...formHeaderProps} />
            <UploadSelectBase
                className="generate-iaa-manager-letters-form"
                formName={formName}
                formFieldData={formFieldFunction({ ...dirtyFormValues, ...props })}
                selectedDocType={selectedDocType}
                onSubmit={formSubmit}
                dataset={dataset}
                formType={UPLOAD_SELECT_TYPE_SIMPLE}
                formHooks={formHooks}
                artifacts={artifacts}
                {...props}
                setSelectedDocType={setSelectedDocType}
            />
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    simpleFormData: getFormValues(ownProps.formName)(state),
    asyncErrors: getFormSyncErrors(ownProps.formName)(state)
});

const mapDispatchToProps = dispatch => ({
    submitSimpleForm: formName => {
        dispatch(submit(formName));
    }
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(SimpleUploadSelect);
