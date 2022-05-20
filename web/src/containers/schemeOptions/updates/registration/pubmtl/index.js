import React from 'react';

import CreatePublish from '../../../../workflows/templates/stepTemplates/publish';
import constants from '../../../../workflows/constants';
import connectApi from '../../../../../middlewares/connectApi';
import { PUBLISH_MULTIPLE_FILE_TITLE, FORM_NAME } from './constants';

const { GENERATE_PUBLISH_TYPE_MULTIPLE } = constants;

const PublishMTL = props => {
    return (
        <>
            <CreatePublish
                formName={FORM_NAME}
                publishType={GENERATE_PUBLISH_TYPE_MULTIPLE}
                options={{
                    title: PUBLISH_MULTIPLE_FILE_TITLE
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

export default PublishMTL;
