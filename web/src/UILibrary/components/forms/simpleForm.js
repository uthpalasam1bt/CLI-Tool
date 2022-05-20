import React, { useState, useEffect, useRef } from 'react';
import { compose } from 'redux';
import { getFormValues, submit, initialize, getFormSyncErrors } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import _ from 'lodash';

import NotificationHelper from '../../helpers/NotificationHelper';
import FormGenerator from './formBase';
import FormHeaderComponent from './formHeader';
import ValidationModule from '../../validation-module';
import constants from '../../constants';

const {
    GENERATE_FORMS_TYPE_SIMPLE,
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_REQUEST,
    ON_SUBMIT_MESSAGE,
    ON_SAVE_MESSAGE,
    DATA_SAVE_ACTION,
    SUBMIT_ACTION,
    FORM_ACTION_TYPES
} = constants;

let SimpleForm = props => {
    const {
        submitSimpleForm,
        formFieldData,
        formFieldFunction,
        formName,
        formHooks,
        disabled,
        options: {
            title = null,
            titleIicon = null,
            saveButton = true,
            submitButton = true,
            onSubmitMessage = ON_SUBMIT_MESSAGE,
            onSaveMessage = ON_SAVE_MESSAGE
        },
        action_inProgress,
        dataset,
        asyncErrors,
        submitAction = SUBMIT_ACTION,
        handleFormSubmit,
        handleChangeDataset,
        artifacts
    } = props;

    const dispatch = useDispatch();
    const dirtyFormValues = useSelector(getFormValues(formName));
    const [submissionType, setSubmissionType] = useState(null);
    const [submitLoaderActive, setSubmitLoaderActive] = useState(false);
    const [saveLoaderActive, setSaveLoaderActive] = useState(false);

    const prevDataset = usePrevious(dataset);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    useEffect(() => {
        if (submissionType === submitAction) {
            submitSimpleForm(formName);
            if (!_.isEmpty(asyncErrors)) {
                setSubmissionType(null);
            }
        } else if (submissionType) {
            formSubmit(dirtyFormValues);
        }
    }, [submissionType]);

    useEffect(() => {
        if (dataset && dataset.formData) {
            if (!prevDataset || !_.isEqual(prevDataset.formData, dataset.formData))
                dispatch(initialize(formName, dataset.formData));
        }
    }, [dataset]);

    useEffect(() => {
        if (formHooks && formHooks.whenFormDataChange && dirtyFormValues) {
            formHooks.whenFormDataChange(dirtyFormValues, dataset, handleChangeDataset, props);
        }
    }, [dirtyFormValues]);

    const handleSubmit = type => {
        setSubmissionType(type);
    };

    const formSubmit = formData => {
        const formFlds = formFieldFunction && formFieldFunction(formData);
        let data = ValidationModule.removeInvalidData(formData, formFieldData, formFlds);
        let message = onSaveMessage;
        let errors = {};
        let fetchWorkflows = false;

        if (submissionType === submitAction) {
            message = onSubmitMessage;
            fetchWorkflows = true;
            if (formHooks && formHooks.whenSubmitDataFormat) data = formHooks.whenSubmitDataFormat(data, props);
            if (formHooks && formHooks.whenSubmitValidation)
                errors = formHooks.whenSubmitValidation(data, asyncErrors, dataset);
        }

        if (submissionType === DATA_SAVE_ACTION) {
            if (formHooks && formHooks.whenSaveDataFormat) data = formHooks.whenSaveDataFormat(data, props);
            if (formHooks && formHooks.whenSaveValidation)
                errors = formHooks.whenSaveValidation(data, asyncErrors, dataset);
        }

        if (errors.message) {
            handleSubmit(null);
            return NotificationHelper.getInstance().error(errors.message);
        }

        if (submissionType === submitAction && formHooks && formHooks.submitAsCallback) {
            setSubmitLoaderActive(true);
            formHooks.submitAsCallback(
                () => {
                    setSubmitLoaderActive(false);
                    submitCb(data, message, fetchWorkflows);
                },
                () => {
                    setSubmitLoaderActive(false);
                    handleSubmit(null);
                },
                data
            );
        } else if (submissionType === DATA_SAVE_ACTION && formHooks && formHooks.saveAsCallback) {
            setSaveLoaderActive(true);
            formHooks.saveAsCallback(
                () => {
                    setSaveLoaderActive(false);
                    submitCb(data, message);
                },
                () => {
                    setSaveLoaderActive(false);
                    handleSubmit(null);
                },
                data
            );
        } else {
            submitCb(data, message, fetchWorkflows);
        }
    };

    const submitCb = (data, message, fetchWorkflows = false) => {
        handleFormSubmit(
            submissionType,
            { formData: data },
            () => {
                handleSubmit(null);
            },
            message,
            fetchWorkflows
        );
    };

    const formHeaderProps = {
        title: title,
        iIconText: titleIicon,
        actions: [
            ...(saveButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.SAVE,
                          title: saveButton.title || BUTTON_TITLE_SAVE,
                          state: {
                              inProgress: submissionType === DATA_SAVE_ACTION && (action_inProgress || saveLoaderActive)
                          },
                          onClick: () => {
                              handleSubmit(DATA_SAVE_ACTION);
                          },
                          bool: saveButton.showButton,
                          disabled: _.get(saveButton, 'disabled', false)
                      }
                  ]
                : []),
            ...(submitButton
                ? [
                      {
                          type: submitButton.type || FORM_ACTION_TYPES.SUBMIT,
                          title: submitButton.title || BUTTON_TITLE_REQUEST,
                          state: {
                              inProgress: submissionType === submitAction && (action_inProgress || submitLoaderActive)
                          },
                          onClick: () => {
                              handleSubmit(submitAction);
                          },
                          bool: submitButton.showButton,
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
            <FormGenerator
                className="generate-iaa-manager-letters-form"
                onSubmit={formSubmit}
                name={formName}
                formFieldData={
                    formFieldData
                        ? formFieldData
                        : formFieldFunction
                        ? formFieldFunction({ ...dirtyFormValues, ...props })
                        : null
                }
                formType={GENERATE_FORMS_TYPE_SIMPLE}
                formHooks={formHooks}
                disabled={disabled}
                artifacts={artifacts}
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
)(SimpleForm);
