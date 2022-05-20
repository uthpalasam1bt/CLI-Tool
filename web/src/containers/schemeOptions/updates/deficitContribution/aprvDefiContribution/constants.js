/*
    This file contains constants required in the index.js of the step
*/

import React from 'react';

export const FORM_NAME = 'APPROVE_REJECT_DOC'; //name for redux form
export const FORM_TITLE = 'Approve deficit contributions'; //text for title to display in the header.
export const DOC_NAME = 'TRUSTEE'; //name of the document you need to approve or reject
export const TOGGLEBUTTONGROUP = 'buttonGroup'; // Button Group name
export const DOWNLOAD_ZIP_NAME = 'deficit_contribution_update';
export const EXCEL_FILE_NAME = 'deficit_contributions';
export const EXCEL_TAB_NAME = 'Deficit Contributions';

//value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        Please confirm that the deficit contributions entered are correct.
        <br />
        <br />
        Once you approved the information, we will review it and update the projections on the Dashboard.
    </p>
);

export const DEFICIT_CONTRIBUTION = {
    MODEL_DEFICIT: 'Do you want us to model deficit contributions?',
    UPLOAD_LABEL: 'Do you want to upload a file of deficit contributions or enter them on screen?',
    UPLOAD_LABEL_iIcon: `Please select to enter information 'On Screen' or 'Upload File'. Then proceed accordingly.`,
    UPLOAD_FILE_LABEL: `Upload deficit contribution file`,
    UPLOAD_FILE_LABEL_iICON: `Download the template file above, complete the required data and save as a csv file. Then upload the csv file.`,
    SCREEN_DEFICIT: 'screenDificitContribution'
};

export const FUNDING_FORM_SECTION = {
    KEY: 'funding',
    NAME: 'Funding',
    FIELD_KEYS: {
        LIKE_TO_SEE_PROJECTION_OYFP: 'likeToSeeProjectionOYFP', //- Would you like to see a projection of your funding position?
        WANT_US_TO_MODEL_DC: 'wantUsToModelDC', //- Do you want us to model deficit contribution if any?
        WANT_US_TO_UPLOAD_DCES: 'wantUsToUploadDCES', //- Do you want to upload file of deficit contributions or enter on screen?
        DEFICIT_CONTRIBUTION_COUNT: 'deficitContributionCount',
        DEFICIT_CONTRIBUTION_VALUE: 'deficitContributionValue',
        DEFICIT_CONTRIBUTION_DATE: 'deficintContributionDate',
        TEMPLATE_DOWNLOAD: 'templateDownload',
        DEFICIT_CONTRIBUTION_CURRENCY: 'deficintContributionCurruncy',
        DCFS_ATTACHMENT: 'dcfsAttachment', //- Download, fill and upload excel file
        SCHEME_OPEN_TO_FUTURE_ACCRUAL: 'schemeOpenToFutureAccrual', //- Is the scheme open to future accrual?
        CURRENT_ANNUAL_CA: 'currentAnnualCA', //- What is the current annual cost of accrual?
        COMBINED_COMPANY_MC_RA: 'combinedCompanyMCRA', //- What are the combined company and member contributions in respect of accrual?
        HAVE_TARGET_BUYOUT_VALUE: 'haveTargetBuyoutValue', //- Do you have a target buyout value?
        TARGET_BUYOUT_VALUE: 'targetBuyoutValue', //- Target buy-out liability value
        DATE_VALUE_PROVIDED: 'dataValueProvided', //- At what date has this value been provided?
        LIKE_TO_INCLUDE_FLT: 'likeToIncludeFLT' //- Would you like to include funding level triggers?
    }
};
