import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { getFormValues, submit, initialize, getFormSyncErrors } from 'redux-form';
import { useDispatch, useSelector, connect } from 'react-redux';
import _ from 'lodash';

import constants from '../../../constants';
import FormGenerator from '../../forms/formBase';
import FormHeaderComponent from '../../forms/formHeader';
import NotificationHelper from '../../../helpers/NotificationHelper';
import ValidationModule from '../../../validation-module';
import { simpleFormDataDownloader } from '../../../helpers/FormDownloadHelper';
import { downloadFile } from '../../../helpers/fileDownloadHelper';

const {
    GENERATE_FORMS_TYPE_SIMPLE,
    SUBMIT_ACTION,
    BUTTON_TITLE_DOWNLOAD,
    BUTTON_TITLE_REQUEST,
    ON_SUBMIT_MESSAGE,
    DATA_SAVE_ACTION,
    FORM_ACTION_TYPES
} = constants;

let FormDataChangeAndDownload = props => {
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
            downloadButton = true,
            submitButton = true,
            onSubmitMessage = ON_SUBMIT_MESSAGE,
            labelOverRide = {},
            zipName = 'scheme',
            excelTabName = 'tab1',
            excelFileName = 'request',
            attachmentArray = []
        },
        action_inProgress,
        dataset,
        handleFormSubmit,
        asyncErrors,
        submitAction = SUBMIT_ACTION,
        downloadOptions: { api, bucketName = null, forceDownloadLink = false, link = null },
        artifacts
    } = props;

    const dispatch = useDispatch();
    const dirtyFormValues = useSelector(getFormValues(formName));
    const [downloadInProgress, setDownloadInProgress] = useState(false);
    const [submissionType, setSubmissionType] = useState(null);

    useEffect(() => {
        if (dataset && dataset.formData) {
            dispatch(initialize(formName, dataset.formData));
        }
    }, [dataset]);

    useEffect(() => {
        if (submissionType === submitAction) {
            submitSimpleForm(formName);
            setSubmissionType(null);
        }
    }, [submissionType]);

    const handleDownload = async () => {
        setDownloadInProgress(true);
        try {

            if (forceDownloadLink) {
                await downloadFile({ url: link, bucketNameProp: bucketName, api });
            } else {
                await simpleFormDataDownloader(
                    dirtyFormValues,
                    formFieldData
                        ? formFieldData
                        : formFieldFunction
                            ? formFieldFunction({ ...dirtyFormValues, ...props })
                            : null,
                    api,
                    bucketName,
                    labelOverRide,
                    zipName,
                    excelFileName,
                    excelTabName,
                    attachmentArray,
                    artifacts
                );
            }

            setDownloadInProgress(false);
        } catch (e) {
            setDownloadInProgress(false);
        }
    };

    const handleSubmit = type => {
        setSubmissionType(type);
    };

    const formSubmit = formData => {
        const formFlds = formFieldFunction && formFieldFunction(formData);
        let data = ValidationModule.removeInvalidData(formData, formFieldData, formFlds);
        let message = onSubmitMessage;
        let errors = {};
        let fectWorkflows = false;

        if (submissionType === submitAction) {
            message = onSubmitMessage;
            fectWorkflows = true;
            if (formHooks && formHooks.whenSubmitDataFormat) data = formHooks.whenSubmitDataFormat(data);
            if (formHooks && formHooks.whenSubmitValidation) errors = formHooks.whenSubmitValidation(data, asyncErrors);
        }

        if (submissionType === DATA_SAVE_ACTION) {
            if (formHooks && formHooks.whenSaveDataFormat) data = formHooks.whenSaveDataFormat(data);
            if (formHooks && formHooks.whenSaveValidation) errors = formHooks.whenSaveValidation(data, asyncErrors);
        }

        if (errors.message) {
            return NotificationHelper.getInstance().error(errors.message);
        }

        handleFormSubmit(
            submissionType,
            { formData: data },
            () => {
                handleSubmit(null);
            },
            message,
            fectWorkflows
        );
    };

    const formHeaderProps = {
        title: title,
        iIconText: titleIicon,
        actions: [
            ...(downloadButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.DOWNLOAD,
                          title: downloadButton.title || BUTTON_TITLE_DOWNLOAD,
                          state: { inProgress: downloadInProgress },
                          onClick: () => {
                              handleDownload();
                          },
                          bool: downloadButton.showButton
                          //   claimHelper.getPermission(getLoggedUserClaims_data, step, BUTTON_CLAIM_DOWNLOAD)
                      }
                  ]
                : []),
            ...(submitButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.SUBMIT,
                          title: submitButton.title || BUTTON_TITLE_REQUEST,
                          state: {
                              inProgress: action_inProgress
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
)(FormDataChangeAndDownload);
