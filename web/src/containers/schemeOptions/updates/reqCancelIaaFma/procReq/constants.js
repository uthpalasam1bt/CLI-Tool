/*
    This file contains constants required in the index.js of the step
*/

import React from 'react';

export const FORM_NAME = 'APPROVE_REJECT_DOC'; //name for redux form
export const FORM_TITLE = 'Approve termination of mandate'; //text for title to display in the header.
export const DOC_NAME = 'TRUSTEE'; //name of the document you need to approve or reject

//value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        Review the reason for the mandate to be terminated. Contact the client to ensure that the request to terminate
        the mandate is intentional.
    </p>
);
