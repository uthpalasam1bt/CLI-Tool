/* 
      This file contains all the constants required in the index.js of the step
 
*/

import React from 'react';

export const FORM_NAME = 'liabilityUpdateForm'; // name for the redux form
export const FORM_TITLE = 'Updates'; // Text for title to display in the header
export const TOGGLEBUTTONGROUP = 'buttonGroup'; // Button Group name
export const ENTERVALUE = 'enterValue'; // Button Group
export const PICKER_TITLE = 'Select signatories';
export const LIABILITYCASHVALUE = 'havePastSLCToUpload';
export const MARGINEDATEANDTYPE = 'knowLiabilityValueMDT';
export const FUNDINPOSITION = 'likeToSeeProjectionOYFP'
export const WANTUSTOMODLEDC = 'wantUsToModelDC';
export const SCHEMEOPTIONFUTURE = 'schemeOpenToFutureAccrual';
export const HAVETARGETBUYOUT = 'haveTargetBuyoutValue';
export const WANT_US_TO_UPLOAD  = 'fsrUpdatesFormSection_liab.cashflowTypeToUpload';
export const TEMPLATE_DOWNLOAD = 'templateDownload';
export const WANTUSUPLOADFILE = 'fsrUpdatesFormSection_fund.wantUsToUploadDCES';

