import React, { useState, useEffect } from 'react';
import { compose } from 'redux';
import { connect, useSelector, useDispatch } from 'react-redux';
import { initialize, getFormValues } from 'redux-form';
import { saveAs } from 'file-saver';
import _ from 'lodash';
import config from 'appConfig';

import FormGenerator from '../../../../../../UILibrary/components/forms/formBase';
import FormHeaderComponent from '../../../../../../UILibrary/components/forms/formHeader';
import uiLibConstants from '../../../../../../UILibrary/constants';

import { readFile } from '../../../../../../helpers/downloadHelper';
// import claimHelper from '../../../../../../helpers/claimHelper';
import constants from '../../../../constants';
import ApproveRejectBase from './components/approveRejectBase';
import ConfirmModal from './modals/confirmModal';
import CommentSection from '../../common/commentSection';
import DocumentViewer from './components/documentViewer';
import connectApi from '../../../../../../middlewares/connectApi';
import { simpleFormDataDownloader } from '../../../../../../UILibrary/helpers/FormDownloadHelper';
import MultipleDocViewer from './components/multipleDocViewer';
import claimHelper from '../../../../../../helpers/claimHelper';
import { convertArtifacts } from '../../../../../../UILibrary/helpers/ArtifactConverter';

const { bucket: privateBucketName, publicBucket: publicBucketName } = config;

const {
    STEP_ACTION_AUTHORIZE,
    STEP_ACTION_COMMENT,
    STATUS_REJECTED,
    STATUS_APPROVED,
    STATUS_PENDING,
    PROPOSAL_STATUS_APPROVED,
    PROPOSAL_STATUS_REJECT,
    BUTTON_TITLE_REJECT,
    BUTTON_TITLE_APPROVE,
    BUTTON_TITLE_DOWNLOAD,
    APPROVE_REJECT_CONFIRM_COMMENT_FORM,
    SIMPLE_COMMENT_FORM
} = constants;

const { GENERATE_FORMS_TYPE_SIMPLE, FORM_ACTION_TYPES } = uiLibConstants;

