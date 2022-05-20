import React from 'react';
import config from 'appConfig';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { InputField, ButtonGroup, ReCAPTCHA, TextArea } from '../../../UILibrary/components/forms/fields';

import { required, email, format, length } from 'redux-form-validators';
import { Row, Col } from 'antd';

import { UserRole } from '../../../constants/userConstants';

const { TRUSTEE, SPONSOR, ADVISOR, OTHER } = UserRole;
const { recaptchaKey } = config;

let ContactUsForm = props => {
    const { inProgress, handleSubmit, contactRole } = props;

    return (
        <form className="contact-us-form" onSubmit={handleSubmit}>
            <Row>
                <Col className="content">
                    <h4 className="contact-us-title">Your Information</h4>
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
                            <div className="form-group">
                                <Field
                                    name="contactFirstName"
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
                                        }),
                                        format({
                                            with: /^[a-z-]+$/i,
                                            message: 'Alphabet characters only.'
                                        })
                                    ]}
                                />
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="form-group ">
                                <Field
                                    name="contactLastName"
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
                                        }),
                                        format({
                                            with: /^[a-z-]+$/i,
                                            message: 'Alphabet characters only.'
                                        })
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
                            name="contactRole"
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
            {contactRole === OTHER && (
                <Row className="content-row">
                    <Col lg={7} xs={24}>
                        <span className="input-title">Your user type</span>
                    </Col>
                    <Col lg={17} xs={24}>
                        <div className="form-group">
                            <Field
                                name="otherRole"
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
                    <div className="form-group">
                        <Field
                            name="contactOrganization"
                            className="form-control"
                            placeholder="Organisation"
                            component={InputField}
                            validate={[required({ message: 'Required' }), length({ max: 200 })]}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="titleRow">
                <Col className="content">
                    <h4 className="contact-us-title">Contact Details</h4>
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
                            name="contactEmail"
                            className="form-control"
                            placeholder="someone@example.com"
                            component={InputField}
                            validate={[required({ message: 'Required' }), email({ message: 'Invalid email address' })]}
                            isEmail={true}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="content-row">
                <Col lg={7} xs={24}>
                    <span className="input-title">Contact number</span>
                </Col>
                <Col lg={17} xs={24}>
                    <div className="form-group">
                        <Field
                            name="contactNumber"
                            className="form-control"
                            type="text"
                            placeholder=""
                            component={InputField}
                            validate={[
                                length({ max: 15 }),
                                format({
                                    with: /^[0-9]+$/i,
                                    message: 'Enter a correct contact number.'
                                })
                            ]}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="content-row">
                <Col lg={7} xs={24}>
                    <span className="input-title">Message</span>
                </Col>
                <Col lg={17} xs={24}>
                    <div className="form-group ">
                        <Field
                            name="contactMessage"
                            className="form-control"
                            type="text"
                            placeholder=""
                            component={TextArea}
                            validate={[required({ message: 'Required' })]}
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
                            recaptchaKey={recaptchaKey}
                            validate={[required({ message: 'Required' })]}
                        />
                    </div>
                </Col>
            </Row>
            <Row className="content-row">
                <Col lg={7} xs={24}></Col>
                <Col lg={17} xs={24}>
                    <button className="btn-submit tpip-btn-blue regular" type="submit" disabled={inProgress}>
                        Send Details {inProgress && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
                    </button>
                </Col>
            </Row>
        </form>
    );
};

ContactUsForm = reduxForm({
    form: 'contactUsForm'
})(ContactUsForm);
const selector = formValueSelector('contactUsForm');

ContactUsForm = connect(state => {
    const contactRole = selector(state, 'contactRole');

    return { contactRole };
})(ContactUsForm);

export default ContactUsForm;
