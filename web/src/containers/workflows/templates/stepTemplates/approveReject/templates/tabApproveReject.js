import React, { useState, useEffect, Suspense } from 'react';
import { Tabs } from 'antd';
import { useDispatch, connect, useSelector } from 'react-redux';
import { initialize, getFormValues } from 'redux-form';
import { compose } from 'redux';
import _ from 'lodash';
import { saveAs } from 'file-saver';
import config from 'appConfig';

import FormGenerator from '../../../../../../UILibrary/components/forms/formBase';
import FormSectionBase from '../../../../../../UILibrary/components/forms/formBase/FormSectionBase';
import FormHeaderComponent from '../../../../../../UILibrary/components/forms/formHeader';
import TabChange from '../../../../../../UILibrary/components/tabChangeComponent';
import ApproveRejectBase from './components/approveRejectBase';
import CommentSection from '../../common/commentSection';
import DocumentViewer from './components/documentViewer';
import ConfirmModal from './modals/confirmModal';
import uiLibConstants from '../../../../../../UILibrary/constants';
import constants from '../../../../constants';
import { readFile } from '../../../../../../helpers/downloadHelper';
import connectApi from '../../../../../../middlewares/connectApi';
import { tabFormDataDownloader } from '../../../../../../UILibrary/helpers/FormDownloadHelper';
import MultipleDocViewer from './components/multipleDocViewer';
import claimHelper from '../../../../../../helpers/claimHelper';
import { convertArtifacts } from '../../../../../../UILibrary/helpers/ArtifactConverter';
import NotificationHelper from '../../../../../../helpers/NotificationHelper';

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

const { bucket: privateBucketName, publicBucket: publicBucketName } = config;
const { GENERATE_FORMS_TYPE_WITH_CHILDREN, GENERATE_FORM_SECTION_TYPE_SIMPLE, FORM_ACTION_TYPES } = uiLibConstants;

