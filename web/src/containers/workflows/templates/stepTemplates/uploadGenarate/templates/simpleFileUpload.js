import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { getFormValues, getFormSyncErrors, submit, initialize } from 'redux-form';
import { useSelector, connect, useDispatch } from 'react-redux';
import _ from 'lodash';

import FileUploadBase from './components';
import FormHeaderComponent from '../../../../../../UILibrary/components/forms/formHeader';
import NotificationHelper from '../../../../../../helpers/NotificationHelper';
import uiLibConstants from '../../../../../../UILibrary/constants';
import constants from '../../../../constants';
import claimHelper from '../../../../../../helpers/claimHelper';

const {
    STEP_ACTION_DATA_SAVE,
    STEP_ACTION_UPDATE_WORKFLOW,
    STEP_ACTION_DOC_UPLOAD,
    STEP_ACTION_UPDATE,
    STEP_ACTION_DATA_CHANGE,
    STATUS_DOCUMENT_UPLOAD,
    STATUS_DOCUMENT_INITIATED,
    STATUS_DOCUMENT_GENERATE,
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_REQUEST,
    ON_CONTINUE_UPLOAD_MESSAGE,
    ON_DOCUMENT_GENERATE_MESSAGE,
    ON_EMPTY_DOC_UPLOAD_MESSAGE,
    STEP_UPDATE_TYPE_UPLOAD
} = constants;

const { FORM_ACTION_TYPES, GENERATE_FORMS_TYPE_SIMPLE } = uiLibConstants;

