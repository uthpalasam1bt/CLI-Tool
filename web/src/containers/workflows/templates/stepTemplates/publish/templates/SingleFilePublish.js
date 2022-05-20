import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import FormHeaderComponent from '../../../../../../UILibrary/components/forms/formHeader';
import uiLibConstants from '../../../../../../UILibrary/constants';

import PDFViewer from '../../../../../../components/scheme/registration/PDFViewer';
import ClaimHelper from '../../../../../../helpers/claimHelper';
import constants from '../../../../constants';

const { ON_PUBLISH_MESSAGE, STATUS_DOCUMENT_PUBLISHED, STEP_ACTION_PUBLISH } = constants;
const { FORM_ACTION_TYPES } = uiLibConstants;

const SingleFilePublish = props => {
    const {
        // formName,
        dataset,
        docName,
        submitAction = STEP_ACTION_PUBLISH,
        options: {
            title,
            titleIicon = null,
            fetchEntityDataAfterSubmit = null,
            navigateAfterSubmit = null,
            fetchWorkflowAfterSubmit = true,
            onSubmitMessage = ON_PUBLISH_MESSAGE
        },
        updateWorkflowStepData,
        updateWorkflowStep_inProgress,
        step,
        artifacts,
        getLoggedUserClaims_data
    } = props;

    const [documentData, setDocumentData] = useState(null);
    const [document, setDocument] = useState(null);
    const [submissionType, setSubmissionType] = useState(null);

    useEffect(() => {
        if (submissionType === submitAction) {
            publish(submissionType);
        }
    }, [submissionType]);

    useEffect(() => {
        if (dataset && dataset.documents && Object.keys(dataset.documents).length) {
            if (docName) {
                setDocument(docName);
            } else {
                const [key] = Object.entries(dataset.documents)[0];
                setDocument(key);
            }
            setDocumentData(dataset.documents);
        }
    }, [dataset]);

    const publish = submissionType => {
        const message = onSubmitMessage;

        if (documentData.length !== 0 && document) {
            const documentDataCopy = _.cloneDeep(documentData);
            documentDataCopy[document].documentStatus = STATUS_DOCUMENT_PUBLISHED;

            updateWorkflowStepData(
                submissionType,
                { documents: { [document]: documentDataCopy[document] } },
                () => {
                    handleSubmit(null);
                },
                {
                    message,
                    fetchEntityDataAfterSubmit,
                    navigateAfterSubmit,
                    fetchWorkflowAfterSubmit
                }
            );
        }
    };

    const handleSubmit = type => {
        setSubmissionType(type);
    };

    const formHeaderProps = {
        title: title,
        iIconText: titleIicon,
        actions: [
            {
                type: FORM_ACTION_TYPES.PUBLISH,
                state: { inProgress: submissionType === STEP_ACTION_PUBLISH && updateWorkflowStep_inProgress },
                onClick: () => {
                    handleSubmit(submitAction);
                },
                bool:
                    !step.completed &&
                    !step.rejected &&
                    ClaimHelper.getPermission(getLoggedUserClaims_data, step, submitAction)
            }
        ],
        artifacts: artifacts
    };

    return (
        <>
            <FormHeaderComponent {...formHeaderProps} />
            <div>
                <div className="doc-preview-container">
                    {dataset && documentData && document ? (
                        <div>
                            <PDFViewer documentURL={documentData[document].url} />
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default connect(
    null,
    null
)(SingleFilePublish);
