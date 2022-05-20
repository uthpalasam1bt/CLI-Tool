/* 
      This file contains all the constants required in the index.js of the step
 
*/

import React from 'react';

export const FORM_NAME = 'SAMPLE_FORM_TWO'; // name for the redux form
export const FORM_TITLE = 'Request termination of mandate'; // Text for title to display in the header
export const TOGGLEBUTTONGROUP = 'buttonGroup'; // Button Group name
export const ENTERVALUE = 'enterValue'; // Button Group

//The value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        This workflow can be used to notify us if you would like to terminate your mandate with us and move to another
        provider.
    </p>
);
export const ON_SUBMIT_MESSAGE_FIRST_STEP = 'Terminate mandate requested.';
export const FORM_FIELD_NAMES = {
   CANCEL_REASON: 'cancelReason',
 }
 export const FORM_FIELD_LABELS ={
    [FORM_FIELD_NAMES.CANCEL_REASON]: 'Please enter a reason for mandate termination',
 }