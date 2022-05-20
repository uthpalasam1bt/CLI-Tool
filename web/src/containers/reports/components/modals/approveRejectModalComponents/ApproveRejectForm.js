import React, { useEffect, useState } from 'react';
// import ApproveModal from './ApproveModal';
// import RejectModal from './RejectModal';
import { ReportTitleForModal } from '../../../utility';
import ApproveRejectCommentModal from './ApproveRejectCommentModal';

function ApproveRejectForm({
    onApproveClicked,
    onRejectClicked,
    approveRejectVisibility,
    commentDetails,
    modalVisibility,
    setReportStatus,
    approveClaim,
    onClose,
    report
}) {
    const [approveModalVisibility, setApproveVisibility] = useState(false);
    const [rejectModalVisibility, setRejectVisibility] = useState(false);
    const [disabledButtonState, setDisabledButtonState] = useState(!modalVisibility);

    useEffect(() => {
        setDisabledButtonState(false);
    }, [modalVisibility]);

    return approveRejectVisibility ? (
        <div className="reject-wrap">
            <ApproveRejectCommentModal
                onApproveClicked={onApproveClicked}
                visibility={approveModalVisibility}
                commentDetails={commentDetails}
                setVisibility={setApproveVisibility}
                setDisabledButtonState={setDisabledButtonState}
                setReportStatus={setReportStatus}
                approveVisible={true}
            />
            <ApproveRejectCommentModal
                onRejectClicked={onRejectClicked}
                visibility={rejectModalVisibility}
                commentDetails={commentDetails}
                setVisibility={setRejectVisibility}
                setDisabledButtonState={setDisabledButtonState}
                setReportStatus={setReportStatus}
                rejectVisible={true}
            />
            <span className="close-wrap" onClick={() => onClose(false)}>
                Close <i className="fa fa-close icon"></i>
            </span>
            {report && ReportTitleForModal(report)}

            <div className="btn-wrap">
                <button
                    className="btn btn-reject"
                    disabled={disabledButtonState || !approveClaim}
                    size={'large'}
                    onClick={() => setRejectVisibility(true)}
                >
                    <i className="fa fa-times-circle icon" aria-hidden="true"></i> Reject
                </button>
                <button
                    disabled={disabledButtonState || !approveClaim}
                    className="btn btn-approve"
                    onClick={() => {
                        setApproveVisibility(true);
                    }}
                >
                    <i className="fa fa-check-circle icon" aria-hidden="true"></i>
                    Approve
                </button>
            </div>
        </div>
    ) : (
        <div className="report-name">Report Preview</div>
    );
}

export default ApproveRejectForm;
