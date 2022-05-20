/* 
      This file contains all the constants required in the index.js of the step
 
*/

import React from 'react';

export const FORM_NAME = 'SAMPLE_FORM_THREE'; // name for the redux form
export const FORM_TITLE = 'Request a formal proposal from us'; // Text for title to display in the header

//The value of the tooltip icon in the header
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

/*  Here we can specify Tab key and Tab name and export them as constants.
    Then we can import these constants where ever we want to use them.
 */
export const TAB_KEYS = {
    // unique key for each tab and to get the form values from the props in the configuration
    TAB_ONE_FORM: 'tab_one_form',
    TAB_TWO_FORM: 'tab_two_form',
    TAB_THREE_FORM: 'tab_three_form'
};
export const TAB_NAME = {
    // tab name to display
    TAB_ONE: 'Tab One',
    TAB_TWO: 'Tab Two',
    TAB_THREE: 'Tab Three'
};