const SimpleApproveReject = props => {
    const {
        dataset,
        documentName,
        disabled,
        formOptions: { formName = null, formFieldData, formFieldFunction, formHooks } = {},
        component = null,
        contentPosition,
        options: {
            title,
            titleIicon,
            rejectButton = false,
            approveButton = false,
            downloadButton = false,
            checkFromApproveList = false,
            labelOverRide = {},
            onRejectMessage,
            onApproveMessage,
            fetchEntityDataAfterSubmit = false,
            navigateAfterSubmit = false,
            fetchWorkflowAfterSubmit = true,
            zipName = 'scheme',
            excelFileName = 'request',
            excelTabName = 'tab1',
            attachmentArray = []
        },
        downloadOptions: { isPublicBucket = false } = {},
        updateWorkflowStepData,
        step,
        updateWorkflowStep_inProgress,
        getLoggedUserClaims_data,
        resetConfirmModalForm,
        hideCommentForm,
        loggedUser,
        resetCommentForm,
        artifacts,
        hideCommentsSection,
        hideCountCards,
        submitAction = STEP_ACTION_AUTHORIZE
    } = props;

    const dispatch = useDispatch();
    const [submissionType, setSubmissionType] = useState(null);
    const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
    const [savingComment, setSavingComment] = useState(false);
    const [documentUrl, setDocumentUrl] = useState(null);
    const [multipledocUrls, setMultipledocUrls] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [approvers, setApprovers] = useState([]);
    const dirtyFormValues = useSelector(getFormValues(formName));

    useEffect(() => {
        if (dataset && dataset.formData) {
            dispatch(initialize(formName, dataset.formData));
        }
        if (dataset && dataset.documents && dataset.documents[documentName]) {
            _.has(dataset, `documents.${documentName}.url`)
                ? setDocumentUrl(_.get(dataset, `documents.${documentName}.url`))
                : _.has(dataset, `documents.${documentName}.urls`) &&
                  setMultipledocUrls(_.get(dataset, `documents.${documentName}.urls`));
        }
        if (dataset && dataset.approvers) setApprovers(_.get(dataset, `approvers.${documentName}.users`, []));
    }, [dataset]);

    const handleApproveReject = type => {
        setSubmissionType(type);
        setIsShowConfirmModal(true);
    };

    async function handleDownload() {
        setIsDownloading(true);
        if (documentUrl) {
            const file = await readFile({
                url: documentUrl,
                bucket: isPublicBucket ? publicBucketName : privateBucketName
            });
            const chunkedUrl = documentUrl.split('/');
            const fileName = chunkedUrl[chunkedUrl.length - 1];
            const content = new Blob([file], { type: 'application/octet-stream' });
            saveAs(content, fileName);
            setIsDownloading(false);
        } else if (formName) {
            try {
                const bucketName = isPublicBucket ? publicBucketName : privateBucketName;
                await simpleFormDataDownloader(
                    dirtyFormValues,
                    formFieldData
                        ? formFieldData
                        : formFieldFunction
                        ? formFieldFunction({ ...dirtyFormValues, ...props })
                        : null,
                    connectApi,
                    bucketName,
                    labelOverRide,
                    zipName,
                    excelFileName,
                    excelTabName,
                    attachmentArray,
                    artifacts
                );
                setIsDownloading(false);
            } catch (e) {
                setIsDownloading(false);
            }
        }
    }

    const closeConfirmModal = () => {
        setIsShowConfirmModal(false);
        resetConfirmModalForm();
    };

    const onConfirmModalSubmit = ({ comment }) => {
        if (dataset && loggedUser) {
            let message = onApproveMessage;
            let userAction = STATUS_APPROVED;

            if (submissionType === PROPOSAL_STATUS_REJECT) {
                message = onRejectMessage;
                userAction = STATUS_REJECTED;
            }
            const _dataset = _.cloneDeep(dataset);
            const approver = approvers.find(usr => usr.userId === loggedUser.userId);

            _dataset.approvers[documentName].users = [
                {
                    ...approver,
                    status: userAction
                }
            ];

            const commentThread = _dataset.commentThread || { comments: [] };
            _dataset.commentThread = {
                ...commentThread,
                comments: [
                    ...commentThread.comments,
                    {
                        content: comment,
                        action: userAction,
                        email: loggedUser.email,
                        name: loggedUser.name,
                        reply: []
                    }
                ]
            };

            updateWorkflowStepData(
                submitAction,
                {
                    approvers: _dataset.approvers,
                    commentThread: _dataset.commentThread,
                    documents: _dataset.documents
                },
                () => {
                    setIsShowConfirmModal(false);
                },
                { message, fetchEntityDataAfterSubmit, navigateAfterSubmit, fetchWorkflowAfterSubmit }
            );
        }
        closeConfirmModal();
    };

    const handleSaveComment = ({ comment }) => {
        setSavingComment(true);
        const threadId = _.get(dataset, 'commentThread.threadId', null);

        let commentThread = {
            content: comment,
            ...(threadId && { threadId })
        };

        updateWorkflowStepData(STEP_ACTION_COMMENT, { commentThread }, () => {
            setSavingComment(false);
        });
        resetCommentForm();
    };

    const renderCommentSection = () => {
        const pendingCount = approvers.filter(usr => usr.status === STATUS_PENDING).length;
        const commentForm = <CommentSection saveComment={handleSaveComment} isCommentInProgress={savingComment} />;
        return step.completed || step.rejected || hideCommentForm || pendingCount <= 0 ? null : commentForm;
    };

    const getReviewerCountAndList = () => {
        let reviewersList = {
            approvedUserList: approvers.filter(reviewer => reviewer.status === STATUS_APPROVED),
            rejectedUserList: approvers.filter(reviewer => reviewer.status === STATUS_REJECTED),
            pendingUserList: approvers.filter(reviewer => reviewer.status === STATUS_PENDING)
        };

        let reviewStatusCount = {
            approved: _.get(dataset, `approvers.${documentName}.metaData.approvedCount`, 0),
            rejected: _.get(dataset, `approvers.${documentName}.metaData.rejectedCount`, 0),
            pending: step.rejected ? 0 : _.get(dataset, `approvers.${documentName}.metaData.pendingCount`, 0)
        };

        return { reviewStatusCount, reviewersList };
    };

    const hasApproved = () => {
        const currentApprover = approvers.find(u => {
            return u.email === loggedUser.email;
        });
        return currentApprover ? (currentApprover.status === STATUS_APPROVED ? true : false) : true;
    };

    const hasRejected = () => {
        const currentApprover = approvers.find(u => {
            return u.email === loggedUser.email;
        });

        return currentApprover ? (currentApprover.status === STATUS_REJECTED ? true : false) : true;
    };
    const checkUserTypePermission = () => {
        console.log('documentName()', documentName);
        console.log('approvers()', approvers);
        if (checkFromApproveList) {
            return approvers.some(user => user.email === loggedUser.email);
        }
        return false;
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
                          state: {
                              inProgress: isDownloading
                          },
                          onClick: () => {
                              handleDownload();
                          }
                          //   bool: !step.completed && !step.rejected
                          //   claimHelper.getPermission(getLoggedUserClaims_data, step, BUTTON_CLAIM_DOWNLOAD) &&
                      }
                  ]
                : []),
            ...(rejectButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.REJECT,
                          title: rejectButton.title || BUTTON_TITLE_REJECT,
                          state: {
                              inProgress: submissionType === PROPOSAL_STATUS_REJECT && updateWorkflowStep_inProgress
                          },
                          onClick: () => {
                              handleApproveReject(PROPOSAL_STATUS_REJECT);
                          },
                          bool:
                              !step.completed &&
                              !step.rejected &&
                              !hasRejected() &&
                              (claimHelper.getPermission(getLoggedUserClaims_data, step, submitAction) ||
                                  checkUserTypePermission()),
                          disabled: _.get(rejectButton, 'disabled', false)
                      }
                  ]
                : []),
            ...(approveButton
                ? [
                      {
                          type: FORM_ACTION_TYPES.APPROVE,
                          title: approveButton.title || BUTTON_TITLE_APPROVE,
                          state: {
                              inProgress: submissionType === PROPOSAL_STATUS_APPROVED && updateWorkflowStep_inProgress
                          },
                          onClick: () => {
                              handleApproveReject(PROPOSAL_STATUS_APPROVED);
                          },
                          bool:
                              !step.completed &&
                              !step.rejected &&
                              !hasApproved() &&
                              (claimHelper.getPermission(getLoggedUserClaims_data, step, submitAction) ||
                                  checkUserTypePermission()),
                          disabled: _.get(approveButton, 'disabled', false)
                      }
                  ]
                : [])
        ],
        artifacts: artifacts
    };
    console.log('checkUserTypePermission()', checkUserTypePermission());
    return (
        <>
            <FormHeaderComponent {...formHeaderProps} />
            <ApproveRejectBase
                reviewStatusCount={getReviewerCountAndList().reviewStatusCount}
                userList={getReviewerCountAndList().reviewersList}
                renderComponent={
                    documentUrl ? (
                        <DocumentViewer signedDocumentURL={documentUrl} />
                    ) : multipledocUrls ? (
                        <MultipleDocViewer
                            urls={multipledocUrls}
                            title={convertArtifacts(_.get(dataset, `documents.${documentName}.title`, ''), artifacts)}
                            bucketType={isPublicBucket}
                        />
                    ) : formName ? (
                        <FormGenerator
                            className="generate-iaa-manager-letters-form"
                            onSubmit={() => {}}
                            name={formName}
                            formFieldData={
                                formFieldData
                                    ? formFieldData
                                    : formFieldFunction
                                    ? formFieldFunction({ ...dirtyFormValues, ...props })
                                    : null
                            }
                            disabled={step.completed || step.rejected || disabled}
                            formType={GENERATE_FORMS_TYPE_SIMPLE}
                            formHooks={formHooks}
                            artifacts={artifacts}
                        />
                    ) : component ? (
                        component
                    ) : null
                }
                contentPosition={contentPosition}
                comments={_.get(dataset, 'commentThread.comments', [])}
                commentsSection={renderCommentSection}
                hideComments={hideCommentsSection}
                hideTitles={hideCountCards}
            />
            <ConfirmModal
                show={isShowConfirmModal}
                handleClose={() => closeConfirmModal()}
                handleSubmit={comment => onConfirmModalSubmit(comment)}
                savingComment={savingComment}
                isRequired={submissionType !== PROPOSAL_STATUS_APPROVED}
                isApprove={submissionType === PROPOSAL_STATUS_APPROVED}
            />
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({
    resetConfirmModalForm: () => {
        dispatch(initialize(APPROVE_REJECT_CONFIRM_COMMENT_FORM, { comment: '' }));
    },
    resetCommentForm: () => {
        dispatch(initialize(SIMPLE_COMMENT_FORM, { comment: '' }));
    }
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(SimpleApproveReject);
