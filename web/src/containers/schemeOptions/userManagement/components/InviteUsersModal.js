import React from 'react';
import { Modal, Row, Col } from 'antd';
import InviteUserForm from '../forms/AddUsersForm';

const InviteUsersModal = props => {
    const { show, inProgress, handleShow, handleSubmit, editMode, permissionToEditOtp } = props;
    return (
        <Modal
            visible={show}
            footer={null}
            maskClosable={false}
            className="lgim-styles-wrapper add-user-modal"
            onCancel={handleShow}
        >
            <div className="add-user-modal-wrapper">
                <Row>
                    <Col lg={24}>
                        <h4 className="title">{editMode ? 'Update' : 'Add'} Scheme Users</h4>
                        <InviteUserForm
                            onSubmit={handleSubmit}
                            handleShow={handleShow}
                            inProgress={inProgress}
                            editMode={editMode}
                            permissionToEditOtp={permissionToEditOtp}
                        />
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default InviteUsersModal;