let SimpleFileUpload = props => {
    const {
        formFieldFunction,
        formName,
        formHooks,
        options: {
            title,
            titleIicon,
            saveButton = true,
            submitButton = true,
            onSubmitMessage = null,
            onSaveMessage = ON_CONTINUE_UPLOAD_MESSAGE,
            fetchEntityDataAfterSubmit = null,
            navigateAfterSubmit = null,
            fetchWorkflowAfterSubmit = true
        },
        step,
        dataset,
        submitSimpleForm,
        asyncErrors,
        submitAction = STEP_ACTION_UPDATE_WORKFLOW,
        updateWorkflowStep_inProgress,
        updateWorkflowStepData,
        artifacts,
        getLoggedUserClaims_data
    } = props;

    const dispatch = useDispatch();
    const dirtyFormValues = useSelector(getFormValues(formName));
    const [submissionType, setSubmissionType] = useState(null);
    // const [generateFlags, setGenerateFlags] = useState({});

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
        const tempDoc = {};
        if (dataset && dataset.documents) {
            for (const key in dataset.documents) {
                tempDoc[key] = _.get(dataset, `documents.${key}.url`) || _.get(dataset, `documents.${key}.urls`);
            }
            dispatch(initialize(formName, tempDoc, false));
        }
    }, [dataset]);

    const handleSubmit = type => {
        setSubmissionType(type);
    };

    const handleGenerate = values => {
        console.log('values', values);
        // setGenerateFlags
    };

    const formSubmit = (formData, dispatch, props, updateWf = true, generated = false, changedDocument) => {
        let documentsTemp = {};
        let message;
        let errors = {};
        let action = STEP_ACTION_DOC_UPLOAD;

        if (!_.get(formData, 'remove', false)) message = generated ? ON_DOCUMENT_GENERATE_MESSAGE : onSaveMessage;

        if (_.isEmpty(formData)) {
            handleSubmit(null);
            return NotificationHelper.getInstance().error(ON_EMPTY_DOC_UPLOAD_MESSAGE);
        }

        if (updateWf) {
            action = submissionType === submitAction ? STEP_ACTION_UPDATE : STEP_ACTION_DATA_CHANGE;
        }

        if (dataset && dataset.documents) {
            for (const docName in dataset.documents) {
                const _document = _.get(dataset, `documents.${docName}`);
                documentsTemp[docName] = {
                    ..._document,
                    ...(Array.isArray(formData[docName])
                        ? {
                              urls: formData[docName].map(v => ({
                                  ...v,
                                  documentStatus:
                                      _document.urls &&
                                      _document.urls.find(item => item.uid === v.uid) &&
                                      _document.urls.find(item => item.uid === v.uid).documentStatus
                                          ? _document.urls.find(item => item.uid === v.uid).documentStatus
                                          : STATUS_DOCUMENT_UPLOAD
                              }))
                          }
                        : {
                              url: formData[docName],
                              documentStatus: formData[docName] ?
                                  formData[docName] &&
                                  (changedDocument == docName
                                      ? !generated
                                          ? STATUS_DOCUMENT_UPLOAD
                                          : STATUS_DOCUMENT_GENERATE
                                      : _document.documentStatus
                                      ? _document.documentStatus
                                      : null) : STATUS_DOCUMENT_INITIATED,//when remove document or not uploaded state, documentStatus will set as Initiated
                              generate:
                                  changedDocument == docName
                                      ? generated
                                      : _document.generate
                                      ? _document.generate
                                      : false
                          })
                };
            }
        } else {
            handleSubmit(null);
            return NotificationHelper.getInstance().error('Some files are still uploading');
        }

        if (submissionType === submitAction) {
            message = onSubmitMessage;
            if (formHooks && formHooks.whenSubmitDataFormat)
                documentsTemp = formHooks.whenSubmitDataFormat(documentsTemp);
            if (formHooks && formHooks.whenSubmitValidation)
                errors = formHooks.whenSubmitValidation(documentsTemp, asyncErrors);
        }

        if (submissionType === STEP_ACTION_DATA_SAVE) {
            if (formHooks && formHooks.whenSaveDataFormat) documentsTemp = formHooks.whenSaveDataFormat(documentsTemp);
            if (formHooks && formHooks.whenSaveValidation)
                errors = formHooks.whenSaveValidation(documentsTemp, asyncErrors);
        }

        if (errors.message) {
            handleSubmit(null);
            return NotificationHelper.getInstance().error(errors.message);
        }

        updateWorkflowStepData(
            action,
            { documents: documentsTemp },
            () => {
                handleSubmit(null);
            },
            updateWf
                ? { message, fetchEntityDataAfterSubmit, navigateAfterSubmit, fetchWorkflowAfterSubmit }
                : { message },
            STEP_UPDATE_TYPE_UPLOAD
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
                              inProgress: submissionType === STEP_ACTION_DATA_SAVE && updateWorkflowStep_inProgress
                          },
                          onClick: () => {
                              handleSubmit(STEP_ACTION_DATA_SAVE);
                          },
                          bool:
                              !step.completed &&
                              !step.rejected &&
                              claimHelper.getPermission(getLoggedUserClaims_data, step, STEP_ACTION_DATA_CHANGE),
                          disabled: _.get(saveButton, 'disabled', false)
                      }
                  ]
                : []),
            ...(submitButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.SUBMIT,
                          title: submitButton.title || BUTTON_TITLE_REQUEST,
                          state: {
                              inProgress: submissionType === submitAction && updateWorkflowStep_inProgress
                          },
                          onClick: () => {
                              handleSubmit(submitAction);
                          },
                          bool:
                              !step.completed &&
                              !step.rejected &&
                              claimHelper.getPermission(getLoggedUserClaims_data, step, STEP_ACTION_UPDATE),
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
            <FileUploadBase
                className="generate-iaa-manager-letters-form"
                name={formName}
                formFieldData={formFieldFunction({ handleGenerate, formSubmit, ...dirtyFormValues, ...props })}
                onSubmit={formSubmit}
                data={dataset}
                formType={GENERATE_FORMS_TYPE_SIMPLE}
                formHooks={formHooks}
                artifacts={artifacts}
                props={{...props}}
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
)(SimpleFileUpload);
