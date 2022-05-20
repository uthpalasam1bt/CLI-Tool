import React, { Component } from 'react';
import { Modal } from 'antd';
import ChengePasswordForm from '../../containers/profile/accountAccess/forms';
export default class ChangePassword extends Component {
    render() {
        const { show, close } = this.props;

        return (
            <Modal
                visible={show}
                title="Change Password"
                footer={null}
                maskClosable={false}
                onCancel={close}
                className="lgim-styles-wrapper change-password-modal"
            >
                <ChengePasswordForm close={close} onSubmit={this.props.handleSubmit} />
            </Modal>
        );
    }
}
