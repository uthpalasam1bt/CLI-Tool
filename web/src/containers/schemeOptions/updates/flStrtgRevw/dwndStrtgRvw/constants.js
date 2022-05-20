/* 
this file contains all the constants that are used in this simple form data dowa=nload template creation using functional config
*/

import React from 'react';

// export const FORM_NAME = 'SAMPLE_FORM_ONE'; // name for the form
// export const FORM_TITLE = 'download simple form'; // a title to display in the template header component

export const FORM_I_ICON = ( // a decription to the icon in the header component
    <p>
        Review the information provided. If anything looks incorrect then edit it below, or else abort the process to
        send the form back to the client so that they can resubmit.
    </p>
);

export const DOWNLOAD_ZIP_NAME = 'SimpleFormData'; // name to the downloading zip file
export const EXCEL_TAB_NAME = 'form-data'; // name to the excel sheet tab that you downloaded
export const FORM_NAME = 'liabilityUpdateForm'; // name for the redux form
export const FORM_TITLE = 'Approve data for investment advice'; // Text for title to display in the header
export const TOGGLEBUTTONGROUP = 'buttonGroup'; // Button Group name
export const ENTERVALUE = 'enterValue'; // Button Group
export const PICKER_TITLE = 'Select signatories';
export const LIABILITYCASHVALUE = 'havePastSLCToUpload';
export const MARGINEDATEANDTYPE = 'knowLiabilityValueMDT';
export const FUNDINPOSITION = 'likeToSeeProjectionOYFP'
export const WANTUSTOMODLEDC = 'wantUsToModelDC';
export const SCHEMEOPTIONFUTURE = 'schemeOpenToFutureAccrual';
export const HAVETARGETBUYOUT = 'haveTargetBuyoutValue';
export const WANTUSUPLOADFILE = 'wantUsToUploadDCES';
export const WANT_US_TO_UPLOAD  = 'cashflowTypeToUpload';
export const TEMPLATE_DOWNLOAD = 'templateDownload';

export const FORM_FIELD_NAMES = {
    RETURN_TARGET : 'targetReturn',
    HOLD_LESS_LIQUID_ASSETS : 'avoidLessLiquidAssets',
    FULLY_ESG_PORTFOLIO : 'fullyEsgPortfolio',
    HAVE_PAST_SLC_TO_UPLOAD : 'havePastSLCToUpload',
    LIABILITY_DURATION : 'liabilityDuration',
    PROPORTION_OF_LLTF : 'proportionOfLLTF',
    CASHFLOW_ATTACHMENT_OVERALL : 'cashflowAttachmentOverall',
    CASHFLOW_ATTACHMENT_FNR : 'cashflowAttachmentFnR',
    DATE_CASHFLOWS_PRODUCED : 'dataCashflowsProduced',
    KNOW_LIABILITY_VALUE_MDT : 'knowLiabilityValueMDT',
    LIABILITY_VALUE : 'liabilityValue',
    AVG_MARGIN_LDR_AND_GY : 'avgMarginLDRAndGY',
    DATE_VALUE_PROVIDED : 'dataValueProvided',
    BASIS_VALUE_PROVIDED : 'basisValueProvided',
    LIKE_TO_SEE_PROJECTION_OYFP : 'likeToSeeProjectionOYFP',
    WANT_US_TO_MODEL_DC : 'wantUsToModelDC',
    DCFS_ATTACHMENT : 'dcfsAttachment',
    SCHEME_OPEN_TO_FUTURE_ACCRUAL : 'schemeOpenToFutureAccrual',
    CURRENT_ANNUAL_CA : 'currentAnnualCA',
    COMBINED_COMPANY_MC_RA : 'combinedCompanyMCRA',
    HAVE_TARGET_BUYOUT_VALUE : 'haveTargetBuyoutValue',
    TARGET_BUYOUT_VALUE : 'haveTargetBuyoutValue',
    DATE_BUYOUT_VALUE_PROVIDED : 'dataValueProvided',
    LIKE_TO_INCLUDE_FLT : 'likeToIncludeFLT',
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

export const STRETOGY_UPDATE_FORM_SECTION = {
    KEY: 'tab1',
    NAME: 'Request strategy Form'
};

export const TABTWO = {
    KEY: 'tab2',
    NAME: 'IMA Signatories'
};
export const ON_SUBMIT_MESSAGE = 'Update to the return target requested.';