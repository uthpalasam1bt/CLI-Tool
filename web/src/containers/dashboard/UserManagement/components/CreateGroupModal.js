import React from 'react';
import { Modal, Row, Col } from 'antd';
import AddLgimGroupForm from '../forms/AddLgimGroupForm';

const CreateGroupModal = props => {
    const { show, inProgress, handleShow, handleSubmit } = props;

    return (
        <Modal
            visible={show}
            footer={null}
            maskClosable={false}
            className="lgim-styles-wrapper add-user-modal"
            onCancel={() => handleShow(false)}
        >
            <div className="add-user-modal-wrapper">
                <Row>
                    <Col lg={24}>
                        <AddLgimGroupForm onSubmit={handleSubmit} handleShow={handleShow} inProgress={inProgress} />
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default CreateGroupModal;
