import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { getFormSyncErrors, getFormValues, initialize, submit } from 'redux-form';

import FormHeaderComponent from '../../../../../../UILibrary/components/forms/formHeader';
import uiLibConstants from '../../../../../../UILibrary/constants';
import constants from '../../../../constants';
import UploadPublishGenerator from './components/uploadPublishGenerator';
import ClaimHelper from '../../../../../../helpers/claimHelper';
import _ from 'lodash';
import {
    PUBLISH_INITIAL_PROPOSAL_PUBLISH_SUCCESS,
    PUBLISH_INITIAL_PROPOSAL_UPLOAD_SUCCESS
} from '../../../../../../config/constants';

const {
    STATUS_DOCUMENT_PUBLISHED,
    STEP_ACTION_UPLOD_PUBLISH,
    STATUS_DOCUMENT_UPLOAD,
    ON_DOCUMENT_GENERATE_MESSAGE,
    STATUS_DOCUMENT_GENERATE,
    STEP_ACTION_DOC_UPLOAD
} = constants;
const { FORM_ACTION_TYPES, GENERATE_FORMS_TYPE_SIMPLE } = uiLibConstants;

const SimpleUploadPublish = props => {
    const {
        formName,
        dataset,
        formFieldFunction,
        options: {
            title,
            titleIicon = null,
            fetchEntityDataAfterSubmit = null,
            navigateAfterSubmit = null,
            fetchWorkflowAfterSubmit = true
        },
        updateWorkflowStepData,
        updateWorkflowStep_inProgress,
        step,
        documentName,
        artifacts,
        getLoggedUserClaims_data,
        submitPublishForm,
        disabled = false,
        asyncErrors,
        submitAction = STEP_ACTION_UPLOD_PUBLISH
    } = props;
    const dirtyFormValues = useSelector(getFormValues(formName));

    const dispatch = useDispatch();
    const [documentUrl, setDocumentURL] = useState(null);
    const [submissionType, setSubmissionType] = useState(null);

    useEffect(() => {
        if (submissionType === submitAction) {
            submitPublishForm(formName);
            if (!_.isEmpty(asyncErrors)) {
                setSubmissionType(null);
            }
        }
    }, [submissionType]);

    useEffect(() => {
        if (dataset && dataset.documents) {
            if (Object.entries(dataset.documents).length !== 0) {
                dispatch(initialize(formName, { [documentName]: _.get(dataset, `documents.${documentName}.url`) }));
            }
            setDocumentURL(_.get(dataset, `documents.${documentName}.url`));
        }
    }, [dataset]);

    const handleSubmit = type => {
        setSubmissionType(type);
    };

    const onSubmitForm = (formData, dispatch, props, generated = false) => {
        const url = formData[documentName];
        setDocumentURL(url);
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
                    ...dataset.documents[documentName],
                    url: url,
                    documentStatus:
                        url &&
                        (submissionType === STEP_ACTION_UPLOD_PUBLISH
                            ? STATUS_DOCUMENT_PUBLISHED
                            : generated
                            ? STATUS_DOCUMENT_GENERATE
                            : STATUS_DOCUMENT_UPLOAD),
                    generate: generated
                }
            };
        }

        updateWorkflowStepData(
            submissionType == STEP_ACTION_UPLOD_PUBLISH ? STEP_ACTION_UPLOD_PUBLISH : STEP_ACTION_DOC_UPLOAD,
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
                formFieldFunction={formFieldFunction({
                    ...dirtyFormValues,
                    ...props
                })}
                artifacts={artifacts}
                documentName={documentName}
                dataset={dataset}
                formName={formName}
                documentUrl={documentUrl}
                formType={GENERATE_FORMS_TYPE_SIMPLE}
                setDocumentURL={setDocumentURL}
                className="generate-iaa-manager-letters-form"
                onSubmit={onSubmitForm}
                disabled={disabled || step.completed||!ClaimHelper.checkIfUserHasClaim(_.get(props,`step.claims.${STEP_ACTION_DOC_UPLOAD}`,''))}
            />
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
)(SimpleUploadPublish);
