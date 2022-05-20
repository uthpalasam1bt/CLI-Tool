/*
This steptemplate is used to publish multiple documents and download them using the link. 
*/

import React from 'react';

import CreatePublish from '../../../../workflows/templates/stepTemplates/publish';
import constants from '../../../../workflows/constants';
import connectApi from '../../../../../middlewares/connectApi';
import { PUBLISH_MULTIPLE_FILE_TITLE, FORM_NAME, FORM_I_ICON } from './constants';

const { GENERATE_PUBLISH_TYPE_MULTIPLE } = constants;

const PublishMultipleDoc = props => {
    return (
        <>
            <CreatePublish
                formName={FORM_NAME} //name of the form
                publishType={GENERATE_PUBLISH_TYPE_MULTIPLE} //type of the CreatePublish component (multiple document).
                //necessary properties need to be passed down to create the header
                options={{
                    title: PUBLISH_MULTIPLE_FILE_TITLE, //title to be displayed in the header.
                    titleIicon: FORM_I_ICON //description of the tooltip icon in the header.
                }}
                //necessary properties must be passed to the file downloader to download documents
                downloadOptions={{
                    api: connectApi, //api to download files
                    isPublicBucket: false //choose download bucket is publicBucket or privateBucket
                }}
                {...props}
            />
        </>
    );
};

export default PublishMultipleDoc;
