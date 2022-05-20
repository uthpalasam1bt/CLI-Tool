import React, { useState, useEffect, Suspense } from 'react';
import { getFormValues, initialize } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Tabs } from 'antd';

import FormGenerator from '../../forms/formBase';
import FormHeaderComponent from '../../forms/formHeader';
import TabChange from '../../tabChangeComponent';
import { convertArtifacts } from '../../../helpers/ArtifactConverter';
import FormSectionBase from '../../forms/formBase/FormSectionBase';
import constants from '../../../constants';
import { tabFormDataDownloader } from '../../../helpers/FormDownloadHelper';
import { downloadFile } from '../../../helpers/fileDownloadHelper';

const {
    GENERATE_FORMS_TYPE_WITH_CHILDREN,
    GENERATE_FORM_SECTION_TYPE_SIMPLE,
    FORM_SECTION_INCLUDE_COMPONENT,
    BUTTON_TITLE_DOWNLOAD,
    BUTTON_TITLE_REQUEST,
    FORM_SECTION_INCLUDE_NEW,
    FORM_ACTION_TYPES,
    SUBMIT_ACTION
} = constants;

let TabFormDataDownload = props => {
    const {
        formTabs,
        formName,
        formHooks,
        options: {
            title = null,
            titleIicon = null,
            downloadButton = true,
            submitButton = true,
            labelOverRide = {},
            zipName = 'scheme',
            excelFileName = 'request',
            attachmentArray = []
        },
        dataset,
        disabled = true,
        action_inProgress,
        submitAction = SUBMIT_ACTION,
        handleFormSubmit,
        artifacts,
        downloadOptions: { api, bucketName = null, forceDownloadLink = false, link = null }
    } = props;

    const dispatch = useDispatch();
    const dirtyFormValues = useSelector(getFormValues(formName));
    const [downloadInProgress, setDownloadInProgress] = useState(false);
    const [activeTabKey, changeActiveTaKey] = useState(null);

    useEffect(() => {
        if (dataset && dataset.formData) {
            dispatch(initialize(formName, dataset.formData));
        }
    }, [dataset]);

    useEffect(() => {
        if (formTabs.length && !activeTabKey) {
            onchangeTab(formTabs[0].tabKey);
        }
    }, [formTabs]);

    const onchangeTab = key => {
        changeActiveTaKey(key);
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

    const formSubmit = submissionType => {
        let message = null;
        handleFormSubmit(submissionType, { formData: dataset && dataset.formData }, () => { }, message, true);
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
                              formSubmit(submitAction);
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
                onSubmit={() => {}}
                name={formName}
                formType={GENERATE_FORMS_TYPE_WITH_CHILDREN}
                disabled={disabled}
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

export default TabFormDataDownload;
