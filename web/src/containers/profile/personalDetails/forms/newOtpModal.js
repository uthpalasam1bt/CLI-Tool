import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Row, Col, Tooltip } from 'antd';
import _ from 'lodash';
import { required } from 'redux-form-validators';

import PhoneNumberField from '../../../../UILibrary/components/forms/fields/PhoneNumberField';
import { OTP_CHANGE_FORM } from '../../constants';

let OtpChangeForm = props => {
    const { inProgress, handleSubmit, reduxSubmit, showNewOtpModal } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className="create-scheme-form">
                <Row className="input-row">
                    <Col lg={12} xs={24}>
                        <span className="input-title">
                            New mobile phone number
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
                    <Col lg={12} xs={24}>
                        <div className="field-wrapper margin-wrap">
                            <Field
                                name="changedNumber"
                                className="form-control"
                                validate={required({ message: 'Required.' })}
                                component={PhoneNumberField}
                            />
                        </div>
                    </Col>
                </Row>

                <div className="footer">
                    <button
                        className="btn-grey-o regular btn-close"
                        type="button"
                        onClick={() => showNewOtpModal(false)}
                    >
                        Close
                    </button>
                    <button
                        className="tpip-btn-blue regular"
                        type="submit"
                        disabled={inProgress}
                        onClick={() => {
                            reduxSubmit();
                        }}
                    >
                        Request
                        {inProgress && <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>}
                    </button>
                </div>
            </div>
        </form>
    );
};

const selector = formValueSelector(OTP_CHANGE_FORM);

OtpChangeForm = connect(state => {
    return {};
})(OtpChangeForm);

OtpChangeForm = reduxForm({
    form: OTP_CHANGE_FORM
})(OtpChangeForm);

export default OtpChangeForm;
