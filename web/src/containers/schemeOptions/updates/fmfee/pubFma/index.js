/*
This step template can be used to view an uploaded document and publish it.
*/

import React from 'react';

import CreatePublish from '../../../../workflows/templates/stepTemplates/publish';
import constants from '../../../../workflows/constants';
import { TITILE_PUBLISH_FMA } from '../../../../../config/constants';

import { FORM_I_ICON, ON_SUBMIT_MESSAGE } from './constants';
// import { ON_SUBMIT_MESSAGE } from '../../../../../UILibrary/constants/commonConstant';

const { GENERATE_PUBLISH_TYPE_SINGLE } = constants;

let PublishSingleDoc = props => {
    return (
        <>
            <CreatePublish
                publishType={GENERATE_PUBLISH_TYPE_SINGLE} //type of the CreatePublish component (single document).
                //necessary properties need to be passed down to the create form component and the header
                options={{
                    title: TITILE_PUBLISH_FMA, //title to be displayed in the header.
                    titleIicon: FORM_I_ICON, //the value of the tooltip icon in the header.
                    onSubmitMessage: ON_SUBMIT_MESSAGE
                }}
                {...props}
            />
        </>
    );
};

export default PublishSingleDoc;
