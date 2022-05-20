/*
This step template can be used to create approve reject container  which contains a simple form.
This allowes to pass JSON or functional form configurations to create from fields.
*/

import React from 'react';

import ApproveRejectContainer from '../../../../workflows/templates/stepTemplates/approveReject';
import { formFields } from './formConfig';
import { FORM_TITLE, FORM_NAME, DOC_NAME } from './constants';
import constants from '../../../../workflows/constants/index';
// web\src\containers\workflows\constants\index.js

const {
    APPROVE_REJECT_TYPE_SIMPLE,
    BUTTON_TITLE_APPROVE,
    BUTTON_TITLE_REJECT,
    ON_APPROVE_MESSAGE,
    ON_REJECT_MESSAGE,
    CONTENT_POSITION_CENTER
} = constants;

let ApproveRejectSimpleForm = props => {
    return (
        <>
            <ApproveRejectContainer
                formType={APPROVE_REJECT_TYPE_SIMPLE} //type of the ApproveRejectContainer (simple)
                documentName={DOC_NAME} //name of the document you need to approve or reject
                formOptions={{
                    //options that requires to generate the form
                    formName: FORM_NAME, //name of the redux form
                    formFieldFunction: formFields //passing functional form configuration
                }}
                options={{
                    //necessary properties need to be passed down to create form header
                    title: FORM_TITLE, //a title to display in the header.
                    downloadButton: false,
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
                contentPosition={CONTENT_POSITION_CENTER} // adjust content to center or top using CONTENT_POSITION_CENTER or CONTENT_POSITION_TOP
                disabled={true}
                {...props}
            />
        </>
    );
};

export default ApproveRejectSimpleForm;
