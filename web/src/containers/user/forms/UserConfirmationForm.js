import React from 'react';
import { useSelector } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { InputField } from '../../../UILibrary/components/forms/fields';
import { required, numericality, format } from 'redux-form-validators';
import { Row, Col } from 'antd';
import { SPACES_NOT_ALLOWED } from '../../../config/constants';
import NotificationHelper from '../../../helpers/NotificationHelper';

let UserConfirmationForm = props => {
    const {
        handleSubmit,
        resendUserConfirmationCode,
        email,
        confirmUserInProgress,
        resendUserConfirmationCodeInProgress,
        submit
    } = props;

    const dirtFormValues = useSelector(getFormValues('userConfirmationForm'));

    const validateConfirmCodeEmpty = () => {
        if (!((dirtFormValues || {}).code || '').trim()) {
            NotificationHelper.getInstance().warning('Enter the verification code emailed to you.');
        }
        submit();
    };
    return (
        <form className="user-confirmation-form" onSubmit={handleSubmit}>
            <Row className="content-row mb-1">
                <Col md={7} xs={24}>
                    <span className="input-title">Email Address</span>
                </Col>
                <Col md={17} xs={24}>
                    <div className="form-group">
                        <span className="input-title">{email}</span>
                    </div>
                </Col>
            </Row>

            <Row className="content-row mb-1">
                <Col md={7} xs={24}>
                    <span className="input-title">Confirmation Code</span>
                </Col>
                <Col md={17} xs={24}>
                    <div className="form-group">
                        <Field
                            name="code"
                            className="form-control"
                            placeholder="Enter confirmation code"
                            component={InputField}
                            validate={[
                                required({ message: 'Required' }),
                                numericality({ int: true, message: 'Invalid entry. Please re-enter.' }),
                                format({ with: /^[0-9]*$/, message: SPACES_NOT_ALLOWED })
                            ]}
                        />
                    </div>
                </Col>
            </Row>

            <Row className="content-row mb-1">
                <Col xs={24} md={{ span: 17, offset: 7 }}>
                    <button
                        className="btn-submit tpip-btn-blue regular"
                        type="button"
                        disabled={confirmUserInProgress}
                        onClick={validateConfirmCodeEmpty}
                    >
                        Confirm{' '}
                        {confirmUserInProgress && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
                    </button>
                    <button
                        className="resend-confirmation-code btn-link"
                        type="button"
                        disabled={resendUserConfirmationCodeInProgress}
                        onClick={resendUserConfirmationCode}
                    >
                        Resend confirmation code{' '}
                        {resendUserConfirmationCodeInProgress && (
                            <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                        )}
                    </button>
                </Col>
            </Row>
        </form>
    );
};

UserConfirmationForm = reduxForm({
    form: 'userConfirmationForm'
})(UserConfirmationForm);

export default UserConfirmationForm;
