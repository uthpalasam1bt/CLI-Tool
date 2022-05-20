/* 
this file used to define all the constants that are used in this template creation 
 */

import React from 'react';

export const FORM_NAME = 'TAB_FILE_GENERATOR'; //  name for the form
export const FORM_TITLE = 'Upload IAA, PMC Proposal and IMA Documents'; // a form title to be display in the header
export const DOC_NAMES = {
    //names of the upload or generate document fields
    FMA: 'FMA',
    IAA: 'IAA',
    PMC: 'PMCProposal',
    MANAGE_LETTER: 'ManagerLetters'
};

export const FORM_I_ICON = ( // a discription to show when the user hover over the icon in the header
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

export const TABS = {
    // form tab keys and Tab names
    tab1: { tabKey: 'uploadgenTab1', tabName: 'IAA Signatories' },
    tab2: { tabKey: 'uploadgenTab2', tabName: 'Upload Documents' }
};
export const SUBMITTED_MESSAGE = 'submitted.'; // successful submitted message
export const SAVED_MESSAGE = 'saved.'; //successful saved message

export const PICK_USER_I_ICON = 'Pick LGIM Directors'; // icon discription
export const PICK_USER_TITLE = 'Pick LGIM Directors'; // title to display in  the pick user component header
