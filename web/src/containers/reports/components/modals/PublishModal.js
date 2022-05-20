import React from 'react';
import CommonModal from './BaseModalComponent';

const PublishModal = ({ onClose, visible, onProceed }) => {
    return (
        <CommonModal
            className="lgim-styles-wrapper modal-report generate-modal add-user-modal"
            visible={visible}
            title="Publish"
            content="Report(s) of the selected scheme(s) will be published."
            onCancel={onClose}
            cancelButton={
                <button className="btn btn-cancel" onClick={onClose}>
                    Cancel
                </button>
            }
            proceedButton={
                <button className="btn btn-proceed" onClick={onProceed}>
                    Proceed
                </button>
            }
        />
    );
};

export default PublishModal;
