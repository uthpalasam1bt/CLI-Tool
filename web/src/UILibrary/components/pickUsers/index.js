import React from 'react';

import SimplePickUser from './templates/simplePickUser';
import UserPickerWithCategories from './templates/userPickerWithCategories';
import constants from '../../constants';

const { PICK_USER_TYPE_SIMPLE, PICK_USER_TYPE_CATEGORY } = constants;

const PickUsersContainer = props => {
    const { pickUserType } = props;
    return (
        <>
            <div className="lgim-styles-wrapper">
                {pickUserType === PICK_USER_TYPE_SIMPLE ? (
                    <SimplePickUser {...props} />
                ) : pickUserType === PICK_USER_TYPE_CATEGORY ? (
                    <UserPickerWithCategories {...props} />
                ) : null}
            </div>
        </>
    );
};

export default PickUsersContainer;
