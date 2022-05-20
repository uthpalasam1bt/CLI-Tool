/* 
this file used to define all the constants used in this template creation 
*/

import React from 'react';

export const FORM_NAME = 'SAMPLE_FILE_GENERATOR'; // a form name to differenciate between the other forms
export const FORM_TITLE = 'Upload bespoke report'; // a title to dispaly in the header of the form component
export const DOC_NAMES = {
    TransitionReport: 'TransitionReport' //names of the upload or generate document fields
};

export const FORM_I_ICON = (
    <p>
        This workflow can be used to provide the client with a bespoke advice report. Upload a pdf copy of the report
        below.
    </p>
); // a discription to show when the user hover over the icon in the header

export const SUBMITTED_MESSAGE = ''; // successful submitted message
export const SAVED_MESSAGE = 'Document(s) Successfully Uploaded.'; //successful saved message
export const CONTINUED_MESSAGE = '';
export const BESPOKE_LABLE = 'Upload/Generate bespoke report'
