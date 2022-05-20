import React, { useState, useEffect, Suspense } from 'react';
import { compose } from 'redux';
import { getFormValues, submit, getFormSyncErrors, initialize } from 'redux-form';
import { useSelector, connect, useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import _ from 'lodash';

import FormHeaderComponent from '../../../../../../UILibrary/components/forms/formHeader';
import TabChange from '../../../../../../UILibrary/components/tabChangeComponent';
import FileUploadBase from './components';
import TabFileUploadBase from './components/tabFileUploadBase';
import NotificationHelper from '../../../../../../helpers/NotificationHelper';
import { convertArtifacts } from '../../../../../../UILibrary/helpers/ArtifactConverter';
import uiLibConstants from '../../../../../../UILibrary/constants';
import constants from '../../../../constants';
import claimHelper from '../../../../../../helpers/claimHelper';

const {
    BUTTON_TITLE_SAVE,
    BUTTON_TITLE_REQUEST,
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
    STEP_UPDATE_TYPE_UPLOAD
} = constants;

const { FORM_ACTION_TYPES, GENERATE_FORMS_TYPE_WITH_CHILDREN } = uiLibConstants;

const TabFileUpload = props => {
    const {
        formName,
        formTabs,
        formHooks,
        asyncErrors,
        submitFormWithTabs,
        submitAction = STEP_ACTION_UPDATE_WORKFLOW,
        updateWorkflowStep_inProgress,
        step,
        dataset,
        updateWorkflowStepData,
        artifacts,
        getLoggedUserClaims_data,
        handleChangeDataset,
        options: {
            title = null,
            titleIicon = null,
            saveButton = true,
            submitButton = true,
            onSubmitMessage = null,
            onSaveMessage = ON_CONTINUE_UPLOAD_MESSAGE,
            fetchEntityDataAfterSubmit = null,
            navigateAfterSubmit = null,
            fetchWorkflowAfterSubmit = true
        }
    } = props;

    const dispatch = useDispatch();
    const dirtyFormValues = useSelector(getFormValues(formName));
    const [submissionType, setSubmissionType] = useState(null);
    const [activeTabKey, changeActiveTaKey] = useState(null);
    const [generateState, changeGenerateState] = useState({}); // state of document - [update or generate]

    useEffect(() => {
        if (submissionType === submitAction) {
            submitFormWithTabs(formName);
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

    useEffect(() => {
        if (dataset && formHooks && formHooks.whenChangeSignatories) {
            formHooks.whenChangeSignatories(dataset, dataset, handleChangeDataset, props);
        }
    }, [dataset.signatories]);

    useEffect(() => {
        if (formTabs.length && !activeTabKey) {
            onchangeTab(formTabs[0].tabKey);
        }
    }, [formTabs]);

    const onchangeTab = key => {
        changeActiveTaKey(key);
    };

    const handleGenerate = (event, key) => {
        changeGenerateState({ ...generateState, [key]: event });
    };

    const handleSubmit = type => {
        if (type === submitAction && !_.isEmpty(asyncErrors)) {
            setSubmissionType(null);
            const formFieldTabs = formTabs.filter(tab => tab.formFieldData || tab.formFieldFunction);
            asyncError: for (const [key] of Object.entries(asyncErrors)) {
                for (const fieldTab of formFieldTabs) {
                    const fieldType = fieldTab.formFieldData
                        ? fieldTab.formFieldData
                        : fieldTab.formFieldFunction({ ...dirtyFormValues });
                    const tab = fieldType.find(t => t.field.name === key);
                    if (tab) {
                        onchangeTab(fieldTab.tabKey);
                        break asyncError;
                    }
                }
            }
        }
        setSubmissionType(type);
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
                              documentStatus:
                                  formData[docName] &&
                                  (changedDocument == docName
                                      ? STATUS_DOCUMENT_UPLOAD
                                      : _document.documentStatus
                                      ? _document.documentStatus
                                      : null),
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
            return NotificationHelper.getInstance().error('Something went wrong.');
        }

        if (submissionType === submitAction) {
            message = onSubmitMessage;
            if (formHooks && formHooks.whenSubmitDataFormat)
                documentsTemp = formHooks.whenSubmitDataFormat(documentsTemp);
            if (formHooks && formHooks.whenSubmitValidation)
                errors = formHooks.whenSubmitValidation(documentsTemp, dataset, asyncErrors, onchangeTab);
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
                onSubmit={formSubmit}
                name={formName}
                formType={GENERATE_FORMS_TYPE_WITH_CHILDREN}
            >
                <TabChange activeTabKey={activeTabKey} formTabs={formTabs} onchangeTab={onchangeTab}>
                    <Tabs activeKey={activeTabKey} onChange={activeKey => onchangeTab(activeKey)}>
                        {formTabs.map(tab => (
                            <Tabs.TabPane
                                tab={convertArtifacts(tab.tabName, artifacts)}
                                key={tab.tabKey}
                                forceRender={true}
                            >
                                <div className="form-body">
                                    <Suspense>
                                        <TabFileUploadBase
                                            formSectionName={tab.tabKey}
                                            formName={formName}
                                            disabled={false}
                                            formHooks={formHooks}
                                            onClickGenerate={handleGenerate}
                                            onSubmit={formSubmit}
                                            data={dataset}
                                            artifacts={artifacts}
                                            {...tab}
                                            {...props}
                                        />
                                    </Suspense>
                                </div>
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </TabChange>
            </FileUploadBase>
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    formWithTabsData: getFormValues(ownProps.formName)(state),
    asyncErrors: getFormSyncErrors(ownProps.formName)(state)
});

const mapDispatchToProps = dispatch => ({
    submitFormWithTabs: formName => {
        dispatch(submit(formName));
    }
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(TabFileUpload);
