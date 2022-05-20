import React, { useState } from 'react';
import CommonModal from '../BaseModalComponent';
import TextArea from 'antd/lib/input/TextArea';
import NotificationHelper from '../../../../../helpers/NotificationHelper';

const format = /[!#$%^*()+\=\[\]{};':"\\|<>\/?]+/;

function ApproveRejectCommentModal({
    onApproveClicked,
    onRejectClicked,
    visibility,
    setVisibility,
    setDisabledButtonState,
    setReportStatus,
    approveVisible,
    rejectVisible
}) {
    const [comment, setComment] = useState('');

    return (
        <CommonModal
            className="lgim-styles-wrapper modal-report generate-modal add-user-modal reject-modal"
            visible={visibility}
            footer={null}
            title={!rejectVisible ? 'Approve Report' : 'Reject Report'}
            onCancel={() => {
                setVisibility(false);
                setComment('');
            }}
            content={
                <div className="comment-wrap">
                    <span className="comment">Comment</span>
                    <TextArea
                        onChange={e => {
                            if (e && e.target && e.target.value && format.test(e.target.value)) {
                                setComment(e.target.value.replace(/[!#$%^*()+\=\[\]{};':"\\|<>\/?]+/, ''));
                                NotificationHelper.getInstance().warning('Special characters are not allowed.');
                            } else {
                                setComment(e.target.value);
                            }
                        }}
                        value={comment}
                        rows={3}
                    />
                </div>
            }
            cancelButton={
                <button
                    className="btn btn-no btn-outline"
                    onClick={() => {
                        setVisibility(false);
                        setComment('');
                    }}
                >
                    Cancel
                </button>
            }
            proceedButton={
                <button
                    disabled={(rejectVisible && !comment) || (rejectVisible && comment === '')}
                    className={rejectVisible ? 'btn btn-yes btn-red' : 'btn btn-green'}
                    onClick={() => handleOnProceed()}
                >
                    {rejectVisible ? 'Reject' : 'Approve'}
                </button>
            }
        />
    );

    function handleOnProceed() {
        // setReportStatus(rejectVisible ? 'Rejected' : 'Approved');
        if (rejectVisible && onRejectClicked) {
            onRejectClicked({
                comment: comment,
                status: 'R',
                approved: false,
                rejected: true
            });
        }
        if (approveVisible && onApproveClicked) {
            onApproveClicked({
                comment: comment,
                status: 'A',
                approved: true,
                rejected: false
            });
        }
        // dispatch();
        setDisabledButtonState(true);
        setVisibility(false);
        setComment('');
    }
}
export default ApproveRejectCommentModal;