const TabApproveReject = props => {
    const {
        dataset,
        formName,
        formTabs,
        formHooks,
        disabled,
        baseDocument,
        contentPosition,
        options: {
            title,
            titleIicon,
            rejectButton = false,
            approveButton = false,
            downloadButton = false,
            onRejectMessage,
            onApproveMessage,
            fetchEntityDataAfterSubmit = false,
            navigateAfterSubmit = false,
            fetchWorkflowAfterSubmit = true,
            zipName = 'scheme',
            labelOverRide = {},
            excelFileName = 'request',
            attachmentArray = [],
            hideActionButtonsInTabs = [],
            forceFormDataChange = false
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
        handleChangeDataset,
        submitAction = STEP_ACTION_AUTHORIZE
    } = props;

    const dispatch = useDispatch();
    const dirtyFormValues = useSelector(getFormValues(formName));
    const [submissionType, setSubmissionType] = useState(null);
    const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
    const [activeTabKey, changeActiveTaKey] = useState(null);
    const [savingComment, setSavingComment] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [approvers, setApprovers] = useState([]);

    useEffect(() => {
        if (dataset && dataset.formData) {
            dispatch(initialize(formName, dataset.formData));
        }
        if (dataset && dataset.approvers) setApprovers(_.get(dataset, `approvers.${baseDocument}.users`, []));
    }, [dataset]);

    useEffect(() => {
        if (formTabs.length && !activeTabKey) {
            onchangeTab(formTabs[0].tabKey);
        }
    }, [formTabs]);

    const onchangeTab = key => {
        changeActiveTaKey(key);
    };

    const isMultipleDocuments = key => {
        return _.has(dataset, `documents.${key}.urls`);
    };

    const getDocumentUrl = key => {
        let documentUrl;
        if (dataset && dataset.documents && dataset.documents[key] && dataset.documents[key].url) {
            documentUrl = _.get(dataset, `documents.${key}.url`, null);
        } else if (dataset && dataset.documents && dataset.documents[key] && dataset.documents[key].urls) {
            documentUrl = _.get(dataset, `documents.${key}.urls`, []);
        }
        return documentUrl;
    };

    async function handleDownload() {
        if (formTabs.length > 0) {
            let isFormTab = false;
            setIsDownloading(true);
            for (const tab of formTabs) {
                if (_.has(tab, 'documentName')) {
                    const documentUrl = getDocumentUrl(tab.documentName);
                    const file = await readFile({
                        url: documentUrl,
                        bucket: isPublicBucket ? publicBucketName : privateBucketName
                    });
                    const chunkedUrl = documentUrl.split('/');
                    const fileName = chunkedUrl[chunkedUrl.length - 1];
                    const content = new Blob([file], { type: 'application/octet-stream' });
                    saveAs(content, fileName);
                } else if (isFormTab || _.has(tab, 'formFieldData') || _.has(tab, 'formFieldFunction')) {
                    isFormTab = true;
                    continue;
                }
            }
            if (isFormTab) {
                const bucketName = isPublicBucket ? publicBucketName : privateBucketName;
                await tabFormDataDownloader(
                    dirtyFormValues,
                    connectApi,
                    formTabs,
                    bucketName,
                    labelOverRide,
                    zipName,
                    excelFileName,
                    attachmentArray,
                    artifacts
                );
            }
            setIsDownloading(false);
        }
    }

    const handleApproveReject = type => {
        let hookData = null;
        if (type === PROPOSAL_STATUS_APPROVED && formHooks && formHooks.onApproveHook) {
            hookData = formHooks.onApproveHook(dataset, dirtyFormValues, handleChangeDataset);
        }
        if (hookData && hookData.error) {
            if (hookData.error.navigateTo) onchangeTab(hookData.error.navigateTo);
            return NotificationHelper.getInstance().error(hookData.error.message);
        }
        setSubmissionType(type);
        setIsShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setIsShowConfirmModal(false);
        resetConfirmModalForm();
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
            approved: _.get(dataset, `approvers.${baseDocument}.metaData.approvedCount`, 0),
            rejected: _.get(dataset, `approvers.${baseDocument}.metaData.rejectedCount`, 0),
            pending: step.rejected ? 0 : _.get(dataset, `approvers.${baseDocument}.metaData.pendingCount`, 0)
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

            _dataset.approvers[baseDocument].users = [
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
                    documents: _dataset.documents,
                    ...(forceFormDataChange ? { formData: dirtyFormValues } : [])
                },
                () => {
                    setIsShowConfirmModal(false);
                },
                { message, fetchEntityDataAfterSubmit, navigateAfterSubmit, fetchWorkflowAfterSubmit }
            );
        }
        closeConfirmModal();
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
                          // bool:
                          //     claimHelper.getPermission(getLoggedUserClaims_data, step, BUTTON_CLAIM_DOWNLOAD) &&
                          //     !step.completed &&
                          //     !step.rejected
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
                              claimHelper.getPermission(getLoggedUserClaims_data, step, submitAction) &&
                              !hideActionButtonsInTabs.includes(activeTabKey),
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
                              claimHelper.getPermission(getLoggedUserClaims_data, step, submitAction) &&
                              !hideActionButtonsInTabs.includes(activeTabKey),
                          disabled: _.get(approveButton, 'disabled', false)
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
            >
                <TabChange activeTabKey={activeTabKey} formTabs={formTabs} onchangeTab={onchangeTab}>
                    <Tabs activeKey={activeTabKey} onChange={activeKey => onchangeTab(activeKey)}>
                        {formTabs.map(tab => (
                            <Tabs.TabPane
                                tab={convertArtifacts(tab.tabName, artifacts)}
                                key={tab.tabKey}
                                forceRender={true}
                            >
                                <Suspense>
                                    <ApproveRejectBase
                                        reviewStatusCount={getReviewerCountAndList().reviewStatusCount}
                                        userList={getReviewerCountAndList().reviewersList}
                                        renderComponent={
                                            tab.documentName ? (
                                                isMultipleDocuments(tab.documentName) ? (
                                                    <MultipleDocViewer
                                                        urls={getDocumentUrl(tab.documentName)}
                                                        title={convertArtifacts(
                                                            _.get(dataset, `documents.${tab.documentName}.title`, ''),
                                                            artifacts
                                                        )}
                                                        hideTitles={tab.hideLables}
                                                        bucketType={isPublicBucket}
                                                        requiredDocStatus={_.get(tab, 'documentStatus', null)}
                                                    />
                                                ) : (
                                                    <DocumentViewer
                                                        signedDocumentURL={getDocumentUrl(tab.documentName)}
                                                    />
                                                )
                                            ) : tab.formFieldData || tab.formFieldFunction ? (
                                                <div className="form-body">
                                                    <FormSectionBase
                                                        formSectionType={GENERATE_FORM_SECTION_TYPE_SIMPLE}
                                                        formSectionName={tab.tabKey}
                                                        formName={formName}
                                                        disabled={
                                                            tab.disabled || step.completed || step.rejected || disabled
                                                        }
                                                        formFieldData={
                                                            tab.formFieldData
                                                                ? tab.formFieldData
                                                                : tab.formFieldFunction
                                                                ? tab.formFieldFunction({
                                                                      ...dirtyFormValues,
                                                                      ...props
                                                                  })
                                                                : null
                                                        }
                                                        formHooks={formHooks}
                                                        artifacts={artifacts}
                                                    />
                                                </div>
                                            ) : tab.component ? (
                                                tab.component
                                            ) : null
                                        }
                                        contentPosition={contentPosition}
                                        comments={_.get(dataset, 'commentThread.comments', [])}
                                        commentsSection={renderCommentSection}
                                        hideComments={tab.hideCommentsSection}
                                        hideTitles={tab.hideCountCards}
                                    />
                                </Suspense>
                            </Tabs.TabPane>
                        ))}
                    </Tabs>
                </TabChange>
            </FormGenerator>
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
)(TabApproveReject);
