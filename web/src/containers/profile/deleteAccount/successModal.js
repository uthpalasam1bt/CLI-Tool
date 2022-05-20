import React from 'react';
import { Modal } from 'antd';

const SuccessModal = props => {
    const { visible, onClose } = props;

    return (
        <Modal
            className="lgim-styles-wrapper delete-account-modal delete-request-modal"
            footer={null}
            visible={visible}
            title="Delete"
            onCancel={onClose}
        >
            <div className="content">
                <p className="content-title">Your delete request has been sent</p>
            </div>
        </Modal>
    );
};

export default SuccessModal;
