import React from 'react';

import CreatePublish from '../../../../workflows/templates/stepTemplates/publish';
import constants from '../../../../workflows/constants';
import connectApi from '../../../../../middlewares/connectApi';
import { PUBLISH_MULTIPLE_FILE_TITLE, FORM_NAME, FORM_I_ICON } from './constants';

const { GENERATE_PUBLISH_TYPE_MULTIPLE } = constants;

const PublishAdvice = props => {
    return (
        <>
            <CreatePublish
                formName={FORM_NAME}
                publishType={GENERATE_PUBLISH_TYPE_MULTIPLE}
                options={{
                    title: PUBLISH_MULTIPLE_FILE_TITLE,
                    titleIicon: FORM_I_ICON
                }}
                downloadOptions={{
                    api: connectApi,
                    isPublicBucket: false
                }}
                {...props}
            />
        </>
    );
};

export default PublishAdvice;
