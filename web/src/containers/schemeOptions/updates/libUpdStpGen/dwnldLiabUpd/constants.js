/* 
      This file contains all the constants required in the index.js of the step
 
*/

import React from 'react';

export const FORM_NAME = 'dwnldLiabilityUpdateForm'; // name for the redux form
export const FORM_TITLE = 'Approve liability information'; // Text for title to display in the header

//The value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        Review the information provided. If anything looks incorrect then abort the process to revert to the previous
        step and resubmit.
    </p>
);

export const TABONE = {
    KEY: 'liabilityUpdate',
    NAME: 'Liability Update'
};

export const TABTWO = {
    KEY: 'selectSignatory',
    NAME: 'IMA Signatories'
};

export const FORM_FIELD_WITH_TAB = {
    KNOW_LIABILITY_DURATION: 'liabilityUpdate.knowLiabilityDuration',
    LIABILITY_DURATION: 'liabilityUpdate.liabilityDuration',
    KNOW_LIABILITY_INFLATION_PERCENTAGE: 'liabilityUpdate.knowLiabilityInflationPercentage',
    PERCENTAGE_LINKED_INFLATION: 'liabilityUpdate.proportionOfLLTF',
    HAVE_SET_OF_PAST_SERVICES: 'liabilityUpdate.havePastSLCToUpload',
    UPLOAD_CASHFLOW_REAL_FIXED: 'liabilityUpdate.cashflowTypeToUpload',
    TEMPLATE_DOWNLOAD: 'liabilityUpdate.templateDownload',
    UPLOAD_OVERALL_CASHFLOWS: 'liabilityUpdate.cashflowAttachmentOverall',//overallCashflows',
    UPLOAD_FIXED_AND_REAL_CASHFLOW: 'liabilityUpdate.cashflowAttachmentFnR', //fixedAndRealCashflows
    CASHFLOW_PRODUCE_DATE: 'liabilityUpdate.dataCashflowsProduced',
    KNOW_LIABILITY_VALUE_DATE: 'liabilityUpdate.knowLiabilityValueMDT',
    LIABILITY_VALUE: 'liabilityUpdate.liabilityValue',
    AVERAGE_MARGIN_LIABILITY_DISCOUNT: 'liabilityUpdate.avgMarginLDRAndGY',
    PROVIDED_DATE: 'liabilityUpdate.dataValueProvided',
    BASIS: 'liabilityUpdate.basisValueProvided',
    OPEN_TO_FUTURE_ACCRUAL: 'liabilityUpdate.openToFutureAccural',
    CURRENT_ANNUAL_COST_ACCRUAL: 'liabilityUpdate.currentAnnualCostAccrual',
    TARGET_BUYOUT_VALUE: 'liabilityUpdate.targetBuyoutValue',
    TARGET_BUYOUT_PROVIDED_DATE: 'liabilityUpdate.targetBuyoutValueProvidedDate',
    COMBINED_COMPANY_MEMBER_CONTRIBUTIONS: 'liabilityUpdate.combinedCompanyMemberContributions',
    HAVE_TARGET_BUY_OUT_VALUE: 'liabilityUpdate.haveTargetBuyOutValue',
    LIKE_TO_INCLUDE_FUNDING_LEVEL_TRIGGER: 'liabilityUpdate.likeToIncludeFundingLevelTrigger',
    LIKE_TO_SEE_PROJECTION_OYFP: 'liabilityUpdate.likeToSeeProjectionOYFP'
};

