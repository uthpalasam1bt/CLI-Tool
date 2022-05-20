/*
This step template can be used to upload or generate and publish a document
*/

import React from 'react';

import CreatePublish from '../../../workflows/templates/stepTemplates/publish';
import constants from '../../../workflows/constants';
import { formFields } from './formConfig';
import { FORM_NAME, FORM_I_ICON, FORM_TITLE, PUBLISH_DOC_NAME } from './constants';

const { GENERATE_PUBLISH_TYPE_UPLOAD } = constants;

let PublishUploadDoc = props => {
    return (
        <>
            <CreatePublish
                formFieldFunction={formFields} // functional configuration to create upload-generate field in the template
                documentName={PUBLISH_DOC_NAME} //name of the document that need to publish
                formName={FORM_NAME} //name of the form
                publishType={GENERATE_PUBLISH_TYPE_UPLOAD} //type of the CreatePublish component (upload document).
                //necessary properties need to be passed down to the create form component and the header
                options={{
                    title: FORM_TITLE, //title to be displayed in the header.
                    titleIicon: FORM_I_ICON //the value of the tooltip icon in the header.
                }}
                {...props} // props that are passed down to the child components
            />
        </>
    );
};

export default PublishUploadDoc;
