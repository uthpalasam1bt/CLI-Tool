/*
    This file contains constants required in the index.js of the step
*/

import React from 'react';

export const FORM_TITLE = 'Publish IMA'; // Text for title to display in the header

//The value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        Please provide us with information regarding your scheme’s assets and liabilities, along with details of any
        expected contributions. We will use this information to prepare risk analysis and a funding level projection,
        and to design a bespoke portfolio for your scheme. We can only provide this service to UK defined benefit
        pension schemes with assets of more than £10m.
    </p>
);

/**
 * name of the document to be published.
 * this is not required unless if there are multiple documents in the payload
 * if there is only one document in the payload, that will be selected for publish
 */
export const PUBLISH_DOC_NAME = 'FMA';