export const FORM_FIELD_NAMES = {
    KNOW_LIABILITY_DURATION: 'knowLiabilityDuration',
    LIABILITY_DURATION: 'liabilityDuration',
    KNOW_LIABILITY_INFLATION_PERCENTAGE: 'knowLiabilityInflationPercentage',
    PERCENTAGE_LINKED_INFLATION: 'proportionOfLLTF',
    HAVE_SET_OF_PAST_SERVICES: 'havePastSLCToUpload',
    UPLOAD_CASHFLOW_REAL_FIXED: 'cashflowTypeToUpload',
    TEMPLATE_DOWNLOAD: 'templateDownload',
    UPLOAD_OVERALL_CASHFLOWS: 'overallCashflows',
    UPLOAD_FIXED_AND_REAL_CASHFLOW: 'fixedAndRealCashflows',
    CASHFLOW_PRODUCE_DATE: 'dataCashflowsProduced',
    KNOW_LIABILITY_VALUE_DATE: 'knowLiabilityValueMDT',
    LIABILITY_VALUE: 'liabilityValue',
    AVERAGE_MARGIN_LIABILITY_DISCOUNT: 'avgMarginLDRAndGY',
    PROVIDED_DATE: 'dataValueProvided',
    BASIS: 'basisValueProvided',
    OPEN_TO_FUTURE_ACCRUAL: 'openToFutureAccural',
    CURRENT_ANNUAL_COST_ACCRUAL: 'currentAnnualCostAccrual',
    TARGET_BUYOUT_VALUE: 'targetBuyoutValue',
    TARGET_BUYOUT_PROVIDED_DATE: 'targetBuyoutValueProvidedDate',
    COMBINED_COMPANY_MEMBER_CONTRIBUTIONS: 'combinedCompanyMemberContributions',
    HAVE_TARGET_BUY_OUT_VALUE: 'haveTargetBuyOutValue',
    LIKE_TO_INCLUDE_FUNDING_LEVEL_TRIGGER: 'likeToIncludeFundingLevelTrigger',
    LIKE_TO_SEE_PROJECTION_OYFP: 'likeToSeeProjectionOYFP'
};

export const FORM_FIELD_LABELS = {
    [FORM_FIELD_NAMES.LIKE_TO_SEE_PROJECTION_OYFP]: 'Would you like to see a projection of your funding position?',
    [FORM_FIELD_NAMES.KNOW_LIABILITY_DURATION]: 'Do you know your liability duration?',
    [FORM_FIELD_NAMES.LIABILITY_DURATION]: 'Liability duration',
    [FORM_FIELD_NAMES.KNOW_LIABILITY_INFLATION_PERCENTAGE]:
        'Do you know the proportion of your liabilities linked to inflation?',
    [FORM_FIELD_NAMES.PERCENTAGE_LINKED_INFLATION]: 'Proportion of liabilities linked to inflation',

    [FORM_FIELD_NAMES.HAVE_SET_OF_PAST_SERVICES]: 'Do you have a set of liability cashflows to upload ?',

    [FORM_FIELD_NAMES.UPLOAD_CASHFLOW_REAL_FIXED]: 'Choose and download a template to upload your cashflows',
    [FORM_FIELD_NAMES.UPLOAD_OVERALL_CASHFLOWS]: 'Upload overall cashflows',
    [FORM_FIELD_NAMES.UPLOAD_FIXED_AND_REAL_CASHFLOW]: 'Upload fixed & real',
    [FORM_FIELD_NAMES.CASHFLOW_PRODUCE_DATE]: 'What is the effective start date of these cashflows?',
    [FORM_FIELD_NAMES.KNOW_LIABILITY_VALUE_DATE]: 'Do you have a liability value and details of the valuation basis?',
    [FORM_FIELD_NAMES.LIABILITY_VALUE]: 'Liability value',
    [FORM_FIELD_NAMES.AVERAGE_MARGIN_LIABILITY_DISCOUNT]:
        'What is the average margin between the liability discount rate and an appropriate reference gilt yield?',
    [FORM_FIELD_NAMES.PROVIDED_DATE]: 'At what date has this value been provided?',
    [FORM_FIELD_NAMES.BASIS]: 'What sort of liability valuation basis does this value represent?',
    [FORM_FIELD_NAMES.OPEN_TO_FUTURE_ACCRUAL]: 'Is the scheme open to future accrual of new benefits?',
    [FORM_FIELD_NAMES.CURRENT_ANNUAL_COST_ACCRUAL]: 'What is the current annual cost of new benefit accrual?',
    [FORM_FIELD_NAMES.TARGET_BUYOUT_VALUE]: 'Target buy-out price',
    [FORM_FIELD_NAMES.TARGET_BUYOUT_PROVIDED_DATE]: 'At what date has the buy-out price been provided?',
    [FORM_FIELD_NAMES.COMBINED_COMPANY_MEMBER_CONTRIBUTIONS]:
        'What are the combined sponsor and member contributions in respect of future accrual of new benefits?',
    [FORM_FIELD_NAMES.HAVE_TARGET_BUY_OUT_VALUE]: 'Do you have a target buy-out price?',
    [FORM_FIELD_NAMES.LIKE_TO_INCLUDE_FUNDING_LEVEL_TRIGGER]: 'Would you like to include funding level triggers?'
};

export const DOWNLOAD_ZIP_NAME = 'liability_update'; // name to the downloading zip file
export const EXCEL_TAB_NAME = 'Liability Update'; // name to the excel sheet tab that you downloaded
export const EXCEL_FILE_NAME = 'liability_update'
