import React from 'react';

import CreatePublish from '../../../workflows/templates/stepTemplates/publish';
import constants from '../../../workflows/constants';
import { PUBLISH_TO_SCHEME_TITLE, FORM_NAME } from './constants';
const { GENERATE_PUBLISH_TYPE_SCHEME, GENERATE_PUBLISH_TYPE_MULTICLIENT } = constants;

let PublishToScm = props => {
    return (
        <>
            <CreatePublish
                formName={FORM_NAME}
                publishType={GENERATE_PUBLISH_TYPE_MULTICLIENT}
                options={{
                    title: PUBLISH_TO_SCHEME_TITLE
                }}
                {...props}
            />
        </>
    );
};

export default PublishToScm;
