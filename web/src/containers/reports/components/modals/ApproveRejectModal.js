import React from 'react';
import CommonModal from './BaseModalComponent';
import ApproveRejectForm from './approveRejectModalComponents/ApproveRejectForm';

const approveRejectModal = ({
    onClose,
    visible,
    commentDetails,
    onApproveClicked,
    onRejectClicked,
    url,
    approveRejectVisibility = true,
    setReportStatus,
    approveClaim,
    commentComponentVisibility,
    addCommentVisibility,
    approvalStatus,
    report,
    saveComment,
    comments
}) => {
    return (
        <CommonModal
            visible={visible}
            className="lgim-styles-wrapper modal-report  approve-reject-modal"
            title={
                <>
                    <ApproveRejectForm
                        modalVisibility={visible}
                        commentDetails={commentDetails}
                        onApproveClicked={onApproveClicked}
                        onRejectClicked={onRejectClicked}
                        approveRejectVisibility={approveRejectVisibility}
                        setReportStatus={setReportStatus}
                        onClose={onClose}
                        approveClaim={approveClaim}
                        report={report}
                    />
                </>
            }
            viewVisibility={true}
            url={url}
            approvalStatus={approvalStatus}
            onCancel={onClose}
            commentComponentVisibility={commentComponentVisibility}
            addCommentVisibility={addCommentVisibility}
            saveComment={saveComment}
            comments={comments}
        />
    );
};

export default approveRejectModal;
