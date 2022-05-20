/*
This step template can be used to publish a form.
To create form fields configuration, this uses the JSON format.
*/

import React from 'react';

import CreatePublish from '../../../workflows/templates/stepTemplates/publish';
import constants from '../../../workflows/constants';
import formFields from './formConfig.json';
import { FORM_NAME, FORM_I_ICON, FORM_TITLE } from './constants';

const { GENERATE_PUBLISH_TYPE_FORM } = constants;

let PublishFormJSON = props => {
    return (
        <>
            <CreatePublish
                publishType={GENERATE_PUBLISH_TYPE_FORM} //type of the CreatePublish component (form).
                formName={FORM_NAME} //name of the form
                formFieldData={formFields} //passing JSON form configuration
                //necessary properties need to be passed down to create form header
                options={{
                    title: FORM_TITLE, //title to be displayed in the header.
                    titleIicon: FORM_I_ICON //description of the tooltip icon in the header.
                }}
                disabled={true}
                {...props}
            />
        </>
    );
};

export default PublishFormJSON;
