import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';

import BrowserStorage from '../../../middlewares/storage';
import store from '../../../redux/store';

import ChangePasswordModal from '../../../components/modals/ChangePassword';
import FormHeaderComponent from '../../../UILibrary/components/forms/formHeader';

import { doUpdateUserPasswordRequest } from '../actions';

import { CHANGE_PASSWORD_FORM, ACCOUNT_ACCESS_TITLE } from '../constants';

const storage = BrowserStorage.getInstance();

class AccountAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            fomData: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    closeModal = () => {
        this.setState({ showModal: false });
        store.dispatch(initialize(CHANGE_PASSWORD_FORM, null, false));
    };

    handleSubmit(form) {
        this.props.submitForm(form);
        this.setState({ showModal: false });
    }

    render() {
        const sessionUser = storage.getUserSession();
        const formHeaderProps = {
            title: ACCOUNT_ACCESS_TITLE,
            actions: []
        };
        return (
            <div>
                <div className="profile-wrap account-access">
                    <div className="card card-wrapper">
                        <FormHeaderComponent {...formHeaderProps} />
                        <div className="content">
                            <Row className="content-row">
                                <Col lg={7} xs={24}>
                                    <span className="input-title">Email</span>
                                </Col>
                                <Col lg={17} xs={24}>
                                    <div className="field-wrapper margin-wrap">
                                        <input
                                            className="form-control input-field"
                                            type="Email"
                                            value={sessionUser.loggedUser.email}
                                            placeholder="Email"
                                            readOnly="true"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="content-row">
                                <Col lg={7} xs={24}>
                                    <span className="input-title">Password</span>
                                </Col>
                                <Col lg={17} xs={24}>
                                    <div className="field-wrapper margin-wrap">
                                        <input
                                            className="form-control input-field"
                                            type="password"
                                            value="1111111"
                                            placeholder="Password"
                                            readOnly="true"
                                        />
                                        <span
                                            onClick={() => this.setState({ showModal: true })}
                                            className="change-link"
                                        >
                                            Change
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <ChangePasswordModal
                    show={this.state.showModal}
                    close={this.closeModal}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    getPersonalDetails_inProgress: state.profileDetailsReducer.getPersonalDetails_inProgress
});
const mapDispatchToProps = dispatch => ({
    submitForm: payload => {
        dispatch(doUpdateUserPasswordRequest(payload));
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountAccess);
