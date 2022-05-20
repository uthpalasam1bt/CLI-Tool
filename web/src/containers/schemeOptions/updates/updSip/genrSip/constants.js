/* 
this file used to define all the constants used in this template creation 
*/

import React from 'react';

export const FORM_NAME = 'SAMPLE_FILE_GENERATOR'; // a form name to differenciate between the other forms
export const FORM_TITLE = 'Generate documents'; // a title to dispaly in the header of the form component
export const DOC_NAMES = {
    //names of the upload or generate document fields
    SIP: 'SIP',
    ConsultationSponsor: 'ConsultationSponsor'
};

export const LABEL = {
    UPLOAD_GENERATE: 'Upload/Generate SIP',
    CONSULTATION_SPONSOR: 'Upload/Generate sponsor consultation letter'
};

export const FORM_I_ICON = ( // a discription to show when the user hover over the icon in the header
    <p>This workflow can be used to provide the client with an updated Statement of Investment Principles.</p>
);

export const SUBMITTED_MESSAGE = ''; // successful submitted message
export const SAVED_MESSAGE = 'Document(s) Successfully Uploaded.'; //successful saved message
export const CONTINUED_MESSAGE = '';
