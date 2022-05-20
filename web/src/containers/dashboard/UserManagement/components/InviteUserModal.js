import React from 'react';
import { Modal, Row, Col } from 'antd';
// import InviteUserForm from '../forms/AddLgimUserForm';
import AddLgimUserForm from '../forms/AddLgimUserForm';

const InviteUserModal = props => {
    const { show, inProgress, handleShow, handleSubmit, userGroups, editMode, permissionToEditOtp } = props;

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
                        <h4 className="title">{editMode ? 'Update' : 'Create'} User</h4>
                        <AddLgimUserForm
                            onSubmit={handleSubmit}
                            handleShow={handleShow}
                            inProgress={inProgress}
                            userGroups={userGroups}
                            editMode={editMode}
                            permissionToEditOtp={permissionToEditOtp}
                        />
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default InviteUserModal;
