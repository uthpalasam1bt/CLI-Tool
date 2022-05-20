import React from 'react';
import constants from '../../../constants';
import DefaultUserPicker from './templates/simpleUserPicker';
import TrusteeUserPicker from './templates/trusteePicker';

const { DEFAULT_USER_PICKER, TRUSTEE_USER_PICKER } = constants;

let UserPickerTemplates = props => {
    const { type } = props;

    return !type || type == DEFAULT_USER_PICKER ? (
        <DefaultUserPicker {...props} />
    ) : type == TRUSTEE_USER_PICKER ? (
        <TrusteeUserPicker {...props} />
    ) : null;
};

export default UserPickerTemplates;
