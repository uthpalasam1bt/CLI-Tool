/*
This step template can be used to view an uploaded document and publish it.
*/

import React from 'react';

import CreatePublishMandate from '../../../workflows/templates/stepTemplates/publish';
import constants from '../../../workflows/constants';
import { FORM_I_ICON, FORM_TITLE, PUBLISH_DOC_NAME } from './constants';

const { GENERATE_PUBLISH_TYPE_MANDATE } = constants;

let PublishSingleDoc = props => {
    return (
        <>
            <CreatePublishMandate
                publishType={GENERATE_PUBLISH_TYPE_MANDATE} //type of the CreatePublish component (single document).
                docName={PUBLISH_DOC_NAME} // not required unless if there are multiple documents in the payload
                //necessary properties need to be passed down to the create form component and the header
                options={{
                    title: FORM_TITLE, //title to be displayed in the header.
                    titleIicon: FORM_I_ICON //The value of the tooltip icon in the header
                }}
                {...props}
            />
        </>
    );
};

export default PublishSingleDoc;
