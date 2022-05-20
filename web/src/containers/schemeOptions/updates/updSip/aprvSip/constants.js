/*
    This file contains constants required in the index.js of the step
*/

import React from 'react';

export const FORM_TITLE = 'Approve SIP '; //text for title to display in the header.

export const DOC_NAME = 'SIP'; //name of the document you need to approve or reject

//value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        Confirm that the document is correct and complete. It will not be published to the client at this stage. If
        there are any problems then reject the document to send it back to the previous step for correction.
    </p>
);
export const CONTINUED_MESSAGE = 'Approved';
