import React from 'react';
import CommonModal from './BaseModalComponent';

const GenerateReportModal = ({ onClose, visible, onProceed }) => (
    <CommonModal
        className="lgim-styles-wrapper modal-report generate-modal add-user-modal"
        visible={visible}
        title="Generate Report"
        content="Reports will be generated for all selected schemes."
        subContent="Note: Report generation may take a few minutes."
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

export default GenerateReportModal;
