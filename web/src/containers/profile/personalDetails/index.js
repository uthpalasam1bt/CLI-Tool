import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submit, initialize } from 'redux-form';
import { Modal, Spin } from 'antd';

import store from '../../../redux/store';
import PersonalDetailsForm from './forms';
import FormHeaderComponent from '../../../UILibrary/components/forms/formHeader';
import { LGIM_CLAIM_UPDATE_OTP } from '../../../config/constants';
import { doSavePersonalDetails, getPersonalDetails, requestToChangeOtp } from '../actions';
import { PERSONAL_DETAILS__FORM, PERSONAL_DETAILS_TITLE, OTP_CHANGE_FORM } from '../constants';
import uiLibConstants from '../../../UILibrary/constants';
import ClaimHelper from '../../../helpers/claimHelper';
import OtpChangeForm from './forms/newOtpModal';
// import { UserRole } from '../../../constants/userConstants';

const { FORM_ACTION_TYPES } = uiLibConstants;
// const { CLIENT } = UserRole;

class PersonalDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            doSavePersonalDetails_inProgress: false,
            getPersonalDetails_data: {},
            getPersonalDetails_error: null,

            doSaveMTL_inProgress: false,
            doSavePersonalDetails_status: false,
            doSavePersonalDetails_error: null,
            isShowOtpChange: false
        };
    }

    componentDidMount() {
        const {
            userDetails: { email }
        } = this.props;
        this.props.getPersonalDetails(email);
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        if (np.getPersonalDetails_data != null) {
            const personalData = np.getPersonalDetails_data;

            if (
                personalData &&
                personalData.primaryRole &&
                !/trustee|sponsor|advisor|admin/.test(personalData.primaryRole)
            ) {
                personalData.primaryRole = 'other';
            }

            this.setState({ getPersonalDetails_data: personalData }, () => {
                if (personalData) {
                    store.dispatch(initialize(PERSONAL_DETAILS__FORM, personalData, false));
                }
                // bug fix code
            });
        }
    }

    onFormSubmit = form => {
        // const loggedUser = BrowserStorage.getInstance().getLoggedUser();
        if (form.imageUrl) {
            delete form.imageUrl;
        }
        if (form.name) {
            delete form.name;
        }

        if (form.primaryRole !== 'other') {
            form.otherRole = null;
        }

        // send primary role only for client
        let {
            address1,
            address2,
            address3,
            city,
            firstName,
            lastName,
            otherRole,
            phoneNumber,
            postCode,
            primaryRole,
            organization,
            country,
            otpPhoneNumber
        } = form;
        //if (loggedUser.primaryRole !== CLIENT) primaryRole = undefined;
        this.props.doSavePersonalDetails({
            address1,
            address2,
            address3,
            city,
            firstName,
            lastName,
            otherRole,
            phoneNumber,
            postCode,
            primaryRole,
            organization,
            country,
            otpPhoneNumber
        });
    };

    onSubmitNewOtp = form => {
        const personalDetails = this.props.userDetails || {};
        this.props.requestToChangeOtp(
            {
                otpNumber: form.changedNumber,
                name: personalDetails.name,
                email: personalDetails.email,
                userId: personalDetails.userId,
                primaryRole: personalDetails.primaryRole
            },
            () => {
                this.showNewOtpModal(false);
            }
        );
    };

    showNewOtpModal = value => {
        if (value !== this.state.isShowOtpChange) this.setState({ isShowOtpChange: value });
    };

    render() {
        const formHeaderProps = {
            title: PERSONAL_DETAILS_TITLE,
            actions: [
                {
                    type: FORM_ACTION_TYPES.SAVE_PROFILE,
                    state: { inProgress: this.props.doSavePersonalDetails_inProgress },
                    onClick: this.props.submitForm,
                    bool: true
                }
            ]
        };
        return (
            <div>
                <div className="profile-wrap personal-details">
                    <div className="card card-wrapper">
                        <FormHeaderComponent {...formHeaderProps} />

                        <div className="content">
                            {this.props.getPersonalDetails_inProgress ? (
                                <div className="loading-wrapper">
                                    <Spin />
                                </div>
                            ) : null}
                            <PersonalDetailsForm
                                onSubmit={this.onFormSubmit}
                                primaryRole={this.props.primaryRole}
                                personalDetails={this.props.userDetails}
                                showNewOtpModal={this.showNewOtpModal}
                                hasOtpChangeClamin={ClaimHelper.checkIfAdminUserHasCommonClaim(LGIM_CLAIM_UPDATE_OTP)}
                            />
                        </div>
                        {this.state.isShowOtpChange && (
                            <Modal
                                title="Request to update mobile phone number"
                                className="lgim-styles-wrapper add-user-modal"
                                footer={null}
                                maskClosable={false}
                                visible={this.state.isShowOtpChange}
                                onCancel={() => {
                                    this.showNewOtpModal(false);
                                }}
                            >
                                <OtpChangeForm
                                    onSubmit={this.onSubmitNewOtp}
                                    reduxSubmit={this.props.submitNewOtpForm}
                                    primaryRole={this.props.primaryRole}
                                    personalDetails={this.props.userDetails}
                                    showNewOtpModal={this.showNewOtpModal}
                                    inProgress={this.props.requestOtpChange_inProgress}
                                />
                            </Modal>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

PersonalDetails.propTypes = {
    store_schemeData: PropTypes.object,

    doSavePersonalDetails_inProgress: PropTypes.bool,
    doSavePersonalDetails_status: PropTypes.bool,
    doSavePersonalDetails_error: PropTypes.object
};

PersonalDetails.defaultProps = {
    store_schemeData: null,

    getPersonalDetails_inProgress: false,
    getPersonalDetails_data: false,
    getPersonalDetails_error: null
};

const mapStateToProps = state => ({
    getPersonalDetails_inProgress: state.profileDetailsReducer.getPersonalDetails_inProgress,
    doSavePersonalDetails_inProgress: state.profileDetailsReducer.doSavePersonalDetails_inProgress,
    getPersonalDetails_data: state.profileDetailsReducer.getPersonalDetails_data,
    requestOtpChange_inProgress: state.profileDetailsReducer.requestOtpChange_inProgress
});

const mapDispatchToProps = dispatch => ({
    submitForm: () => {
        dispatch(submit(PERSONAL_DETAILS__FORM));
    },
    submitNewOtpForm: () => {
        dispatch(submit(OTP_CHANGE_FORM));
    },
    doSavePersonalDetails: payload => {
        dispatch(doSavePersonalDetails(payload));
    },
    getPersonalDetails: payload => {
        dispatch(getPersonalDetails(payload));
    },
    requestToChangeOtp: (payload, callback) => {
        dispatch(requestToChangeOtp(payload, callback));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonalDetails);
