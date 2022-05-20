/* 
      This file contains all the constants required in the index.js of the step
 
*/
import React from 'react';

export const TEXT = 'Select activate to update the liability proxy'; //The text that use to display in default scheme activation
export const FORM_TITLE = 'Activate mandate'; // Text for title to display in the header

//The value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        Activating the mandate will activate the new liability proxy from the date specified in the document. Note that if this is in the past then previous liability performance information will be overwritten.
        <br />
        <br />
        Once the mandate has been activated then the client will be able to view the Liability Tracker update report on the system.
    </p>
);
