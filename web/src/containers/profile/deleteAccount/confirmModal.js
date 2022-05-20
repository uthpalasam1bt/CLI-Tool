import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Input, Checkbox, Button } from 'antd';
import NotificationHelper from '../../../helpers/NotificationHelper';
import { SCHEME_USER_DELETE_ACCOUNT_SYSTEM_MESSAGES } from './constants';
import { validateUserPassword } from '../actions';
import { getValidatingUserPassword_inProgress } from '../selectors';

const ConfirmModal = props => {
    const { visible, onClose, onProceed, loggedUser } = props;
    const [isAgreeToc, setIsAgreeToc] = useState(false);
    const [passwordTxt, setPasswordTxt] = useState('');

    const validatingPassword = useSelector(state => getValidatingUserPassword_inProgress(state));

    const dispatch = useDispatch();

    const onSubmit = () => {
        if (!isAgreeToc)
            return NotificationHelper.getInstance().warning(SCHEME_USER_DELETE_ACCOUNT_SYSTEM_MESSAGES.AGREE_TOC);
        dispatch(
            validateUserPassword(loggedUser.email, passwordTxt, status => {
                if (status) onProceed();
            })
        );
    };

    const onChange = e => {
        setPasswordTxt(e.target.value);
    };

    return (
        <Modal
            className="lgim-styles-wrapper delete-account-modal delete-request-modal"
            footer={null}
            visible={visible}
            title="Delete Request"
            onCancel={onClose}
        >
            <div className="content">
                <p className="content-title">Please enter your password to confirm</p>
                <Input
                    type="password"
                    placeholder="Enter your password"
                    className="input-password"
                    onChange={onChange}
                    value={passwordTxt}
                />
                <Checkbox onChange={e => setIsAgreeToc(e.target.checked)}>
                    I agree that by requesting to delete my account I will no longer have access to platform and all my
                    pension scheme data will be deleted.
                </Checkbox>
                <Button
                    type="primary"
                    className="pull-right btn-danger"
                    danger={true}
                    loading={validatingPassword}
                    onClick={() => onSubmit()}
                    disabled={!isAgreeToc}
                >
                    Send delete request
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
