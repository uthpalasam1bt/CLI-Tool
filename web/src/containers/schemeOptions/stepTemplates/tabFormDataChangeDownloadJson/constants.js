/* 
this file contains all the constants that are used in this template creation using Json config
*/

import React from 'react';

export const FORM_NAME = 'SAMPLE_FORM_FOUR'; // from name
export const FORM_TITLE = 'Tab Download Form Data Using Json'; // title to display in the header

export const FORM_I_ICON = ( // icon description to display in the header
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

export const IICON_TEXT = 'It doesn’t seem to be possible to update some of this information';

export const DOWNLOAD_ZIP_NAME = 'TabFormData'; // name to the downloading zip file
export const EXCEL_TAB_NAME = 'tab-form-data-json'; // name to the excel sheet tab that you downloaded

export const COMPONENT_TEXT_AREA_NAME = 'schemeTextArea'; // field name to the component that passing to the form tabs as formSection
export const COMPONENT_TEXT_AREA_LABEL = 'Does this scheme have AVCs?'; // field label to component text area

export const TAB_KEYS = {
    // unique key for each tab and to get the form values from the props
    TAB_ONE_FORM: 'tab_one_form',
    TAB_TWO_FORM: 'tab_two_form'
};
export const TAB_NAME = {
    // tab name to display
    TAB_ONE: 'Tab One',
    TAB_TWO: 'Tab Two'
};
