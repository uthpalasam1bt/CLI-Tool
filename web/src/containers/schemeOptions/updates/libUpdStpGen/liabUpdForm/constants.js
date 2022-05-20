/* 
      This file contains all the constants required in the index.js of the step
 
*/

import React from 'react';

export const FORM_NAME = 'liabilityUpdateForm'; // name for the redux form
export const FORM_TITLE = 'Input liability information'; // Text for title to display in the header
// export const TOGGLEBUTTONGROUP = 'buttonGroup'; // Button Group name
export const ENTERVALUE = 'enterValue'; // Button Group
export const PICKER_TITLE = 'Select signatories';

export const ON_SAVE_MESSAGE = 'Information saved.';
export const ON_SUBMIT_MESSAGE = 'Liability update requested.';

//The value of the tooltip icon in the header
export const FORM_I_ICON = (
    <p>
        This workflow can be used to recalibrate the liability value or liability cashflows in the Investment Management
        Agreement, without affecting the other investment objectives.
        <br />
        <br />
        Please provide the information below so that we can provide you with a new liability proxy and prepare your
        updated Investment Management Agreement.
        <br />
        <br />
        You will also need to select which trustees will sign the new Investment Management Agreement.
        <br />
        <br />
        Once you have submitted the required information, we will review it and prepare formal investment advice for you
        to review. You will receive a notification when this is available and will be able to access it at the next
        step.
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

export const FORM_FIELD_NAMES = {
    KNOW_LIABILITY_DURATION: 'knowLiabilityDuration',
    LIABILITY_DURATION: 'liabilityDuration',
    KNOW_LIABILITY_INFLATION_PERCENTAGE: 'knowLiabilityInflationPercentage',
    PERCENTAGE_LINKED_INFLATION: 'proportionOfLLTF',
    HAVE_SET_OF_PAST_SERVICES: 'havePastSLCToUpload',
    UPLOAD_CASHFLOW_REAL_FIXED: 'cashflowTypeToUpload',
    TEMPLATE_DOWNLOAD: 'templateDownload',
    UPLOAD_OVERALL_CASHFLOWS: 'cashflowAttachmentOverall',//overallCashflows
    UPLOAD_FIXED_AND_REAL_CASHFLOW: 'cashflowAttachmentFnR', //fixedAndRealCashflows
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
