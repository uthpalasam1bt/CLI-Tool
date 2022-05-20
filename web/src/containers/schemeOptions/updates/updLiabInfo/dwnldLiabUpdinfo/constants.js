import React from 'react';

export const FORM_NAME = 'dwnldLiabUpdinfoForm'; // name for the form
export const FORM_TITLE = 'Approve liability information'; // a title to display in the template header component

export const FORM_I_ICON = ( // a decription to the icon in the header component
    <p>
        Review the information provided. If anything looks incorrect then abort the process to revert to the previous
        step and resubmit.
        <br />
        <br />
        Take care that the date from which the new proxy is to be used is sensible. If this is set in the past then past
        liability performance data will be overwritten.
    </p>
);

export const DOWNLOAD_ZIP_NAME = 'liability_update'; // name to the downloading zip file
export const DOC_NAME = 'TRUSTEE';
export const EXCEL_TAB_NAME = 'form-data'; // name to the excel sheet tab that you downloaded

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
    LIKE_TO_SEE_PROJECTION_OYFP: 'likeToSeeProjectionOYFP',
    PROXY_ADOPTION_DATE_INPUT: 'proxyAdoptionDateInput'
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
    [FORM_FIELD_NAMES.LIKE_TO_INCLUDE_FUNDING_LEVEL_TRIGGER]: 'Would you like to include funding level triggers?',
    [FORM_FIELD_NAMES.PROXY_ADOPTION_DATE_INPUT]: 'From what date should this new liability measure be used?'
};

export const LABEL_NAMES = {
    iIcon:
        'Please click Download to retrieve the template to include the cashflow data. Once complete, save as a csv file and click Upload to add the data to the system.',
    KNOW_LIABILITY_VALUE_DATE_IICON: 'Explanatory Wording.',
    AVERAGE_MARGIN_LIABILITY_DISCOUNT_IICON:
        "If entering a value less than 1.00, please enter '0' before the decimal point e.g. 0.25.",
    HAVE_TARGET_BUY_OUT_VALUE_LABEL: 'Target buy-out price'
};
