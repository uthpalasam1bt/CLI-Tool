import config from 'appConfig';
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { InputField, PasswordField, ButtonGroup, ReCAPTCHA } from '../../../UILibrary/components/forms/fields';
import { required, email, confirmation, format, length } from 'redux-form-validators';
import { passwordRegex } from '../../../UILibrary/validation-module/regexValidations';
import { Row, Col, Popover } from 'antd';
import { UserRole } from '../../../constants/userConstants';
import { PASSWORD_CRITERIA_MESSAGE } from '../../../constants/formValidationErrors';

const { recaptchaKey } = config;
const { TRUSTEE, SPONSOR, ADVISOR, OTHER } = UserRole;

let RegisterForm = props => {
    const { inProgress, handleSubmit, primaryRole } = props;

    const popoverContent = (
        <ul className="password-strength-list">
            <li>At least 8 characters</li>
            <li>At least one lower case letter</li>
            <li>At least one upper case letter</li>
            <li>At least one number</li>
            <li>At least one special character (!@#$%&*)</li>
        </ul>
    );

    const popoverTitle = <span>Password strength</span>;

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <Row>
                <Col className="content">
                    <h4 className="register-title">Account Information</h4>
                </Col>
                <hr className="line-separator" />
            </Row>
            <Row className="content-row">
                <Col lg={7} xs={24}>
                    <span className="input-title">Name</span>
                </Col>
                <Col lg={17} xs={24}>
                    <Row gutter={30}>
                        <Col lg={12} xs={24}>
                            <div className="form-group ">
                                <Field
                                    name="firstName"
                                    className="form-control"
                                    placeholder="First name"
                                    component={InputField}
                                    validate={[
                                        required({ message: 'Required' }),
                                        length({
                                            msg: {
                                                tooShort: 'Minimum two charachters.',
                                                tooLong: 'Max 60 charachters.'
                                            },
                                            in: [2, 60]
                                        })
                                        // format({
                                        //   with: /^[`!@#$%^*()_+\-=[\]{};':"\\|,.<>/?~a-z- ]+$/i,
                                        //   message: 'Alphabet and special characters only.'
                                        // })
                                    ]}
                                />
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="form-group ">
                                <Field
                                    name="lastName"
                                    className="form-control"
                                    placeholder="Last name"
                                    component={InputField}
                                    validate={[
                                        required({ message: 'Required' }),
                                        length({
                                            msg: {
                                                tooShort: 'Minimum two charachters.',
                                                tooLong: 'Max 60 charachters.'
                                            },
                                            in: [2, 60]
                                        })
                                        // format({
                                        //   with: /^[`!@#$%^*()_+\-=[\]{};':"\\|,.<>/?~a-z- ]+$/i,
                                        //   message: 'Alphabet and special characters only.'
                                        // })
                                    ]}
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="content-row">
                <Col lg={7} xs={24}>
                    <span className="input-title">Role</span>
                </Col>
                <Col lg={17} xs={24}>
                    <div className="form-group input-wrap">
                        <Field
                            component={ButtonGroup}
                            name="primaryRole"
                            options={[
                                { title: 'Trustee', value: TRUSTEE, icon: 'fa-address-card' },
                                { title: 'Investment advisor', value: ADVISOR, icon: 'fa-briefcase' },
                                { title: 'Sponsor', value: SPONSOR, icon: 'fa-user-circle' },
                                { title: 'Other', value: OTHER, icon: 'fa-user' }
                            ]}
                            validate={[required({ message: 'Required' })]}
                        />
                    </div>
                </Col>
            </Row>
            {primaryRole === OTHER && (
                <Row className="content-row">
                    <Col lg={7} xs={24}>
                        <span className="input-title">Your user type</span>
                    </Col>
                    <Col lg={17} xs={24}>
                        <div className="form-group">
                            <Field
                                name="role"
                                className="form-control"
                                placeholder="Lawyer"
                                component={InputField}
                                validate={[
                                    required({ message: 'Required' }),
                                    format({
                                        with: /^[a-z0-9- ]+$/i,
                                        message: 'Field only permits letters & numbers to be entered.'
                                    })
                                ]}
                            />
                        </div>
                    </Col>
                </Row>
            )}
            <Row className="content-row">
                <Col lg={7} xs={24}>
                    <span className="input-title">Organisation</span>
                </Col>
                <Col lg={17} xs={24}>
                    <div className="form-group ">
                        <Field
                            name="organization"
                            className="form-control"
                            placeholder="Organisation"
                            component={InputField}
                            validate={[length({ max: 200 })]}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="titleRow">
                <Col className="content">
                    <h4 className="register-title">Account Access</h4>
                </Col>
                <hr className="line-separator" />
            </Row>
            <Row className="content-row mb-1">
                <Col lg={7} xs={24}>
                    <span className="input-title">Email address</span>
                </Col>
                <Col lg={17} xs={24}>
                    <div className="form-group">
                        <Field
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            component={InputField}
                            validate={[
                                required({ message: 'Required' }),
                                email({ message: 'Invalid email address.' }),
                                format({ without: /\+/ })
                            ]}
                            isEmail={true}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="content-row">
                <Col lg={7} xs={24}>
                    <span className="input-title">
                        Password
                        <Popover
                            className="password-popover"
                            placement="left"
                            content={popoverContent}
                            title={popoverTitle}
                        >
                            <i className="fa fa-info-circle info-icon"></i>
                        </Popover>
                    </span>
                </Col>
                <Col lg={17} xs={24}>
                    <div className="form-group">
                        <Field
                            name="userPassword"
                            placeholder="Password"
                            component={PasswordField}
                            validate={[
                                required({ message: 'Required' }),
                                format({ with: passwordRegex, message: PASSWORD_CRITERIA_MESSAGE })
                            ]}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="content-row">
                <Col lg={7} xs={24}>
                    <span className="input-title">Retype password</span>
                </Col>
                <Col lg={17} xs={24}>
                    <div className="form-group ">
                        <Field
                            name="confirmPwd"
                            placeholder="Password"
                            component={PasswordField}
                            validate={[
                                required({ message: 'Required' }),
                                confirmation({ field: 'userPassword', message: 'Password mismatch' })
                            ]}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="content-row">
                <Col lg={7} xs={24}>
                    <span className="input-title">Confirm authenticity</span>
                </Col>
                <Col lg={17} xs={24}>
                    <div className="form-group">
                        <Field
                            name="recaptcha"
                            className="form-control"
                            component={ReCAPTCHA}
                            validate={[required({ message: 'Required' })]}
                            recaptchaKey={recaptchaKey}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="content-row">
                <Col lg={7} xs={24}></Col>
                <Col lg={17} xs={24}>
                    <button className="btn-submit tpip-btn-blue regular" type="submit" disabled={inProgress}>
                        Submit {inProgress && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
                    </button>
                </Col>
            </Row>
        </form>
    );
};

RegisterForm = reduxForm({
    form: 'registerForm'
})(RegisterForm);
const selector = formValueSelector('registerForm');

RegisterForm = connect(state => {
    const primaryRole = selector(state, 'primaryRole');

    return { primaryRole };
})(RegisterForm);

export default RegisterForm;
