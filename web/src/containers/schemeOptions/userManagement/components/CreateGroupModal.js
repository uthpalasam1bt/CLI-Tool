import React from 'react';
import { Modal, Row, Col } from 'antd';
import AddGroupForm from '../forms/AddGroupForm';

const CreateGroupModal = props => {
    const { show, inProgress, handleShow, handleSubmit } = props;

    return show ? (
        <Modal
            visible={show}
            footer={null}
            maskClosable={true}
            className="lgim-styles-wrapper add-user-modal"
            onCancel={() => handleShow(false)}
        >
            <div className="add-user-modal-wrapper">
                <Row>
                    <Col lg={24}>
                        <AddGroupForm onSubmit={handleSubmit} handleShow={handleShow} inProgress={inProgress} />
                    </Col>
                </Row>
            </div>
        </Modal>
    ) : null;
};

export default CreateGroupModal;
