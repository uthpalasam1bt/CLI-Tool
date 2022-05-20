import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getFormSyncErrors, submit } from 'redux-form';
import _ from 'lodash';

import FormHeaderComponent from '../../../../../../UILibrary/components/forms/formHeader';
import uiLibConstants from '../../../../../../UILibrary/constants';

import MultipleFilePublishForm from './components/MultipleFilePublishForm';
import NotificationHelper from '../../../../../../helpers/NotificationHelper';
import ClaimHelper from '../../../../../../helpers/claimHelper';
import constants from '../../../../constants';

const {
    STEP_ACTION_PUBLISH,
    ON_MULTIPLE_DOCUMENTS_PUBLISHED,
    PUBLISH_ASSET_MANAGEMENT_ACCOUNT_OPENING_DOCUMENTS_SELECT_ATLEAST_ONE,
    STATUS_DOCUMENT_PUBLISHED
} = constants;

const { FORM_ACTION_TYPES } = uiLibConstants;

const MultipleFilePublish = props => {
    const {
        formName,
        options: {
            title,
            titleIicon = null,
            fetchEntityDataAfterSubmit = false,
            navigateAfterSubmit = false,
            fetchWorkflowAfterSubmit = true
        },
        dataset,
        // schemeId,
        submitForm,
        asyncErrors,
        submitAction = STEP_ACTION_PUBLISH,
        updateWorkflowStep_inProgress,
        updateWorkflowStepData,
        step,
        artifacts,
        getLoggedUserClaims_data
    } = props;

    const [documentData, setDocumentData] = useState(null);
    const [documentConfig, setDocumentConfig] = useState([]);
    const [submissionType, setSubmissionType] = useState(null);

    useEffect(() => {
        if (submissionType === submitAction) {
            submitForm(formName);
            if (!_.isEmpty(asyncErrors)) {
                setSubmissionType(null);
            }
        }
    }, [submissionType]);

    useEffect(() => {
        if (dataset && dataset.documents) {
            const objectToJson = Object.keys(dataset.documents).map(item => {
                return {
                    key: item,
                    ...dataset.documents[item]
                }
            });

            const orderedArray = _.orderBy(objectToJson, ['order'], ['asc']);

            setDocumentConfig(orderedArray.map(({ key }) => key));
            setDocumentData(dataset.documents);
        }
    }, [dataset]);

    const onSubmit = formData => {
        let docPublish = false;
        documentConfig.map((doc, key) => {
            if (
                documentData[doc] &&
                documentData[doc].documentStatus &&
                documentData[doc].documentStatus != STATUS_DOCUMENT_PUBLISHED
            ) {
                if (formData[doc]) {
                    docPublish = true;
                    documentData[doc].documentStatus = STATUS_DOCUMENT_PUBLISHED;
                }
            }

            if (documentData[doc] && Array.isArray(documentData[doc].urls)) {
                documentData[doc].urls.map((docItem, key) => {
                    if (docItem.documentStatus && docItem.documentStatus != STATUS_DOCUMENT_PUBLISHED) {
                        const { uid } = docItem;
                        if (formData[uid]) {
                            documentData[doc].documentStatus = STATUS_DOCUMENT_PUBLISHED;
                            docItem.documentStatus = STATUS_DOCUMENT_PUBLISHED;
                            docPublish = true;
                        }
                    }
                });
            }
        });

        if (!docPublish) {
            handleSubmit(null);
            return NotificationHelper.getInstance().error(
                PUBLISH_ASSET_MANAGEMENT_ACCOUNT_OPENING_DOCUMENTS_SELECT_ATLEAST_ONE
            );
        }

        updateWorkflowStepData(
            submissionType,
            { documents: documentData },
            () => {
                handleSubmit(null);
            },
            {
                message: ON_MULTIPLE_DOCUMENTS_PUBLISHED,
                fetchEntityDataAfterSubmit,
                navigateAfterSubmit,
                fetchWorkflowAfterSubmit
            }
        );
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
                    ClaimHelper.getPermission(getLoggedUserClaims_data, step, STEP_ACTION_PUBLISH)
            }
        ],
        artifacts: artifacts
    };

    return (
        <>
            <FormHeaderComponent {...formHeaderProps} />
            <div className="publish-iaa-manage-container">
                {dataset && documentData && documentConfig ? (
                    <MultipleFilePublishForm
                        documentConfig={documentConfig}
                        onSubmit={onSubmit}
                        documentData={documentData}
                        {...props}
                    />
                ) : null}
            </div>
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    asyncErrors: getFormSyncErrors(ownProps.formName)(state)
});

const mapDispatchToProps = dispatch => ({
    submitForm: formName => {
        dispatch(submit(formName));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MultipleFilePublish);
