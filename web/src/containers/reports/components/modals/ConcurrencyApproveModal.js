import React from 'react';
import CommonModal from './BaseModalComponent';

const ConcurrencyApproveModal = ({ visible, onClose, onProceed }) => {
    const content = (
        <div className="modl-content">
            <p className="title">
                <i className="fa fa-info-circle icon"></i>Reports Updated
            </p>
            <span className="content">
                The page has been updated. <br /> Do you want to refresh the page?
            </span>
        </div>
    );

    return (
        <CommonModal
            className="lgim-styles-wrapper modal-report generate-modal add-user-modal report-update-modal"
            visible={visible}
            footer={null}
            onCancel={onClose}
            cancelButton={() => {}}
            content={content}
            concurrent={true}
            proceedButton={
                <button className="tpip-btn-blue btn-ok regular" onClick={onProceed}>
                    OK
                </button>
            }
        ></CommonModal>
    );
};

export default ConcurrencyApproveModal;
