import React, { Suspense, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import { getFormSyncErrors, getFormValues, initialize, submit } from 'redux-form';
import { compose } from 'redux';
import _ from 'lodash';

import FormHeaderComponent from '../../../../../../UILibrary/components/forms/formHeader';
import TabChange from '../../../../../../UILibrary/components/tabChangeComponent';
import { convertArtifacts } from '../../../../../../UILibrary/helpers/ArtifactConverter';
import { FORM_SECTION_INCLUDE_UPLOAD_PUBLISH } from '../../../../constants/formConstants';
import uiLibConstants from '../../../../../../UILibrary/constants';
import constants from '../../../../constants';
import ClaimHelper from '../../../../../../helpers/claimHelper';
import UploadPublishGenerator from './components/uploadPublishGenerator';
import UploadPublishBase from './components/uploadPublishBase';
import { STEP_ACTION_DOC_UPLOAD } from '../../../../constants/workflowConstant';
import {
    PUBLISH_INITIAL_PROPOSAL_PUBLISH_SUCCESS,
    PUBLISH_INITIAL_PROPOSAL_UPLOAD_SUCCESS
} from '../../../../../../config/constants';

const { GENERATE_FORMS_TYPE_WITH_CHILDREN, FORM_ACTION_TYPES, FORM_SECTION_INCLUDE_COMPONENT } = uiLibConstants;
const {
    STATUS_DOCUMENT_PUBLISHED,
    STEP_ACTION_UPLOD_PUBLISH,
    STATUS_DOCUMENT_UPLOAD,
    ON_DOCUMENT_GENERATE_MESSAGE,
    STATUS_DOCUMENT_GENERATE
} = constants;

const TabUploadPublish = props => {
    const {
        formName,
        formTabs,
        options: {
            title = null,
            titleIicon = null,
            fetchEntityDataAfterSubmit = null,
            navigateAfterSubmit = null,
            fetchWorkflowAfterSubmit = true
        },
        updateWorkflowStepData,
        updateWorkflowStep_inProgress,
        artifacts,
        disabled = false,
        step,
        dataset,
        documentName,
        getLoggedUserClaims_data,
        submitPublishForm,
        asyncErrors,
        submitAction = STEP_ACTION_UPLOD_PUBLISH
    } = props;

    const dirtyFormValues = useSelector(getFormValues(formName));
    const dispatch = useDispatch();
    const [documentUrl, setDocumentURL] = useState(null);
    const [submissionType, setSubmissionType] = useState(null);
    const [activeTabKey, changeActiveTaKey] = useState(null);

    useEffect(() => {
        if (submissionType === submitAction) {
            submitPublishForm(formName);
            if (!_.isEmpty(asyncErrors)) {
                setSubmissionType(null);
            }
        }
    }, [submissionType]);

    useEffect(() => {
        if (formTabs.length && !activeTabKey) {
            onchangeTab(formTabs[0].tabKey);
        }
    }, [formTabs]);

    useEffect(() => {
        if (dataset && dataset.documents) {
            if (Object.entries(dataset.documents).length !== 0) {
                dispatch(initialize(formName, { [documentName]: _.get(dataset, `documents.${documentName}.url`) }));
            }
            setDocumentURL(_.get(dataset, `documents.${documentName}.url`));
        }
    }, [dataset]);

    const onchangeTab = key => {
        changeActiveTaKey(key);
    };

    const handleSubmit = type => {
        setSubmissionType(type);
    };

    const onSubmitForm = (formData, dispatch, props, generated = false) => {
        const url = formData[documentName];
        let message = url
            ? generated
                ? ON_DOCUMENT_GENERATE_MESSAGE
                : submissionType === STEP_ACTION_UPLOD_PUBLISH
                ? PUBLISH_INITIAL_PROPOSAL_PUBLISH_SUCCESS
                : PUBLISH_INITIAL_PROPOSAL_UPLOAD_SUCCESS
            : null;
        let tempDoc = null;
        let updateWf = false;

        if (submissionType === STEP_ACTION_UPLOD_PUBLISH) updateWf = true;

        if (dataset && documentName) {
            tempDoc = {
                [documentName]: {
                    ...(dataset.documents && dataset.documents[documentName] ? dataset.documents[documentName] : []),
                    url: url,
                    documentStatus:
                        url &&
                        (submissionType === STEP_ACTION_UPLOD_PUBLISH
                            ? STATUS_DOCUMENT_PUBLISHED
                            : STATUS_DOCUMENT_UPLOAD),
                    generate: generated
                }
            };
        }

        updateWorkflowStepData(
            submissionType === STEP_ACTION_UPLOD_PUBLISH ? STEP_ACTION_UPLOD_PUBLISH : STEP_ACTION_DOC_UPLOAD,
            { documents: tempDoc },
            () => {
                handleSubmit(null);
            },
            updateWf
                ? { message, fetchEntityDataAfterSubmit, navigateAfterSubmit, fetchWorkflowAfterSubmit }
                : { message }
        );
    };

    const formHeaderProps = {
        title: title,
        iIconText: titleIicon,
        actions: [
            {
                type: FORM_ACTION_TYPES.PUBLISH,
                state: { inProgress: submissionType === STEP_ACTION_UPLOD_PUBLISH && updateWorkflowStep_inProgress },
                onClick: () => {
                    handleSubmit(submitAction);
                },
                bool:
                    !step.completed &&
                    !step.rejected &&
                    ClaimHelper.getPermission(getLoggedUserClaims_data, step, STEP_ACTION_UPLOD_PUBLISH)
            }
        ],
        artifacts: artifacts
    };

    return (
        <>
            <FormHeaderComponent {...formHeaderProps} />
            <UploadPublishGenerator
                formName={formName}
                formType={GENERATE_FORMS_TYPE_WITH_CHILDREN}
                className="generate-iaa-manager-letters-form"
                onSubmit={onSubmitForm}
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
                                        {tab.type === FORM_SECTION_INCLUDE_UPLOAD_PUBLISH ? (
                                            <UploadPublishBase
                                                formFieldFunction={tab.uploadFormConfig({
                                                    ...dirtyFormValues,
                                                    ...props
                                                })}
                                                formSubmit={onSubmitForm}
                                                formName={formName}
                                                dataset={dataset}
                                                artifacts={artifacts}
                                                documentName={documentName}
                                                setDocumentURL={setDocumentURL}
                                                documentUrl={documentUrl}
                                                disabled={disabled || step.completed||!ClaimHelper.checkIfUserHasClaim(_.get(props,`step.claims.${STEP_ACTION_DOC_UPLOAD}`,''))}
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
            </UploadPublishGenerator>
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    publishFormData: getFormValues(ownProps.formName)(state),
    asyncErrors: getFormSyncErrors(ownProps.formName)(state)
});

const mapDispatchToProps = dispatch => ({
    submitPublishForm: formName => {
        dispatch(submit(formName));
    }
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(TabUploadPublish);
