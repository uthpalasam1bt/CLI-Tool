import React from 'react';
import { Col, Row, Tooltip } from 'antd';
import { Field, reduxForm, change, getFormValues } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { required, length, email } from 'redux-form-validators';
import InputField from '../../../InputField';
import ButtonGroup from '../../../ButtonGroup';
import {
    ADD_TRUSTEE_POPUP_FORM,
    CORPORATE,
    NUMBER_VERIFICATION_TEXT,
    NUMBER_VERIFICATION_ERROR_TEXT
} from '../../constants';
import { CheckboxField } from '../../..';
import PhoneNumberField from '../../../PhoneNumberField';

const AddTrusteePopup = ({ doHighlight = false, handleSubmit, type, enableCheck, isChecked }) => {
    const dispatch = useDispatch();
    const formValues = useSelector(getFormValues(ADD_TRUSTEE_POPUP_FORM));

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Row className="input-row truste-form-row">
                    <Col xl={12} lg={12} xs={24} className="label-wrapper">
                        <label className="input-title add-trustee-form-lable">
                            {' '}
                            {type === CORPORATE ? 'Signatory first name' : 'Trustee first name'}
                        </label>
                    </Col>
                    <Col xl={12} lg={12} xs={24}>
                        <Row className="input-row">
                            <Field
                                name="firstName"
                                className="form-control "
                                component={InputField}
                                validate={required({ message: 'Required' })}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row className="input-row truste-form-row-sub">
                    <Col xl={12} lg={12} xs={24} className="label-wrapper ">
                        <label className="input-title add-trustee-form-lable">
                            {' '}
                            {type === CORPORATE ? 'Signatory last name' : 'Trustee last name'}
                        </label>
                    </Col>
                    <Col xl={12} lg={12} xs={24}>
                        <Row className="input-row">
                            <Field
                                name="lastName"
                                className="form-control "
                                component={InputField}
                                validate={required({ message: 'Required' })}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row className="input-row truste-form-row-sub">
                    <Col xl={12} lg={12} xs={24} className="label-wrapper">
                        <label className="input-title add-trustee-form-lable">
                            {type === CORPORATE ? 'Signatory contact e-mail' : 'Trustee contact e-mail'}
                        </label>
                    </Col>
                    <Col xl={12} lg={12} xs={24}>
                        <Row className="input-row">
                            <Field
                                name="email"
                                className="form-control "
                                component={InputField}
                                isEmail={true}
                                validate={[
                                    required({ message: 'Required' }),
                                    email({ message: 'Invalid email address.' })
                                ]}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row className="input-row truste-form-row-sub">
                    <Col xl={12} lg={12} xs={24} className="label-wrapper">
                        <label className="input-title add-trustee-form-lable">
                            {type === CORPORATE ? 'Signatory contact number' : 'Trustee contact number'}
                        </label>
                    </Col>
                    <Col xl={12} lg={12} xs={24}>
                        <Row className="input-row">
                            <Field
                                name="contactNumber"
                                className="form-control "
                                component={PhoneNumberField}
                                validate={[required({ message: 'Required' }), length({ min: 2, message: 'Required' })]}
                            />
                        </Row>
                    </Col>
                </Row>
                <Row className="input-row truste-form-row-sub">
                    <Col xl={12} lg={12} xs={24} className="label-wrapper">
                        <label className="input-title add-trustee-form-lable">
                            Do you want to be able to sign documents digitally?
                        </label>
                    </Col>
                    <Col xl={12} lg={12} xs={24} className="input-wrapper">
                        <Row className="input-row add-trustee-row">
                            <Field
                                name="signDigitally"
                                className="form-control add-truste-button"
                                component={ButtonGroup}
                                label="signDocument"
                                options={[{ title: 'Yes', value: 'yes' }, { title: 'No', value: 'no' }]}
                                defaultValue={'no'}
                            />
                        </Row>
                    </Col>
                </Row>
                {formValues && formValues.signDigitally == 'yes' ? (
                    <div className={`${doHighlight ? 'tr-field' : ''}`}>
                        <Row className="input-row truste-form-row-sub ">
                            <Col xl={12} lg={12} xs={24} className="label-wrapper">
                                <label
                                    className={`input-title add-trustee-form-lable ${
                                        doHighlight ? 'trustee-mobile' : ''
                                    }`}
                                >
                                    {type === CORPORATE
                                        ? 'Authorised signatory mobile phone number'
                                        : 'Trustee mobile phone number'}{' '}
                                    <Tooltip placement="topRight" title={NUMBER_VERIFICATION_TEXT}>
                                        <span className="trustee-icon">
                                            <i className="fa fa-info-circle"></i>
                                        </span>
                                    </Tooltip>
                                    {doHighlight ? (
                                        <Tooltip placement="topLeft" title={NUMBER_VERIFICATION_ERROR_TEXT}>
                                            <span className="trustee-icon-red">
                                                <i class="fa fa-info-circle "></i>
                                            </span>
                                        </Tooltip>
                                    ) : null}
                                </label>
                            </Col>
                            <Col xl={12} lg={12} xs={24}>
                                <Row className="input-row ">
                                    <Field
                                        name="mobileNumber"
                                        className={`form-control ${doHighlight ? 'tr-btn' : ''}`}
                                        component={PhoneNumberField}
                                        validate={[
                                            required({ message: 'Required' }),
                                            length({ min: 2, message: 'Required' })
                                        ]}
                                    />
                                    <span class="example">eg: +447777999999</span>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                ) : null}
                {type === CORPORATE ? null : (
                    <Row className="input-row truste-form-row-sub">
                        <Col xl={12} lg={12} xs={24} className="label-wrapper">
                            <label className="input-title add-trustee-form-lable">Select as the primary trustee</label>
                        </Col>
                        <Col xl={12} lg={12} xs={24}>
                            <Row className="input-row">
                                <Field
                                    name={'primary'}
                                    component={CheckboxField}
                                    checked={isChecked}
                                    disabled={!enableCheck}
                                    onChange={e => dispatch(change(ADD_TRUSTEE_POPUP_FORM, 'primary', e))}
                                />
                            </Row>
                        </Col>
                    </Row>
                )}
            </form>
        </>
    );
};

export default reduxForm({
    form: ADD_TRUSTEE_POPUP_FORM
})(AddTrusteePopup);
