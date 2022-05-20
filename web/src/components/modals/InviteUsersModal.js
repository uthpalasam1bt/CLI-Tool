import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';
import InviteUserForm from '../../containers/schemeOptions/userManagement/forms/AddUsersForm';
import InvaiteLgimUserForm from '../../containers/dashboard/form/AddLgimUserForm';

export default class InviteUsersModal extends Component {
    render() {
        const { show, inProgress, handleShow, handleSubmit, submitForm, isLgimUserCreate } = this.props;

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
                            <h4 className="title">{isLgimUserCreate ? 'Create LGIM user' : 'Add New Users'}</h4>
                            {isLgimUserCreate ? (
                                <InvaiteLgimUserForm />
                            ) : (
                                <InviteUserForm
                                    onSubmit={handleSubmit}
                                    handleShow={handleShow}
                                    inProgress={inProgress}
                                    submitForm={submitForm}
                                />
                            )}
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}
