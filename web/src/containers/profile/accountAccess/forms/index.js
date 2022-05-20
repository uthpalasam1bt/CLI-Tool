import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { PasswordField } from '../../../../UILibrary/components/forms/fields';
import { required, confirmation, format } from 'redux-form-validators';
import { passwordRegex } from '../../../../UILibrary/validation-module/regexValidations';

import { Row, Col } from 'antd';
import { CHANGE_PASSWORD_FORM } from '../../constants';

let changePasswordForm = props => {
    const { handleSubmit, close } = props;

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <Row className="content-row">
                <Col lg={9} xs={24}>
                    <span className="input-title">Current password</span>
                </Col>
                <Col lg={15} xs={24}>
                    <div className="field-wrapper margin-wrap">
                        <Field
                            placeholder="Your current password"
                            name="oldPassword"
                            className=""
                            type="password"
                            component={PasswordField}
                            validate={[required({ message: 'Required' })]}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="content-row">
                <Col lg={9} xs={24}>
                    <span className="input-title">New password</span>
                </Col>
                <Col lg={15} xs={24}>
                    <div className="field-wrapper margin-wrap">
                        <Field
                            placeholder="Your new password"
                            name="newPassword"
                            className=""
                            type="password"
                            component={PasswordField}
                            validate={[
                                required({ message: 'Required' }),
                                format({ with: passwordRegex, message: 'Choose a strong password' })
                            ]}
                        />
                        {/* Common component there for password strength check */}
                    </div>
                </Col>
            </Row>
            <Row className="content-row">
                <Col lg={9} xs={24}>
                    <span className="input-title">Retype new password</span>
                </Col>
                <Col lg={15} xs={24}>
                    <div className="field-wrapper margin-wrap">
                        <Field
                            placeholder="Your new password"
                            name="retypePassword"
                            className=""
                            type="password"
                            component={PasswordField}
                            validate={[
                                required({ message: 'Required' }),
                                confirmation({ field: 'newPassword', message: 'Password mismatch' })
                            ]}
                        />
                    </div>
                </Col>
            </Row>
            <div className="footer clearfix">
                <button
                    className="btn-grey-o btn-close regular btn-footer"
                    type="button"
                    onClick={() => {
                        close();
                    }}
                >
                    Close
                </button>
                <button className="tpip-btn-blue btn-change regular btn-footer" type="submit">
                    Change{false && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
                </button>
            </div>
        </form>
    );
};

changePasswordForm = reduxForm({
    form: CHANGE_PASSWORD_FORM
})(changePasswordForm);

export default changePasswordForm;
