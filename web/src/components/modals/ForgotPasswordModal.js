import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';
import ForgotPasswordForm from '../../containers/user/forms/ForgotPasswordForm';
import logo from '../../assets/images/logo.svg';

export default class ForgotPasswordModal extends Component {
    render() {
        const { show, handleShowForgotPasswordModal, handleSubmitForgotPasswordForm, inProgress } = this.props;

        return (
            <Modal
                visible={show}
                footer={null}
                maskClosable={false}
                className="lgim-styles-wrapper forgot-password-modal"
                width={350}
                onCancel={handleShowForgotPasswordModal}
            >
                <div className="forgot-password-container">
                    <Row className="image-row">
                        <Col lg={24} className="image-content">
                            <img src={logo} alt="logo" className="image" width="130" />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={24} className="forgot-password-content">
                            <p className="forgot-password-title">Forgot your password?</p>
                            <p className="forgot-password-subtitle">
                                Enter your Email below and we will send a message to reset your password
                            </p>
                            <ForgotPasswordForm onSubmit={handleSubmitForgotPasswordForm} inProgress={inProgress} />
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}
