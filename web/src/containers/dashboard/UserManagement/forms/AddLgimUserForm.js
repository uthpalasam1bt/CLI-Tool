import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { required, email, length, format } from 'redux-form-validators';
import { Row, Col, Tooltip } from 'antd';

import { InputField, SelectOptions, PhoneNumberField } from '../../../../UILibrary/components/forms/fields';
import { ADD_USER_FORM } from '../constants';
import { TXT_REQUIRED } from '../../../../config/constants';

let AddLgimUserForm = props => {
    const { inProgress, handleShow, handleSubmit, userGroups, editMode, change, permissionToEditOtp } = props;

    change('isEdit', editMode);

    const userTypeOptions = {
        dataList: userGroups.map(item => {
            return { key: item.groupId, value: item.name };
        })
    };

    return (
        <form className="create-scheme-form" onSubmit={handleSubmit}>
            <Row className="input-row" gutter={20}>
                <Col xl={12} xs={24}>
                    <Row>
                        <Col span={24}>
                            <label htmlFor="firstName" className="input-title">
                                First Name
                            </label>
                        </Col>
                        <Col span={24}>
                            <Field
                                name="firstName"
                                className="form-control"
                                component={InputField}
                                validate={[
                                    required({ message: TXT_REQUIRED }),
                                    // format({
                                    //   with: /^[`!@#$%^*()_+\-=[\]{};':"\\|,.<>/?~a-z- ]+$/i,
                                    //   message: 'Alphabet and special characters only.'
                                    // }),
                                    length({ max: 200 })
                                ]}
                                disabled={editMode}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xl={12} xs={24}>
                    <Row>
                        <Col span={24}>
                            <label htmlFor="lastName" className="input-title">
                                Last Name
                            </label>
                        </Col>
                        <Col span={24}>
                            <Field
                                name="lastName"
                                className="form-control"
                                component={InputField}
                                disabled={editMode}
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
                <Col xs={24}>
                    <label htmlFor="email" className="input-title">
                        {' '}
                        E-mail Address{' '}
                    </label>
                </Col>
                <Col xs={24}>
                    <Field
                        name="email"
                        className="form-control"
                        component={InputField}
                        validate={[
                            // required({ message: TXT_REQUIRED }),
                            email({ message: 'Invalid email address' }),
                            format({ without: /\+/ })
                        ]}
                        isEmail={true}
                        disabled={editMode}
                    />
                </Col>
            </Row>
            <Row className="input-row" gutter={20}>
                <Col xl={12} xs={24}>
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
                                // validate={[required({ message: TXT_REQUIRED })]}
                                placeholder="+44567891011"
                                // disabled={editMode}
                            />
                        </Col>
                    </Row>
                </Col>
                {permissionToEditOtp && (
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
                                    //validate={permissionToEditOtp ? [required({ message: TXT_REQUIRED })] : null}
                                    placeholder="+44567891011"
                                    disabled={!permissionToEditOtp}
                                />
                            </Col>
                        </Row>
                    </Col>
                )}
            </Row>
            <Row className="input-row">
                <Col xl={12} xs={24}>
                    <Row>
                        <Col span={24}>
                            <label htmlFor="userType" className="input-title">
                                Select user groups
                            </label>
                        </Col>
                        <Col span={24}>
                            <Field
                                name="userGroups"
                                mode="multiple"
                                className="form-control"
                                component={SelectOptions}
                                validate={[
                                    required({ message: TXT_REQUIRED }),
                                    length({ min: 1, message: 'Required' })
                                ]}
                                options={userTypeOptions}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col xl={12} xs={24}>
                    <div className="footer dash-footer">
                        <button
                            className="btn-grey-o regular btn-close"
                            type="button"
                            onClick={() => handleShow(false)}
                        >
                            Close
                        </button>
                        <button className="tpip-btn-blue regular" type="submit" disabled={inProgress}>
                            {editMode ? 'Update' : 'Create'}{' '}
                            {inProgress && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
                        </button>
                    </div>
                </Col>
            </Row>
        </form>
    );
};

AddLgimUserForm = reduxForm({
    form: ADD_USER_FORM
})(AddLgimUserForm);

export default AddLgimUserForm;
