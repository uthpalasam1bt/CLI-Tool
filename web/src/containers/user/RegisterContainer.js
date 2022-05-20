import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'antd';
import _ from 'lodash';

import { history } from '../../redux/store';
import NotificationHelper from '../../helpers/NotificationHelper';
import RegisterForm from './forms/RegisterForm';

import { doRegister } from './actions/registerActions';
import { register_inProgress, register_status, register_error } from './selectors/registerSelectors';

import { REGISTRATION_CONTAINER_HEADING, REGISTRATION_ENTER_VERIFICATION_CODE } from '../../config/constants';

import { UserRole } from '../../constants/userConstants';
const { OTHER } = UserRole;

class RegisterContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,

            login_inProgress: false,
            login_error: null
        };

        this.handleSubmitRegisterForm = this.handleSubmitRegisterForm.bind(this);
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        const { email, register_inProgress, register_status } = this.state;

        if (np.register_inProgress !== null && register_inProgress !== np.register_inProgress) {
            this.setState({ register_inProgress: np.register_inProgress, register_status: false });
        }

        if (np.register_status !== null && register_status !== np.register_status) {
            this.setState({ register_status: np.register_status }, () => {
                if (np.register_status === true) {
                    NotificationHelper.getInstance().success(REGISTRATION_ENTER_VERIFICATION_CODE);
                    history.push(`/user/confirm/${email}`);
                }
            });
        }

        if (np.register_error) {
            this.setState({ register_error: np.register_error }, () => {
                NotificationHelper.getInstance().error(np.register_error.message);
            });
        }
    }

    handleSubmitRegisterForm(formData) {
        const data = _.clone(formData);
        delete data.confirmPwd;
        delete data.recaptcha;

        this.setState({ email: data.email });
        this.props.doRegister(data);
    }

    render() {
        const { register_inProgress } = this.state;
        return (
            <div className="register-wrap">
                <section className="register-header">
                    <div className="container">
                        <h4 className="register-text">{REGISTRATION_CONTAINER_HEADING}</h4>
                    </div>
                </section>
                <section className="register-container">
                    <div className="container">
                        <Row className="register-row">
                            <Col xl={15} lg={18} md={20} xs={24} className="register-content">
                                <RegisterForm
                                    inProgress={register_inProgress}
                                    onSubmit={this.handleSubmitRegisterForm}
                                />
                            </Col>
                        </Row>
                    </div>
                </section>
            </div>
        );
    }
}

RegisterContainer.propTypes = {
    register_inProgress: PropTypes.bool,
    register_status: PropTypes.bool,
    register_error: PropTypes.object
};

RegisterContainer.defaultProps = {
    register_inProgress: false,
    register_status: false,
    register_error: null
};
const mapStateToProps = createStructuredSelector({
    register_inProgress: register_inProgress(),
    register_status: register_status(),
    register_error: register_error()
});

const mapDispatchToProps = dispatch => ({
    doRegister: payload => {
        dispatch(doRegister(payload));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterContainer);
