/*
This step template can be used to create approve reject container  which contains a dymanic component.
*/

import React from 'react';

import ApproveRejectContainer from '../../../workflows/templates/stepTemplates/approveReject';
import { FORM_TITLE, FORM_I_ICON, DOC_NAME } from './constants';
import constants from '../../../workflows/constants';

const {
    APPROVE_REJECT_TYPE_SIMPLE,
    BUTTON_TITLE_APPROVE,
    BUTTON_TITLE_REJECT,
    BUTTON_TITLE_DOWNLOAD,
    ON_APPROVE_MESSAGE,
    ON_REJECT_MESSAGE
} = constants;

let ApproveRejectDynamic = props => {
    return (
        <>
            {/* ApproveRejectContainer is used to approve or reject documents. It has two types
                and here it uses the APPROVE_REJECT_TYPE_SIMPLE type. */}

            <ApproveRejectContainer
                formType={APPROVE_REJECT_TYPE_SIMPLE} //type of the ApproveRejectContainer (simple)
                documentName={DOC_NAME} //name of the document you need to approve or reject
                component={<h1>This is a Dynamic Content</h1>} //component to display in ApproveRejectContainer
                options={{
                    //necessary properties need to be passed down to create form header
                    title: FORM_TITLE, //a title to display in the header.
                    titleIicon: FORM_I_ICON, //the value of the tooltip icon in the header.
                    rejectButton: {
                        title: BUTTON_TITLE_REJECT //reject button title
                    },
                    approveButton: {
                        title: BUTTON_TITLE_APPROVE //approve button title
                    },

                    onRejectMessage: ON_REJECT_MESSAGE, //message to display after rejecting the document
                    onApproveMessage: ON_APPROVE_MESSAGE //message to display after approving the document
                }}
                downloadOptions={{
                    isPublicBucket: false //use to choose download bucket is publicBucket or privateBucket
                }}
                {...props}
            />
        </>
    );
};

export default ApproveRejectDynamic;
