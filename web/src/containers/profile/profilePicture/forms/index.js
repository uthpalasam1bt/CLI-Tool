import config from 'appConfig';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from 'redux-form-validators';

import { FileUploader } from '../../../../UILibrary/components/forms/fields';

import { UPDATE_PROFILE_IMAGE_FORM } from '../../constants';

const { profile } = config.uploads;

let updateProfileImageForm = props => {
    const onChangeField = event => {
        props.onSubmit(event);
    };
    return (
        <div className="form-body">
            <div>
                <div className="profile-wrap profile-picture">
                    <div className="card card-wrapper">
                        <div className="content">
                            <div className="upload-wrap">
                                <Field
                                    onChange={e => onChangeField(e)}
                                    name="profileImage"
                                    className="tpip-btn-blue regular btn-upload-img"
                                    component={FileUploader}
                                    options={{
                                        accept: ['.jpeg', '.png', '.svg', '.jpg', '.gif'],
                                        isprofileImage: true,
                                        url: profile.image,
                                        handleState: props.handleState,
                                        isPublic: true,
                                        params: [props.userID],
                                        notDownloadBtn: true,
                                        displayName: 'Upload a profile picture',
                                        errorMessage: 'Please upload only JPEG,PNG and GIF files'
                                    }}
                                    validate={required({ message: 'Required' })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

updateProfileImageForm = reduxForm({
    form: UPDATE_PROFILE_IMAGE_FORM
})(updateProfileImageForm);

export default updateProfileImageForm;
