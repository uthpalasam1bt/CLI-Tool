import React, { useState, useEffect, Suspense, useRef } from 'react';
import { getFormValues, submit, initialize, getFormSyncErrors } from 'redux-form';
import { compose } from 'redux';
import { useDispatch, useSelector, connect } from 'react-redux';
import _ from 'lodash';
import { Tabs } from 'antd';

import FormGenerator from '../../forms/formBase';
import FormHeaderComponent from '../../forms/formHeader';
import NotificationHelper from '../../../helpers/NotificationHelper';
import TabChange from '../../tabChangeComponent';
import FormSectionBase from '../../forms/formBase/FormSectionBase';
import ValidationModule from '../../../validation-module';
import { convertArtifacts } from '../../../helpers/ArtifactConverter';
import constants from '../../../constants';
import { tabFormDataDownloader } from '../../../helpers/FormDownloadHelper';
import { downloadFile } from '../../../helpers/fileDownloadHelper';

const {
    GENERATE_FORMS_TYPE_WITH_CHILDREN,
    GENERATE_FORM_SECTION_TYPE_SIMPLE,
    FORM_SECTION_INCLUDE_COMPONENT,
    BUTTON_TITLE_DOWNLOAD,
    FORM_SECTION_INCLUDE_NEW,
    BUTTON_TITLE_REQUEST,
    SUBMIT_ACTION,
    ON_SUBMIT_MESSAGE,
    DATA_SAVE_ACTION,
    FORM_ACTION_TYPES
} = constants;

let FormTabDataChangeAndDownload = props => {
    const {
        formTabDataZipDownloadWithchange,
        formTabs,
        formName,
        formHooks,
        options: {
            submitButton = true,
            title = null,
            titleIicon = null,
            downloadButton = true,
            labelOverRide = {},
            onSubmitMessage = ON_SUBMIT_MESSAGE,
            zipName = 'scheme',
            excelFileName = 'request',
            attachmentArray = []
        },
        action_inProgress,
        dataset,
        disabled = false,
        submitAction = SUBMIT_ACTION,
        asyncErrors,
        handleFormSubmit,
        downloadOptions: { api, bucketName = null, forceDownloadLink = false, link = null },
        artifacts
    } = props;

    const dispatch = useDispatch();
    const dirtyFormValues = useSelector(getFormValues(formName));
    const [downloadInProgress, setDownloadInProgress] = useState(false);
    const [activeTabKey, changeActiveTaKey] = useState(null);
    const [submissionType, setSubmissionType] = useState(null);

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
                dispatch(initialize(formName, dataset.formData));
        }
    }, [dataset]);

    useEffect(() => {
        if (submissionType === submitAction) {
            formTabDataZipDownloadWithchange(formName);
            setSubmissionType(null);
        }
    }, [submissionType]);

    useEffect(() => {
        if (formTabs.length && !activeTabKey) {
            onchangeTab(formTabs[0].tabKey);
        }
    }, [formTabs]);

    const onchangeTab = key => {
        changeActiveTaKey(key);
    };

    const handleSubmit = type => {
        if (type === submitAction && !_.isEmpty(asyncErrors)) {
            setSubmissionType(null);

            const formFieldTabs = formTabs.filter(tab => tab.formFieldData || tab.formFieldFunction);

            asyncError: for (const [key] of Object.entries(asyncErrors)) {
                for (const fieldTab of formFieldTabs) {
                    if (fieldTab.tabKey === key) {
                        onchangeTab(fieldTab.tabKey);
                        break asyncError;
                    }
                }
            }
        }
        setSubmissionType(type);
    };

    const handleDownload = async () => {
        setDownloadInProgress(true);
        try {
            if (forceDownloadLink) {
                await downloadFile({ url: link, bucketNameProp: bucketName, api });
            } else {
                await tabFormDataDownloader(
                    dirtyFormValues,
                    api,
                    formTabs,
                    bucketName,
                    labelOverRide,
                    zipName,
                    excelFileName,
                    attachmentArray,
                    artifacts
                );
            }
            setDownloadInProgress(false);
        } catch (e) {
            setDownloadInProgress(false);
        }
    };

    const formSubmit = formData => {
        let data = {};
        let message = onSubmitMessage;
        let errors = {};
        let fectWorkflows = false;

        for (const [key, value] of Object.entries(formData)) {
            const tabData = formTabs.find(a => a.tabKey === key);

            const formFlds = tabData && tabData.formFieldFunction && tabData.formFieldFunction(formData);
            data[key] = tabData && ValidationModule.removeInvalidData(value, tabData.formFieldData, formFlds);
        }

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
                disabled={disabled}
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
                                        {tab.type === FORM_SECTION_INCLUDE_NEW ? (
                                            <FormSectionBase
                                                formSectionType={GENERATE_FORM_SECTION_TYPE_SIMPLE}
                                                formSectionName={tab.tabKey}
                                                formName={formName}
                                                disabled={tab.disabled || disabled}
                                                formFieldData={
                                                    tab.formFieldData
                                                        ? tab.formFieldData
                                                        : tab.formFieldFunction
                                                        ? tab.formFieldFunction({ ...dirtyFormValues, ...props })
                                                        : null
                                                }
                                                formHooks={formHooks}
                                                artifacts={artifacts}
                                            />
                                        ) : tab.type === FORM_SECTION_INCLUDE_COMPONENT ? (
                                            tab.formSection
                                        ) : null}
                                    </Suspense>
                                </div>
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </TabChange>
            </FormGenerator>
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    simpleFormData: getFormValues(ownProps.formName)(state),
    asyncErrors: getFormSyncErrors(ownProps.formName)(state)
});

const mapDispatchToProps = dispatch => ({
    formTabDataZipDownloadWithchange: formName => {
        dispatch(submit(formName));
    }
});
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(FormTabDataChangeAndDownload);
