import React from 'react';
import PropTypes from 'prop-types';
import CommonModal from './BaseModalComponent';

const UploadReplaceModal = ({ uploadReplaceVisible, onClose, onProceed }) => {
    return (
        <CommonModal
            visible={uploadReplaceVisible}
            className="lgim-styles-wrapper modal-report generate-modal add-user-modal"
            title="Upload Different Report Type"
            content="Proceed with (or delete) uploaded reports prior to selecting another report type."
            onCancel={onClose}
            onProceed={onProceed}
            proceedButton={
                <button className="btn btn-yes btn-red" onClick={onProceed}>
                    OK
                </button>
            }
        />
    );
};

UploadReplaceModal.propTypes = {
    uploadReplaceVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    uploadVisibility: PropTypes.bool,
    onProceed: PropTypes.func
};

export default UploadReplaceModal;
