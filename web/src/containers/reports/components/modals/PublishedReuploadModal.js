import React from 'react';
import PropTypes from 'prop-types';
import CommonModal from './BaseModalComponent';

const PublishedReuploadModal = ({ onClose, visible, onProceed, title, content }) => {
    return (
        <CommonModal
            className="lgim-styles-wrapper modal-report generate-modal add-user-modal"
            visible={visible}
            title={title}
            content={content}
            onCancel={onClose}
            onProceedReport={onProceed}
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

PublishedReuploadModal.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default PublishedReuploadModal;
