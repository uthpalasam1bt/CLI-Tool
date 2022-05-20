import React from 'react';
import ProtoType from 'prop-types';
import CommonModal from './BaseModalComponent';

const DeleteModal = ({ visible, onClose, onProceed }) => {
    return (
        <CommonModal
            className="lgim-styles-wrapper modal-report generate-modal add-user-modal"
            visible={visible}
            footer={null}
            title="Delete Report"
            onCancel={onClose}
            onProceed={onProceed}
            content="Are you sure you want to delete the report ?"
            cancelButton={
                <button className="btn btn-no btn-outline" onClick={onClose}>
                    Cancel
                </button>
            }
            proceedButton={
                <button className="btn btn-yes btn-red" onClick={onProceed}>
                    Delete
                </button>
            }
        />
    );
};

DeleteModal.prototype = {
    visible: ProtoType.bool.isRequired,
    onClose: ProtoType.func,
    onProceed: ProtoType.func
};

export default DeleteModal;
