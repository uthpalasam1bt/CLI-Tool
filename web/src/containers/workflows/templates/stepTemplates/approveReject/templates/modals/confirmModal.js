import React from 'react';
import { Modal, Row, Col } from 'antd';
import CommentForm from '../components/commentFormSection';

const ConfirmModal = props => {
    const { show, handleSubmit, handleOk, handleClose, savingComment, isRequired, isApprove } = props;

    return (
        <Modal
            visible={show}
            footer={null}
            maskClosable={false}
            className="lgim-styles-wrapper rip-proposal-modal"
            onOk={handleOk}
            onCancel={handleClose}
        >
            <div className="create-scheme-modal-wrapper">
                <Row>
                    <Col lg={24}>
                        <h4 className="title">{isApprove ? 'Approve' : 'Reject'} </h4>
                        <CommentForm
                            onSubmit={handleSubmit}
                            handleHide={handleClose}
                            isSubmitInProgress={savingComment}
                            isRequired={isRequired}
                            isApprove={isApprove}
                        />
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
