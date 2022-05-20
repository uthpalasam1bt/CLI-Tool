import React from 'react';
import { Modal, Spin } from 'antd';
import PropTypes from 'prop-types';
import PDFViewer from '../../../../components/scheme/registration/PDFViewer';
import ApprovalStatusComponent from './approveRejectModalComponents/ApprovalStatusComponent';
import CommentComponent from './approveRejectModalComponents/CommentComponent';

const BaseModalComponent = ({
    visible,
    className,
    title,
    content,
    subContent,
    onCancel,
    onProceed,
    cancelButton,
    proceedButton,
    viewVisibility,
    url,
    approvalStatusVisisblity = true,
    approvalStatus,
    commentComponentVisibility,
    saveComment,
    commentValue,
    comments,
    concurrent,

    addCommentVisibility
}) => {
    return (
        <Modal
            className={className}
            visible={visible}
            footer={null}
            title={title}
            onCancel={() => {
                if(!concurrent){
                    onCancel();

                }
            }}
        >
            <>
                {viewVisibility ? (
                    <>
                        <div className="content">
                            <div className="approval-wrap report-approval-wrap">
                                {approvalStatusVisisblity && approvalStatus && (
                                    <ApprovalStatusComponent approvalStatus={approvalStatus} />
                                )}
                                <div className="doc-preview-container">
                                    {url ? (
                                        <PDFViewer documentURL={url} />
                                    ) : (
                                        <>
                                            <div className="loading-container">
                                                <Spin />
                                            </div>
                                        </>
                                    )}
                                </div>
                                {commentComponentVisibility && (
                                    <CommentComponent
                                        commentsVisibility={commentComponentVisibility}
                                        addCommentVisibility={addCommentVisibility}
                                        approvalStatus={approvalStatus}
                                        comments={comments}
                                        commentValue={commentValue}
                                        saveComment={saveComment}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="content">
                            <div className="content-text">{content}</div>
                            <span className="content-sub-text">{subContent}</span>
                        </div>

                        <div className="footer report-modal-footer">
                            {!cancelButton && (
                                <button className="btn btn-cancel" onClick={onCancel}>
                                    Cancel
                                </button>
                            )}
                            {!proceedButton && (
                                <button className="btn btn-proceed" onClick={onProceed}>
                                    Proceed
                                </button>
                            )}
                            {cancelButton ? cancelButton : null}
                            {proceedButton ? proceedButton : null}
                        </div>
                    </>
                )}
            </>
        </Modal>
    );
};

BaseModalComponent.propTypes = {
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    subContent: PropTypes.string
};

export default BaseModalComponent;
