/* 
this file contains all the constants that are used in this simple form data dowa=nload template creation using functional config
*/

import React from 'react';

export const FORM_NAME = 'SAMPLE_FORM_ONE'; // name for the form
export const FORM_TITLE = 'Approve return target'; // a title to display in the template header component

export const FORM_FIELD_NAMES = {
    TARGET_RETURN: 'tab1.targetReturn',
    HOLD_LESS_LIQUUD_ASSETS: 'tab1.avoidLessLiquidAssets',
    FULLY_ESG_PORTFOLIO: 'tab1.fullyEsgPortfolio',
};
export const FORM_FIELD_LABLES = {
    TARGET_RETURN: 'Target return above gilts (net of  fees)',
    HOLD_LESS_LIQUUD_ASSETS: 'Do you want to avoid holding less liquid assets, such as property?',
    FULLY_ESG_PORTFOLIO: 'Do you want to fully integrate Environmental, Social and Governance (ESG) themes within your portfolio allocation?',
};

export const FORM_I_ICON = ( // a decription to the icon in the header component
    <p>
        Review the information provided. If anything looks incorrect then edit it below, or else abort the process to
        send the form back to the client so that they can resubmit.
    </p>
);

export const DOWNLOAD_ZIP_NAME = 'update_return_target'; // name to the downloading zip file
export const EXCEL_FILE_NAME = 'update_return_target'; // name to the downloading zip file
export const EXCEL_TAB_NAME = 'Return Target'; // name to the excel sheet tab that you downloaded
export const ON_SUBMIT_MESSAGE_RTN = 'Update to the return target requested';
