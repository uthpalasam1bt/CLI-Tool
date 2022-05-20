import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history } from '../../redux/store';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import NotificationHelper from '../../helpers/NotificationHelper';
import { RESET_PASSWORD_SUCCESS } from '../../config/constants';

import ResetPasswordForm from './forms/ResetPasswordForm';
import { sendPasswordResetCode, doResetPassword } from './actions/forgotPasswordActions';
import {
    forgotPassword_inProgress,
    resetPassword_inProgress,
    resetPassword_status,
    resetPassword_error
} from './selectors/forgotPasswordSelectors';

class ResetPasswordContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,

            forgotPassword_inProgress: false,
            forgotPassword_status: false,
            forgotPassword_error: null,

            resetPassword_inProgress: false,
            resetPassword_status: false,
            resetPassword_error: null
        };

        this.handleSubmitResetPassword = this.handleSubmitResetPassword.bind(this);
        this.resendPasswordResetCode = this.resendPasswordResetCode.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { email } = this.props.match.params;

        if (!email || email === 'null') return history.push('/');

        this.setState({ email });
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        const { forgotPassword_inProgress, resetPassword_inProgress, resetPassword_status } = this.state;

        if (np.forgotPassword_inProgress !== null && forgotPassword_inProgress !== np.forgotPassword_inProgress) {
            this.setState({ forgotPassword_inProgress: np.forgotPassword_inProgress });
        }

        if (np.resetPassword_inProgress !== null && resetPassword_inProgress !== np.resetPassword_inProgress) {
            this.setState({
                resetPassword_inProgress: np.resetPassword_inProgress,
                resetPassword_status: false
            });
        }
        if (np.resetPassword_status !== null && resetPassword_status !== np.resetPassword_status) {
            this.setState({ resetPassword_status: np.resetPassword_status }, () => {
                if (np.resetPassword_status === true) {
                    NotificationHelper.getInstance().success(RESET_PASSWORD_SUCCESS);
                    history.push('/');
                }
            });
        }
        if (np.resetPassword_error !== null && np.resetPassword_error.message) {
            this.setState({ resetPassword_error: np.resetPassword_error }, () => {
                NotificationHelper.getInstance().error(np.resetPassword_error.message);
            });
        }
    }

    handleSubmitResetPassword(formData) {
        const { email } = this.state;
        const data = _.clone(formData);
        data.email = email;
        delete data.confirmPwd;

        this.props.resetPassword(data);
    }

    resendPasswordResetCode() {
        const { email } = this.state;
        this.props.sendPasswordResetCode({ email });
    }

    render() {
        const { email, forgotPassword_inProgress, resetPassword_inProgress } = this.state;

        return (
            <section className="reset-password-content">
                <div className="container">
                    <div className="reset-password-container">
                        <p className="title">Reset Password</p>
                        <hr className="separator" />

                        <ResetPasswordForm
                            email={email.toLowerCase()}
                            onSubmit={this.handleSubmitResetPassword}
                            resendPasswordResetCode={this.resendPasswordResetCode}
                            forgotPasswordInProgress={forgotPassword_inProgress}
                            resetPasswordInProgress={resetPassword_inProgress}
                        />
                    </div>
                </div>
            </section>
        );
    }
}

ResetPasswordContainer.propTypes = {
    forgotPassword_inProgress: PropTypes.bool,

    resetPassword_inProgress: PropTypes.bool,
    resetPassword_status: PropTypes.bool,
    resetPassword_error: PropTypes.object
};

ResetPasswordContainer.defaultProps = {
    forgotPassword_inProgress: false,

    resetPassword_inProgress: false,
    resetPassword_status: false,
    resetPassword_error: null
};
const mapStateToProps = createStructuredSelector({
    forgotPassword_inProgress: forgotPassword_inProgress(),

    resetPassword_inProgress: resetPassword_inProgress(),
    resetPassword_status: resetPassword_status(),
    resetPassword_error: resetPassword_error()
});

const mapDispatchToProps = dispatch => ({
    sendPasswordResetCode: payload => {
        dispatch(sendPasswordResetCode(payload));
    },
    resetPassword: payload => {
        dispatch(doResetPassword(payload));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPasswordContainer);
