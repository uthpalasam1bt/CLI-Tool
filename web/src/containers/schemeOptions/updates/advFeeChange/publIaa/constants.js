/*
    This file contains constants required in the index.js of the step
*/

import React from 'react';

export const FORM_TITLE = 'Publish IMA'; // Text for title to display in the header

//The value of the tooltip icon in the header
export const FORM_I_ICON = <p>Select ‘Publish’ to send the document to the client for review.</p>;

/**
 * name of the document to be published.
 * this is not required unless if there are multiple documents in the payload
 * if there is only one document in the payload, that will be selected for publish
 */
export const PUBLISH_DOC_NAME = 'IAA';
