/*
    This file contains constants required in the index.js of the step
*/

import React from 'react';

export const FORM_NAME = 'APPROVE_REJECT_DOC'; //name for redux form
export const FORM_TITLE = 'Approve FMA Document'; //text for title to display in the header.
export const DOC_NAME = 'FMA'; //name of the document you need to approve or reject

//value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        Please provide us with information regarding your scheme’s assets and liabilities, along with details of any
        expected contributions. We will use this information to prepare risk analysis and a funding level projection,
        and to design a bespoke portfolio for your scheme. We can only provide this service to UK defined benefit
        pension schemes with assets of more than £10m.
        <br />
        <br />
        You will also need to tell us who you would like to be responsible for approving or commenting on the proposal
        that we make. You can just select yourself, or if you would like to add others then you can do this through the
        ‘User Management’ tab above. If you do decide to appoint us you will be asked to provide full trustee details at
        that stage.
        <br />
        <br />
        Once you have submitted the required information, we will review it and prepare a formal proposal for you to
        review. You will receive a notification when this is available and will be able to access it at the next step.
    </p>
);
