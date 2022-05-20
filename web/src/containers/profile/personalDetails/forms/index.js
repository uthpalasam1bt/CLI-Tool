import React, { useState } from 'react';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import { Row, Col, Tooltip, Button } from 'antd';

import { required, length } from 'redux-form-validators';
import store from '../../../../redux/store';
import { getRoleFromPrimary } from '../../../../helpers/validateUser';
import { InputField, SelectOptions, PhoneNumberField } from '../../../../UILibrary/components/forms/fields';

import { PERSONAL_DETAILS__FORM } from '../../constants';
import countryList from '../forms/country.json';
import { UserRole } from '../../../../constants/userConstants';

const { TRUSTEE, SPONSOR, ADVISOR, OTHER } = UserRole;
const removePrevioseValue = val => {
    store.dispatch(change(PERSONAL_DETAILS__FORM, `otherRole`, val));
};

let PersonalDetailsForm = props => {
    const countryOptions = {
        defaultValue: '-----select country-----',
        dataList: countryList
    };

    const priRole = props.prRole;

    const ButtonGroup = ({ input, meta: { touched, error }, options, ...props }) => {
        let hasError = touched && error !== undefined;

        return (
            <div className="field-wrapper">
                {options.map((option, oKey) => (
                    <label
                        key={oKey}
                        className={`button-group ${option.value === input.value ? 'active' : ''}  ${
                            props.disabled ? 'cursor-default' : 'cursor-pointer'
                        }`}
                    >
                        <input
                            type="radio"
                            {...input}
                            {...props}
                            value={option.value}
                            checked={option.value === input.value}
                        />
                        {option.icon && (
                            <span className="button-icon">
                                <i className={`fa ${option.icon} icon`} aria-hidden="true"></i>
                            </span>
                        )}
                        {option.title}
                    </label>
                ))}
                {hasError && <span className="error">{error}</span>}
            </div>
        );
    };
    const [isUserTypeShow, setUserTypeShow] = useState(() => {
        return props.primaryRole === 'other';
    });

    const { handleSubmit, hasOtpChangeClamin } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-body">
                {getRoleFromPrimary(props.personalDetails.primaryRole) === 'client' && (
                    <div>
                        <Row>
                            <div className="title-wrap">
                                <span className="title">Account Information</span>
                            </div>
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
                                                    // format({
                                                    //   with: /^[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~a-z- ]+$/i,
                                                    //   message: 'Alphabet and special characters only.'
                                                    // }),
                                                    length({
                                                        msg: {
                                                            tooShort: 'Minimum two charachters.',
                                                            tooLong: 'Character limit exceeded.  Max 60 characters.'
                                                        },
                                                        in: [2, 60]
                                                    })
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
                                                    // format({
                                                    //   with: /^[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~a-z- ]+$/i,
                                                    //   message: 'Alphabet and special characters only.'
                                                    // }),
                                                    length({
                                                        msg: {
                                                            tooShort: 'Minimum two charachters.',
                                                            tooLong: 'Character limit exceeded.  Max 60 characters.'
                                                        },
                                                        in: [2, 60]
                                                    })
                                                ]}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {getRoleFromPrimary(props.personalDetails.primaryRole) === 'client' && (
                            <Row className="content-row">
                                <Col lg={7} xs={24}>
                                    <span className="input-title">Role</span>
                                </Col>
                                <Col lg={17} xs={24}>
                                    <div className="form-group input-wrap role-wrap">
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
                                            onChange={e => {
                                                if (e.target.defaultValue === 'other') {
                                                    setUserTypeShow(true);

                                                    // if (props.personalDetails.primaryRole !== 'other') {
                                                    removePrevioseValue(props.initialValues.otherRole);
                                                    // }
                                                } else {
                                                    setUserTypeShow(false);
                                                }
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        )}
                        {(isUserTypeShow === true || priRole === 'other') && (
                            <Row className="content-row">
                                <Col lg={7} xs={24}>
                                    <span className="input-title">Your user type</span>
                                </Col>
                                <Col lg={17} xs={24}>
                                    <div className="form-group">
                                        <Field
                                            name="otherRole"
                                            className="form-control"
                                            placeholder="lawyer"
                                            component={InputField}
                                            validate={[required({ message: 'Required' })]}
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
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}
                {getRoleFromPrimary(props.personalDetails.primaryRole) !== 'client' && (
                    <div>
                        <Row>
                            <div className="title-wrap">
                                <span className="title">Account Information</span>
                            </div>
                        </Row>
                        <Row className="content-row">
                            <Col lg={7} xs={24}>
                                <span className="input-title">Name</span>
                            </Col>
                            <Col lg={17} xs={24}>
                                <Row gutter={30}>
                                    <Col lg={12} xs={24}>
                                        <div className="field-wrapper margin-wrap">
                                            <Field
                                                placeholder="First name"
                                                disabled={false}
                                                name={'firstName'}
                                                className="form-control"
                                                component={InputField}
                                                validate={[
                                                    required({ message: 'Required' }),
                                                    // format({
                                                    //   with: /^[`!@#$%^*()_+\-=[\]{};':"\\|,.<>/?~a-z- ]+$/i,
                                                    //   message: 'Alphabet and special characters only.'
                                                    // }),
                                                    length({
                                                        msg: {
                                                            tooShort: 'Minimum two charachters.',
                                                            tooLong: 'Character limit exceeded.  Max 60 characters.'
                                                        },
                                                        in: [2, 60]
                                                    })
                                                ]}
                                            />
                                        </div>
                                    </Col>
                                    <Col lg={12} xs={24}>
                                        <div className="field-wrapper margin-wrap">
                                            <Field
                                                placeholder="Last name"
                                                disabled={false}
                                                name={'lastName'}
                                                className="form-control"
                                                component={InputField}
                                                validate={[
                                                    required({ message: 'Required' }),
                                                    // format({
                                                    //   with: /^[`!@#$%^*()_+\-=[\]{};':"\\|,.<>/?~a-z- ]+$/i,
                                                    //   message: 'Alphabet and special characters only.'
                                                    // }),
                                                    length({
                                                        msg: {
                                                            tooShort: 'Minimum two charachters.',
                                                            tooLong: 'Character limit exceeded.  Max 60 characters.'
                                                        },
                                                        in: [2, 60]
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
                                <span className="input-title">Group</span>
                            </Col>
                            <Col lg={17} xs={24}>
                                <div className="field-wrapper margin-wrap">
                                    <input
                                        className="form-control input-field"
                                        type="text"
                                        placeholder="Admin"
                                        disabled
                                    />
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}
                <Row>
                    <div className="title-wrap">
                        <span className="title">Contact Information</span>
                    </div>
                </Row>
                <Row className="content-row">
                    <Col lg={7} xs={24}>
                        <span className="input-title">Phone Number</span>
                    </Col>
                    <Col lg={17} xs={24}>
                        <div className="field-wrapper margin-wrap">
                            {/* <Field
                placeholder="Phone Number"
                disabled={false}
                name={'phoneNumber'}
                className="form-control"
                component={NumberField}
                options={{
                  decimalScale: 0,
                  allowNegative: false,
                  allowLeadingZeros: true,
                  maxLength: 15
                }}
              /> */}
                            <Field
                                name="phoneNumber"
                                className="form-control"
                                component={PhoneNumberField}
                                placeholder="+44567891011"
                            />
                        </div>
                    </Col>
                </Row>
                <Row className="content-row">
                    <Col lg={7} xs={24}>
                        <span className="input-title">
                            Mobile phone number{' '}
                            <Tooltip
                                placement="top"
                                title="A text message will be sent to this number for verification purposes if the user signs documents digitally."
                            >
                                <span className="i-icon">
                                    <i className="fa fa-info-circle"></i>
                                </span>
                            </Tooltip>
                        </span>
                    </Col>
                    <Col lg={10} xs={24}>
                        <div className="field-wrapper margin-wrap">
                            <Field
                                name="otpPhoneNumber"
                                className="form-control"
                                disabled={!hasOtpChangeClamin}
                                component={PhoneNumberField}
                                placeholder="+44567891011"
                            />
                        </div>
                    </Col>
                    <Col lg={5} xs={24}>
                        {!hasOtpChangeClamin ? (
                            <div className="field-wrapper button-margin-wrap">
                                <Button
                                    className="tpip-btn-blue-custom"
                                    onClick={() => {
                                        props.showNewOtpModal(true);
                                    }}
                                >
                                    {' '}
                                    Update
                                </Button>
                            </div>
                        ) : null}
                    </Col>
                </Row>
                <Row className="content-row margin-wrap">
                    <Col lg={7} xs={24}>
                        <span className="input-title">Address</span>
                    </Col>
                    <Col lg={17} xs={24}>
                        <div className="field-wrapper mb-2">
                            <Field
                                placeholder="Line 1"
                                disabled={false}
                                name={'address1'}
                                className="form-control"
                                component={InputField}
                            />
                        </div>
                        <div className="field-wrapper mb-2">
                            <Field
                                placeholder="Line 2"
                                disabled={false}
                                name={'address2'}
                                className="form-control"
                                component={InputField}
                            />
                        </div>
                        <div className="field-wrapper">
                            <Field
                                placeholder="Line 3"
                                disabled={false}
                                name={'address3'}
                                className="form-control"
                                component={InputField}
                            />
                        </div>
                    </Col>
                </Row>
                <Row className="content-row">
                    <Col lg={7} xs={24}>
                        <span className="input-title">Country</span>
                    </Col>
                    <Col lg={17} xs={24}>
                        <div className="field-wrapper margin-wrap">
                            <Field
                                placeholder="United Kindom"
                                name="country"
                                className="form-control"
                                component={SelectOptions}
                                options={countryOptions}
                            />
                        </div>
                    </Col>
                </Row>
                <Row className="content-row">
                    <Col lg={7} xs={24}>
                        <span className="input-title">City & Postcode</span>
                    </Col>
                    <Col lg={17} xs={24}>
                        <Row gutter={30}>
                            <Col lg={12} xs={24}>
                                <div className="field-wrapper margin-wrap">
                                    <Field
                                        placeholder="City"
                                        disabled={false}
                                        name={'city'}
                                        className="form-control"
                                        component={InputField}
                                    />
                                </div>
                            </Col>
                            <Col lg={12} xs={24}>
                                <div className="field-wrapper margin-wrap">
                                    <Field
                                        placeholder="Post code"
                                        disabled={false}
                                        name={'postCode'}
                                        className="form-control"
                                        component={InputField}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </form>
    );
};

PersonalDetailsForm = reduxForm({
    form: PERSONAL_DETAILS__FORM
})(PersonalDetailsForm);
const selector = formValueSelector(PERSONAL_DETAILS__FORM);
PersonalDetailsForm = connect(state => {
    const prRole = selector(state, 'primaryRole');
    const initialValues = state.form[PERSONAL_DETAILS__FORM] ? state.form[PERSONAL_DETAILS__FORM].initial : null;
    return {
        prRole,
        initialValues
    };
})(PersonalDetailsForm);
export default PersonalDetailsForm;
