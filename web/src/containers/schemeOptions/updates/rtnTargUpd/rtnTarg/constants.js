/* 
      This file contains all the constants required in the index.js of the step
 
*/

import React from 'react';

export const FORM_NAME = 'liabilityUpdateForm'; // name for the redux form
export const FORM_TITLE = 'Input return target'; // Text for title to display in the header
export const TOGGLEBUTTONGROUP = 'buttonGroup'; // Button Group name
export const ENTERVALUE = 'enterValue'; // Button Group
export const PICKER_TITLE = 'Select signatories';

export const FORM_FIELD_NAMES = {
    TARGET_RETURN: 'targetReturn',
    HOLD_LESS_LIQUUD_ASSETS: 'avoidLessLiquidAssets',
    FULLY_ESG_PORTFOLIO: 'fullyEsgPortfolio',
};
export const FORM_FIELD_LABLES = {
    TARGET_RETURN: 'Target return above gilts (net of  fees)',
    HOLD_LESS_LIQUUD_ASSETS: 'Do you want to avoid holding less liquid assets, such as property?',
    FULLY_ESG_PORTFOLIO: 'Do you want to fully integrate Environmental, Social and Governance (ESG) themes within your portfolio allocation?',
};

//The value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        This workflow can be used to update the return target in the Investment Management Agreement, without affecting
        the liability proxy.
        <br />
        <br />
        Please provide the new target return below so that we can prepare your updated Investment Management Agreement.
        You will have the opportunity to adjust this and consider the impact of alternative return targets once we have
        completed our analysis.
        <br />
        <br />
        You will also need to select which trustees will sign the new Investment Management Agreement.
        <br />
        <br />
        Once you have submitted the required information, we will review it and prepare formal investment advice for you
        to review. You will receive a notification when this is available and will be able to access it at the next
        step.
        <br />
        <br />
    </p>
);

export const LIABILITY_UPDATE_FORM_SECTION = {
    KEY: 'tab1',
    NAME: 'Return Target Form'
};

export const TABTWO = {
    KEY: 'tab2',
    NAME: 'IMA Signatories'
};
export const ON_SUBMIT_MESSAGE = 'Update to the return target requested.';
