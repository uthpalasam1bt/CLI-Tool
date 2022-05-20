import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import PersonalDetails from './personalDetails';
import ProfilePicture from './profilePicture';
import AccountAccess from './accountAccess';
import RequestDeleteAccount from './deleteAccount';
import ChangePasswordModal from '../../components/modals/ChangePassword';
import { UserRole } from '../../constants/userConstants';
import { getRoleFromPrimary } from '../../helpers/validateUser';

const { CLIENT } = UserRole;

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectTab: 'profile',
            showModal: false
        };
    }
    showModel = state => {
        this.setState({
            showModal: state
        });
    };
    SelectTab = tab => {
        this.setState({ selectTab: tab });
    };

    render() {
        let loggedUserPrimaryRole =
            this.props.loggedUser && this.props.loggedUser.primaryRole ? this.props.loggedUser.primaryRole : null;

        return (
            <>
                <section className="profile-container root-form-wrapper">
                    <div className="profile-header clearfix">
                        <div className="container">
                            <div className="list">
                                <span className="list-items active">My Profile</span>
                            </div>
                        </div>
                    </div>
                    <div className="profile-content clearfix">
                        <div className="container">
                            <Row gutter={20}>
                                <Col xl={8} lg={8} xs={24}>
                                    <div className="profile-navigator">
                                        <div className="card card-wrap">
                                            <div className="header">
                                                <span className="title">My Profile</span>
                                            </div>
                                            <div className="content">
                                                <div
                                                    className={`step-items ${
                                                        this.state.selectTab === 'profile' ? 'active' : null
                                                    }`}
                                                    onClick={() => this.SelectTab('profile')}
                                                >
                                                    <span className="step-item-title">Profile Picture</span>
                                                </div>
                                                <div
                                                    className={`step-items ${
                                                        this.state.selectTab === 'personal' ? 'active' : null
                                                    }`}
                                                    onClick={() => this.SelectTab('personal')}
                                                >
                                                    <span className="step-item-title">Personal Details</span>
                                                </div>
                                                <div
                                                    className={`step-items ${
                                                        this.state.selectTab === 'account' ? 'active' : null
                                                    }`}
                                                    onClick={() => this.SelectTab('account')}
                                                >
                                                    <span className="step-item-title">Account Access</span>
                                                </div>
                                                {getRoleFromPrimary(loggedUserPrimaryRole) === CLIENT ? (
                                                    <div
                                                        className={`step-items ${
                                                            this.state.selectTab === 'delete' ? 'active' : null
                                                        }`}
                                                        onClick={() => this.SelectTab('delete')}
                                                    >
                                                        <span className="step-item-title">Delete Account</span>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={16} lg={16} xs={24}>
                                    {this.state.selectTab === 'profile' ? (
                                        <ProfilePicture userDetails={this.props.loggedUser} />
                                    ) : this.state.selectTab === 'account' ? (
                                        <AccountAccess showModal={this.showModel} />
                                    ) : this.state.selectTab === 'personal' ? (
                                        <PersonalDetails
                                            userDetails={this.props.loggedUser}
                                            loggedUserPrimaryRole={loggedUserPrimaryRole}
                                        />
                                    ) : //
                                    getRoleFromPrimary(loggedUserPrimaryRole) === CLIENT &&
                                      this.state.selectTab === 'delete' ? (
                                        <RequestDeleteAccount loggedUser={this.props.loggedUser} />
                                    ) : (
                                        <></>
                                    )}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </section>
                {<ChangePasswordModal show={this.state.showModal} />}
            </>
        );
    }
}

export default Profile;

// const mapStateToProps = state => ({});
// const mapDispatchToProps = dispatch => ({});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Profile);
