import React, { Component } from 'react';
import { Modal, Row, Col } from 'antd';
import LoginForm from '../../containers/user/forms/LoginForm';
import logo from '../../assets/images/logo.svg';

export default class LoginModal extends Component {
    render() {
        const {
            show,
            inProgress,
            handleShowLoginModal,
            handleSubmitLoginForm,
            handleShowForgotPasswordModal,
            redirectTo
        } = this.props;

        return (
            <Modal
                visible={show}
                footer={null}
                maskClosable={false}
                className="lgim-styles-wrapper login-modal"
                width={350}
                onCancel={handleShowLoginModal}
            >
                <div className="login-container">
                    <Row className="image-row">
                        <Col lg={24} className="image-content">
                            <img src={logo} alt="logo" className="image" width="130" />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={24} className="login-content">
                            <h4 className="login-title">Sign in with your email and password</h4>
                            <LoginForm
                                onSubmit={handleSubmitLoginForm}
                                handleShowForgotPasswordModal={handleShowForgotPasswordModal}
                                inProgress={inProgress}
                            />
                            <div className="login-footer">
                                Need an account?
                                <span
                                    className="text-link text-signup"
                                    onClick={() => {
                                        redirectTo('/register');
                                    }}
                                >
                                    Sign up
                                </span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }
}
