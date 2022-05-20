/* 
this file used to define all the constants used in this template creation 
*/

import React from 'react';

export const FORM_NAME = 'SAMPLE_FILE_GENERATOR'; // a form name to differentiate between the other forms
export const FORM_TITLE = 'Generate liability proxy'; // a title to display in the header of the form component
export const DOC_NAMES = {
    //names of the upload or generate document fields
    AdvisoryReport: 'AdvisoryReport'
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

export const FORM_I_ICON = ( // a description to show when the user hover over the icon in the header
    <p>
        Review the information provided. If anything looks incorrect then abort the process to revert to the previous
        step and resubmit.
        <br />
        <br />
        To edit the document text, download the Word documents, make any necessary changes or additions, and upload a
        final pdf.
        <br />
        <br />
        Select ‘continue’ to send the final documents for internal review.
    </p>
);

export const SUBMITTED_MESSAGE = 'submitted.'; // successful submitted message
export const SAVED_MESSAGE = 'saved.'; //successful saved message

export const FORM_LABELS = {
    UPLOAD_LABEL: 'Do you want to upload a file of deficit contributions or enter them on screen?',
    UPLOAD_LABEL_IICON: `Please select to enter information 'On Screen' or 'Upload File'. Then proceed accordingly.`,
    DEFICIT_DROPDOWN: 'deficit-dropdown'
};
