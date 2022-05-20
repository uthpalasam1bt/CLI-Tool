import React, { useState } from 'react';
import { reduxForm, Field, change, formValueSelector } from 'redux-form';
import { required, email, length, format } from 'redux-form-validators';
import { Row, Col, Tooltip } from 'antd';
import { useSelector, useDispatch, connect } from 'react-redux';

import Loading from 'components/Loading';
import { InputField, SelectOptions, PhoneNumberField } from '../../../../UILibrary/components/forms/fields';
import { getFnameLnameByEmail } from '../actions';

import { TXT_REQUIRED } from '../../../../config/constants';
import { ADD_USER_FORM } from '../constants';

let AddUserForm = props => {
    const { inProgress, handleShow, handleSubmit, editMode = false, emailData, permissionToEditOtp } = props;

    const [nameFieldDissableState, toggleDissabledNameFields] = useState(false);

    const dispatch = useDispatch();
    const userGroups = useSelector(state => state.userManagementReducer.userGroups);
    const saving = useSelector(state => state.userManagementReducer.addContributors_inProgress);
    const isLoadingUserData = useSelector(state => state.userManagementReducer.isLoadingUserData);

    const userTypeOptions = {
        dataList: userGroups.map(item => {
            return { key: item.groupId, value: item.name };
        })
    };

    const getUserNames = value => {
        toggleDissabledNameFields(false);

        const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value && emailRegEx.test(String(value).toLowerCase())) {
            dispatch(getFnameLnameByEmail({ email: value }, toggleDissabledNameFields));
        }

        if (!value) {
            toggleDissabledNameFields(false);
            dispatch(change(ADD_USER_FORM, 'firstName', ''));
            dispatch(change(ADD_USER_FORM, 'lastName', ''));
        }
    };

    return (
        <form className="create-scheme-form" onSubmit={handleSubmit}>
            {isLoadingUserData ? (
                <Loading />
            ) : (
                <>
                    <Row className="input-row">
                        <Col xs={24}>
                            <label htmlFor="userEmail" className="input-title">
                                {' '}
                                E-mail Address{' '}
                            </label>
                        </Col>
                        <Col xs={24}>
                            <Field
                                name="email"
                                className="form-control"
                                component={InputField}
                                onChange={e => getUserNames(e && e.target && e.target.value ? e.target.value : null)}
                                validate={[
                                    required({ message: TXT_REQUIRED }),
                                    email({ message: 'Invalid email address.' }),
                                    format({ without: /\+/ })
                                ]}
                                isEmail={true}
                                disabled={editMode}
                            />
                        </Col>
                    </Row>
                    <Row className="input-row">
                        <Col className="column-pad-right" lg={12} xs={24}>
                            <Row>
                                <Col xs={24}>
                                    <label htmlFor="firstName" className="input-title">
                                        {' '}
                                        First Name{' '}
                                    </label>
                                </Col>
                                <Col xs={24}>
                                    <Field
                                        name="firstName"
                                        className="form-control"
                                        component={InputField}
                                        disabled={emailData && (editMode || nameFieldDissableState)}
                                        validate={[
                                            required({ message: TXT_REQUIRED }),
                                            // format({
                                            //   with: /^[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~a-z- ]+$/i,
                                            //   message: 'Alphabet and special characters only.'
                                            // }),
                                            length({ max: 200 })
                                        ]}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="column-pad-left" lg={12} xs={24}>
                            <Row>
                                <Col xs={24}>
                                    <label htmlFor="lastName" className="input-title">
                                        {' '}
                                        Last Name{' '}
                                    </label>
                                </Col>
                                <Col xs={24}>
                                    <Field
                                        name="lastName"
                                        className="form-control"
                                        component={InputField}
                                        disabled={emailData && (editMode || nameFieldDissableState)}
                                        validate={[
                                            required({ message: TXT_REQUIRED }),
                                            // format({
                                            //   with: /^[`!@#$%^*()_+\-=[\]{};':"\\|,.<>/?~a-z- ]+$/i,
                                            //   message: 'Alphabet and special characters only.'
                                            // }),
                                            length({ max: 200 })
                                        ]}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="input-row">
                        <Col className="column-pad-right" xl={12} xs={24}>
                            <Row>
                                <Col span={24}>
                                    <label htmlFor="userType" className="input-title">
                                        Phone number
                                    </label>
                                </Col>
                                <Col span={24}>
                                    <Field
                                        name="phoneNumber"
                                        className="form-control"
                                        component={PhoneNumberField}
                                        placeholder="+44567891011"
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="column-pad-left" lg={12} xs={24}>
                            <Row>
                                <Col xs={24}>
                                    <label htmlFor="schemeUserGroups" className="input-title">
                                        Select scheme groups
                                    </label>
                                </Col>
                                <Col xs={24}>
                                    <Field
                                        mode="multiple"
                                        name="userGroups"
                                        className="form-control"
                                        component={SelectOptions}
                                        validate={length({ min: 1, message: TXT_REQUIRED })}
                                        options={userTypeOptions}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {permissionToEditOtp && (
                        <Row className="input-row">
                            <Col xl={12} xs={24}>
                                <Row>
                                    <Col span={24}>
                                        <label htmlFor="userType" className="input-title">
                                            Mobile phone number
                                            <Tooltip
                                                placement="top"
                                                title="A text message will be sent to this number for verification purposes if the user signs documents digitally."
                                            >
                                                <span className="i-icon">
                                                    <i className="fa fa-info-circle"></i>
                                                </span>
                                            </Tooltip>
                                        </label>
                                    </Col>
                                    <Col span={24}>
                                        <Field
                                            name="otpPhoneNumber"
                                            className="form-control"
                                            component={PhoneNumberField}
                                            placeholder="+44567891011"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    )}
                    <Row className="input-row">
                        <Col xs={24}>
                            <div className="footer dash-footer">
                                <button
                                    className="btn-grey-o regular btn-close"
                                    type="button"
                                    onClick={() => handleShow(false)}
                                >
                                    Close
                                </button>
                                <button className="tpip-btn-blue regular" type="submit" disabled={inProgress}>
                                    {editMode ? 'Update' : 'Add'}
                                    {saving && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
                                </button>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </form>
    );
};

AddUserForm = reduxForm({
    form: ADD_USER_FORM
})(AddUserForm);

const selector = formValueSelector(ADD_USER_FORM);
AddUserForm = connect(state => {
    const emailData = selector(state, 'email');
    return {
        emailData
    };
})(AddUserForm);

export default AddUserForm;
