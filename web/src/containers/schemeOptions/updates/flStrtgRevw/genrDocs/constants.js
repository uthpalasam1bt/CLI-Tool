/* 
this file used to define all the constants that are used in this template creation 
 */

import React from 'react';

export const FORM_NAME = 'TAB_FILE_GENERATOR'; //  name for the form
export const FORM_TITLE = 'Generate documents'; // a form title to be display in the header
export const DOC_NAMES = {
    //names of the upload or generate document fields
    AdvisoryReport: 'AdvisoryReport',
    FMA: 'FMA',
    SIP: 'SIP',
    ConsultationSponsor: 'ConsultationSponsor'
};

export const FORM_I_ICON = ( // a discription to show when the user hover over the icon in the header
    <p>
        Select which PMC Directors will be asked to sign the Investment Management Agreement.
        <br />
        <br />
        Review the documents to check that everything is correct. If there are problems with the information entered
        then abort the workflow, correct and resubmit.
        <br />
        <br />
        To edit the document text, download the Word documents, make any necessary changes or additions, and upload a
        final pdf.
        <br />
        <br />
        Select ‘continue’ to send the final documents for internal review.
        <br />
        <br />
    </p>
);

export const TABS = {
    // form tab keys and Tab names
    tab1: { tabKey: 'uploadgenTab1', tabName: 'Acceptance' },
    tab2: { tabKey: 'uploadgenTab2', tabName: 'Generate/Upload' }
};
export const SUBMITTED_MESSAGE = 'submitted.'; // successful submitted message
export const SAVED_MESSAGE = 'saved.'; //successful saved message

export const PICK_USER_I_ICON = 'Pick LGIM Directors'; // icon discription
export const PICKER_TITLE = 'Select LGIM staff to confirm document accepted once client has signed'; // title to display in  the pick user component header
export const CONTINUED_MESSAGE = 'Document(s) uploaded successfully.';
