import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { history } from '../../redux/store';
import NotificationHelper from '../../helpers/NotificationHelper';
import UserConfirmationForm from './forms/UserConfirmationForm';

import { doConfirmUser, resendUserConfirmationCode } from './actions/userConfirmationActions';
import {
    confirmUser_inProgress,
    confirmUser_status,
    confirmUser_error,
    resendUserConfirmationCode_inProgress,
    resendUserConfirmationCode_status,
    resendUserConfirmationCode_error
} from './selectors/userConfirmationSelectors';

import {
    REGISTRATION_SUCCESS,
    REGISTRATION_VERIFICATION_CODE_GETTING_SUCCESS,
    CONFIRMATION_ACCOUNT_CONFIRMATION_CONTAINER_TITLE,
    CONFIRMATION_PROVIDE_EMAIL_TO_CONTAINER
} from '../../config/constants';

class UserConfirmationContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,

            confirmUser_inProgress: false,
            confirmUser_status: false,
            confirmUser_error: null,

            resendUserConfirmationCode_inProgress: false,
            resendUserConfirmationCode_status: false,
            resendUserConfirmationCode_error: null
        };

        this.handleSubmitUserConfirmation = this.handleSubmitUserConfirmation.bind(this);
        this.resendUserConfirmationCode = this.resendUserConfirmationCode.bind(this);
    }

    UNSAFE_componentWillMount() {
        const { email } = this.props.match.params;

        if (!email || email === 'null') return history.push('/');

        this.setState({ email });
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        const {
            confirmUser_inProgress,
            confirmUser_status,
            resendUserConfirmationCode_inProgress,
            resendUserConfirmationCode_status
        } = this.state;

        if (np.confirmUser_inProgress !== null && confirmUser_inProgress !== np.confirmUser_inProgress) {
            this.setState({
                confirmUser_inProgress: np.confirmUser_inProgress,
                confirmUser_status: false
            });
        }
        if (np.confirmUser_status !== null && confirmUser_status !== np.confirmUser_status) {
            this.setState({ confirmUser_status: np.confirmUser_status }, () => {
                if (np.confirmUser_status === true) {
                    NotificationHelper.getInstance().success(REGISTRATION_SUCCESS);
                    history.push('/');
                }
            });
        }
        if (np.confirmUser_error) {
            this.setState({ confirmUser_error: np.confirmUser_error }, () => {
                NotificationHelper.getInstance().error(np.confirmUser_error.message);
            });
        }

        if (
            np.resendUserConfirmationCode_inProgress !== null &&
            resendUserConfirmationCode_inProgress !== np.resendUserConfirmationCode_inProgress
        ) {
            this.setState({
                resendUserConfirmationCode_inProgress: np.resendUserConfirmationCode_inProgress,
                resendUserConfirmationCode_status: false
            });
        }
        if (
            np.resendUserConfirmationCode_status !== null &&
            resendUserConfirmationCode_status !== np.resendUserConfirmationCode_status
        ) {
            this.setState({ resendUserConfirmationCode_status: np.resendUserConfirmationCode_status }, () => {
                if (np.resendUserConfirmationCode_status === true) {
                    NotificationHelper.getInstance().success(REGISTRATION_VERIFICATION_CODE_GETTING_SUCCESS);
                }
            });
        }
        if (np.resendUserConfirmationCode_error) {
            this.setState({ resendUserConfirmationCode_error: np.resendUserConfirmationCode_error }, () => {
                NotificationHelper.getInstance().error(np.resendUserConfirmationCode_error.message);
            });
        }
    }

    handleSubmitUserConfirmation(formData) {
        const { email } = this.state;
        this.props.doConfirmUser({ ...formData, email });
    }

    resendUserConfirmationCode() {
        const { email } = this.state;
        this.props.resendUserConfirmationCode({ email });
    }

    render() {
        const { email, confirmUser_inProgress, resendUserConfirmationCode_inProgress } = this.state;
        return (
            <section className="confirmation-content">
                <div className="container">
                    <div className="user-confirmation-container">
                        <p className="title">{CONFIRMATION_ACCOUNT_CONFIRMATION_CONTAINER_TITLE}</p>
                        <p className="sub-title">{CONFIRMATION_PROVIDE_EMAIL_TO_CONTAINER}</p>
                        <hr className="separator" />
                        <UserConfirmationForm
                            email={email.toLowerCase()}
                            confirmUserInProgress={confirmUser_inProgress}
                            resendUserConfirmationCodeInProgress={resendUserConfirmationCode_inProgress}
                            onSubmit={this.handleSubmitUserConfirmation}
                            resendUserConfirmationCode={this.resendUserConfirmationCode}
                        />
                    </div>
                </div>
            </section>
        );
    }
}

UserConfirmationContainer.propTypes = {
    confirmUser_inProgress: PropTypes.bool,
    confirmUser_status: PropTypes.bool,
    confirmUser_error: PropTypes.object,

    resendUserConfirmationCode_inProgress: PropTypes.bool,
    resendUserConfirmationCode_status: PropTypes.bool,
    resendUserConfirmationCode_error: PropTypes.object
};

UserConfirmationContainer.defaultProps = {
    confirmUser_inProgress: false,
    confirmUser_status: false,
    confirmUser_error: null,

    resendUserConfirmationCode_inProgress: false,
    resendUserConfirmationCode_status: false,
    resendUserConfirmationCode_error: null
};
const mapStateToProps = createStructuredSelector({
    confirmUser_inProgress: confirmUser_inProgress(),
    confirmUser_status: confirmUser_status(),
    confirmUser_error: confirmUser_error(),

    resendUserConfirmationCode_inProgress: resendUserConfirmationCode_inProgress(),
    resendUserConfirmationCode_status: resendUserConfirmationCode_status(),
    resendUserConfirmationCode_error: resendUserConfirmationCode_error()
});

const mapDispatchToProps = dispatch => ({
    doConfirmUser: payload => {
        dispatch(doConfirmUser(payload));
    },
    resendUserConfirmationCode: payload => {
        dispatch(resendUserConfirmationCode(payload));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserConfirmationContainer);