export const FORM_FIELD_NAMES = {
    RETURN_TARGET: 'fsrUpdatesFormSection_assets.targetReturn',
    HOLD_LESS_LIQUID_ASSETS: 'fsrUpdatesFormSection_assets.avoidLessLiquidAssets',
    FULLY_ESG_PORTFOLIO: 'fsrUpdatesFormSection_assets.fullyEsgPortfolio',
    HAVE_PAST_SLC_TO_UPLOAD: 'fsrUpdatesFormSection_liab.havePastSLCToUpload',
    LIABILITY_DURATION: 'fsrUpdatesFormSection_liab.liabilityDuration',
    PROPORTION_OF_LLTF: 'fsrUpdatesFormSection_liab.proportionOfLLTF',
    CASHFLOW_ATTACHMENT_OVERALL: 'fsrUpdatesFormSection_liab.cashflowAttachmentOverall',
    CASHFLOW_ATTACHMENT_FNR: 'fsrUpdatesFormSection_liab.cashflowAttachmentFnR',
    DATE_CASHFLOWS_PRODUCED: 'fsrUpdatesFormSection_liab.dataCashflowsProduced',
    KNOW_LIABILITY_VALUE_MDT: 'fsrUpdatesFormSection_liab.knowLiabilityValueMDT',
    LIABILITY_VALUE: 'fsrUpdatesFormSection_liab.liabilityValue',
    AVG_MARGIN_LDR_AND_GY: 'fsrUpdatesFormSection_liab.avgMarginLDRAndGY',
    DATE_VALUE_PROVIDED: 'fsrUpdatesFormSection_liab.dataValueProvided',
    BASIS_VALUE_PROVIDED: 'fsrUpdatesFormSection_liab.basisValueProvided',
    LIKE_TO_SEE_PROJECTION_OYFP: 'fsrUpdatesFormSection_fund.likeToSeeProjectionOYFP',
    WANT_US_TO_MODEL_DC: 'fsrUpdatesFormSection_fund.wantUsToModelDC',
    DCFS_ATTACHMENT: 'fsrUpdatesFormSection_fund.dcfsAttachment',
    SCHEME_OPEN_TO_FUTURE_ACCRUAL: 'fsrUpdatesFormSection_fund.schemeOpenToFutureAccrual',
    CURRENT_ANNUAL_CA: 'fsrUpdatesFormSection_fund.currentAnnualCA',
    COMBINED_COMPANY_MC_RA: 'fsrUpdatesFormSection_fund.combinedCompanyMCRA',
    HAVE_TARGET_BUYOUT_VALUE: 'fsrUpdatesFormSection_fund.haveTargetBuyoutValue',
    TARGET_BUYOUT_VALUE: 'fsrUpdatesFormSection_fund.haveTargetBuyoutValue',
    DATE_BUYOUT_VALUE_PROVIDED: 'fsrUpdatesFormSection_fund.dataValueProvided',
    LIKE_TO_INCLUDE_FLT: 'fsrUpdatesFormSection_fund.likeToIncludeFLT',
};
export const FORM_FIELD_LABLES = {
        RETURN_TARGET : 'Target return above gilits (net of fees)',
        HOLD_LESS_LIQUID_ASSETS : 'Do you want to avoid holding less liquid assets, such as property?',
        FULLY_ESG_PORTFOLIO : 'Do you want to fully integrate Environmental, Social and Governance (ESG) themes within your portfolio allocation?',
        HAVE_PAST_SLC_TO_UPLOAD : 'Do you have a set of past service liability cashflows that you can upload?',
        LIABILITY_DURATION : 'Liability duration',
        PROPORTION_OF_LLTF : 'Proportion of liabilities linked to inflation',
        CASHFLOW_TYPE_TO_UPLOAD : 'Do you want to upload overall cashflows or do you want to upload your cashflows as real and fixed seperately?',
        CASHFLOW_ATTACHMENT_FNR : 'Upload the filled in fixed & real cashflow',
        DATE_CASHFLOWS_PRODUCED : 'At what date have these cashflows been produced?',
        KNOW_LIABILITY_VALUE_MDT : 'Do you know your liability value, margin date and type?',
        LIABILITY_VALUE : 'Liability value',
        AVG_MARGIN_LDR_AND_GY : 'What is the average margin between the liability discount rate and a gilt yield?',
        DATE_VALUE_PROVIDED : 'At what date has this value been provided?',
        BASIS_VALUE_PROVIDED : 'What basis has this value been provided on?',
        LIKE_TO_SEE_PROJECTION_OYFP : 'Would you like to see a projection of your funding position?',
        WANT_US_TO_MODEL_DC: 'Do you want us to model any deficit contributions?',
        WANT_US_TO_UPLOAD_DCES: 'Do you want to upload a file of deficit contributions or enter them on screen?',
        DCFS_ATTACHMENT: 'Download, fill and upload file of deficit contributions',
        DEFICIT_CONTRIBUTION_VALUE: 'Deficit contribution',
        DEFICIT_CONTRIBUTION_DATE: 'Payment date',
        SCHEME_OPEN_TO_FUTURE_ACCRUAL: 'Is the scheme open to future accrual?',
        CURRENT_ANNUAL_CA: 'What is the current annual cost of accrual?',
        COMBINED_COMPANY_MC_RA: 'What are the combined company and member contributions in respect of accrual?',
        HAVE_TARGET_BUYOUT_VALUE: 'Do you have a target buyout value?',
        TARGET_BUYOUT_VALUE: 'Target buy-out liability value, if any',
        DATE_BUYOUT_VALUE_PROVIDED: 'At what date has this value been provided?',
        LIKE_TO_INCLUDE_FLT: 'Would you like to include funding level triggers?',
        HOLD_LESS_LIQUUD_ASSETS: 'Do you want to avoid holding less liquid assets, such as property?',
};
// export const 


//The value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
            This workflow can be used to request a full review of investment strategy.
            <br /><br />
            Please provide a target return and liability information below so that we can carry out a strategy review and prepare your updated Investment Management Agreement. You will have the opportunity to consider the impact of alternative return targets once we have completed our initial analysis.
            <br /><br />
            You will also need to select which trustees will sign the new Investment Management Agreement.
            <br /> <br />
            Once you have submitted the required information, we will review it and prepare formal investment advice for you to review. You will receive a notification when this is available and will be able to access it at the next step.
        <br />
        <br />
    </p>
);

export const STRETOGY_UPDATE_FORM_SECTION = {
    KEY: 'tab1',
    NAME: 'Request strategy Form'
};

export const TABTWO = {
    KEY: 'tab2',
    NAME: 'IMA Signatories'
};
export const ON_SUBMIT_MESSAGE = 'Request strategy review requested.';
