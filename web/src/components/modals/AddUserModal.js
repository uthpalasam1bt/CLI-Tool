import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';
import AddUserForm from '../../containers/schemeOptions/userManagement/forms/AddUsersForm';

export default class AddUserModal extends Component {
    render() {
        const { show, inProgress, handleShow, handleSubmit } = this.props;

        return (
            <Modal visible={show} footer={null} maskClosable={false} className="lgim-styles-wrapper add-user-modal">
                <div className="add-user-modal-wrapper">
                    <Row>
                        <Col lg={24}>
                            <h4 className="title">Invite New Users</h4>
                            <AddUserForm onSubmit={handleSubmit} handleShow={handleShow} inProgress={inProgress} />
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}
