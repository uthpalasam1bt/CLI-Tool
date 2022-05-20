/* 
      This file contains all the constants required in the index.js of the step
 
*/

import React from 'react';

export const FORM_NAME = 'SAMPLE_FORM_TWO'; // name for the redux form
export const FORM_TITLE = 'Funding level triggers'; // Text for title to display in the header
export const FUNDING_LEVEL_TRIGGERS_FIELD_NAME = 'FUNDING_LEVEL_TRIGGERS_FIELD_NAME';
export const SUCCESS_MESSAGE = 'Data saved successfully.';
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
        LIKE_TO_INCLUDE_FLT: 'likeToIncludeFLT', //- Would you like to include funding level triggers?
        JOURNEY_PLAN_DATE_KEY: 'journeyPlanDate',
        FUNDING_LEVEL_TRIGGERS_FORM_NAME: 'fundingLevelTriggerFormName'
    }
};

//The value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        This workflow can be used to set bespoke funding level triggers for the site to monitor. Note that setting these
        triggers will overwrite and standard triggers already in place in the IMA. If the bespoke triggers are removed
        using this workflow then any standard trigger monitoring in place will begin again.
    </p>
);

export const UPLOAD_I_ICON = (
    <p>
        This workflow can be used to update the deficit contributions used when modelling funding level projections in
        the Dashboard. Changing these will not affect the investment mandate itself.
        <br />
        <br />
        Please enter the deficit contributions that you would like the site to model below.
    </p>
);
