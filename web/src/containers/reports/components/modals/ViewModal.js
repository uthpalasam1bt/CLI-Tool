import React from 'react';
import { Upload } from 'antd';
import CommonModal from './BaseModalComponent';
import { ReportTitleForModal } from '../../utility';

const { Dragger } = Upload;

const ViewModal = ({ onClose, visible, report, url, approvalStatus, commentComponentVisibility, comments }) => {

    return (
        <CommonModal
            visible={visible}
            className="lgim-styles-wrapper modal-report  approve-reject-modal"
            title={
                <>
                    <span
                        className="close-wrap"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Close <i className="fa fa-close icon"></i>
                    </span>
                    {report && ReportTitleForModal(report)}
                </>
            }
            viewVisibility={true}
            onCancel={onClose}
            url={url}
            approvalStatus={approvalStatus}
            commentComponentVisibility={commentComponentVisibility}
            comments={comments}
      
        />
    );
};

export default ViewModal;
