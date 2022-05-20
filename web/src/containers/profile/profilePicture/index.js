import React, { Component } from 'react';
import { Avatar, Modal } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { encryptUrl } from '../../../components/profileimage/encrypt';
import BrowserStorage from '../../../middlewares/storage';
import UpdateProfileImageForm from './forms';

import { doClearProfileImage, doSavePersonalDetails, getPersonalDetails, doUpdateUpdateState } from '../actions';
import { getPersonalDetails_data, doSavePersonalDetails_inProgress } from '../selectors';

import user from '../../../assets/images/common/profile.svg';
import FormHeaderComponent from '../../../UILibrary/components/forms/formHeader';
import { PROFILE_PICTURE_TITLE } from '../constants';

const storage = BrowserStorage.getInstance();

class ProfilePicture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doSavePersonalDetails_inProgress: false,
            getPersonalDetails_data: null,
            dl_visibilty: false
        };
    }
    componentDidMount() {
        const {
            userDetails: { email }
        } = this.props;
        this.props.getPersonalDetails(email);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { getPersonalDetails_data } = this.props;

        const { getPersonalDetails_data: state_getPersonalDetails_data } = this.state;

        if (
            getPersonalDetails_data !== null &&
            JSON.stringify(getPersonalDetails_data) !== JSON.stringify(state_getPersonalDetails_data)
        ) {
            this.setState({ getPersonalDetails_data });
        }
    }

    UNSAFE_componentWillReceiveProps(np, nc) {
        if (np.getPersonalDetails_data != null) {
            this.setState({ getPersonalDetails_data: np.getPersonalDetails_data });
        }
        if (np.doSavePersonalDetails_inProgress != null) {
            this.setState({ doSavePersonalDetails_inProgress: np.doSavePersonalDetails_inProgress });
        }
    }

    onSubmit = payload => {
        this.props.doSavePersonalDetails({ path: payload });
    };

    clearImage() {
        this.setState({ dl_visibilty: true });
    }

    render() {
        const sessionUser = storage.getUserSession();
        const { getPersonalDetails_data } = this.state;
        let imageName = null;
        if (getPersonalDetails_data) {
            if (getPersonalDetails_data.imageUrl) {
                const splitArray = getPersonalDetails_data.imageUrl.split('/');
                const lengthUrl = splitArray.length;
                imageName = splitArray[lengthUrl - 1];
            }
        }
        const formHeaderProps = {
            title: PROFILE_PICTURE_TITLE,
            actions: []
        };
        const handleState = () => {
            this.props.doUpdateUpdateState();
        };
        return (
            <div>
                <form>
                    <div className="profile-wrap profile-picture">
                        <div className="card card-wrapper">
                            <FormHeaderComponent {...formHeaderProps} />
                            <div className="content">
                                <div className="upload-wrap">
                                    <div className="full-content-wrap manager-content-wrap">
                                        {imageName !== 'profile.png' && !this.state.doSavePersonalDetails_inProgress ? (
                                            <span
                                                className="btn-remove-prof"
                                                onClick={() => {
                                                    this.clearImage();
                                                }}
                                            >
                                                <i className="fa fa-times"></i>
                                            </span>
                                        ) : null}
                                        <Avatar
                                            src={
                                                getPersonalDetails_data && getPersonalDetails_data
                                                    ? getPersonalDetails_data.imageUrl
                                                    : sessionUser && sessionUser.loggedUser.imageUrl
                                                    ? sessionUser.loggedUser.imageUrl
                                                    : user
                                            }
                                            alt="profile-img"
                                            size={214}
                                        />
                                    </div>
                                    <UpdateProfileImageForm
                                        handleState={handleState}
                                        onSubmit={this.onSubmit}
                                        userID={encryptUrl(
                                            sessionUser && sessionUser.loggedUser.email
                                                ? sessionUser.loggedUser.email
                                                : 'email'
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <Modal
                    className="delete-modal lgim-styles-wrapper"
                    title="CONFIRM"
                    okText="Delete"
                    cancelText="Cancel"
                    visible={this.state.dl_visibilty}
                    onOk={() => {
                        this.props.doClearProfileImage({
                            path: getPersonalDetails_data.imageUrl,
                            email: sessionUser && sessionUser.loggedUser.email ? sessionUser.loggedUser.email : null
                        });
                        this.setState({ dl_visibilty: false });
                    }}
                    onCancel={() => {
                        this.setState({ dl_visibilty: false });
                    }}
                >
                    <span>Are you sure you want to delete this?</span>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    doSavePersonalDetails_inProgress: doSavePersonalDetails_inProgress(),
    getPersonalDetails_data: getPersonalDetails_data()
});
const mapDispatchToProps = dispatch => ({
    doUpdateUpdateState: payload => {
        dispatch(doUpdateUpdateState());
    },
    doClearProfileImage: payload => {
        dispatch(doClearProfileImage(payload));
    },
    doSavePersonalDetails: payload => {
        dispatch(doSavePersonalDetails(payload));
    },
    getPersonalDetails: payload => {
        dispatch(getPersonalDetails(payload));
    }
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePicture);
