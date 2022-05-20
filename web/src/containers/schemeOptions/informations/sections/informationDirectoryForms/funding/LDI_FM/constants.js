import React from 'react';
export const FORM_NAME = 'FUNDING_FORM';
export const FORM_TITLE = 'Provide Funding information';

export const THE_CURRENT_ANNUAL_COST_OF_NEW_BENEFIT_ACCRUAL = (
    <p>
        Please enter the £ value of liabilities that are expected to be accrued by active members over the next year.
        This future service liability value should be supplied on the same liability basis that you have supplied the
        past service liabilities. For example, if you have supplied the value of past service liabilities on a ‘gilts
        basis’, then please also provide the value of 1 year of accrual on a ‘gilts basis’. Consult your Scheme Actuary
        if you’re unsure.
        <br />
        <br />
        Note that we would usually expect the contributions paid in respect of future accrual to be of a similar order
        of magnitude to the value of liabilities accrued. If the liability value has been provided on a gilts basis
        rather than a Technical Provisions basis then typically the contributions will be slightly lower than the value
        of liabilities accrued.
    </p>
);

export const THE_SCHEME_OPEN_TO_FUTURE_ACCRUAL_OF_NEW_BENEFITS = (
    <p>
        If your scheme is open to new accrual then this means that it contains active members who are still accruing
        pension benefits, and ongoing contributions will be being paid by the scheme sponsor and by members to cover the
        cost of this accrual. If so, we can take approximate account of this in our projections of the funding position,
        as long as you can provide us with the value of new liabilities that will be accrued in the next year, and the
        total contributions that will be paid in the next year by members and the sponsor to cover the cost of this
        accrual. If you’re unsure about these numbers, your Scheme Actuary should be able to supply an estimate.
        <br />
        <br />
        If you’re unsure, you can select ‘No’, and we will still be able to provide you with an approximate funding
        level projection.
    </p>
);

export const DEFICIT_CONTRIBUTION_SECTION = 'DEFICIT_CONTRIBUTION_SECTION';
export const LDI_FM_FUNDING_DETAILS_TITLE = 'LDI_FM Funding Details';

export const FUNDING_FORM_SECTION = {
    KEY: 'funding',
    NAME: 'Funding',
    FIELD_KEYS: {
        LIKE_TO_SEE_PROJECTION_OYFP: 'likeToSeeProjectionOYFP', //- Would you like to see a projection of your funding position?
        WANT_US_TO_MODEL_DC: 'wantUsToModelDC', //- Do you want us to model deficit contribution if any?
        WANT_US_TO_UPLOAD_DCES: 'wantUsToUploadDCES', //- Do you want to upload file of deficit contributions or enter on screen?
        DEFICIT_CONTRIBUTION_COUNT: 'deficitContributionCount',
        DEFICIT_CONTRIBUTION_VALUE: 'deficitContributionValue',
        DEFICIT_CONTRIBUTION_DATE: 'deficitContributionDate',
        DCFS_ATTACHMENT: 'dcfsAttachment', //- Download, fill and upload excel file
        SCHEME_OPEN_TO_FUTURE_ACCRUAL: 'schemeOpenToFutureAccrual', //- Is the scheme open to future accrual?
        CURRENT_ANNUAL_CA: 'currentAnnualCA', //- What is the current annual cost of accrual?
        COMBINED_COMPANY_MC_RA: 'combinedCompanyMCRA', //- What are the combined company and member contributions in respect of accrual?
        HAVE_TARGET_BUYOUT_VALUE: 'haveTargetBuyoutValue', //- Do you have a target buyout value?
        TARGET_BUYOUT_VALUE: 'targetBuyoutValue', //- Target buy-out liability value
        DATE_VALUE_PROVIDED: 'dataValueProvided', //- At what date has this value been provided?
        LIKE_TO_INCLUDE_FLT: 'likeToIncludeFLT', //- Would you like to include funding level triggers?
        DEFICIT: 'deficit'
    }
};

export const FUNDING_FORM_LABELS_SECTION = {
    KEY: 'funding',
    NAME: 'Funding',
    FIELD_LABELS: {
        LIKE_TO_SEE_PROJECTION_OYFP_LABEL: 'Would you like to see a projection of your funding position?',
        WANT_US_TO_MODEL_DC_LABEL: 'Do you want us to model any deficit contributions?',
        WANT_US_TO_UPLOAD_DCES_LABEL: 'Do you want to upload a file of deficit contributions or enter them on screen?',
        DEFICIT_CONTRIBUTION_COUNT_LABEL: 'deficitContributionCount',
        DEFICIT_CONTRIBUTION_VALUE_LABEL: 'deficitContributionValue',
        DEFICIT_CONTRIBUTION_DATE_LABEL: 'deficitContributionDate',
        DCFS_ATTACHMENT_LABEL: 'dcfsAttachment', //- Download, fill and upload excel file
        SCHEME_OPEN_TO_FUTURE_ACCRUAL_LABEL: 'Is the scheme open to future accrual of new benefits?',
        CURRENT_ANNUAL_CA_LABEL: 'What is the current annual cost of new benefit accrual?',
        COMBINED_COMPANY_MC_RA_LABEL:
            'What are the combined sponsor and member contributions in respect of future accrual of new benefits?',
        HAVE_TARGET_BUYOUT_VALUE_LABEL: 'Do you have a target buy-out price?',
        TARGET_BUYOUT_VALUE_LABEL: 'Target buy-out price',
        DATE_VALUE_PROVIDED_LABEL: 'At what date has the buy-out price been provided?',
        LIKE_TO_INCLUDE_FLT_LABEL: 'Would you like to include funding level triggers?',
        DEFICIT_LABEL: 'deficit'
    }
};

export default { FUNDING_FORM_SECTION, FUNDING_FORM_LABELS_SECTION };
