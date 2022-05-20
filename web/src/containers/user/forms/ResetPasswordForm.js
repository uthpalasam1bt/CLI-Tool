import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputField, PasswordField } from '../../../UILibrary/components/forms/fields';
import { required, numericality, confirmation, format } from 'redux-form-validators';
import { Row, Col } from 'antd';
import { passwordRegex } from '../../../UILibrary/validation-module/regexValidations';

let UserConfirmationForm = props => {
    const { handleSubmit, resendPasswordResetCode, email, forgotPasswordInProgress, resetPasswordInProgress } = props;

    return (
        <form className="reset-password-form" onSubmit={handleSubmit}>
            <Row className="content-row mb-1">
                <Col md={7} xs={24}>
                    <span className="input-title">Email Address</span>
                </Col>
                <Col md={17} xs={24}>
                    <div className="form-group">
                        <span className="input-label">{email}</span>
                    </div>
                </Col>
            </Row>

            <Row className="content-row mb-1">
                <Col md={7} xs={24}>
                    <span className="input-title">New Password</span>
                </Col>
                <Col md={17} xs={24}>
                    <div className="form-group">
                        <Field
                            name="newPassword"
                            type="password"
                            //className="form-control" fix for TP2U-12
                            component={PasswordField}
                            validate={[
                                required({ message: 'Required' }),
                                format({ with: passwordRegex, message: 'Choose a strong password' })
                            ]}
                        />
                    </div>
                </Col>
            </Row>

            <Row className="content-row mb-1">
                <Col md={7} xs={24}>
                    <span className="input-title">Confirm Password</span>
                </Col>
                <Col md={17} xs={24}>
                    <div className="form-group">
                        <Field
                            name="confirmPwd"
                            type="password"
                            className="form-control"
                            component={InputField}
                            options={{
                                ignoreCharacterValidation: true
                            }}
                            validate={[
                                required({ message: 'Required' }),
                                confirmation({ field: 'newPassword', message: 'Password mismatch' })
                            ]}
                        />
                    </div>
                </Col>
            </Row>

            <Row className="content-row mb-1">
                <Col md={7} xs={24}>
                    <span className="input-title">Reset Password Code</span>
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
                                numericality({ int: true, message: 'Invalid entry. Please re-enter.' })
                            ]}
                        />
                    </div>
                </Col>
            </Row>

            <Row className="content-row mb-1">
                <Col xs={24} md={{ span: 17, offset: 7 }}>
                    <button
                        className="btn-submit tpip-btn-blue regular"
                        type="submit"
                        disabled={resetPasswordInProgress}
                    >
                        Reset Password{' '}
                        {resetPasswordInProgress && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
                    </button>
                    <button
                        className="resend-confirmation-code btn-link"
                        type="button"
                        disabled={forgotPasswordInProgress}
                        onClick={resendPasswordResetCode}
                    >
                        Resend Reset Password Code{' '}
                        {forgotPasswordInProgress && (
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
